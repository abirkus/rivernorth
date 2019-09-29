const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
// Morgan is a HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application.
// You might think of Morgan as a helper that generates request logs.
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

// Requests frequently contain a body - if you want to use it in req.body, then you'll need some middleware to parse the body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); //https://www.npmjs.com/package/body-parser
// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
// This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.

// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
//The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded
app.use('/api', require('./api')); //all of my routes will be in this folder

//Because we generally want to build single-page applications (or SPAs),
//our server should send its index.html for any requests that don't match one of our API routes.
//for any 404 errors on our routes we will send back out index.html
app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

// app.get('*', function(req, res, next) {
// 	res.sendFile(path.join(__dirname, '../public/index.html'));
// });

//error handler
//will send errors from other routes if found, if not, will send 500
app.use((err, req, res, next) => {
	console.error(err, err.stack);
	res.status(500).send(err);
});

module.exports = app;
