const cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
const errorHandler = require('errorhandler');
//const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
if (app.get('env') === 'development') {
	app.use(errorHandler());
	app.locals.pretty = true;
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
	name: 'sparzrequest',
	// secure: true,
	keys: ['ASDF'],
	maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}));

app.requireAuthMiddleware = function(req, res, next) {
	if (!req.session || !req.session.auth || !req.session.auth.isAuthenticated || !req.session.auth.token) {
		return res.sendStatus(401);
	}
	next();
};
app.requireAdminMiddleware = function(req, res, next) {
	if (!req.session.auth.isAuthenticated || !req.session.auth.token || !req.session.auth.isAdmin) {
		return res.sendStatus(401);
	}
	next();
};

module.exports = app;

require('./infrastructure/routes');
require('./infrastructure/errors');
require('./infrastructure/database');
require('./infrastructure/emailer');

require('./services/emailer.service.js');
