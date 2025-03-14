---
title: "home server // core"
date: 2023-11-06
---

i snagged this thinkcentre m710q for super cheap on an auction store because its a low power, low cost option for getting started with homelab type tasks. a lot of entry level recommendations i've seen involve using an old desktop pc or getting an [embedded celeron in a mini-itx form factor](https://www.aliexpress.com/item/1005004752259038.html) - the former is space hungry and generally power hungry, and the start-up cost of the latter is a bit much considering this doesnt include a case, power supply, memory or drives. my thinkcentre came with 8gb of (expandable) memory and a pretty nice intel nvme ssd, in a case that is smaller than my router with a maximum power draw of 65 watts and an idle draw of 9-11 watts. this makes it an excellent option for someone who wants to get in on the ground floor of "always on pcs" while not spending so much that you'll regret it if its not for you

these m710q's tend to ship with windows 10 pro, but i've been setting my little server up as a ubuntu server in order to bring up the performance (and hopefully bring down the power cost). i've found it surprisingly straightforward, but i thought it would be nice to share here for both personal reference, and maybe to help someone out who's looking to do the same thing. i'm going to slice it up into separate posts for related projects, with this one being the "core" config - i'll cross reference when an action in one entry is used for another, such as some peculiarities in the file system being defined here, but mostly being for the benefit of the \<legal downloads\> section

### what's on the menu
#### entree
\- [core setup]()  
#### mains
\- media streaming  
\- cloud storage  
#### dessert
\- discord bot  
\- [game server hosting](/blog/home_server__game_servers)  

## first things first
whatever box you end up going with, you'll want to download ubuntu server (lts version) from [here](https://ubuntu.com/download/server), then follow their installation instructions [here](https://ubuntu.com/tutorials/install-ubuntu-server#1-overview). for those new to code or open source software, lts stands for long term support, which is more or less what it says on the tin. new versions of ubuntu come out every couple of months, but these regular versions only come with nine months of support by default, meaning you'll have to keep updating to take advantage of security updates and support. lts versions are normally supported for three years, and because theyre the version the average consumer uses, theyre also the version most regularly targeted by the software we're installing, like some kind of software ouroboros

anyway, our ubuntu is going to be running in "headless" mode, which is to say, without a user interface / desktop environment. this cuts down on unnecessary cpu use, which is great, but does make the initial install a little fiddly. my m710q doesnt have wifi so i just sucked up having to sit on the floor next to router for twenty minutes while tapping through the initial install. once this is done, we shouldnt need to plug it into a screen again, although i would recommend doing the drive setup first because issues can happen there that will knock out your ability to contact the server over the internet.

also, on the note of sitting next to your router, i would very much recommend wiring your server in directly. wifi kind of sucks to begin with, and and the wifi cards that tend to come with these systems also aren't super stellar. we're going to want a high throughput for streaming our \<legal downloads\>, and using ethernet here lets you remove one bottleneck from the system. get a short run of cat5 or higher, plug it in and forget about it.

## ssh
once ubuntu is installed and restarted, we're going to set three things up while the screen is still connected: ssh (secure shell, for connecting to the server from another pc), ufw (uncomplicated firewall), and any extra drives. i used [this tutorial](https://itsfoss.com/set-up-ssh-ubuntu/)([local copy](/misc/complete_guide_to_configuring_ssh_in_ubuntu/)) for ssh, but the long and short of it is to update your package manager packages, and run apt install on the openssh server. 

```sh
sudo apt update && sudo apt upgrade 
sudo apt install openssh-server
```

some quick ones for the unitiated: ubuntu is pretty stringent with its security, and sort of like windows, your default user won't be the all powerful "administrator" of the system, for security reasons. this all powerful mega user is the root account, and using `sudo` will "DO" a command as if you're the "Super User". `apt` is ubuntu's package manager, which helps to centralise all of the software your average ubuntu might need, as well as making updating a bit easier. the above commands are three separate apt commands, `update`, `upgrade` and `install`. update refreshes the internal list of software versions that apt uses for search and comparison, upgrade updates all of the software currently on your server, and install installs the package requested, in this case `openssh-server`. the `&&` is code shorthand for a 'logical and' and linking two commands like this tells the system to do the second one if the first one succeeds.

openssh sets up a 'systemd service' on install. systemd is a service management system used to run the majority of software in ubuntu, and while it's not the only way to handle things like this (and some people have some criticisms with how it functions) it will work just fine for our fairly vanilla configuration, as well as give us access to some really convenient management tools, allow ubuntu to handle programs that crash by itself, and much more. we can check the status of the service by running one of the following two commands:

```sh 
service ssh status
```

or

```sh
sudo systemctl status ssh
```

the former is the more convenient shorthand, but the latter gives you an idea of how these systemctl commands are laid out. either way, your output should look something like the following:

![](/_assets/img/home_server/ssh_status.png)

if the green "status light" in the top left corner is empty and the Active line says "inactive", run the following command:

```sh
sudo systemctl enable --now ssh
```

this will start up ssh and make sure ubuntu starts it on system boot in the future

## ufw

