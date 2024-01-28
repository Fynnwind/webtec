# webtec
All group work and a summary of the web-technologies lecture at THI in the winter semester 2023/24 resides here.

## Structure
```
.
├── README.md
├── SGML
│   ├── example.html
│   ├── example.xml
│   ├── example.xsl
│   ├── external-dtd-example.xml
│   ├── external.dtd
│   ├── internal-dtd-example.xml
│   └── simple.html
├── Virtual-Web-Servers
│   ├── IPbased
│   │   ├── hosts
│   │   └── httpd.conf
│   ├── Namebased
│   │   ├── hosts
│   │   └── httpd.conf
│   └── Portbased
│       ├── hosts
│       └── httpd.conf
├── basic-calculator.html
├── injection-web-proxy.py
├── minimal-web-proxy.py
├── minimal-web-server.py
└── node
    ├── calc
    │   ├── App.js
    │   ├── calc-ajax-rest-client.html
    │   └── calc-rest-server.mjs
    ├── hosts
    ├── minimal-web-proxy.js
    ├── minimal-web-server.js
    └── user-management
        ├── loggedIn-ajax.html
        ├── login-ajax.html
        ├── reset.json
        ├── user-management-ajax-rest-server.js
        ├── user-management-rest-server.js
        └── user.json
```
## Summary

WIP

## Note
- To add node to an OpenBSD system make sure you have root permissions and run `pkg_add node`
- If node throws a package not found exception run `npm install <packagename>`
- In `hosts` files, `./Virtual-Web-Servers/IPbased/httpd.conf`, `./node/calc/App.js` and all files with an `.html` file extension in the `./node` directory one needs to replace `<ipv4address>` accordingly

## Group Work 1
### Task
Implement a tiny webserver that fulfills the following requirements:
- accepts connections on port 80
- no SSL/TLS
- supports only GET on HTTP/1.1
- ignores all headers but the Host header

### Solution
`./minimal-web-server.py`

### Usage
1. Start a shell and run `python minimal-web-server.py`
2. Open a browser and type `localhost:80` into the addressbar
2. Start a second shell and run `curl localhost:80`

## Group Work 2
### Task
Implement a tiny proxy that fulfills the following requirements:
- safe everything that is passed through
- no SSL/TLS

### Solution
`./minimal-web-proxy.py`

### Usage
1. Start a shell and run `python minimal-web-proxy`
2. Start a second shell and run `curl -x localhost:8080 example.com`
3. Repeat step 2 a vew times with diffrent web pages
4. Go back in the first shell and stop the proxy via `ctrl + c`
5. Take a look at the produced files `request.txt` and `response.txt`

## Group Work 3
### Task
1. Create a simple web page in HTML/4.01
2. Create a internal and external DTD for `./SGML/example.xml`
3. Create an XSL to transform `./SGML/example.xml` in HTML/4.01
4. Transform `./SGML/example.xml` using the XSL from 3. and make it an XHTML document

### Solution
`./SGML`
1. `./SGML/simple.html`
2. `./SGML/internal-dtd-example.xml`, `./SGML/external.dtd`, `./SGML/external-dtd-example.xml`
3. `./SGML/example.xsl`
4. `./SGML/example.html`

### Usage
1. Open `./SGML/simple.html` with a browser
2. \-
3. \-
4. Transformation
    1. Go to http://xsltransform.net/ and paste the contents of `./SGML/example.xml` and `./SGML/example.xsl` accordingly
    2. Safe the result with a html file extension e.g. `example.html`
    3. Open `example.html` with a browser
    4. One can transform `example.html` into an XHTML conform document with minor adjustments (should look like `./SGML/example.html`)

## Group Work 4
### Task
Create a simple web page in HTML that provides a basic calculator (supports + - * /) by embedding JavaScript code.

### Solution
`./basic-calculator.html`

### Usage
1. Open `./basic-calculator.html` with a browser

### Addition
One can use a proxy to inject anything into the http response here is an example proxy `./injection-web-proxy.py`. It is based on `./minimal-web-proxy.py` from **Group Work 2** and injects the calculator into an html page served via http.

**Usage:**
1. Start a shell end run `python injection-web-proxy.py`
2. Start a second shell and`curl -x localhost:8080 example.com > modifiedExample.html`
3. Open `./modifiedExample.html` with a browser

## Group Work 5
### Task
Create 2 virtual webservers with httpd within an OpenBSD virtual machine using the following techniques:
1. Name based hosting
2. IP based hosting
3. Port based hosting

### Solution
`./Virtual-Web-Servers`
1. `./Virtual-Web-Servers/Namebased`
2. `./Virtual-Web-Servers/IPbased`
3. `./Virtual-Web-Servers/Portbased`

