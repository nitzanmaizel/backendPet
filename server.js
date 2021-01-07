const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
var cookieParser = require('cookie-parser');
const app = express();

// Connect MongoDB ==>
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser());

// Set up routers ==>
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server start on http://localhost:${PORT}`);
});