uncomplicated firewall ships with ubuntu, and allows us to configure a firewall in an uncomplicated manner! sweet! i'm using [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-20-04)([local copy](how_to_set_up_a_firewall_with_ufw_on_ubuntu_20_04)) for ufw setup. first up, i'll introduce you to a friend that's going to be with us for the rest of this adventure:

```sh
sudo nano /etc/default/ufw
```

`nano` is a text editor for use in the terminal, and /etc/default/ufw is the location of a file we want to check. `/` at the beginning says that we're looking at the bottom level or 'root' level of the file system; the windows equivalent is a folder located at C:/. if you want to navigate to a file in reference to our current location, you can omit the leading `/`. `etc` is a folder that holds a lot of configuration files, and the `ufw` at the end of the string is our actual file. unlike windows, a text file doesn't need a .txt extension; they work the same way.

running this command will load nano on this particular file, with sudo / root permissions so that we can make edits if we need to (the file is owned by root, and we normally wouldnt be able to mess with it). look for a row with `IPV6=`, and if it says no, change it to yes. this just means we can process ipv6 addresses, which is unlikely to come up, and is more just a nice-to-have. we won't really be stressing about this anymore in this guide, but if you want to learn about what's going on, read about ipv4 [here](https://en.wikipedia.org/wiki/IPv4) and ipv6 [here](https://en.wikipedia.org/wiki/IPv6).

you can save changes in nano using ctrl-s, and exit using ctrl-x. if you don't save changes it will ask you to confirm, which is a bit annoying, so i just ctrl-s every time.

next, we'll set some nice simple base configs for ufw

```sh
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw allow ssh
```

the first two commands disable all incoming traffic (systems trying to connect to your server) and allows all outgoing traffic (your server trying to connect to other systems). we then `enable` the firewall to activate it (it can be useful to `disable` it during debugging) and the we allow `ssh` through the firewall - most systems will require an explicit port to be specified here, but ssh is known to the system and this shorthand can be used instead. whenever we want something to be accessible to other devices, we will need to `allow` it through the firewall.

## storage
if you're not adding storage you can skip this, but i would highly recommend that you wrangle a secondary drive, even if its an old one from a laptop you don't use anymore. the m710q has a spare 2.5 inch bay, which will take a sata ssd or a laptop sized hdd (spinning drive or "platter" drive). ymmv if you used a different computer.

```sh
lsblk
```

this command should return you something that looks a bit like this:

![](/_assets/img/home_server/lsblk.png)

this is an absolute mess, but you should be able to spot your drive in the sd- section. mine in this case is sda2, which i can tell from the listed size of 3.6tb. the drive is actually 4TB, but sizes get weird once the drives are this big - read into [decimal vs binary sizes](https://en.wikipedia.org/wiki/Byte#Multiple-byte_units) if you're interested. now that you know the drive name, you can perform a format to ext4 if necessary. this is also fiddly, so check out [this guide](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux)([local copy](/misc/how_to_partition_and_format_storage_devices_in_linux)) for your particular usecase.

now that the drive is all good to go, we can run lsblk with some extra variables: 

```sh
lsblk -o NAME,FSTYPE,UUID,MOUNTPOINTS
```

you can then find your drive again, and make a note of the FSTYPE and UUID (unique universal id). take note of these elsewhere. note that ctrl-c in the ubuntu terminal is an old shorthand for stopping a piece of software and won't work here - use ctrl-shift-c instead, and not that it works the same for pasting - ctrl-shift-v is your friend. 

make a directory for your drive to be mounted to and do a test mount to make sure it all behaves. this is more or less equivalent to naming a drive in windows, so i normally find a random greek god to use as a name, but you can just call it something like 'storage'. make your new drive under `/mtn/`, as this is the standard location for mounting drives in ubuntu

```sh
# replace 'panacea' with your chosen drive name
sudo mkdir /mnt/panacea 
# replace replace 'sda2' with your drive location from lsblk and 'panacea' with the folder you made in the last step
sudo mount -t ext4 /dev/sda2 /mnt/panacea
```

`mkdir` is used for making a new folder (referred to as directories in ubuntu), and `mount` is for temporarily mounting a drive. annoyingly, this drive will be unmounted on a restart, so we need a more permanent solution.

```sh
sudo nano /etc/fstab
```

fstab is our file system table, and is referenced by the server on boot to put all the drives in their right place. i used [this tutorial](https://developerinsider.co/auto-mount-drive-in-ubuntu-server-22-04-at-startup/#3-edit-fstab)([local copy](/misc/auto_mount_drive_in_ubuntu_server_22_04_at_startup)) to set mine up. you should be able to add a new line to the end of the fstab, along with a comment so future you can figure out what's going on:

```sh
# 4tb drive aka panacea
UUID=xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx /mnt/panacea ext4 defaults 0 0
```

copy your uuid from the earlier step, and add your mount point. once the file is saved, run `findmnt`:

```sh
sudo findmnt --verify
```

`findmnt` will check that your fstab looks valid, because an error in this file can stop your server from booting. if everything comes up good, run a restart on your server using:

```sh
sudo reboot
```

if your server boots again then the first bit of config is over! if not, use `sudo nano /etc/fstab` again and fix the issue. the terminal may be a bit of word soup, but it should still tell you what's wrong with your configuration.
