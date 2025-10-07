---
title: 'embarassing linux thoughts'
date: 2025-10-08
---

### nobara configuration (2025-07-08)
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

---

### cobalt-web (2025-10-08)
this sort of deserves to be in its own self-hosted section, but i want to get it out now instead of waiting for that to happen. cobalt is a very slick website that packages up a bunch of media download tools into a simple search-like interface. it's very convenient, and while they say they don't save any of your searches (and they probably don't) you can be certain of the fact by just self-hosting the thing. unfortunately, about a year ago (~ september 2024) they took the web-element of the self-hosted program offline, saying that you can just link your own api to their website, or self-host the website yourself with a reverse proxy. i've read through the discussion and i _sort of_ get it, but i also don't know why they would say "this is a problem with the website is served via docker, instead of fixing it, or highlighting that it's an issue, we're just going to undermine the point of self-hosting and remove the functionality altogether". bizarre. anyway, here's my current cobalt docker-compose. it uses cobalt 7, which still provides a webapp. i'm going to do some more digging and see if i can use the most recent version of the api with the old web container, but i haven't got that quite work yet. make sure to update the urls with your server's local ip!

```yml
services:
  cobalt-api:
    image: ghcr.io/imputnet/cobalt:7
    restart: unless-stopped
    container_name: cobalt-api
    init: true
    ports:
      - 9002:9000/tcp
    environment:
      API_URL: "http://192.168.0.2:9002"
      API_NAME: "api"
    labels:
      - com.centurylinklabs.watchtower.scope=cobalt
  cobalt-web:
    image: ghcr.io/imputnet/cobalt:7
    restart: unless-stopped
    container_name: cobalt-web
    init: true
    ports:
      - 9001:9001/tcp
    environment:
      WEB_URL: "192.168.0.2:9001"
      API_URL: "http://192.168.0.2:9002"
    labels:
      - com.centurylinklabs.watchtower.scope=cobalt
  watchtower:
    image: ghcr.io/containrrr/watchtower
    restart: unless-stopped
    command: --cleanup --scope cobalt --interval 900 --include-restarting
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

<!-- i've been using linux part-time for years now! i like to think of myself as pretty level headed about its strengths and weakenesses as someone who actually goes outside and is friends with people who aren't nerds, so i think this 

programs i like
aliases
dotfiles
fedora
servers
docker -->

---

🚧👷‍♂️ this page is still in construction! watch this space! 👷‍♀️🚧
