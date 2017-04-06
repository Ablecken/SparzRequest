const express = require('express');
const router = express.Router();
const Request = require('../../models/Request.js');
const app = require('../../app');
const emailerService = require('../../services/emailer.service.js');

/* GET listing. */
router.get('/', app.requireAuthMiddleware, function(req, res, next) {	
	let dbQuery = Request.find({});
	if (!req.session.auth.isAdmin) {
		dbQuery = dbQuery.where('requestedBy').equals(req.session.auth.userName.toLowerCase());
	}
	if (!req.query.includeClosed) {
		dbQuery = dbQuery.where('dateClosed').equals(null);
	}
	dbQuery.sort({ dateClosed: 1 })
		.exec(function(err, items) {
			if (err) return next(err);
			return res.json(items);
		});
});
/* GET by id */
router.get('/:id', app.requireAuthMiddleware, function(req, res, next) {
	Request.findById(req.params.id, function(err, item) {
		if (err) return next(err);
		return res.json(item);
	});
});
/* POST */
router.post('/', app.requireAuthMiddleware, function(req, res, next) {
	req.body.dateClosed = undefined;
	req.body.requestedBy = req.session.auth.userName.toLowerCase();
	Request.create(req.body, function(err, item) {
		if (err) return next(err);
		emailerService.sendNewRequest(item, req.session.auth.email);
		return res.json(item);
	});
});
/* PUT */
router.put('/:id', app.requireAuthMiddleware, function(req, res, next) {
	Request.findById(req.params.id, function(err, item) {
		if (err) return next(err);
		// only update status if we are an admin
		if (!req.session.auth.isAdmin) {
			req.body.statusType = item.statusType;
		} else if (req.body.statusType === 'NotFound' || req.body.statusType === 'Completed' || req.body.statusType === 'AlreadyAvailable') {
			// if closed, set filled
			req.body.dateClosed = new Date();
		}

		Request.findByIdAndUpdate(req.params.id, req.body, { /* return new object */ new: true }, function(err, item) {
			if (err) return next(err);
			// if we are the admin, send
			if (req.session.auth.isAdmin) {
				emailerService.sendRequestComplete(item, req.session.auth.email);
			}
			return res.json(item);
		});
	});	
});
module.exports = router;