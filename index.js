var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var frontend = 'testjiragoggles-fronted.herokuapp.com';
var backend = 'testjiragoggles-backend.herokuapp.com';
var reverse = 'jiragoggles.herokuapp.com';

var herokuProxy = require('heroku-proxy');

app.use(herokuProxy());

app.use(herokuProxy({
    hostname: backend,
    port    : 80,
    protocol: 'https'
}));
// var logger = function(req, res, next) {
//     console.log(req.method + " " + req.url);
//     next(); // Passing the request to the next handler in the stack.
// };
//
// app.use(logger);
//
// apiProxy.on('error', function(e) {
//     console.log(e);
// });
//
// app.all("/", function (req, res) {
//     req.headers.host = backend;
//     apiProxy.web(req, res, {target: backend});
// });
//
// app.all("/api/*", function(req, res) {
//     console.log('redirecting to backend');
//     req.headers.host = backend;
//     apiProxy.web(req, res, {target: backend});
// });
//
// app.all("/atlassian-connect.json", function (req, res) {
//     console.log("redirect to backend");
//     req.headers.host = backend;
//     apiProxy.web(req, res, {target: backend});
// });
//
// app.all("/installed", function(req, res) {
//     console.log('redirecting to backend');
//     apiProxy.web(req, res, {target: backend});
// });
//
// app.all("/main", function(req, res) {
//     console.log('redirecting to backend');
//     apiProxy.web(req, res, {target: backend});
// });
//
// app.all("/*", function(req, res) {
//     console.log('redirecting to fronted');
//     apiProxy.web(req, res, {target: frontend});
// });
//
//
console.log("Reverse proxy is up and running");
app.listen(process.env.PORT);