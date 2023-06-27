
const task_KEY = 'tasks';

loadTasks();

function loadTasks(){

    const tasks = getTasksFromStorage();
    displayTasks(tasks);
    newTaskInput.focus();
}

function addTask(){

    const isValid = validate();
    if(!isValid) return;

    const task = getTasks();
    const tasks = getTasksFromStorage();

    tasks.unshift(task);

    displayTasks(tasks);

    saveTaskstoStorage(tasks);

    clearForm();
}

function clearTaskForm(){
    clearForm();
}

function getTasks(){

    const newTaskInput = document.getElementById('newTaskInput').value;
    const newDateInput = document.getElementById('newDateInput').value;
    const newTimeInput = document.getElementById('newTimeInput').value;

    return {newTaskInput,newDateInput,newTimeInput};

}

function displayTasks(tasks){

    taskCards.innerHTML = '';

    for(let i = 0; i < tasks.length; i++){

        const taskCard = `

        <div class="card">
            <button class="button" id="${i}" value="delete" onclick="deleteCard(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-x" viewBox="0 0 16 16">
                <path d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"/>
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                </svg>
            </button>
            <div class="text">
                <textarea>${tasks[i].newTaskInput}</textarea> 
                <br><br><br><p>${tasks[i].newDateInput} <br> ${tasks[i].newTimeInput}</p>
            </div>
        </div>`;

        taskCards.innerHTML += taskCard;
        
    }
}

function deleteCard(button) {
    const index = button.id;
    const tasks = getTasksFromStorage();
    tasks.splice(index,1);
    displayTasks(tasks);
    saveTaskstoStorage(tasks);
    }

function validate(){

    const newTaskInput = document.getElementById('newTaskInput').value;
    const newDateInput = document.getElementById('newDateInput').value;
    const newTimeInput = document.getElementById('newTimeInput').value;

    if(newTaskInput === ''){
        alert('Please enter a task');
        return false;
    }
    if(newDateInput === ''){
        alert('Please enter a date');
        return false;
    }
    if(newTimeInput === ''){
        alert('Please enter a time');
        return false;
    }

    return true;
}


function getTasksFromStorage(){

    const str = localStorage.getItem(task_KEY);
    const tasks = ( str === null) ? [] : JSON.parse(str);

    return tasks;

}


function saveTaskstoStorage(alltasks){

    const str = JSON.stringify(alltasks);

    localStorage.setItem(task_KEY,str);
}


function clearForm(){

    document.getElementById('newTaskInput').value = '';
    document.getElementById('newDateInput').value = '';
    document.getElementById('newTimeInput').value = '';
    newTaskInput.focus();
}
