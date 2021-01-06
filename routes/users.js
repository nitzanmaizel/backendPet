const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth');

// @route    GET api/users
// @desc     Get all Users
// @access   Privet Admin

router.get('/', async (req, res) => {
	try {
		const users = await User.find({}).select('-password');
		res.json(users);
	} catch (err) {
		console.error(err.massage);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
