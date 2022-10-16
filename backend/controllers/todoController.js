const asyncHandler = require('express-async-handler');

const Todo = require('../models/todoModel');

//@desc Get Todos
//@Route GET /api/todo
//@access Private
const getTodo = asyncHandler(async (req, res) => {
	const todo = await Todo.find();

	res.status(200).json(todo);
});

//@desc Set Todos
//@Route POST /api/todo
//@access Private
const setTodo = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}

	const todo = await Todo.create({
		text: req.body.text,
	});
	res.status(200).json(todo);
});

//@desc Update Todos
//@Route PUT /api/todo/:id
//@access Private
const updateTodo = asyncHandler(async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	if (!todo) {
		res.status(400);
		throw new Error('Goal not found');
	}

	const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updateTodo);
});

//@desc Delete Todos
//@Route DELETE /api/todo/:id
//@access Private
const deleteTodo = asyncHandler(async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	if (!todo) {
		res.status(400);
		throw new Error('Goal not found');
	}

	await todo.remove();

	res.status(200).json({id: req.params.id});
});

module.exports = {
	getTodo,
	setTodo,
	updateTodo,
	deleteTodo,
};
