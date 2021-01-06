const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');

function auth(req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if no token
	if (!token) {
		return res.status(401).json({ msg: 'No Token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded;
		next();
	} catch (err) {
		console.error(err.message);
		res.status(401).json({ msg: 'Token is not valid' });
	}
}

module.exports = auth;
