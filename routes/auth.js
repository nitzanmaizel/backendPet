const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// @route    POST api/auth/signup
// @desc     Signup User
// @access   Public

router.post('/signup', [
	[
		check('firstName', 'First name is required').not().isEmpty(),
		check('lastName', 'Last name is required').not().isEmpty(),
		check('email', 'Please enter valid email').isEmail(),
		check('password', 'Password must be greater than 6 character').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.send('<h1>User Signup</h1>');
	},
]);

module.exports = router;
