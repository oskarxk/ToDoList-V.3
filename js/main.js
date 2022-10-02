//https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5

const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-form__input');
let ul = document.querySelector('ul');
let popupInput;
let errorInfo;

const prepareDOMEvents = () => {
	ul.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', closePopup);
	popupAddBtn.addEventListener('click', changeTodoText);
};

const prepareDOMElements = () => {
	errorInfo = document.querySelector('.error-info');
	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupInput = document.querySelector('.popup-input');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const fetchTodos = async (num) => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/todos?_start=0&_limit=${num}`
	);
	const data = await response.json();

	console.log(data);

	ul.innerHTML = '';

	data.map((todo) => {
		const li = document.createElement('li');
		ul.appendChild(li);
		li.innerHTML = `${todo.title}`;
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

const editTodo = (e) => {
	toEdit = e.target.closest('li');
	popupInput.value = toEdit.firstChild.textContent;
	popup.style.display = 'flex';
};

const closePopup = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

const changeTodoText = () => {
	if (popupInput.value !== '') {
		toEdit.firstChild.textContent = popupInput.value;
		popup.style.display = 'none';
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść..';
	}
};

const deleteTo = (e) => {
	e.target.closest('li').remove();

	const allTodos = document.querySelectorAll('li');

	if (allTodos.length == 0) {
		errorInfo.textContent = 'Brak zadań na liście!';
	}
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	fetchTodos(input.value);
	input.value = '';
});

document.addEventListener('DOMContentLoaded', main);
