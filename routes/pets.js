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

// @route    POST /pets
// @desc     Add pet
// @access   Privet Admin

router.post(
	'/addpet',
	[
		check('type', 'Type name is required').not().isEmpty(),
		check('name', 'Name name is required').not().isEmpty(),
		check('adoptionStatus', 'Adoption Status is required').not().isEmpty(),
		// check('image', 'Image  is required').not().isEmpty(),
		check('height', 'Height  is required').not().isEmpty(),
		check('weight', 'Weight  is required').not().isEmpty(),
		check('color', 'Color  is required').not().isEmpty(),
		check('bio', 'Bio  is required').not().isEmpty(),
		check('hypoallergenic', 'Hypoallergenic  is required').isBoolean(),
		check('dietaryRestrictions', 'Dietary Restrictions  is required').not().isEmpty(),
		check('breed', 'Breed  is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			type,
			name,
			adoptionStatus,
			// image,
			height,
			weight,
			color,
			bio,
			hypoallergenic,
			dietaryRestrictions,
			breed,
		} = req.body;

		try {
			let pet = new Pet({
				type,
				name,
				adoptionStatus,
				// image,
				height,
				weight,
				color,
				bio,
				hypoallergenic,
				dietaryRestrictions,
				breed,
			});
			await pet.save();
			res.json('Add success');
		} catch (err) {
			console.error(err);
			res.status(500).send('Server Error');
		}
	}
);

// @route    GET api/pets/search/:type
// @desc     Get pets By Type && By query's
// @access   Public

router.get('/search', async (req, res) => {
	try {
		let filter = {};
		if (req.query.adoptionStatus) filter.adoptionStatus = req.query.adoptionStatus;
		if (req.query.height) filter.height = parseInt(req.query.height);
		if (req.query.weight) filter.weight = parseInt(req.query.weight);
		if (req.query.type) filter.type = req.query.type;
		if (req.query.name) filter.name = req.query.name;
		const pets = await Pet.find(filter);
		if (pets.length === 0) {
			return res.status(404).send({ err: `No pets found, try again ` });
		}
		res.json(pets);
	} catch (err) {
		console.error(err.massage);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/pets/:id
// @desc     Get pet by ID
// @access   Public

router.get('/:id', async (req, res) => {
	try {
		const pet = await Pet.findOne({ _id: req.params.id });
		res.json(pet);
	} catch (err) {
		console.error(err.massage);
		res.status(500).send('Server Error');
	}
});

// @route    PUT api/pets/:id
// @desc     Update pet
// @access   privet Admin

router.put(
	'/:id',
	[
		check('type', 'Type name is required').not().isEmpty(),
		check('name', 'Name name is required').not().isEmpty(),
		check('adoptionStatus', 'Adoption Status is required').not().isEmpty(),
		check('image', 'Image  is required').not().isEmpty(),
		check('height', 'Height  is required').not().isEmpty(),
		check('weight', 'Weight  is required').not().isEmpty(),
		check('color', 'Color  is required').not().isEmpty(),
		check('bio', 'Bio  is required').not().isEmpty(),
		check('hypoallergenic', 'Hypoallergenic  is required').isBoolean(),
		check('dietaryRestrictions', 'Dietary Restrictions  is required').not().isEmpty(),
		check('breed', 'Breed  is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			type,
			name,
			adoptionStatus,
			// image,
			height,
			weight,
			color,
			bio,
			hypoallergenic,
			dietaryRestrictions,
			breed,
		} = req.body;
		try {
			let UpdatedPet = {
				type,
				name,
				adoptionStatus,
				// image,
				height,
				weight,
				color,
				bio,
				hypoallergenic,
				dietaryRestrictions,
				breed,
			};
			const pet = await Pet.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: UpdatedPet },
				{ new: true },
				(err, update) => {
					if (err) {
						res.status(400).log('No found');
					}
					res.json(update);
				}
			);
		} catch (err) {
			console.error(err);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
