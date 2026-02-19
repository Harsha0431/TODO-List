import { formButtonLabels } from '../constants/formData.js';
import type { TODO } from '../features/todo/model/todo.types';
import { TodoService } from '../features/todo/service/todo.service.js';
import debounce from '../utils/debounce.js';
import formatDate from '../utils/formatDate.js';
import { sortTasksByDate } from '../utils/todo/filterAndSortTasks.js';

const addNewTodoTaskFormContainer: HTMLFormElement | null = document.getElementById("add-todo-task") as HTMLFormElement;
const todoListContainer: HTMLElement | null = document.getElementById("task-list-container");
const formButtonGrp: HTMLElement | null = document.getElementById("form-btn-grp");
const formTitleElement: HTMLElement | null = document.getElementById("add-todo-task__title");
const formSearchStatusSelect: HTMLElement | null = document.getElementById("form-search-status");

const todoService = new TodoService();

let prevToastTimeoutId: number;
function showMessage(message: string){
    const messageContainer: HTMLElement | null = document.getElementById("message");
    const toastContainer: HTMLElement | null = document.getElementById("toast-container");

    if(messageContainer && messageContainer instanceof HTMLParagraphElement && toastContainer){
        clearTimeout(prevToastTimeoutId);

        messageContainer.textContent = message;
        delete toastContainer.dataset.hidden;
        
        prevToastTimeoutId = setTimeout(()=>{
            messageContainer.textContent = '';
            toastContainer.dataset.hidden = 'true';
        }, 5000);
    }
}

function modifyInputPlaceholder(inputElement: HTMLInputElement, message: string){
    inputElement.placeholder = message;
}

function getSeletedFormActionMode(): string {
    if(!formButtonGrp) return "search";

    const buttonsList: Element[] = Array.from(formButtonGrp.children);
    let label = 'search';
    buttonsList.every(button => {
        if(button instanceof HTMLButtonElement){
            if(button.dataset.selected == 'true'){
                label = button.dataset.label ?? '';
                return false;
            }
            return true;
        }
    });

    return label;
}

function handleFormActionModeSelect(e: MouseEvent){
    const target = e.target as HTMLElement;
    const closestAction = target.closest("[data-action]") as HTMLElement | null;
    
    if (!closestAction || !formButtonGrp) return;

    if(closestAction.dataset.selected == 'true')
        return;  // This is handled by `submit` event on the form

    e.preventDefault();

    const buttonsList = Array.from(formButtonGrp.children);
    const inputElement = document.getElementById("add-todo-task__title") as HTMLInputElement;
    const closestButtonLabel: string = closestAction.dataset.label ?? '';

    buttonsList.forEach((button)=>{
        if(!(button instanceof HTMLButtonElement)) return;
        
        if(button.dataset.label === closestButtonLabel){
            button.type = 'submit';
            button.dataset.selected = 'true';
        }
        else{
            button.type = 'button';
            delete button.dataset.selected;
        }
    });

    let labelMessage = 'Search task by title or add a new task';
    if(closestButtonLabel === 'add' || closestButtonLabel === 'search'){
        labelMessage = formButtonLabels[closestButtonLabel];
    }
    
    if(inputElement)
        modifyInputPlaceholder(inputElement, labelMessage);
}

function createTodoTaskCard(clone: DocumentFragment, task: TODO): DocumentFragment {
    const card = clone.querySelector<HTMLLIElement>("li");
    if(card){
        card.dataset.id = task.id;
    }

    const titleElement = clone.querySelector<HTMLHeadElement>("h2");
    if(titleElement) titleElement.textContent = task.title;

    const createdAtElement = clone.querySelector<HTMLParagraphElement>("p");
    if(createdAtElement) createdAtElement.textContent = formatDate(task.createdAt);
    
    const buttonGroup = clone.querySelector('.button-grp') as HTMLElement;

    if(task.completed){
        const actionBtn = document.getElementById("task-status-done-btn") as HTMLTemplateElement;
        const clone = actionBtn.content.cloneNode(true) as HTMLTemplateElement;
        buttonGroup.append(clone);
    }
    else{
        const actionBtn = document.getElementById("task-status-pending-btn") as HTMLTemplateElement;
        const clone = actionBtn.content.cloneNode(true) as HTMLTemplateElement;
        buttonGroup.append(clone);
    }

    return clone;
}

