const asyncHandler = require('express-async-handler');

//@desc Get Todos
//@Route GET /api/todo
//@access Private
const getTodo = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Get todo's` });
});

//@desc Set Todos
//@Route POST /api/todo
//@access Private
const setTodo = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}

	res.status(200).json({ message: `Set todo's` });
});

//@desc Update Todos
//@Route PUT /api/todo/:id
//@access Private
const updateTodo = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Update todo ${req.params.id}` });
});

//@desc Delete Todos
//@Route DELETE /api/todo/:id
//@access Private
const deleteTodo = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete todo ${req.params.id}` });
});

module.exports = {
	getTodo,
	setTodo,
	updateTodo,
	deleteTodo,
};
