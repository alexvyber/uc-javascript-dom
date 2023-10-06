import "./css/style.css";
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
<div class="todos">
<div class="todos-header">
  TODO LIST
  <div>
    <p>You have <span class="todos-count"></span> todos</p>
    <button type="button" class="todos-clear" style="display: none">
      Clear Completed
    </button>
  </div>
</div>

<form class="todos-form" name="todos">
  <input type="text" placeholder="Some todo" name="todo" />
</form>
<ul class="todo-list"></ul>
</div>
`;

// selectors
const form = document.forms.namedItem("todos")!;
const input = form.elements.namedItem("todo")! as HTMLInputElement;
const todoList = document.querySelector(".todo-list")! as HTMLUListElement;
const clear = document.querySelector(".todos-clear")! as HTMLButtonElement;
const count = document.querySelector(".todos-count")!;

function renderTodos(todos: Todo[]) {
	let todoStr = "";
	todos.forEach((todo, index) => {
		todoStr += `<li data-id="${index}" ${
			todo.completed ? "class='todos-complete'" : ""
		}>
    <input type="checkbox" ${todo.completed ? "checked" : ""}>
    <span>${todo.label}</span>
    <button type="button">remove</button>
    </li>`;
	});

	count.innerHTML = todos.filter((item) => !item.completed).length.toString();
	todoList.innerHTML = todoStr;
	clear.style.display = todos.some((item) => item.completed) ? "block" : "none";
}

// state
const localTodos = localStorage.getItem("todos");
let todos = (localTodos ? JSON.parse(localTodos) : []) as Todo[];
// todos.push({ label: "First", completed: false });
// todos.push({ label: "Second", completed: true });

function addTodo(event: SubmitEvent) {
	event.preventDefault();

	const label = input.value.trim();
	const completed = false;

	todos = [
		...todos,
		{
			label,
			completed,
		},
	];

	renderTodos(todos);
	saveToLocalStorage(todos);
	input.value = "";
}

function saveToLocalStorage(todos: Todo[]) {
	localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodo(event: Event) {
	assertInput(event.target);

	const id = event.target.parentElement!.getAttribute("data-id")!;
	const completed = event.target.checked;
	todos = todos.map((item, index) => {
		if (index === parseInt(id)) {
			return {
				...item,
				completed,
			};
		}

		return item;
	});

	renderTodos(todos);
	saveToLocalStorage(todos);
}

function deleteTodo(event: MouseEvent) {
	if (!isButton(event.target)) return;

	const id = event.target.parentElement!.getAttribute("data-id")!;
	const label = event.target.previousElementSibling!.innerHTML;

	if (window.confirm(`Delete ${label}?`)) {
		todos = todos.filter((_todo, index) => index !== parseInt(id));
		renderTodos(todos);
		saveToLocalStorage(todos);
	}
}

function clearTodos() {
	const count = todos.filter((todo) => todo.completed).length;
	if (count < 1) return;

	if (window.confirm(`Delete all ${count} completed todos?`)) {
		todos = todos.filter((todo) => !todo.completed);
		renderTodos(todos);
		saveToLocalStorage(todos);
	}
}

function editTodo(event: MouseEvent) {
	if (!(event.target instanceof HTMLSpanElement)) return;

	const id = parseInt(event.target.parentElement!.getAttribute("data-id")!);
	const todoLabel = todos[id].label;

	const input = document.createElement("input");
	input.type = "text";
	input.value = todoLabel;
	event.target.parentElement!.replaceChild(input, event.target);

	function handleEdit(this: HTMLInputElement, event: Event) {
		event.stopPropagation();
		const label = this.value;

		if (label !== todoLabel) {
			todos = todos.map((todo, index) => {
				if (index === id) {
					return {
						...todo,
						label,
					};
				}
				return todo;
			});

			renderTodos(todos);
			saveToLocalStorage(todos);
		}

		// clean up

		// event.target.style.display = ""
		this.removeEventListener("change", handleEdit);
		this.remove();
	}

	input.addEventListener("change", handleEdit);
	input.focus();
}

function init() {
	renderTodos(todos);
	saveToLocalStorage(todos);

	// create todo
	form.addEventListener("submit", addTodo);

	// update todo
	todoList.addEventListener("change", updateTodo);

	// edit todo
	todoList.addEventListener("dblclick", editTodo);

	// update todo
	todoList.addEventListener("click", deleteTodo);

	// clear todos
	clear.addEventListener("click", clearTodos);
}

init();

// Types
type Todo = { label: string; completed: boolean };
function assertInput(
	target: EventTarget | null,
): asserts target is HTMLInputElement {
	if (!(target instanceof HTMLInputElement))
		throw new Error("target is not `instanceof HTMLInputElement`");
}

function isButton(target: EventTarget | null): target is HTMLButtonElement {
	return target instanceof HTMLButtonElement;
}