### Usage
1. Name based hosting
    1. Deploy an OpenBSD virtual machine with one network-adapter in bridge mode
    2. Start a shell inside the vm and run `ifconfig`. The ipv4-address which can be found under em0 will be referred to as `<ipv4address>`
    3. Place `./Virtual-Web-Servers/Namebased/httpd.conf` at `/etc/httpd.conf` within the vm (requires su permissions)
    4. Run `mkdir -p /var/www/site1/www` within the vm (requires su permissions)
    5. Run `mkdir -p /var/www/site2/www` within the vm (requires su permissions)
    6. Run `rcctl enable httpd` within the vm (requires su permissions)
    7. Run `rcctl start httpd` within the vm (requires su permissions)
    8. Start a shell on your host machine and append the contents of `./Virtual-Web-Servers/Namebased/hosts` to `/etc/hosts` (requires su permissions)
    9. Open a browser on your host machine and type `web1.local` into the addressbar
    10. Open a browser on your host machine and type `web2.local` into the addressbar
2. IP based hosting
    1. Deploy an OpenBSD virtual machine with two network-adapters in bridge mode
    2. Start a shell inside the vm and run `ifconfig`. The ipv4-addresss which can be found under em0 and em1 will be referred to as `<ipv4address.em0>`and `<ipv4address.em1>`
    3. Place `./Virtual-Web-Servers/IPbased/httpd.conf` at `/etc/httpd.conf` within the vm (requires su permissions)
    4. Run `mkdir -p /var/www/site1/www` within the vm (requires su permissions)
    5. Run `mkdir -p /var/www/site2/www` within the vm (requires su permissions)
    6. Run `rcctl enable httpd` within the vm (requires su permissions)
    7. Run `rcctl start httpd` within the vm (requires su permissions)
    8. Start a shell on your host machine and append the contents of `./Virtual-Web-Servers/IPbased/hosts` to `/etc/hosts` (requires su permissions)
    9. Open a browser on your host machine and type `web1.local` into the addressbar
    10. Open a browser on your host machine and type `web2.local` into the addressbar
3. Port based hosting
    1. Deploy an OpenBSD virtual machine with one network-adapter in bridge mode
    2. Start a shell inside the vm and run `ifconfig`. The ipv4-address which can be found under em0 will be referred to as `<ipv4address>`
    3. Place `./Virtual-Web-Servers/Namebased/httpd.conf` at `/etc/httpd.conf` within the vm (requires su permissions)
    4. Run `mkdir -p /var/www/site1/www` within the vm (requires su permissions)
    5. Run `mkdir -p /var/www/site2/www` within the vm (requires su permissions)
    6. Run `rcctl enable httpd` within the vm (requires su permissions)
    7. Run `rcctl start httpd` within the vm (requires su permissions)
    8. Start a shell on your host machine and append the contents of `./Virtual-Web-Servers/Namebased/hosts` to `/etc/hosts` (requires su permissions)
    9. Open a browser on your host machine and type `web.local:80` into the addressbar
    10. Open a browser on your host machine and type `web.local:81` into the addressbar

**Note:**
1. One can stop httpd by running `rcctl stop httpd`
2. For added convinience extract the ip-address of the virtual machine (e.g. with `ifconfig`-cmd). Then run `ssh username@ipAddress` on your host machine in order to start a remote shell.
3. You may want to delete anything you appended to `/etc/hosts`.

## Group Work 6
### Task
1. Implement a tiny webserver that supports name based virtual hosting and fulfills the following requirements
2. Implement a tiny proxy that prints all traffic (TODO: ,has a timeout) and fulfills the following requirements
- target system OpenBSD virtual machine
- written in Javascript and running in node.js

### Solution
`./node`
1. `./node/minimal-web-server.js`, `./node/hosts`
2. `./node/minimal-web-proxy.js`

### Usage
1. Tiny webserver
    1. Deploy an OpenBSD virtual machine with one network-adapter in bridge mode
    2. Start a shell inside the vm and run `ifconfig`. The ipv4-address which can be found under em0 will be referred to as `<ipv4address>`
    3. Place `./node/minimal-web-server.js` inside a `directory` of your choice within the vm
    4. Run `node minimal-web-server.js` inside the `directory` within the vm
    5. Start a shell on your host machine and append the contents of `./node/hosts` to `/etc/hosts` (requires su permissions)
    6. Run `curl http://web1.local:8080` on your host machine
    7. Run `curl http://web2.local:8080` on your host machine
    8. Run `curl http://<ipv4address>:8080` on your host machine
2. Tiny webproxy
    1. Deploy an OpenBSD virtual machine with one network-adapter in bridge mode
    2. Start a shell inside the vm and run `ifconfig`. The ipv4-address which can be found under em0 will be referred to as `<ipv4address>`
    3. Place `./node/minimal-web-proxy.js` inside a `directory` of your choice within the vm
    4. Run `node minimal-web-proxy.js` inside the `directory` within the vm
    5. Start a shell on your host machine and run `curl -x <ipv4address>:8080 example.com`
  
## Group Work 7
### Task
Provide a REST-API for the calculator developed in **Group Work 4**

### Solution
`./node/calc`\
`./node/calc/calc-rest-server.js`, `./node/calc/calc-ajax-rest-client.html`

