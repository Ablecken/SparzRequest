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
	sendRequestComplete(item, to, cb) {
		app.mailer.send('emails/completeRequest', {
			to,
			bcc,
			subject: 'A request has been completed',
			item
		}, cb || processResult);
	}
};
	