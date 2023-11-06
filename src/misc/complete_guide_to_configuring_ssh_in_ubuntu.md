---
title: backup of "complete guide to configuring ssh in ubuntu" 
date: 2023-11-06
---

backup of "complete guide to configuring ssh in ubuntu" by chris patrick carias stas. original post is [here](https://itsfoss.com/set-up-ssh-ubuntu/)

---

SSH has become the default method of accessing a remote Linux server these days.

SSH stands for Secure Shell and it’s a powerful, efficient, and popular network protocol used to establish communication between two computers in a remote fashion. And let’s not forget the secure part of its name; SSH encrypts all traffic to prevent attacks like hijacking and eavesdropping while offering different authentication methods and a myriad of configuration options.

In this beginner’s guide, you’ll learn:
- The basic concept of SSH
- Setting up SSH server (on the system you want to access remotely)
- Connecting to remote server via SSH from the client machine (your personal computer)

### The absolute basics of SSH

Before you see any configuration process, it will be better to go through the absolute basic concept of SSH.

The SSH protocol is based on server-client architecture. The “server” allows the “client” to be connected over a communication channel. This channel is encrypted and the exchange is governed by the use of public and private SSH keys.

![](/_assets/img/unlisted/complete_guide_ssh/ssh.jpg)
Image credit: [SSH](https://www.ssh.com/academy/ssh?ref=itsfoss.com)

[OpenSSH](https://www.openssh.com/?ref=itsfoss.com) is one of the most popular open source tools that provides the SSH functionality on Linux, BSD and Windows.

For a successful SSH set up, you need to:
- Have SSH server components on the machine that acts as the server. This is provided by **openssh-server** package.
- Have SSH client component on the machine from where you want to connect to the remote server machine. This is provided by **openssh-client** package and most Linux and BSD distributions come preinstalled with it.

It is important to keep a distinction between the server and client. You might not want your personal computer to act as SSH server unless you have good reasons where you want others to connect to your system via SSH.

Generally, you have a dedicated system working as the server. For example, a [Raspberry Pi running Ubuntu server](https://itsfoss.com/install-ubuntu-server-raspberry-pi/). You [enable SSH on the Raspberry Pi](https://itsfoss.com/ssh-into-raspberry/) so that you could control and manage the device from your main personal computer using SSH in a terminal.

With that information, let’s see how you can set up a SSH server on Ubuntu.

# Configuring SSH Server on Ubuntu
Setting up SSH is not complicated and just needs a few steps to do it.

### Prerequisites
- A user with sudo privileges on the server machine
- Internet connection to download the required packages
- At least another system in your network. It can be another computer on your LAN, a remote server via Internet, or a virtual machine hosted in your computer.

> *Again, the SSH server installation should be done on the system that you want to act as a server and to which you want to connect remotely via SSH.*

### Step 1: Install required packages
Let’s start by opening a terminal window to enter the necessary commands.

Remember to [update your Ubuntu system](https://itsfoss.com/update-ubuntu/) before installing new packages or software with to make sure that you are running the latest versions.

```sh
sudo apt update && sudo apt upgrade 
```

The package you need to run SSH Server is provided by openssh-server component from OpenSSH:

```sh
sudo apt install openssh-server
```

![](/_assets/img/unlisted/complete_guide_ssh/installing.jpg)

### Step 2: Checking the status of the server

Once the downloading and installation of the package is done the SSH service should be already running, but to be sure we will check it with:

```sh
service ssh status
```

You may also use the systemd commands:

```sh
sudo systemctl status ssh
```

You should see something like this, with the word Active highlighted. Hit `q` to return to the command prompt.

![](/_assets/img/unlisted/complete_guide_ssh/checking.jpg)

If in your case the service is not running you will have to activate like this:

```sh
sudo systemctl enable --now ssh
```

### Step 3: Allowing SSH through the firewall
Ubuntu comes with a firewall utility called [UFW](https://itsfoss.com/set-up-firewall-gufw/) (UncomplicatedFirewall) which is an interface for iptables that in turn manages the network’s rules. If the firewall is active, it may prevent the connection to your SSH Server.

To [configure UFW](https://itsfoss.com/ufw-ubuntu/) so that it allows the wanted access, you need to run the following command:

```sh
sudo ufw allow ssh
```

The status of UFW can be checked running `sudo ufw status``.

At this time our SSH Server is up and running, just waiting for a connection from a client.

### Connecting to the remote system from your local machine
Your local Linux system should already have an SSH client installed. If not, you may always install it using the following command on Ubuntu:

```sh
sudo apt install openssh-client
```

To connect to your Ubuntu system you need to know the IP address of the computer and use the ssh command, like this:

```sh
ssh username@address 
```

Change *username* to your actual user in the system and *address* to the IP address of your Ubuntu machine.

If you don’t [know the IP address of your computer](https://itsfoss.com/check-ip-address-ubuntu/) you can type `ip a` in the terminal of the server and check the output. You should have something like this:

![](/_assets/img/unlisted/complete_guide_ssh/find_ip.jpg)
Using “ip a” to find the IP address

As can be seen here my IP address is *192.168.1.111*. Let’s try connecting using the *username@address* format.

```sh
ssh team@192.168.1.111
```

The first time you connect to a SSH server, it will ask for permission to add the host. Type `yes` and hit Enter to continue.

![](/_assets/img/unlisted/complete_guide_ssh/connecting.jpg)
First time connecting to the server

Immediately SSH tells you that the host was permanently added and then asks for the password assigned to the username. Type in the password and hit Enter one more time.

![](/_assets/img/unlisted/complete_guide_ssh/password.jpg)
Host added, now type in the password

And voila! You will be logged into your Ubuntu system remotely!

![](/_assets/img/unlisted/complete_guide_ssh/connected.jpg)
Connected!

Now you can work in your remote system’s terminal as normal.

### Closing the SSH connection
To close the connection you just need to type exit and it will close it at once, without asking for confirmation.

![](/_assets/img/unlisted/complete_guide_ssh/exit.jpg)
Closing the connection with “exit”

### Stopping and Disabling SSH in Ubuntu
If you want to stop SSH service you will need this command:

```sh
sudo systemctl stop ssh
```

This will stop the service until you restart it or until the system is rebooted. To restart it, type:

```sh
sudo systemctl start ssh
```

Now, if you want to disable it from starting during system boot, use this:

```sh
sudo systemctl disable ssh
```

This won’t stop the service from running during the current session, just from loading during startup. If you want to let it start again during system boot, type:

sudo systemctl enable ssh

### Other SSH clients

The tool ssh is included in most *nix systems, from Linux to macOS, but those are not the only options in existence, here are a couple of clients that can be used from other operating systems:
- [PuTTY](https://www.putty.org/?ref=itsfoss.com) is a free and open source SSH client which is hugely popular among Windows users. You can also [install PuTTY on Ubuntu](https://itsfoss.com/putty-linux/). It’s full of features and very easy to use. If you are connecting to your Ubuntu machine from a Windows station, PuTTY is a great option.
- [JuiceSSH](https://juicessh.com/?ref=itsfoss.com) is an amazing tool for Android users. If you are on the go and need a mobile client to connect to your Ubuntu system, I amply recommend giving JuiceSSH a go. It’s been around for almost 10 years and it’s free to use.
- And finally, [Termius](https://termius.com/?ref=itsfoss.com) is available for Linux, Windows, macOS, iOS, and Android. It has a free tier version and also several premium options. If you are running a lot of servers and working with teams sharing connections then Termius is a good option for you.

### Wrapping Up

With these instructions, you can set up SSH as a server service in our Ubuntu systems to be able to connect remotely and securely to your computer in order to work with the command line and perform any required task.

Our other website, Linux Handbook, has various informational articles on SSH. From here, I recommend reading the following:
- [Getting started with SSH on Linux](https://linuxhandbook.com/ssh-basics/?ref=itsfoss.com)
- [Using SSH Config file to manage multiple SSH connections](https://linuxhandbook.com/ssh-config-file/?ref=itsfoss.com)
- [Adding public key to SSH server for password less authentication](https://linuxhandbook.com/add-ssh-public-key-to-server/?ref=itsfoss.com)
- [SSH hardening tips](https://linuxhandbook.com/ssh-hardening-tips/?ref=itsfoss.com) to secure your SSH server

If you find it overwhelming, Linux [Handbook has a premium video course that explains SSH for beginners](https://linuxhandbook.com/sshcourse/?ref=itsfoss.com) along with hands-on labs to follow. This will give you a more streamlined knowledge of the topic.

Happy remote working!