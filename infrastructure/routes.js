const app = require('../app');

const requests = require('../routes/apis/requests');
const auth = require('../routes/apis/auth');
const email = require('../routes/apis/email');

const index = require('../routes/pages/index');
const request = require('../routes/pages/request');

app.use('/', index);
app.use('/request', request);
app.use('/api/requests', requests);
app.use('/api/auth', auth);
app.use('/api/email', email);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});