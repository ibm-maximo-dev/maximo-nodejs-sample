# maximo-nodejs-sample

## Introduction

These files take advantage of Maximo APIs to show the create, read, update, and delete (CRUD) actions for a work order. The server.js file contains all of the CRUD routes that are individually broken out into their own .js docs.

## Getting started

1. Via the command line, ensure that [Node](https://nodejs.org/en/) is installed. This app was made with Node v6.11.2, and most recently tested with v8.9.4.

```
$ node -v
```
 
2. Download the JavaScript files and the package.json file that are found in this repository. If you can't use clone, just download the files into one folder. 

```
$ git clone git@github.com:ibm-maximo-dev/maximo-nodejs-sample.git
```

3. Install the required packages in the maximo-nodejs-sample folder. 

```
$ cd maximo-nodejs-sample
$ npm install
```

4. Launch the server.js file from a terminal window. The following optional arguments are for making the connection to the Maximo server: hostname (-h), port (-p), user (-u), password (-w), and islean (-l). Note that the defaults for each of these values can be changed in the server.js file. If you have errors at this point, try upgrading your version of Node. Also double check that you **do not** include "http://" on your host name when you try to connect.

```
$ node server.js -h qasite.swg.usma.ibm.com -p 9080 -u username -w password -l 1
```

5. Launch your browser with the localhost at the port in the file (default is 3000) with a route you would like to run. If you are running the update_WO route or the delete_WO route, you must first run the read_1_WO route. To run read_1_WO without an error, the WONUM must exist. The default WONUM in read_1_WO and create_WO is A123A. The suggested order to run the routes is /authenticate, /create_WO, /read_1_WO, /update_WO, and /delete_WO.

```
http://localhost:3000/api/v1/authenticate
```

6. When you are finished viewing or making changes with the current settings, press CTRL+C in your terminal to end the session.
7. Make any changes to the work order details that you want to read, create, update, or delete in the NodeJS files, resave, and relaunch from step 5.

## Further enhancements

Each route can be changed to find, create, or update any information. Comments in the individual files explain how to do so. Further customization can be made by changing the functions that are referenced by the routes. These functions are stored in the node_modules/ibm-maximo-api/resources folder in separate files depending on whether they are resource, resourceset, or other types of functions. 

Another possible customization is to allow another argument to be passed in to update.js and delete.js with the WONUM, or other information, so that read_1_WO does not have to be run first anymore.

To create an app that is similar to this one and that uses ibm-maximo-api, simply create the outlines of a node.js app with a package.json file and start by installing the express and ibm-maximo-api packages. 
