// const CLOUDINARY_NAME = config.get('CLOUDINARY_NAME');
// const CLOUDINARY_API_KEY = config.get('CLOUDINARY_API_KEY');
// const CLOUDINARY_API_SECRET = config.get('CLOUDINARY_API_SECRET');
// const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
const cloudinary = require('cloudinary').v2;
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };
