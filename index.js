var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var frontend = 'http://' + process.env.FE_URL + ":80";
var backend = 'http://' + process.env.BE_URL + ":80";

var redirectBackend = function (req, res) {
    console.log('redirecting to backend');
    req.headers.host = process.env.BE_URL;
    apiProxy.web(req, res, {target: backend});
};

var redirectFrontend = function (req, res) {
    console.log('redirecting to fronted');
    req.headers.host = process.env.FE_URL;
    apiProxy.web(req, res, {target: frontend});
};

var logger = function(req, res, next) {
    console.log(req.method + " " + req.url);
    next(); // Passing the request to the next handler in the stack.
};

app.use(logger);

apiProxy.on('error', function(e) {
    console.log(e);
});

app.all("/api/*", function(req, res) {
    redirectBackend(req, res);
});

app.all("/atlassian-connect.json", function (req, res) {
    redirectBackend(req, res);
});

app.all("/installed", function(req, res) {
    redirectBackend(req, res);
});

app.all("/main", function(req, res) {
    redirectBackend(req, res);
});

app.all("/*", function(req, res) {
    redirectFrontend(req, res);
});


console.log("Reverse proxy is up and running");
app.listen(process.env.PORT);