### Usage
1. Deploy an OpenBSD virtual machine with one network-adapter in bridge mode
2. Start a shell inside the vm and run `ifconfig`. The ipv4-address which can be found under em0 will be referred to as `<ipv4address>`
3. Place `./node/calc/calc-rest-server.js` inside a `directory` of your choice within the vm
4. Start a shell inside the vm an run `node rest-api-server.js` inside the `directory` within the vm
5. Start a shell on your host machine and run:
    1. `curl GET http://<ipv4address>:8080/add\?arg1\=1\&arg2\=2`
    2. `curl GET http://<ipv4address>:8080/sub\?arg1\=3\&arg2\=1`
    3. `curl GET http://<ipv4address>:8080/mul\?arg1\=5\&arg2\=3`
    4. `curl GET http://<ipv4address>:8080/div\?arg1\=10\&arg2\=0`

**Note:** One can test the REST-API using `./node/calc/calc-ajax-rest-client.html` within an Browser
1. Place `./node/calc/calc-ajax-rest-client.html` inside the `directory` within the vm
2. Open a browser and type `<ipv4address>:8080` into the addressbar

## Group Work 8
### Task
Provide a REST-API that handles users with the following requirenments:
- register account
- login (creating a session)
- password reset

### Solution
`./node/user-management`\
`./node/user-management/user-management-rest-server.mjs`, `./node/user-management/user.json`, `./node/user-management/reset.json`

### Usage
1. Deploy an OpenBSD virtual machine with one network-adapter in bridge mode
2. Start a shell inside the vm and run `ifconfig`. The ipv4-address which can be found under em0 will be referred to as `<ipv4address>`
3. Place `./node/user-management/user-management-rest-server.mjs` inside a `directory1` of your choice within the vm
4. Start a shell inside the vm an run `node user-management-rest-server.mjs` inside the `directory1` within the vm
5. Place `./node/user.json` and `./node/reset.json` inside a `directory2` of your choice on your host machine
6. Start a shell on your host machine and run the following curls inside the `directory2`:
    1. `curl http://<ipv4address>:8080/users`    (gives you all existing users)
    2. `curl -d @user.json -H "Content-Type: application/json" -X POST http://<ipv4address>:8080/users`     (creates the user specified in `user.json`)
    3. `curl -d @user.json -H "Content-Type: application/json" -X POST http://<ipv4address>:8080/login`     (creates a session for the user specified in `user.json`)
    4. `curl -d @reset.json -H "Content-Type: application/json" -X POST http://<ipv4address>:8080/pwreset`    (sets a new password for the user with the specified `id`)

**Note:** Run the first curl inbetween the others to see the effect of them.

## Group Work 9
### Task
Create a react frontend for the backend `./node/calc/calc-rest-server.mjs` developed in **Group Work 7**

### Solution
`./node/calc/App.js`

### Usage
1. Deploy an OpenBSD virtual machine with one network-adapter in bridge mode
2. Start a shell inside the vm and run `ifconfig`. The ipv4-address which can be found under em0 will be referred to as `<ipv4address>`
3. Place `./node/calc/calc-rest-server.mjs` inside a `directory` of your choice within the vm
4. Start a shell inside the vm an run `node calc-rest-server.mjs` inside the `directory` within the vm
5. Start a shell on your host machine and run  `npx create-react-app calc-rest-frontend` then `cd calculator-frontend`
6. Replace the `./src/App.js` on your host machine with `./node/App.js` from this repo
7. Run `npm start`

## Group Work 10
### Task
Modify `./node/user-management-rest-server.mjs` developed in **Group Work 8** and develop an ajax frontend consisting of an login page and an content page.
The following criterias need to be met
- register account
- login (creating a session)
- logout (destroying a session)
- password reset

### Solution
`./node/user-management`\
`./node/user-management/user-management-ajax-rest-server.mjs`, `./node/user-management/login-ajax.html`, `./node/user-management/loggedIn-ajax.html`

### Usage
1. Deploy an OpenBSD virtual machine with one network-adapter in bridge mode
2. Start a shell inside the vm and run `ifconfig`. The ipv4-address which can be found under em0 will be referred to as `<ipv4address>`
3. Place `./node/user-management/user-management-ajax-rest-server.mjs`, `./node/user-management/login-ajax.html`, `./node/user-management/loggedIn-ajax.html` inside a `directory` of your choice within the vm
4. Start a shell inside the vm and run `node user-management-ajax-rest-server.mjs` inside the `directory` within the vm
5. Open a browser on your host machine and type `http://<ipv4address>:8080/` into the addressbar

**Note:** 
- Start a shell on your host machine and run `curl http://<ipv4address>:8080/users` to print the current database entries
- Registering the same username multiple times can lead to problems 
- This Proof-of-Concept has two major security concerns
    - Session are handeled in the html client not by the browser in form of cookies
    - One can access the content page by calling the API endpoint directly

## Group Work 11
### Task
PHP
