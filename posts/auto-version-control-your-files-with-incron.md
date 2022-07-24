---
title: Auto Version Control Your Files with incron
date: 2022-07-24
description: Read this article if you want to trigger git push to remote repo when files change in a specified location.
categories:
  - devops
  - github
---

This article's intention is to provide instructions on setting auto version control for a given location. If you want to learn more about `incron` I suggest you visit the [official page](https://inotify.aiken.cz/?section=incron&page=doc&lang=en) and [github](https://github.com/ar-/incron).

To follow along I have prepared a `Dockerfile` you can use to build an image, you can then use to spin a container:  
ℹ️ you should have [Docker](https://docs.docker.com/get-docker/) installed

```dockerfile
FROM ubuntu:22.04
RUN apt-get update
RUN apt-get -y install incron
RUN apt-get -y install git
```

After you save the file run the following:

```bash
# Create image
docker build -t auto-version-control-demo .
#Start and enter in container
docker run -it --entrypoint bash auto-version-control-demo
```

I've given my image the name of `auto-version-control-demo`, you can call yours whatever you like.

By now you are already in the running container, `incron` is installed and you just have to update `/etc/incron.allow` before starting the service:

```bash
echo 'root' >> /etc/incron.allow
```

Now you can start the service:

```bash
/etc/init.d/incron start
* Starting File system events scheduler
```

Your `incron` service is running now. You can confirm by:

```bash
/etc/init.d/incron status
* incron is running
```

After the start of the service we have to create a new entry for the `root` user. Currently there are none:

```bash
incrontab -l
no table for root
```

To create new entry we need the following:

```bash
<path>  <mask>  <command>
```

Where `path` is the location of the file or folder on the machine we want to monitor, the `mask` is the event we want to listen for and the `command` is the action we want to apply. In this demo we want to monitor the `/cdn/content` folder. The events we want to listen for are `IN_MODIFY`, `IN_CREATE`, `IN_DELETE`, `IN_MOVE` and we want to run the commands from a bash script which we'll call `cdn-auto-version.sh` and place in the `/` root folder. The content of the `cdn-auto-version.sh` will be:

```bash
#!/bin/bash

PROJECT_FOLDER=/cdn/content

cd $PROJECT_FOLDER
git pull
git add .
git commit -m "Updated on $(date +'%d-%m-%y') at $(date +'%T') UTC"
git push
```

Next we have to make the script, executable. Make sure you're in the root folder:

```bash
cd /
chmod 755 cdn-auto-version.sh
```

ℹ️ You will also have to add ssh keys in `/.ssh` for the repository you will be working with. I am not going to touch on this in the article but there is plenty of material in Google on how to do this.

With all this done we are ready to create our `incrontab` entry. Execute:

```bash
incrontab -e
```

This will open the vim text editor. Press the `i` key an paste:

```bash
/cdn/content IN_MODIFY,IN_CREATE,IN_DELETE,IN_MOVE /cdn-auto-version.sh
```

Hit `Esc` and then type `:x` and `Enter`. This will save your changes:

```bash
table updated
```

To ensure you have updated the table:

```bash
incrontab  -l
/cdn/content	IN_MODIFY,IN_CREATE,IN_DELETE,IN_MOVE	/cdn-auto-version.sh
```

With this `/cdn/content` will automatically update the remote repo you've set up every time there are changes to the files or folders within.

I have used this post as a reference on how to set up and work with `incron`:  
<https://www.geeksforgeeks.org/incron-command-in-linux-with-examples/>
