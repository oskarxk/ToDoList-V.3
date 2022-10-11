const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = 4444;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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
