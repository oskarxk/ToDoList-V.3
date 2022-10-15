const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require('dotenv').config();
// const connectDB = require('./server')

const port = 4444;
const app = express();
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

app.get('/', function (req, res) {
	res.send(todos);
});

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
