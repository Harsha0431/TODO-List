import { TodoService } from '../features/todo/service/todo.service';

const addNewTodoTaskFormContainer: HTMLFormElement | null = document.getElementById("add-todo-task") as HTMLFormElement;
const todoService = new TodoService();

async function handleCreateNewTask(e: SubmitEvent){
    e.preventDefault();
    if(!addNewTodoTaskFormContainer)
        return;

    const formData = new FormData(addNewTodoTaskFormContainer);
    const title = formData.get("title");
    if(!title)
        return;

    const createdTask = await todoService.create(title.toString());
    console.log("Task created: ", createdTask);
}

async function loadTodoListTasks(){
    const data = await todoService.getTodos();
    console.log("Loaded TODO Tasks: ", data);
}

function loadData(){
    console.log("Data loading initiated...");

    Promise.allSettled([
        loadTodoListTasks()
    ]);
}

// Adding event listeners
if(addNewTodoTaskFormContainer){
    addNewTodoTaskFormContainer.addEventListener('submit', handleCreateNewTask);
}

document.addEventListener('DOMContentLoaded', loadData);