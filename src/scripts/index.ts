import type { TODO } from '../features/todo/model/todo.types';
import { TodoService } from '../features/todo/service/todo.service.js';
import { sortTasksByDate } from '../utils/todo/filterAndSortTasks.js';

const addNewTodoTaskFormContainer: HTMLFormElement | null = document.getElementById("add-todo-task") as HTMLFormElement;
const todoListContainer: HTMLElement | null = document.getElementById("task-list-container");

const todoService = new TodoService();


function showMessage(message: string){
    // TODO: Complete this
}

function createTodoTaskCard(clone: DocumentFragment, task: TODO): DocumentFragment {
    const card = clone.querySelector<HTMLLIElement>("li");
    if(card){
        card.dataset.id = task.id;
    }

    const titleElement = clone.querySelector<HTMLHeadElement>("h2");
    if(titleElement) titleElement.textContent = task.title;

    const createdAtElement = clone.querySelector<HTMLParagraphElement>("p");
    if(createdAtElement) createdAtElement.textContent = new Date(task.createdAt).toISOString();

    return clone;
}

function renderTodoListItems(data: TODO[]){
    try{
        // Sort data by date (i.e., createdAt)
        data = sortTasksByDate(data);

        if(!todoListContainer || !(todoListContainer instanceof HTMLUListElement))
            throw new Error("");
        
        const template: HTMLElement | null = document.getElementById("task-item-card");
        if(!template || !(template instanceof HTMLTemplateElement))
            throw new Error("Item template not found. DOM Error");
        
        const fragment: DocumentFragment = document.createDocumentFragment();
        if(data.length > 0){
            data.forEach((task: TODO) => {
                const clone = template.content.cloneNode(true) as DocumentFragment;
                fragment.appendChild(createTodoTaskCard(clone, task));
            });
        }
        else{
            // TODO: Show default no tasks
        }

        todoListContainer.innerHTML = '';
        todoListContainer.appendChild(fragment);
    }
    catch(err: unknown){
        console.error("[src.scripts.index] renderTodoListItems: ", err);
        if(err instanceof Error)
            showMessage(err.message);
        else
            showMessage("Something went wrong");
    }
}

async function handleCreateNewTask(e: SubmitEvent){
    e.preventDefault();
    try{
        if(!addNewTodoTaskFormContainer)
            throw new Error("No form container found");
    
        const formData = new FormData(addNewTodoTaskFormContainer);
        const title = formData.get("title");
        if(!title)
            throw new Error("Failed to read new task title.");
    
        const updatedTaskList = await todoService.create(title.toString());

        if(updatedTaskList)
            renderTodoListItems(updatedTaskList);
    }
    catch(err){
        console.error("[src.scripts.index] handleCreateNewTask: ", err);

        if(err instanceof Error)
            showMessage(err.message);
        else
            showMessage("Something went wrong: " + err);
    }
}

async function loadTodoListTasks(){
    const data: TODO[] = await todoService.getTodos();
    renderTodoListItems(data);
}

function loadData(){
    console.log("Data loading initiated...");

    Promise.allSettled([
        loadTodoListTasks()
    ]);
}

async function deleteTodoTask(id: string){
    try{
        const updatedTasks: TODO[] = await todoService.delete(id);
        renderTodoListItems(updatedTasks);
    }
    catch(err){
        showMessage("Something went wrong: " + err);
    }
}

/**
 * @param e: MouseEvent
 * 
 * Here the possibile action items in card are
 * 1. Delete task
 * 2. Update task status `mark-as-done` and `completed` (disabled)
 */
async function handleDelegateClickOnTaskList(e: MouseEvent){
    const target = e.target as HTMLElement;

    const closestAction = target.closest("[data-action]") as HTMLElement | null;

    if (!closestAction) return;

    const closestTask = target.closest("[data-id]") as HTMLElement | null;
    
    if(!closestTask) return;
    
    const taskId = closestTask?.dataset.id;

    if(!taskId)
        return;

    if(closestAction.dataset.action?.includes('delete')){
        await deleteTodoTask(taskId);
    }
    else if(closestAction.dataset.action?.includes('task-status-pending')){
        // Mark task as done
    }
    else if(closestAction.dataset.action?.includes("task-status-done")){
        // mark status as incompleted
    }
}

// Adding event listeners
if(addNewTodoTaskFormContainer){
    addNewTodoTaskFormContainer.addEventListener('submit', handleCreateNewTask);
}

if(todoListContainer){
    todoListContainer.addEventListener("click", handleDelegateClickOnTaskList);
}

document.addEventListener('DOMContentLoaded', loadData);