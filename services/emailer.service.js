const app = require('../app');

const bcc = 'ablecken@gmail.com';
const processResult = function(err) {
	if (err) {
		console.log(`Error sending Email: ${err}`);
	}
};

module.exports = {
	sendNewRequest(item, to, cb) {
		app.mailer.send('emails/newRequest', {
			to,
			bcc,
			subject: 'A new request has been made',
			item
		}, cb || processResult);
	},
	sendRequestComplete(item, cb) {
		if (!item.requestedByEmail || item.requestedByEmail.length <= 0) {
			if (cb) {
				cb();
			} else {
				processResult();
			}
		}
		
		app.mailer.send('emails/completeRequest', {
			to: item.requestedByEmail,
			bcc,
			subject: 'A request has been completed',
			item
		}, cb || processResult);
	},
	sendTest(cb) {
		app.mailer.send('emails/test', {
			to: 'ablecken@gmail.com',
			bcc: '',
			subject: 'A test email has been requested',
			undefined
		}, cb || processResult);
	}
};
	