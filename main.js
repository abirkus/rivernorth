const app = require('./server/app.js');

const port = 1738;
app.listen(port, function() {
	console.log("I'm like Hey, what's up? Hello");
	console.log('Listening to requests while im waiting by the door');
	console.log(`Port ${port} is where its at, so let's roll`);
});
