---
title: backup of "how to partition and format storage devices in linux" 
date: 2023-11-06
---

backup of "how to partition and format storage devices in linux" by justin ellingwood, published 5 july 2016. original post is [here](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux)

---

### [Introduction](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#introduction)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#introduction)

Preparing a new disk for use on a Linux system is a straightforward process. There are many tools, filesystem formats, and partitioning schemes that may change the process if you have specialized needs, but the fundamentals remain the same.

This guide will cover the following process:

- Identifying the new disk on the system.
- Creating a single partition that spans the entire drive (most operating systems expect a partition layout, even if only one filesystem is present)
- Formatting the partition with the Ext4 filesystem (the default in most modern Linux distributions)
- Mounting and setting up Auto-mounting of the filesystem at boot

## [Step 1 — Install Parted](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#step-1-install-parted)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#step-1-install-parted)

To partition the drive, you’ll use the `parted` utility. Most of the commands necessary for interacting with a low-level filesystem are available by default on Linux. `parted`, which creates partitions, is one of the only occasional exceptions.

If you are on an Ubuntu or Debian server and do not have `parted` installed, you can install it by typing:

```
sudo apt update
sudo apt install parted
```

If you are on an RHEL, Rocky Linux, or Fedora server, you can install it by typing:

```
sudo dnf install parted
```

Every other command used in this tutorial should be preinstalled, so you can move on to the next step.

## [Step 2 — Identify the New Disk on the System](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#step-2-identify-the-new-disk-on-the-system)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#step-2-identify-the-new-disk-on-the-system)

Before you set up the drive, you need to be able to properly identify it on the server.

If this is a completely new drive, One way to identify it on your server is to look for the absence of a partitioning scheme. If you ask `parted` to list the partition layout of your disks, it will produce an error for any disks that don’t have a valid partition scheme. This can be used to help identify the new disk:

```
sudo parted -l | grep Error
```

You should see an `unrecognized disk label` error for the new, unpartitioned disk:

```
OutputError: /dev/sda: unrecognized disk label
```

You can also use the `lsblk` command and look for a disk of the correct size that has no associated partitions:

```
lsblk
```

```
OutputNAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0   100G  0 disk 
vda    253:0    0    20G  0 disk 
└─vda1 253:1    0    20G  0 part /
```

> **Note:** Remember to check `lsblk` every time you reconnect to your server before making changes. The `/dev/sd*` and `/dev/hd*` disk identifiers will not necessarily be consistent between boots, which means there is some danger of partitioning or formatting the wrong disk if you do not verify the disk identifier correctly.

