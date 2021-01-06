const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');

const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const jwtSecret = config.get('jwtSecret');
const { auth } = require('../middleware/auth');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.massage);
		res.status(500).send('Server error');
	}
});

// @route    POST api/auth/signup
// @desc     Signup User
// @access   Public

router.post('/signup', [
	[
		check('firstName', 'First name is required').not().isEmpty().trim(),
		check('lastName', 'Last name is required').not().isEmpty().trim(),
		check('email', 'Please enter valid email').isEmail(),
		check('password', 'Password must be greater than 6 character').isLength({ min: 6 }),
		check('phoneNumber', 'Phone number is required').not().isEmpty().trim(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { firstName, lastName, email, password, phoneNumber } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				console.log(user);
				return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
			}

			user = new User({
				firstName,
				lastName,
				email,
				password,
				phoneNumber,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				id: user.id,
				isAdmin: user.isAdmin,
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
				if (err) {
					throw err;
				}
				res.json({ token });
			});
		} catch (err) {
			console.error(err.massage);
			res.status(500).send('Server Error');
		}
	},
]);

// @route    POST api/auth/login
// @desc     Login User
// @access   Public

router.post(
	'/login',
	[
		check('email', 'Email is invalid').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { email, password } = req.body;

			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credential' }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credential' }] });
			}

			const payload = {
				id: user.id,
				isAdmin: user.isAdmin,
			};
			jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
				if (err) {
					throw err;
				}
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
