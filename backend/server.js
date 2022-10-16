const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
require('dotenv').config();

const port = process.env.PORT || 4444;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todolist', require('./routes/todoRoutes'));

app.use(errorHandler);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();

const todos = [
	{
		id: 1,
		title: 'Kup mleko',
	},
];

app.post('/new', (req, res) => {
	console.log(req.body);
	const title = req.body.title;
	todos.push({
		id: 4,
		title,
	});
	console.log(todos);
	res.send(todos);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
