const mongoose = require('mongoose');
const requestTypes = require('../enums/requestTypes');
const statusTypes = require('../enums/statusTypes');
const requestSchema = new mongoose.Schema({
	requestedDate: {
		type: Date,
		default: Date.now
	},
	requestedBy: {
		type: String,
		index: true
	},
	name: String,
	year: Number,
	isOngoing: Boolean,
	requestType: {
		type: String,
		enum: requestTypes
	},
	statusType: {
		type: String,
		enum: statusTypes,
		default: 'Requested'
	},
	dateClosed: {
		type: Date,
		index: true
	}
});
module.exports = mongoose.model('Requests', requestSchema);