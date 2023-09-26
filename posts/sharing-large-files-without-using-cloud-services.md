---
title: Sharing Large Files Without Using Cloud Services
date: 2023-09-26
description: If you ever had to share large files but you run out of space on your cloud storage this article might come in handy.
categories:
  - NodeJS
  - JavaScript
  - Bun
---

The other day I had to share a large file with my niece but I have run out of space on G Drive and Dropbox and I didn't want to delete any of the files there. So I decided to spin an Express static server and allow her to download the file directly from my computer.

First I had to start the project:

```bash
mkdir file-share-server
cd file-share-server
npm init -y
npm install express
```

After I had the project set up I have copy-pasted the example code for ['hello world'](https://expressjs.com/en/starter/hello-world.html) and [the static files middleware](https://expressjs.com/en/starter/static-files.html) from the Express documentation in `index.js` file in the root of the project:

```js
// index.js

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('files'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)
```

Next I have added a start script and in the `package.json` and also `postinstall` script creating `files` folder in the root of the project (files will be served from this folder):

```json
 "scripts": {
    "start": "node index.js",
    "postinstall": "mkdir -p files"
  }
```

To make the server serve my needs I had to add a few variables. First since this server will be public and without authentication I wanted to generate random string that will be placed in the endpoint and will prevent people from accessing any resources if they don't have the correct url. I also want to have the url generated based on my IP given to me from my ISP. And I will also change the port to something less widely used.

This is the server code after the changes:

```js
// index.js

const express = require('express')
const crypto = require('crypto')

const app = express()
const SECRET = crypto.randomBytes(32).toString('hex')
const PORT = 8008
const IP = 'Change with your ISP IP'

app.use(`/${SECRET}`, express.static('files'))

// Just for testing server is running
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT)

console.log(`
  Link to file you want ot share will be:
  http://${IP}:${PORT}/${SECRET}/full-name-of-file-you-want-to-share-including.extension\n
  Make sure file is in ./files folder
`)
```

With the server ready I had to find what is my IP and replace the `IP` variable. Google 'what is my ip' to find what is yours.

Next I had to set port forwarding in my router in order to redirect calls to port `8008` to my machine. To find what is your local IP on Mac or Linux run the following command in the console:

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d " " -f 2 | head -n 1
```

On Widows it should be in Settings > Network & Internet > Ethernet > IPv4 / IPv6 address

With the server running and the router set to redirect requests on port `8008` to your machine you can place files in the `files` folder and share them with anyone.

I should point out that Google prevents links to be open in Chrome because it is a http server. But downloads were successful with Edge and Firefox.

I recommend shutting down the server and removing/ disabling port forwarding in your router after you are done sharing.

You can get the code for this project from [github](https://github.com/raditotev/file-share-server).

I have also created another version using Bun instead of NodeJS. Find it here: https://github.com/raditotev/file-share-server-with-bun

I
