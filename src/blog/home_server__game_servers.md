---
title: "home server // game servers"
date: 2024-03-16
---

i had some big plans of writing all my home server guides in one big string when i did the first one, but it turns out that these actually take a really long time - so long that i've actually bought a second thinkcentre and started using it for hosting game servers! two key things i wanted to do with this box (which i think are actually worth sharing because they were a bit of a fiddle) were to run a server for minecraft beta 1.7.3, and to set up a system for switching between different servers without having to connect to the box with ssh - i'll go over both, as well as running a normal modern version of minecraft

### what's on the menu
#### entree
\- [core setup](/blog/home_server__core)  
#### mains
\- media streaming  
\- cloud storage  
#### dessert
\- discord bot  
\- [game server hosting]()  

---

### modern minecraft

we'll start by downloading and installing the necessary software:

```
sudo apt install openjdk-19-jre-headless
sudo mkdir /srv/minecraft_1.20.4
cd /srv/minecraft_1.20.4
sudo wget https://piston-data.mojang.com/v1/objects/8dd1a28015f51b1803213892b50b7b4fc76e594d/server.jar
sudo wget https://github.com/Tiiffi/mcrcon/releases/download/v0.7.2/mcrcon-0.7.2-linux-x86-64.tar.gz
sudo tar -xvzf mcrcon-0.7.2-linux-x86-64.tar.gz
sudo rm -f mcrcon-0.7.2-linux-x86-64.tar.gz
sudo mv LICENSE MCRCON_LICENSE
```

if there's an issue you can get the latest version of openjdk headless with `sudo apt search openjdk jre headless` and the latest version of the minecraft server at [www.minecraft.net/en-us/download/server](https://www.minecraft.net/en-us/download/server)

test the server by running:

```
ufw allow 25565 comment 'minecraft server'
java -Xms4G -Xmx4G -jar /srv/minecraft_1.20.4/server.jar nogui
```

the first command allows connections through your server's firewall, assuming you have ufw configured. if you don't, check out setting it up [here](/blog/home_server__core/#ufw)! if the java version is good and your networking is all fine then you should be able to connect to your server from another device on the network and have a look around

stop the server and open the properties file using `sudo nano /srv/minecraft_1.20.4/server.properties`. add these lines at the bottom - i'll explain them in due course, but they are basically just configuration for managing the server with mcrcon:

```
enable-rcon=true
rcon.port=25575
rcon.password=YOUR_RCON_PASSWORD
```

create a randomised password for YOUR_RCON_PASSWORD and put it in a text editor - it doesnt have to be particularly complicated, but it also doesnt need to be remembered, so just make a random alphanumeric string of 16 characters or so

now that we know that the server behaves, we want to set up a systemd service to make managing it easier - for those unaware, [systemd](https://systemd.io/) is a linux program that helps to manage services on the computer. it's used to run a lot of the software that makes the computer tick, but it can also be leveraged by users to autostart software, make stopping software easy and restart software if it crashes (among many other features). its super feature-rich and while it is a bit intimidating, learning how it works will save you loads of trouble messing with the cron table or some other janky scripting system

we're going to create a new user to run our service, give it permissions to use our `/srv/minecraft_1.20.4` directory, then create a new service file


```
sudo useradd -c "minecraft service 1.20.4 service" -d /srv/minecraft_1.20.4 -s /usr/sbin/noLogin minecraft_1.20.4
sudo chown -R minecraft_1.20.4:minecraft_1.20.4 /srv/minecraft_1.20.4
sudo nano /etc/systemd/system/minecraft_1.20.4.service
```

when nano opens, enter this configuration:
```
[Unit]
Description=minecraft 1.20.4 server
Documentation=

Wants=network.target
After=network.target
Conflicts=minecraft_b1.7.3.service

[Service]
User=minecraft_1.20.4
Group=minecraft_1.20.4
Nice=5
KillMode=none
SuccessExitStatus=0 1

ProtectHome=true
ProtectSystem=full
PrivateDevices=true
NoNewPrivileges=true
PrivateTmp=true
InaccessibleDirectories=/root /sys /var -/opt /media -/lost+found
ReadWriteDirectories=/srv/minecraft_1.20.4
WorkingDirectory=/srv/minecraft_1.20.4
ExecStart=/usr/bin/java -Xmx8G -jar server.jar -nogui
ExecStop=/srv/minecraft_1.20.4/mcrcon -H localhost -P 25575 -p YOUR_RCON_PASSWORD stop

[Install]
WantedBy=multi-user.target
```

i understand that this is a _lot_ but i'll go through the key lines that are maybe less obvious:

```
> Wants=network.target
> After=network.target
```
these lines make sure that the network is connected before starting the server, which will keep it from whinging in the logs

```
> Conflicts=minecraft_b1.7.3.service
```

this line is used to make sure our poor little pc doesnt have two servers running at the same time. our next server will have a similar line, and they both basically make sure that if this service gets started, the conflicting services get stopped

```
> User=minecraft_1.20.4
> Group=minecraft_1.20.4
```

these lines just specify the user that's going to run the service (our previously created user). this is pretty standard security, because if the minecraft server gets hijacked due to some kind of exploit, it should only be able to perform actions that the minecraft_1.20.4 user can perform, and that user has been given a very narrow area to work in and very minimal permissions

```
> ReadWriteDirectories=/srv/minecraft_1.20.4
> WorkingDirectory=/srv/minecraft_1.20.4
```

these lines just make sure that the server is run from inside the same directory as the `server.jar` file. minecraft servers dump all their configuration data and logs in the user's current directory, so this ensures the `server.properties` and other files don't get put somewhere weird

```
> ExecStop=/srv/minecraft_1.20.4/mcrcon -H localhost -P 25575 -p YOUR_RCON_PASSWORD save-all stop
```

ExecStart was pretty self explanatory, the service is just running the same java command we did before, but this ExecStop command is a little unfamiliar. minecraft tends to misbehave when it isnt stopped properly, and mcrcon ensures that all your ports are closed so they can be used by another process. it also allows you to add extra steps to the shutdown, like sending a message with `"say MESSAGE"` (including the quotes) or waiting using the -w option. check [the usage on github](https://github.com/Tiiffi/mcrcon?tab=readme-ov-file#usage)

the rest of the lines are mostly interested in security, and your server would run without them, its just good practice to keep them in

anyway, now that the service is all handled, we need to restart systemd, then spin it up and make sure it doesn't error out on us

```
sudo systemctl daemon-reload
sudo systemctl enable minecraftserver
sudo systemctl start minecraftserver
```

and the first step is done! if you stop here you'll have a minecraft 1.20.4 server that will start when your server starts and will restart itself if it crashes out. you can fiddle with the configuration files that have been created in `/srv/minecraft_1.20.4`, and add mods or replace the server.jar with a custom one if you like

---

🚧👷‍♂️ this page is still in construction! watch this space! 👷‍♀️🚧