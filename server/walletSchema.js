var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var walletSchema = new Schema({
	Date: {  },
	Comments: String,
	OverallRating: Number,
	TranslatedBody: String, 
	wordCount: Object
})




module.exports = mongoose.model('Wallet', walletSchema);