Consider using more persistent disk identifiers like `/dev/disk/by-uuid`, `/dev/disk/by-label`, or `/dev/disk/by-id`. See our [introduction to storage concepts and terminology in Linux](https://www.digitalocean.com/community/tutorials/an-introduction-to-storage-terminology-in-linux) article for more information.

When you know the name that the kernel has assigned your disk, you can partition your drive.

## [Step 3 — Partition the New Drive](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#step-3-partition-the-new-drive)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#step-3-partition-the-new-drive)

As mentioned in the introduction, you’ll create a single partition spanning the entire disk in this guide.

### [Choose a Partitioning Standard](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#choose-a-partitioning-standard)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#choose-a-partitioning-standard)

To do this, you first need to specify the partitioning standard to use. There are two options: GPT and MBR. GPT is a more modern standard, while MBR is more widely supported among older operating systems. For a typical cloud server, GPT is a better option.

To choose the GPT standard, pass the disk you identified to `parted` with `mklabel gpt`:

```
sudo parted /dev/sda mklabel gpt
```

To use the MBR format, use `mklabel msdos`:

```
sudo parted /dev/sda mklabel msdos
```

### [Create the New Partition](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#create-the-new-partition)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#create-the-new-partition)

Once the format is selected, you can create a partition spanning the entire drive by using `parted -a`:

```
sudo parted -a opt /dev/sda mkpart primary ext4 0% 100%
```

You can break down this command as follows:

- `parted -a opt` runs parted, setting the default **opt**imal alignment type.
- `/dev/sda` is the disk that you’re partitioning.
- `mkpart primary ext4` makes a standalone (i.e. bootable, not extended from another) partition, using the ext4 filesystem.
- `0% 100%` means that this partition should span from the start to the finish of the disk.

For more information, refer to the [manual page](https://linux.die.net/man/8/parted) of Parted.

If you check `lsblk`, you should see the new partition available:

```
lsblk
```

```
OutputNAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0   100G  0 disk 
└─sda1   8:1    0   100G  0 part 
vda    253:0    0    20G  0 disk 
└─vda1 253:1    0    20G  0 part /
```

You now have a new partition created, but it has not yet been initialized as a filesystem. The difference between these two steps is somewhat arbitrary, and unique to the way Linux filesystems work, but they are still two steps in practice.

## [Step 4 — Create a Filesystem on the New Partition](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#step-4-create-a-filesystem-on-the-new-partition)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#step-4-create-a-filesystem-on-the-new-partition)

Now that you have a partition available, you can initialize it as an Ext4 filesystem. Ext4 is not the only filesystem option available, but it is the most straightforward option for a single, standalone Linux volume. Windows uses filesystems like **NTFS** and **exFAT**, but they have limited support on other platforms (meaning that they will be read-only in some contexts, and cannot be used as a boot drive for other operating systems), and macOS uses **HFS+** and **APFS**, with the same caveats. There are also newer Linux filesystems than Ext4, such as **ZFS** and **BTRFS**, but these impose different requirements and they are generally better-suited to multi-disk arrays.

To initialize an Ext4 filesystem, use the `mkfs.ext4` utility. You can add a partition label with the `-L` flag. Select a name that will help you identify this particular drive:

> **Note:** Make sure you provide the path to the partition and not the entire disk. In Linux, disks have names like `sda`, `sdb`, `hda`, etc. The partitions on these disks have a number appended to the end. So you would want to use something like `sda1`, not `sda`.

```
sudo mkfs.ext4 -L datapartition /dev/sda1
```

If you want to change the partition label later on, you can use the `e2label` command:

```
sudo e2label /dev/sda1 newlabel
```

You can see all of the different ways to identify your partition with `lsblk`. You should find the name, label, and UUID of the partition.

Some versions of `lsblk` will print all of this information with the `--fs` argument:

```
sudo lsblk --fs
```

You can also specify them manually with `lsblk -o` followed by the relevant options:

```
sudo lsblk -o NAME,FSTYPE,LABEL,UUID,MOUNTPOINT
```

You should receive output like this. The highlighted output indicate different methods you can use to refer to the new filesystem:

```
OutputNAME   FSTYPE LABEL         UUID                                 MOUNTPOINT
sda                                                              
└─sda1 ext4   datapartition 4b313333-a7b5-48c1-a957-d77d637e4fda 
vda                                                              
└─vda1 ext4   DOROOT        050e1e34-39e6-4072-a03e-ae0bf90ba13a /
```

Make a note of this output, as you’ll use it when mounting the filesystem in the next step.

## [Step 5 — Mount the New Filesystem](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#step-5-mount-the-new-filesystem)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#step-5-mount-the-new-filesystem)

Now, you can mount the filesystem for use.

The [Filesystem Hierarchy Standard](http://refspecs.linuxfoundation.org/fhs.shtml) recommends using the `/mnt` directory or a subdirectory under it for temporarily mounted filesystems (like removable drives). It makes no recommendations on where to mount more permanent storage, so you can choose whichever scheme you’d like. For this tutorial, you’ll mount the drive under `/mnt/data`.

Create that directory using `mkdir`:

```
sudo mkdir -p /mnt/data
```

### [Mounting the Filesystem Temporarily](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#mounting-the-filesystem-temporarily)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#mounting-the-filesystem-temporarily)

You can mount the filesystem temporarily by typing:

```
sudo mount -o defaults /dev/sda1 /mnt/data
```

### [Mounting the Filesystem Automatically at Boot](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#mounting-the-filesystem-automatically-at-boot)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#mounting-the-filesystem-automatically-at-boot)

In order to mount the filesystem automatically each time the server boots, you’ll add an entry to the `/etc/fstab` file. This file contains information about all of your system’s permanent, or routinely mounted, disks. Open the file using `nano` or your favorite text editor:

```
sudo nano /etc/fstab
```

In the last step, you used the `sudo lsblk --fs` command to display identifiers for your filesystem. You can use any of these in this file. This example uses the partition _label_, but you can see what the lines would look like using the other two identifiers in the commented out lines:

##### /etc/fstab

```
. . .
## Use one of the identifiers you found to reference the correct partition
# /dev/sda1 /mnt/data ext4 defaults 0 2
# UUID=4b313333-a7b5-48c1-a957-d77d637e4fda /mnt/data ext4 defaults 0 2
LABEL=datapartition /mnt/data ext4 defaults 0 2
```

Beyond the `LABEL=datapartition` element, these options work as follows:

- `/mnt/data` is the path where the disk is being mounted.
- `ext4` connotes that this is an Ext4 partition.
- `defaults` means that this volume should be mounted with the default options, such as read-write support.
- `0 2` signifies that the filesystem should be validated by the local machine in case of errors, but as a `2`nd priority, after your root volume.

> **Note:** You can learn about the various fields in the `/etc/fstab` file by checking its [man page](https://linux.die.net/man/5/fstab) For information about the mount options available for a specific filesystem type, check `man [filesystem]` (like `man ext4`).

Save and close the file when you are finished. If you are using `nano`, press `Ctrl+X`, then when prompted to confirm, `Y` and then `Enter`.

If you did not mount the filesystem previously, you can now mount it with `mount -a`:

```
sudo mount -a
```

### [Testing the Mount](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#testing-the-mount)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#testing-the-mount)

After you’ve mounted the volume, we should check to make sure that the filesystem is accessible.

You can check if the disk is available in the output from the `df` command. Sometimes `df` will include unnecessary information about temporary filesystems called `tmpfs` in `df` output, which you can exclude by appending `-x tmpfs`:

```
df -h -x tmpfs
```

```
OutputFilesystem      Size  Used Avail Use% Mounted on
/dev/vda1        20G  1.3G   18G   7% /
/dev/sda1        99G   60M   94G   1% /mnt/data
```

You can also check that the disk mounted with read and write capabilities by writing to a test file:

```
echo "success" | sudo tee /mnt/data/test_file
```

Read the file back just to make sure the write executed correctly:

```
cat /mnt/data/test_file
```

```
Outputsuccess
```

You can remove the file after you have verified that the new filesystem is functioning correctly:

```
sudo rm /mnt/data/test_file
```

## [Conclusion](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#conclusion)[](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux#conclusion)

Your new drive should now be partitioned, formatted, mounted, and ready for use. This is the general process you can use to turn a raw disk into a filesystem that Linux can use for storage. There are more complex methods of partitioning, formatting, and mounting which may be more appropriate in some cases, but the above is a good starting point for general use.

Next, you may want to learn [how to use SSHFS to mount remote volumes over SSH](https://www.digitalocean.com/community/tutorials/how-to-use-sshfs-to-mount-remote-file-systems-over-ssh)