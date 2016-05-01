var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Company = new Schema({
	name: String,
	description: String,
	lads: [{
		serialNumber:String,
		name:String,
		detector:[{
			serialNumber:String,
			name: String,
			data: [{
				timestamp: { type: Date, default: Date.now },
				oil: Number,
				gas: Number,
				smoke: Number,
				pressure: Number
			}],
			status:Boolean,
			level:Boolean,
			high: Number
		}],
		localUserAccounts:[{
			userName: String
		}]
	}]
});

module.exports = mongoose.model('Company', Company);