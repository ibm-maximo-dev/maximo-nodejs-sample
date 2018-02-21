# maximo-nodejs-app

### Overview

Use these files to take advantage of Maximo APIs to create, read, update, and delete (CRUD) a work order in Maximo Asset Management. The `server.js` file contains all of the CRUD routes that are individually broken out into their own .js docs.

This sample uses the [Maximo REST APIs for NodeJS](https://github.com/ibm-maximo-dev/maximo-nodejs-rest-client).

### Prerequisites

To use this application, you need to:
* Ensure Node is installed. This app was made with Node v6.11.2, and most recently tested with v8.9.4.
	* Via the command line, you can check with:
	```
	$ node -v
	```
	
* Have an instance of Maximo Asset Management 7.6 running

### Getting started

* Download the JavaScript files and the package.json file that are found in this repository. If you can't use clone, just download the files into one folder. 

	```
	$ git clone git@github.com:ibm-maximo-dev/maximo-nodejs-sample.git
	```

* Install the dependencies 

	```
	$ cd maximo-nodejs-sample
	$ npm install
	```

## Using the application

This sample shows how to use the NodeJS apis by starting a local web server, and then allowing you to interact with that server using a browser.  It is recommended that you use Google Chrome and that you have the [JSON Formatter Plugin](https://github.com/callumlocke/json-formatter) installed.

This sample does not have a web UI, but rather, the browser is used a means to interact with the NodeJS sample code.

#### Launch server.js

Launch the server.js file from a terminal window. The following *optional* arguments are for making the connection to the Maximo server: `hostname` `(-h)`, `port` `(-p)`, `user` `(-u)`, `password` `(-w)`, and `islean` `(-l)`. Note that the defaults for each of these values can be changed in the `server.js` file. Also double check that you **do not** include "http://" on your host name when you try to connect.

```
$ node server.js -h qasite.swg.usma.ibm.com -p 9080 -u username -w password -l 1
```
If you have errors returned in the console to you at this point, try upgrading your version of Node. Also double check that your Maximo connection details are correct, that you have authenticated past any necessary firewalls, and that your Maximo server is up and running.

If the server started, you'll seem an ouput in the console, similar to

```bash
Maximo Node API server is running on port 3000
API version is v1
```

#### Launch your browser
 
Launch your browser with the localhost at the port in the file (default set in server.js is 3000) with a route you would like to run. A good first route to test is /authenticate. If non-empty {} are returned in your browser and no errors are in the console, then you are on the right track.

```
http://localhost:3000/api/v1/authenticate
```
In Google Chrome, you'll seen a response in the browser, similar to
```json
{"set-cookie":["JSESSIONID=0000hOzOiWThIS0tIFXfuMC8I01:-1; Path=/; HttpOnly"]}
```

Notes about the routes:
* The suggested order to run the routes is `/authenticate`, `/create_WO`, `/read_1_WO`, `/update_WO`, and `/delete_WO`.
* To run `read_1_WO` without an error, the `WONUM` must exist. The default `WONUM` in `read_1_WO` and `create_WO` is `A123A`. 
* To run the `update_WO` route or the `delete_WO` route, you must first run the `read_1_WO` route. 

#### Close the session

When you are finished viewing or making changes to your work orders and with the current settings, press CTRL+C in your terminal to end the session.

### Next steps

You can change your default connection settings in server.js in order to simply type in "node server.js" to launch the application in the future.

Each route can be changed to find, create, or update any information, instead of the defaults currently set. Comments in the individual files explain how to do so. 

Further customization can be made by changing the functions that are referenced by the routes. These functions are stored in the node_modules/ibm-maximo-api/resources folder in separate files depending on whether they are resource, resourceset, or other types of functions. 

Another possible customization is to allow another argument to be passed in to update.js and delete.js with the WONUM, or other information, so that read_1_WO does not have to be run first anymore.

To create an app that is similar to this one and that uses ibm-maximo-api, simply create the outlines of a node.js app with a package.json file and start by installing the express and ibm-maximo-api packages. 

### References

For more information, see the following resources:

* [IBM Asset Management Developer Center](https://developer.ibm.com/iot/asset-management/)
* [ibm-maximo-api](https://github.com/sachbalag/ibm-maximo-api)
* [Maximo JSON API](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/IBM%20Maximo%20Asset%20Management/page/Maximo%20JSON%20API)
