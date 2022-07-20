const addTodo = document.querySelector('.add-todo');
const todoList = document.querySelector('.todo-list');
const todos = JSON.parse(localStorage.getItem('todos')) || [];

const months = ["January","February","March","April","May","June",
"July","August","September","October","November","December"];
const weeks = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday",
"Saturday"];

const renderDate = () => {
	const dateElement = document.querySelector('.date');
	var currentDate = new Date();
	var date = `${currentDate.getDate()}`;
    var year = currentDate.getFullYear();
    var monthYear = `${months[currentDate.getMonth()]} ${year}`;
    var day = `${weeks[currentDate.getDay()]}`;

    dateElement.innerText = date;
    const span = document.createElement('span');
    span.classList.add('month');
    span.innerText = monthYear;
    dateElement.appendChild(span);
    document.querySelector('.day').innerText = day;
}

document.addEventListener("DOMContentLoaded", renderDate);

function createTodo(e) {
	e.preventDefault();
	const text = (this.querySelector('[name=text]')).value;
        If (text == "") { alert("Todo can't be Empty") } else {
	const todo = {
		text,
		done: false,
	};
	todos.push(todo);
	appendTodo(todos,todoList);
	localStorage.setItem('todos', JSON.stringify(todos));
	this.reset();
}}

function appendTodo(items = [], itemList) {
	itemList.innerHTML = items.map((item, i) => {
		return `
		<li class="todo">
		<input type="checkbox" data-index=${i} ${item.done ? 'checked' : ''} >
  		<span id="todo${i}" class="todo-text" for="item${i}"
  		style="${item.done ? 'text-decoration:line-through;opacity:50%;': 'text-decoration:none;opacity:100%;'}">${item.text}</span>
  		<i id="${i}" class="fas fa-trash"></i>
		</li>
		`
	}).join('');
	const deleteButton = document.querySelectorAll(".fa-trash");
	deleteButton.forEach((button) => {
		button.addEventListener("click", (e) => {
		todos.splice(e.target.id, 1);
		localStorage.setItem('todos', JSON.stringify(todos));
		appendTodo(todos, todoList);
	});
});
}
function toggleDone(e) {
	if (!e.target.matches('input')) return;
	const el = e.target;
	const index = el.dataset.index;
	todos[index].done = !todos[index].done;
	localStorage.setItem('todos', JSON.stringify(todos));
	appendTodo(todos, todoList);
}

addTodo.addEventListener('submit',createTodo);
todoList.addEventListener('click', toggleDone);

appendTodo(todos, todoList);
