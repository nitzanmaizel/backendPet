const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// @route    GET api/users
// @desc     Get all Users
// @access   Privet Admin

router.get('/', async (req, res) => {
	try {
		const users = await User.find({})
			.populate('userPets')
			.populate('savedPets')
			.select('-password');
		res.json(users);
	} catch (err) {
		console.error(err.massage);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/users/:id
// @desc     Get by ID
// @access   Privet Admin

router.get('/:id', async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id }).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.massage);
		res.status(500).send('Server Error');
	}
});

// @route    PUT api/users/:id
// @desc     Update user by ID
// @access   Privet User

router.put(
	'/:id',
	[
		check('firstName', 'First name is required').not().isEmpty(),
		check('lastName', 'Last name is required').not().isEmpty(),
		check('email', 'Email is invalid').isEmail(),
		check('password', 'Password must be greater than 6 characters').isLength({ min: 6 }),
		check('phoneNumber', 'Phone number is invalid').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { firstName, lastName, email, password, phoneNumber, bio } = req.body;
			const updateUser = {
				firstName,
				lastName,
				email,
				password,
				phoneNumber,
				phoneNumber,
				bio,
			};

			const salt = await bcrypt.genSalt(10);

			updateUser.password = await bcrypt.hash(password, salt);

			const user = await User.findOneAndUpdate(
				{ _id: req.params.id },
				{ $set: updateUser },
				{ new: true }
			).select('-password');
			res.json(user);
		} catch (err) {
			console.error(err.massage);
			res.status(500).send('Server error');
		}
	}
);

// @route    GET /users/mypets
// @desc     Get user saved pets && owns
// @access   Privet

router.get('/mypets', auth, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.id })
			.populate('userPets')
			.populate('savedPets')
			.select('-password');
		res.json({ savedPets: user.savedPets, userPets: user.userPets });
	} catch (err) {
		console.error(err.massage);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
