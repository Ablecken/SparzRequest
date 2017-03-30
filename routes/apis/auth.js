const express = require('express');
const request = require('request');
const router = express.Router();
/* POST */
router.post('/', function(req, res) {
	if (req.session.isAuthenticated) {
		return res.json({ userName: req.session.auth.userName, token: req.session.auth.token, isAdmin: req.session.auth.isAdmin, fromSession: true });
	}

	const authString = `${req.body.userName}:${req.body.password}`;
	const buffer = (new Buffer(authString.toString(), 'binary')).toString('base64');
	const authHeaderVal = `Basic ${buffer}`;
	const options = {
		url: 'https://plex.tv/users/sign_in.json',
		method: 'POST',
		headers: {
			Authorization: authHeaderVal,
			'X-Plex-Client-Identifier': 'BGZQ8N25FYP3UHB6',
			'X-Plex-Version': '0.1.0',
			'X-Plex-Platform': 'Node',
			'X-Plex-Device-Name': 'Plex Requests'		
		}
	};
	const callback = function callback(err, resp, body) {
		const bodyObject = JSON.parse(body);
		if (!err && resp.statusCode === 201) {
			req.session.auth = {
				userName: bodyObject.user.username,
				email: bodyObject.user.email,
				token: bodyObject.user.authToken,
				isAuthenticated: true,
				isAdmin: bodyObject.user.username.toLowerCase() === 'ablecken'
			};
			return res.json({ userName: req.session.auth.userName, token: req.session.auth.token, isAdmin: req.session.auth.isAdmin, fromSession: false });
		}
		return res.status(401).send('Incorrect password or username');
	};

	request(options, callback);
});
module.exports = router;