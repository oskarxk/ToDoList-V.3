const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv').config();
const asyncHandler = require('express-async-handler');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const Todo = require('./models/todoModel');

const port = process.env.PORT || 4444;
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/todolist', require('./routes/todoRoutes'));
app.get(
	'/api/todolist',
	asyncHandler(async (req, res) => {
		const todo = await Todo.find({});

		// res.status(200).json(todo);
		res.send(todo);
	})
);

app.post(
	'/api/todolist/new',
	asyncHandler(async (req, res) => {
		if (!req.body.text) {
			res.status(400);
			throw new Error('Please add a text field');
		}
		console.log(req.body.text);
		const todo = await Todo.create({
			text: req.body.text,
		});
		res.send(todo);
	})
);

app.put(
	'/api/todolist/:id',
	asyncHandler(async (req, res) => {
		const todo = await Todo.findById(req.params.id);

		if (!todo) {
			res.status(400);
			throw new Error('Goal not found');
		}

		const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		res.status(200).json(updateTodo);
	})
);

//@desc Delete Todos
//@Route DELETE /api/todo/:id
//@access Private
app.delete(
	'/api/todolist/:id',
	asyncHandler(async (req, res) => {
		const todo = await Todo.findById(req.params.id);

		if (!todo) {
			res.status(400);
			throw new Error('Goal not found');
		}

		await todo.remove();

		res.status(200).json({ id: req.params.id });
	})
);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
