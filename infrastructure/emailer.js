const app = require('../app');
const mailer = require('express-mailer');

mailer.extend(app, {
	from: 'justin@sparzington.com',
	host: 'localhost',
	port: 25,
	transportMethod: 'SMTP'
});