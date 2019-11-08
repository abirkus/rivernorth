const app = require('./server/app.js');

const port = 1738;
app.listen(port, function() {;
	console.log(`Listing to port ${port}`);
});
