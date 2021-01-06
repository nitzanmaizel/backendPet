const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
	},
	savedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
	userPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
	isAdmin: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('User', UserScheme);
