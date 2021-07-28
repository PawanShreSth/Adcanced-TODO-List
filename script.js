const form = document.querySelector('#new-todo-form');
const todoInput = document.querySelector('#todo-input');
const template = document.querySelector('#list-item-template');
const list = document.querySelector('#list')

form.addEventListener('submit', e => {
    e.preventDefault();



    const todoName = todoInput.value;

    if (todoName === '') return;
    
    renderTodo(todoName);

    todoInput.value = "";

});

function renderTodo(todoName) {
    const templateClone = template.content.cloneNode(true);
    const textElement = templateClone.querySelector('[data-list-item-text]');
    
    textElement.innerText = todoName;

    list.appendChild(templateClone)
}

