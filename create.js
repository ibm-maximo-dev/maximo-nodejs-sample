// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var Q = require('q');
var fs = require("fs");
var Maximo = require('ibm-maximo-api');  // Reference to Maximo OSLC API
const minimist = require('minimist');

var port = process.env.PORT || 3000;  // set port,use 3000 for now

var ver = "v1"; // our API version

app.use(cookieParser());
app.use(session({
	secret: '&25653666%^',
	resave: true,
	saveUninitialized: true
}));

// Input arguments sent from command line
// Can change default so don't have to enter on command line every time
let args = minimist(process.argv.slice(2), {
	string: [ 'hostname', 'port', 'user', 'password' ],
	integer: [ 'islean' ],
    alias: {
        h: 'hostname',
		p: 'port',
		u: 'user',
        w: 'password',
		l: 'islean'
    },
	default: {
        hostname : 'qasite.swg.usma.ibm.com',
		port : '9080',
		user : 'user',
		password : 'password',
		islean : 1
    }
});

console.log('args:', args);  


// ROUTES FOR OUR API
// =============================================================================
// Create basics for maximo instance and router --------------------------------
var router = express.Router(); 				// get an instance of the express Router



// middleware to use for all requests
router.use(function(req, res, next)
{
	console.log('Request received by node middleware ...');
	next(); // make sure we go to the next routes and don't stop here
});

// Maximo connection details
var options = {
        protocol: 'http',
        hostname: args.hostname,
        port: args.port,
        user: args.user,
        password: args.password,
        auth_scheme: '/maximo',
        authtype:'maxauth',
		islean: args.islean
    };

	
// Creates a WOrkorder
// In required section, fill in information about WO
router.get('/create_WO', function(req, res)
{
  var wo = '';
  var required =
  {
	"description": "Created from API",
	"siteid": "BEDFORD",
	"wonum": "a123a"
	}
  var authcookie = req.session.authcookie;
  var maximo = new Maximo(options,authcookie);

  maximo.resourceobject("MXWODETAIL")
        .create(required,["spi:wonum","spi:description"])
        .then(function(resource)
              {
                jsondata = resource.JSON();
                res.json(jsondata);
              })
          .fail(function (error)
          {
                console.log('****** Error Code = '+error);
          });
});

router.get('/create_WO_2', function(req, res)
{
  var wo = '';
  var required =
  {
	"description": "Created from API",
	"siteid": "BEDFORD",
	"wonum": "a123b",
	"location": "BR300"
	}
  var authcookie = req.session.authcookie;
  var maximo = new Maximo(options,authcookie);

  maximo.resourceobject("MXWODETAIL")
        .create(required,["spi:wonum","spi:description"])
        .then(function(resource)
              {
                jsondata = resource.JSON();
                res.json(jsondata);
              })
          .fail(function (error)
          {
                console.log('****** Error Code = '+error);
          });
});

// REGISTER ROUTES -------------------------------
// all routes will be prefixed with /api/ver/

app.use('/api/'+ver, router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Maximo Node API server is running on port ' + port);
console.log('API version is ' + ver);

function getFileBytes(path)
{
    var deferred = Q.defer();
    var fileSize = 0
    var buf = new Buffer(fileSize);
    // ******** Start buffering the file bytes **********************
    fs.stat(path, function (err, stats)
    {
        if (err)
        {
           return console.error(err);
        }
        console.log(stats.size);
        fileSize = stats.size;
        buf = new Buffer(fileSize);
        var actualBytes = 0;
        fs.open(path, 'r', function(err, fd)
        {
            if (err)
            {
               return console.error(err);
            }
            console.log("Reading ... ");
            fs.read(fd, buf, 0, buf.length, 0, function(err, bytes)
            {
                if (err)
                {
                   console.log(err);
                }
                console.log(bytes + " bytes read");
                console.log("Actual Buffer Size: "+buf.slice(0,bytes).length);
                deferred.resolve(buf.slice(0,bytes));
                //return buf.slice(0,bytes);
            });
            // Close the opened file.
            fs.close(fd, function(err)
            {
               if (err){
                  console.log(err);
               }
               console.log("File closed successfully.");
            });
        });
        //*******  End buffering file bytes ******
    });
    return deferred.promise;
}
