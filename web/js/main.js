const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-form__input');
let ul = document.querySelector('ul');
let popupInput;
let errorInfo;
let popup;
let popupInfo;
let popupAddBtn;
let popupCloseBtn;

const prepareDOMElements = () => {
	errorInfo = document.querySelector('.error-info');
	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupInput = document.querySelector('.popup-input');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};
const prepareDOMEvents = () => {
	ul.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', closePopup);
	popupAddBtn.addEventListener('click', changeTodoText);
};

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

let todos;

const fetchTodos = async () => {
	const response = await fetch(`http://localhost:4444/api/todolist`);
	const data = await response.json();
	todos = data;
	ul.innerHTML = '';

	data.map((todo) => {
		const li = document.createElement('li');
		ul.appendChild(li);
		li.innerHTML = `${todo.text}`;
		li.dataset.id = todo._id;
		li.append;

		const createToolsArea = () => {
			const toolsPanel = document.createElement('div');
			toolsPanel.classList.add('tools');
			li.append(toolsPanel);

			const completeBtn = document.createElement('button');
			completeBtn.classList.add('complete');
			completeBtn.innerHTML = '<i class="fas fa-check"></i>';

			const editBtn = document.createElement('button');
			editBtn.classList.add('edit');
			editBtn.textContent = 'EDIT';

			const deleteBtn = document.createElement('button');
			deleteBtn.classList.add('delete');
			deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

			toolsPanel.append(completeBtn, editBtn, deleteBtn);
		};
		createToolsArea();
	});
};

const checkClick = (e) => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editTodo(e);
	} else if (e.target.matches('.delete')) {
		deleteTo(e);
	}
};

let toEdit;
const editTodo = (e) => {
	toEdit = e.target.closest('li');
	popupInput.value = toEdit.firstChild.textContent;
	popup.style.display = 'flex';
};

const closePopup = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

const changeTodoText = async () => {
	const id = toEdit.getAttribute('data-id');
	const updatedName = popupInput.value;
	if (updatedName !== '') {
		const todo = {
			_id: id,
			text: updatedName,
		};
		console.log(todos);

		try {
			const response = await fetch('http://localhost:4444/api/todolist', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					todo,
				}),
			});
			const data = await response.json();
			console.log(data);
			// input.value = '';
		} catch (e) {
			console.log(e);
		}

		toEdit.firstChild.textContent = popupInput.value;
		popup.style.display = 'none';
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść..';
	}
};

const deleteTo = async (e) => {
	// console.log(e.target.closest('li').getAttribute('data-id'));

	const id = e.target.closest('li').getAttribute('data-id');

	try {
		const response = await fetch(`http://localhost:4444/api/todolist/${id}`, {
			method: 'DELETE',
		});
		const data = await response.json();
		console.log(data);

		e.target.closest('li').remove();
		// input.value = '';
	} catch (e) {
		console.log(e);
	}

	const allTodos = document.querySelectorAll('li');

	if (allTodos.length == 0) {
		errorInfo.textContent = 'Brak zadań na liście!';
	}
};

fetchTodos();

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const inputValue = input.value;
	const addTodo = async (inputValue) => {
		console.log('wysylam fetcha');
		try {
			const response = await fetch('http://localhost:4444/api/todolist/new', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					text: inputValue,
				}),
			});
			const data = await response.json();
			console.log(data);
			await fetchTodos();
			// input.value = '';
		} catch (e) {
			console.log(e);
		}
	};
	addTodo(inputValue);
	input.value = '';
	console.log('done');
});

document.addEventListener('DOMContentLoaded', main);
