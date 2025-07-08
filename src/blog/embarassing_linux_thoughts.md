---
title: 'embarassing linux thoughts'
date: 2025-07-08
---

### nobara configuration
i run nobara on a thinkcentre m710q and it works pretty well! but you need to do a little bit of configuration to make it behave on this specific hardware. first up, once you've completed installation you should reboot, jump into tty with ctrl + alt + f2. from here you can log in and check the boot journal with `journalctl -b` and look for errors. there will be some! my process was basically to skim the journal, fix the issues i could, reboot, check, rinse and repeat.

#### update
run a `sudo dnf update` first up to get all the packages up to date

#### enable ssh
openssh should already be installed, but if not grab it with `sudo dnf install openssh-server`. 

```
sudo systemctl enable sshd
sudo systemctl start sshd
```

this'll let us check fix the computer if it starts acting up at boot time

#### weird locale issues
vconsole acts up if your config isn't set to US or has extra nonsense in it, so we need to wipe it and rebuild the boot image with dracut

```
sudo touch ~/vconsole.conf
echo 'KEYMAP="us"' > ~/vconsole.conf
sudo rm /etc/vconsole.conf
sudo mv ~/vconsole.conf /etc/vconsole.conf
sudo dracut -vf
```

#### falcond profile directory
falcond doesn't make a user directory for some reason, so do that here

`sudo mkdir /usr/share/falcond/profiles/user`

#### remove yumex
i simply could not get yumex to behave and it's only useful for installing software if you don't know how to use the terminal, which you clearly do.

`sudo dnf remove yumex`

<!-- i've been using linux part-time for years now! i like to think of myself as pretty level headed about its strengths and weakenesses as someone who actually goes outside and is friends with people who aren't nerds, so i think this 

programs i like
aliases
dotfiles
fedora
servers
docker -->

---

🚧👷‍♂️ this page is still in construction! watch this space! 👷‍♀️🚧
