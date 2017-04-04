const express = require('express');
const router = express.Router();
const app = require('../../app');
const emailerService = require('../../services/emailer.service.js');

const requestItem = {
	requestedDate: new Date(),
	requestedBy: 'emailTester',
	name: 'Some Cool Movie',
	year: 2007,
	isOngoing: false,
	requestType: 'Movie',
	statusType: 'NotFound',
	dateClosed: new Date()
};

router.get('/complete', [app.requireAuthMiddleware, app.requireAdminMiddleware], function(req, res) {	
	emailerService.sendRequestComplete(requestItem, 'ablecken@gmail.com', function(err) {
		return res.json({
			error: err,
			item: requestItem
		});
	});
});
router.get('/new', [app.requireAuthMiddleware, app.requireAdminMiddleware], function(req, res) {	
	emailerService.sendNewRequest(requestItem, 'ablecken@gmail.com', function(err) {
		return res.json({
			error: err,
			item: requestItem
		});
	});
});
router.get('/test', function(req, res) {
	emailerService.sendTest(function(err) {
		return res.json({
			error: err,
			item: undefined
		});
	});
});
module.exports = router;