const jwt = require('jsonwebtoken');
const config = require('config');
const { jwtSecret } = process.env;

function auth(req, res, next) {
	const token = req.cookies.auth_token;

	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
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

function isAdmin(req, res, next) {
	try {
		if (!req.user.isAdmin) {
			return res.status(403).json({ msg: 'not allowed' });
		}
		next();
	} catch (err) {
		console.error('isAdmin err', err.message);
		res.status(403).json({ msg: 'Token is not allowed' });
	}
}

module.exports = { isAdmin, auth };
