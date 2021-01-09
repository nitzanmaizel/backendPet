const mongoose = require('mongoose');

const PetScheme = new mongoose.Schema({
	type: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	adoptionStatus: {
		type: String,
		required: true,
	},
	petImage: {
		type: String,
		required: true,
	},
	height: {
		type: Number,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		required: true,
	},
	hypoallergenic: {
		type: Boolean,
		required: true,
	},
	dietaryRestrictions: {
		type: String,
		required: true,
	},
	breed: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Pet', PetScheme);
