const express = require('express');
const router = express.Router();
const app = require('../../app');

/* GET home page. */
router.get('/', app.requireAuthMiddleware, function(req, res, next) {
	res.render('request', { title: 'Sparz Request' });
});

module.exports = router;
