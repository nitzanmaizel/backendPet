const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('<h1>Hello World!!!</h1>');
});

app.listen(PORT, () => {
	console.log(`Server on http://localhost:${PORT}`);
});
