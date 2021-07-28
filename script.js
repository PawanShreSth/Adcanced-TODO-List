const form = document.querySelector('#new-todo-form');
const todoInput = document.querySelector('#todo-input');
const template = document.querySelector('#list-item-template');
const list = document.querySelector('#list')
const LOCAL_STORAGE_PREFIX = 'ADVANCED_TODO_LIST';
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;
let todos = loadTodos();

todos.forEach(renderTodo);

list.addEventListener('change', e => {
    if(!e.target.matches('[data-list-item-checkbox]')) return;
    const listItem = e.target.closest('.list-item');
    const todo = todos.find(todo => todo.id === listItem.dataset.id);

    todo.complete = e.target.checked;
    saveTodos();

});

list.addEventListener('click', e => {
    if (!e.target.matches('[data-button-delete]')) return;

    const listItem = e.target.closest('.list-item');

    todos = todos.filter(todo => todo.id !== listItem.dataset.id);
    saveTodos();

    listItem.remove();
})

form.addEventListener('submit', e => {
    e.preventDefault();



    const todoName = todoInput.value;

    if (todoName === '') return;

    const newTodo = {
        id: new Date().valueOf().toString(),
        name: todoName,
        complete: false,
    }
    
    todos.push(newTodo);
    renderTodo(newTodo);
    saveTodos();
    todoInput.value = "";

});

function renderTodo(todo) {
    const templateClone = template.content.cloneNode(true);
    const listItem = templateClone.querySelector('.list-item');
    const textElement = templateClone.querySelector('[data-list-item-text]');
    const checkbox = templateClone.querySelector('[data-list-item-checkbox]')

    listItem.dataset.id = todo.id;
    textElement.innerText = todo.name;

    checkbox.checked = todo.complete;
    

    list.appendChild(templateClone)
}

function loadTodos() {
    const todosString = localStorage.getItem(TODOS_STORAGE_KEY);
    return JSON.parse(todosString) || [];
}

function saveTodos() {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}

