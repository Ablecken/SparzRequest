const mongoose = require('mongoose');
// mongoose
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://localhost/sparz-request-db')
	.then(() => console.log('Connection to sparz-request-db successful'))
	.catch((err) => console.error(err));