document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todoForm');
    const todosDiv = document.getElementById('todos');

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todosDiv.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoElement = document.createElement('div');
            todoElement.classList.add('todo-item');
            if (todo.completed) {
                todoElement.classList.add('completed');
            }
            todoElement.innerHTML = `
                <div>
                    <div class="todo-title">${todo.title}</div>
                    <div class="todo-description">${todo.description}</div>
                </div>
                <button class="complete-button">Completed</button>
            `;
            const completeButton = todoElement.querySelector('.complete-button');
            completeButton.addEventListener('click', () => {
                markTodoComplete(index);
            });
            todosDiv.appendChild(todoElement);
        });
    }

    function handleAddTodo(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ title, description, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        form.reset();
        loadTodos();
    }

    function markTodoComplete(index) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos[index].completed = true;
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }

    form.addEventListener('submit', handleAddTodo);

    loadTodos();
});
