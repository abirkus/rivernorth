const app = require('./server/app.js');

const port = 1738;
app.listen(port, function() {
	console.log("I'm like Hey, what's up? Hello");
	console.log('Waiting on requests to come in swiftly through the door');
	console.log(`Listening on port ${port}, so let's roll`);
});
