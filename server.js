require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utili/db');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

// Connect MongoDB ==>
connectDB();

app.use(express.json({ extended: false, limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(cookieParser());

// Set up routers ==>
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/users', require('./routes/users'));

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('client/build'));
// 	app.get('*', (req, res) =>
// 		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
// 	);
// }

app.get('/test', (req, res) => {
	res.json('works');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server start on http://localhost:${PORT}`);
});
