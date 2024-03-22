---
title: "home server // game servers"
date: 2024-03-23
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

<img src="https://c.tenor.com/rkI1a8s2Z6QAAAAC/todd-howard-it-just-works.gif" style="display:none;"></img>

### modern minecraft

we'll start by downloading and installing the necessary software:

```
sudo apt install openjdk-19-jre-headless
sudo mkdir /opt/minecraft_1.20.4
cd /opt/minecraft_1.20.4
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
java -Xms4G -Xmx4G -jar /opt/minecraft_1.20.4/server.jar nogui
```

the first command allows connections through your server's firewall, assuming you have ufw configured. if you don't, check out setting it up [here](/blog/home_server__core/#ufw)! if the java version is good and your networking is all fine then you should be able to connect to your server from another device on the network and have a look around

stop the server and open the properties file using `sudo nano /opt/minecraft_1.20.4/server.properties`. add these lines at the bottom - i'll explain them in due course, but they are basically just configuration for managing the server with mcrcon:

```
enable-rcon=true
rcon.port=25575
rcon.password=YOUR_RCON_PASSWORD
```

create a randomised password for YOUR_RCON_PASSWORD and put it in a text editor - it doesnt have to be particularly complicated, but it also doesnt need to be remembered, so just make a random alphanumeric string of 16 characters or so

now that we know that the server behaves, we want to set up a systemd service to make managing it easier - for those unaware, [systemd](https://systemd.io/) is a linux program that helps to manage services on the computer. it's used to run a lot of the software that makes the computer tick, but it can also be leveraged by users to autostart software, make stopping software easy and restart software if it crashes (among many other features). its super feature-rich and while it is a bit intimidating, learning how it works will save you loads of trouble messing with the cron table or some other janky scripting system

we're going to create a new user to run our service, give it permissions to use our `/opt/minecraft_1.20.4` directory, then create a new service file


```
sudo useradd -c "minecraft service 1.20.4 service" -d /opt/minecraft_1.20.4 -s /usr/sbin/noLogin minecraft_1.20.4
sudo chown -R minecraft_1.20.4:minecraft_1.20.4 /opt/minecraft_1.20.4
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
ReadWriteDirectories=/opt/minecraft_1.20.4
WorkingDirectory=/opt/minecraft_1.20.4
ExecStart=/usr/bin/java -Xmx8G -jar server.jar -nogui
ExecStop=/opt/minecraft_1.20.4/mcrcon -H localhost -P 25575 -p YOUR_RCON_PASSWORD stop

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
> ReadWriteDirectories=/opt/minecraft_1.20.4
> WorkingDirectory=/opt/minecraft_1.20.4
```

these lines just make sure that the server is run from inside the same directory as the `server.jar` file. minecraft servers dump all their configuration data and logs in the user's current directory, so this ensures the `server.properties` and other files don't get put somewhere weird

```
> ExecStop=/opt/minecraft_1.20.4/mcrcon -H localhost -P 25575 -p YOUR_RCON_PASSWORD save-all stop
```

ExecStart was pretty self explanatory, the service is just running the same java command we did before, but this ExecStop command is a little unfamiliar. minecraft tends to misbehave when it isnt stopped properly, and mcrcon ensures that all your ports are closed so they can be used by another process. it also allows you to add extra steps to the shutdown, like sending a message with `"say MESSAGE"` (including the quotes) or waiting using the -w option. check [the usage on github](https://github.com/Tiiffi/mcrcon?tab=readme-ov-file#usage)

the rest of the lines are mostly interested in security, and your server would run without them, its just good practice to keep them in

anyway, now that the service is all handled, we need to restart systemd, then spin it up and make sure it doesn't error out on us

```
sudo systemctl daemon-reload
sudo systemctl start minecraft_1.20.4
```

and the first step is done! if you stop here you'll have a minecraft 1.20.4 server that will start when your server starts and will restart itself if it crashes out. you can fiddle with the configuration files that have been created in `/opt/minecraft_1.20.4`, and add mods or replace the server.jar with a custom one if you like

---

### beta minecraft

beta minecraft is slightly more fiddly, but this should be a fair bit quicker since we already know how systemd service files work from the last step. you _do_ understand how systemd service files work now, don't you?

we don't need to get mcrcon or open jre this time so install is a bit simpler:

```
sudo mkdir /opt/minecraft_b1.7.3
cd /opt/minecraft_b1.7.3
sudo wget https://files.betacraft.uk/server-archive/beta/b1.7.3.jar
sudo mv ./b1.7.3.jar server.jar
```

we can use the same ufw rule as before - skip this if you already enabled it in the previous section

```
ufw allow 25565 comment 'minecraft server'
java -Xms4G -Xmx4G -jar /opt/minecraft_b1.7.3/server.jar nogui
```

as before, check the server from a separate device and if it spins up, sweet! time to automate it

```
sudo useradd -c "minecraft service b1.7.3 service" -d /opt/minecraft_b1.7.3 -s /usr/sbin/noLogin minecraft_b1.7.3
sudo chown -R minecraft_b1.7.3:minecraft_b1.7.3 /opt/minecraft_b1.7.3
sudo nano /etc/systemd/system/minecraft_b1.7.3.service
```

when nano opens, insert the following service file:

```
[Unit]
Description=Minecraft Server b1.7.3
After=network.target
Conflicts=minecraft_1.20.4.service

[Service]
WorkingDirectory=/opt/minecraft_b1.7.3

# Solves the issue where the minecraft server will endlessly restart itself
# See https://askubuntu.com/questions/953920/systemctl-service-timed-out-during-start for more info
Type=simple

PrivateUsers=true
# Users Database is not available from within the unit, only root and minecraft is available, everybody else is nobody

User=minecraft_b1.7.3
Group=minecraft_b1.7.3

ProtectSystem=full
# Read only mapping of /usr /boot and /etc

ProtectHome=true
# /home, /root and /run/user seem to be empty from within the unit. It is recommended to enable this setting for all long-running services (in particular network-facing ones).

ProtectKernelTunables=true
# /proc/sys, /sys, /proc/sysrq-trigger, /proc/latency_stats, /proc/acpi, /proc/timer_stats, /proc/fs and /proc/irq will be read-only within the unit. It is recommended to turn this on for most services.
# Implies MountFlags=slave

ProtectKernelModules=true
# Block module system calls, also /usr/lib/modules. It is recommended to turn this on for most services that do not need special file systems or extra kernel modules to work
# Implies NoNewPrivileges=yes

ProtectControlGroups=true
# It is hence recommended to turn this on for most services.
# Implies MountAPIVFS=yes

# Set default memory values
Environment="MCMINMEM=512M" "MCMAXMEM=8G" "SHUTDOWN_DELAY=5" "POST_SHUTDOWN_DELAY=10"
# Change memory values in environment file
EnvironmentFile=-/opt/minecraft_b1.7.3/server.conf

# Uncomment this to fix screen on RHEL 8
#ExecStartPre=+/bin/sh -c 'chmod 777 /run/screen'

ExecStartPre=/bin/sh -c '/usr/bin/screen -dmS minecraft_b1.7.3'
ExecStart=/bin/sh -c '/usr/bin/java -server -Xmx${MCMAXMEM} -Xms${MCMINMEM} -jar server.jar --nogui'

ExecReload=/usr/bin/screen -p 0 -S minecraft_b1.7.3 -X eval 'stuff "reload"\\015'

ExecStop=/usr/bin/screen -p 0 -S minecraft_b1.7.3 -X eval 'stuff "say SERVER SHUTTING DOWN. Saving map..."\\015'
ExecStop=/bin/sh -c '/bin/sleep ${SHUTDOWN_DELAY}'
ExecStop=/usr/bin/screen -p 0 -S minecraft_b1.7.3 -X eval 'stuff "save-all"\\015'
ExecStop=/usr/bin/screen -p 0 -S minecraft_b1.7.3 -X eval 'stuff "stop"\\015'
ExecStop=/bin/sh -c '/bin/sleep ${POST_SHUTDOWN_DELAY}'

Restart=on-failure
RestartSec=60s

[Install]
WantedBy=multi-user.target
```

the guts of this are the same but it's obviously a bit different. first and foremost, thanks to [the minecraft wiki for this script](https://minecraft.wiki/w/Tutorials/Server_startup_script). reading it has made me aware that you can set these more complex multiple-minecraft-server systems up a bit more elegantly, but this works for now. notably, rcon isn't supported by beta versions of minecraft, so we need to use screen instead. it's a bit more prone to issues, but this setup has given me the most stable results. we also have `Conflicts=minecraft_1.20.4.service`, which works the same way as the previous service, but in reverse. as before, spin the service up and check it behaves correctly

```
sudo systemctl daemon-reload
sudo systemctl start minecraft_b1.7.3
```
if you want one of your servers to start automatically when ubuntu box boots up, enable it with systemd:


```
sudo systemctl enable minecraft_1.20.4

OR

sudo systemctl enable minecraft_b1.7.3
```

don't do both because they'll fight for port 25565. note that if you _did_ want to run both, you could go into the `server.properties` file for that server and change the `server-port` property to an available port number; just note that you will need to specify this new port when joining the server, as the client will automatically assume 25565 otherwise

---

### systemctl-bot

now this is where the fun begins. i wanted to be able to let my friends swap servers and allow myself to turn them off without having to pop open ssh. my first thought was to make a discord bot, obviously, but thanks to the wonders of open source software, someone had already done it for me! forrestjacobs on github has made [systemctl-bot](https://github.com/forrestjacobs/systemctl-bot), and the description hilariously describes my exact dilemma. nice! their setup instructions are all on the github page, but i'll go through them anyway - it might help with troubleshooting if you run into any issues

first up, make a discord bot here: [discord.com/developers/applications](https://discord.com/developers/applications) 

in the main section (general information), add a name, icon and copy down the application id 

![](/_assets/img/home_server/bot_auth.png)

make sure to save your changes! next, navigate to bot in the menu on the left side. tutorials have said that you need to activate the bot but i haven't actually seen any settings for that - they seem to be activated automatically. in any case, reset and copy down the bot token.

![](/_assets/img/home_server/bot_token.png)

finally, head to oauth2 on the left side menu, scroll all the way to the bottom, select "bot" and "applications.commands" and copy the url it generates

![](/_assets/img/home_server/bot_oauth.png)

finally, head to your discord server, right click on it and select "copy server id"

![](/_assets/img/home_server/server_id.png)

thats all the big long numbers handled 👍 time to make a config file. run `sudo nano /etc/systemctl-bot.toml` and insert this into it

```
application_id = <APPLICATION ID>
guild_id = <SERVER ID>
discord_token = "<DISCORD TOKEN>"

# Create a [[units]] section for each unit you want to control from Discord
[[units]]
name = "minecraft_b1.7.3"
permissions = ["start", "stop", "status"]

[[units]]
name = "minecraft_1.20.4"
permissions = ["start", "stop", "status"]
```

you can add any services to this list that you are interested in, and you can restrict the permissions so you can stop users from killing a service, or only allow them to check its status (for example). next up, we'll download and build the bot

```
sudo apt install cargo
cd /srv
sudo git clone https://github.com/forrestjacobs/systemctl-bot.git
cd systemctl-bot
sudo cargo build --release
```

at this point, try following the oauth2 link you generated before and adding the bot to the server you got the server ("guild") id you grabbed before. note that the bot will only work with a single server for security. once the bot has been added to your server run `/srv/systemctl-bot/target/release/systemctl-bot` and test the bot works via discord. if something is wrong with the build or the configuration the bot will tell you in your terminal, and while rust errors arent the most simple you should be able to dig through them to find the source of the issue. i misconfigured my bot three times in a row before i managed to get it running

once the bot is working we'll add a new service user with `sudo useradd -c "systemctl discord bot" -d /srv/systemctl-bot/ systemctl-bot` and create a new systemd service file with `sudo nano /etc/systemd/system/systemctl-bot.service`. enter the following text in that file:

```
[Unit]
Description=systemctl discord bot
After=network.target

[Service]
Type=simple
User=systemctl-bot
ExecStart=/srv/systemctl-bot/target/release/systemctl-bot
WorkingDirectory=/srv/systemctl-bot/target/release
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

finally, enter these commands to enable the bot and open up your polkit settings for service authentication:

```
sudo systemctl enable systemctl-bot.service
sudo systemctl start systemctl-bot.service
sudo nano /etc/polkit-1/localauthority/50-local.d/service-auth.pkla
```

entering these settings in the pkla file:

```
[Allow system-ctl to start/stop/restart services]
Identity=unix-user:systemctl-bot
Action=org.freedesktop.systemd1.manage-units
ResultActive=yes
ResultAny=yes
ResultInactive=yes
```

this final setting is the kicker that will allow your bot to freely start and stop systemd services - it's way safer than adding it to sudoers and much more simple once you know where you should be looking.

and that's it! you can add further servers by installing a game server from steamcmd or a standalone, creating a secure service user, creating a systemd service file, before finally adding it to the conflict lists in the other service files and the systemctl-bot config. it's a bit of a fiddle but if it's all set up properly, It Just Works™

![](https://c.tenor.com/rkI1a8s2Z6QAAAAC/todd-howard-it-just-works.gif)