function renderTodoListItems(data: TODO[], isSearching: boolean = true){
    try{
        // Sort data by date (i.e., createdAt)
        data = sortTasksByDate(data);

        const formFilterStatus = getSelectedFormFilterStatus();
        const showAllTasks = formFilterStatus === 'all';
        const showCompletedTasks = formFilterStatus === 'completed';
        data = data.filter( task => (task.completed === showCompletedTasks) || showAllTasks);

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
            const noDataMessage: HTMLParagraphElement = document.createElement('p');
            if (isSearching)
                noDataMessage.textContent = "No tasks match your search.";
            else
                noDataMessage.textContent = "No tasks yet. Create your first task to get started.";

            noDataMessage.classList.add('text-warning')

            fragment.appendChild(noDataMessage);
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

function getTitleFromFormData(): string{
    if(!addNewTodoTaskFormContainer)
        throw new Error("No form container found");

    const formData: FormData = new FormData(addNewTodoTaskFormContainer);
    const title = formData.get("title");
    if(!title)
        throw new Error("Failed to read new task title.");

    return title.toString();
}

function getFormData(): {title: string, status: string} {
    if(!addNewTodoTaskFormContainer)
        throw new Error("No form container found");

    const formData: FormData = new FormData(addNewTodoTaskFormContainer);
    const title = formData.get("title");
    if(title == null)
        throw new Error("Failed to read new task title.");
    
    const filter =getSelectedFormFilterStatus();

    return {
        title: title.toString(),
        status: filter.toString()
    };
}

function getSelectedFormFilterStatus(): string{
    if(formSearchStatusSelect && formSearchStatusSelect instanceof HTMLSelectElement){
        return formSearchStatusSelect.value;
    }

    return 'all';
}

async function handleCreateNewTask(e: SubmitEvent){
    try{
        if(!addNewTodoTaskFormContainer)
            throw new Error("No form container found");
    
        const formData = new FormData(addNewTodoTaskFormContainer);
        const title = getTitleFromFormData();
    
        const updatedTaskList = await todoService.create(title.toString());

        if(updatedTaskList){
            formData.set('title', '');
            renderTodoListItems(updatedTaskList);
        }
    }
    catch(err){
        console.error("[src.scripts.index] handleCreateNewTask: ", err);

        if(err instanceof Error)
            showMessage(err.message);
        else
            showMessage("Something went wrong: " + err);
    }
}

async function handleFromTaskSearch(value?: string) {
    const formActionMode = getSeletedFormActionMode();
    if(formActionMode !== 'search') return;

    if(typeof value !== 'string' && typeof value !== 'undefined') return;
    
    try{
        const formData = getFormData();
        const searchQuery = value ?? formData.title;
        const relatedData: TODO[] = await todoService.search(searchQuery, formData.status);
        renderTodoListItems(relatedData);
    }
    catch(err){
        console.error("[src.scripts.index] handleFromTaskSearch: ", err);
        showMessage("Failed to search for related tasks: " + err);
    }
}

async function handleFormSubmit(e: SubmitEvent){
    e.preventDefault();
    const submitter = e.submitter;

    if(submitter instanceof HTMLButtonElement){
        if(submitter.dataset.action?.includes("add")){
            await handleCreateNewTask(e);
        }
        else if(submitter.dataset.action?.includes("search")){
            await handleFromTaskSearch();
        }
    }
}

async function loadTodoListTasks(){
    const data: TODO[] = await todoService.getTodos();
    renderTodoListItems(data, false);
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
        renderTodoListItems(updatedTasks, false);
    }
    catch(err){
        showMessage("Something went wrong: " + err);
    }
}

async function toogleTodoTaskStatus(id: string){
    try{
        const updatedData: TODO[] | null = await todoService.toggle(id);
        if(!updatedData) throw new Error("Failed to update task status");

        renderTodoListItems(updatedData);
    }
    catch(err){
        console.error("[src.scripts.index] toogleTodoTaskStatus: ", err);
        if(err instanceof Error)
            showMessage(err.message);
        else
            showMessage("Something went wrong due to " + err);
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

    if(closestAction.dataset.action?.includes('delete'))
        await deleteTodoTask(taskId);
    else if(closestAction.dataset.action?.includes('task-status-pending') || closestAction.dataset.action?.includes("task-status-done"))
        await toogleTodoTaskStatus(taskId);
}

// Adding event listeners
if(addNewTodoTaskFormContainer){
    addNewTodoTaskFormContainer.addEventListener('submit', handleFormSubmit);
}

if(todoListContainer){
    todoListContainer.addEventListener("click", handleDelegateClickOnTaskList);
}

if(formButtonGrp){
    formButtonGrp.addEventListener("click", handleFormActionModeSelect)
}

if(formTitleElement && (formTitleElement instanceof HTMLInputElement)){
    const debouncedSearch = debounce(handleFromTaskSearch, 400);

    formTitleElement.addEventListener("input", (e) => {
        const target = e.target as HTMLInputElement;
        debouncedSearch(target.value);
    });
}

if(formSearchStatusSelect && formSearchStatusSelect instanceof HTMLSelectElement){
    formSearchStatusSelect.addEventListener('change', (e)=>{
        handleFromTaskSearch('');
    })
}

document.addEventListener('DOMContentLoaded', loadData);