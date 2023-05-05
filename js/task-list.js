document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    if(title && description){
        let id = generateId();
        const task = {
            title, //title: title
            description, //description: description
            id
        };

        if(localStorage.getItem('tasks') === null){
            let tasks = [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        else{
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        getTasks();
        document.getElementById('formTask').reset();
    }   
    e.preventDefault();
}

function generateId(){

    let ultimoId = 1;

    if(localStorage.getItem('tasks') || localStorage.getItem('doneTasks')){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let doneTasks = JSON.parse(localStorage.getItem('doneTasks'));
        if(tasks){
            for(let i = 0; i < tasks.length; i++){
                if(tasks[i].id > ultimoId){
                    ultimoId = tasks[i].id;
                }
            }
        }
        if(doneTasks){
            for(let i = 0; i < doneTasks.length; i++){
                if(doneTasks[i].id > ultimoId){
                    ultimoId = doneTasks[i].id;
                }
            }
        }
        ultimoId += 1;
    }
    return ultimoId;
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');
    tasksView.innerHTML = ''; //limpiamos los datos.

    if(tasks){
        for(let i = 0; i < tasks.length; i++){
            let title = tasks[i].title;
            let description = tasks[i].description;
            let id = tasks[i].id;
            //accedo al html de tasks
            tasksView.innerHTML += `<div class="card mb-3 bg-dark shadow-lg"> 
                <div class="card-body">
                    <h3 class="text bold">${title}</h3> 
                    <p class="text taskDescription">${description}</p>
                    <div class="d-flex justify-content-end">
                        <a class="btn btn-outline-success mx-1" onclick="markDone('${id}')">
                            Done
                        </a>
                        <a class="btn btn-outline-danger mx-1" onclick="deleteTask('${id}')">
                            Delete
                        </a>
                    </div>
                </div>
            </div>`;//uso ` para cambiar el html del elemento elegido.
        }
    }
}

function getDoneTasks(){
    let doneTasks = JSON.parse(localStorage.getItem('doneTasks'));
    let doneTasksView = document.getElementById('doneTasks');
    doneTasksView.innerHTML = '';

    if(doneTasks){
        for(let i = 0; i < doneTasks.length; i++){
            let title = doneTasks[i].title;
            let description = doneTasks[i].description;
            let id = doneTasks[i].id;

            doneTasksView.innerHTML += `<div class="card mb-3 bg-dark opacity-75 shadow-lg"> 
            <div class="card-body">
                <h3 class="text bold">${title}</h3> 
                <p class="text taskDescription">${description}</p>
                <div class="d-flex justify-content-end">
                    <a class="btn btn-outline-danger" onclick="deleteDoneTask('${id}')">
                        Delete
                    </a>
                </div>
            </div>`;
        }
    }
}

function deleteTask(id){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let deletedTask;
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id == id){
            deletedTask = tasks[i];
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
    return deletedTask;
}

function deleteDoneTask(id){
    let doneTasks = JSON.parse(localStorage.getItem('doneTasks'));
    for(let i = 0; i < doneTasks.length; i++){
        if(doneTasks[i].id == id){
            doneTasks.splice(i, 1);
        }
    }
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    getDoneTasks();
}

function markDone(id){ 
    let doneTask = deleteTask(id);
    if(localStorage.getItem('doneTasks') === null){
        let doneTasks = [];
        doneTasks.push(doneTask);
        localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    }
    else{
        let doneTasks = JSON.parse(localStorage.getItem('doneTasks'));
        doneTasks.push(doneTask);
        localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    }
    getTasks();
    getDoneTasks();
}

getTasks();

getDoneTasks();

const lightModeButton = document.getElementById('lightModeButton');

lightModeButton.addEventListener('click', ()=>{
    const body = document.body;
    body.classList.toggle('lightMode');
    
})





