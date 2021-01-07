const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Pet = require('../models/Pet');

// @route    GET api/pets
// @desc     Get all pets
// @access   Privet

router.get('/', async (req, res) => {
	try {
		const pets = await Pet.find({});
		if (pets.length === 0) {
			return res.status(404).send({ err: 'No pets found' });
		}
		res.json(pets);
	} catch (err) {
		console.error(err.massage);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
