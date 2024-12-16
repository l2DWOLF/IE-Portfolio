import {TaskManager} from './manager.js';
let id = 1;


class Task
{
    constructor(title, tManager, status)
    {
    this.manager = tManager;
    this.id = id++;
    this.completed = false;
    this.selectList = document.createElement("select");
    this.status = null;
    
    if(status == null)
    {this.status = "To Do Lane";}
    else
    {this.status = status;}
    
    //TaskCard Div// 
    this.taskCard = document.createElement("div");
    this.taskCard.classList.add("task");
    this.taskCard.setAttribute("draggable", true);

        this.taskCard.addEventListener("dragstart", () => {
            this.taskCard.classList.add("on-drag");
        });
        this.taskCard.addEventListener("dragend", () => {
            this.taskCard.classList.remove("on-drag");
        });
    this.moveIt(this.status);
    //TaskCard Div End// 
    
    //Title//
    this.title = document.createElement("p");
    this.title.innerText = title;
    this.title.style = "width: 100%"; 
    //Title End//

    //Edit Button//
    this.editBtn = document.createElement("button");
    this.editBtn.classList.add("edit-btn");
    this.editBtn.innerHTML = "Edit";

    this.editBtn.addEventListener('click', () => {
        this.editTask();
    });
    //Edit Button End//
    
    //Move Button//
    this.moveBtn = document.createElement("button");
    this.moveBtn.classList.add("move-btn");
    this.moveBtn.innerHTML = "move";

    this.moveBtn.addEventListener('click', () => {
        this.moveTask();
    });
    //Edit Button End//
    
    //Delete Button//
    this.deleteBtn = document.createElement("button");
    this.deleteBtn.classList.add("delete-btn");
    this.deleteBtn.innerHTML = "Delete";

    this.deleteBtn.addEventListener('click', () => {
        this.deleteTask();
    });
    //Delete Button End//

    //Task Card Elements//
    this.taskCard.appendChild(this.title);
    this.taskCard.appendChild(this.editBtn);
    this.taskCard.appendChild(this.moveBtn);
    this.taskCard.appendChild(this.deleteBtn);
    //Task Card Elements End//
    };

    //-----Class Methods-----//

    editTask()
    {   //Object performs self edit
        let input = document.createElement("input");
        input.style = "font-size: 1rem;"

        let confirmEdit = document.createElement("button");
        confirmEdit.classList.add("edit-btn");
        confirmEdit.innerHTML = "Save";

        if(this.taskCard.contains(this.selectList))
        {this.moveIt("Close");};

        this.taskCard.appendChild(confirmEdit);
        this.taskCard.appendChild(input);
        this.editBtn.style = "display:none";
        this.moveBtn.style = "display:none";
        this.deleteBtn.style = "display:none";
        
        confirmEdit.addEventListener('click', () => {

            if (input.value != "") {
                this.title.innerText = input.value;
            }

            this.taskCard.removeChild(confirmEdit);
            this.taskCard.removeChild(input);
            this.editBtn.style = "display:block";
            this.moveBtn.style = "display:block";
            this.deleteBtn.style = "display:block";
            this.manager.saveTasks();
        });
    }

    moveTask()
    {
        if (this.taskCard.contains(this.selectList) === false)
        {
        
        this.selectHolder = document.createElement("option");
        this.selectHolder.innerText = "Select a Lane";
        this.selectTodo = document.createElement("option");
        this.selectTodo.innerText = "To Do Lane";
        this.selectProgress = document.createElement("option");
        this.selectProgress.innerText = "In Progress Lane";
        this.selectCompleted = document.createElement("option");
        this.selectCompleted.innerText = "Completed Lane";
        this.selectCancel = document.createElement("option");
        this.selectCancel.innerText = "Close";
        this.selectCancel.style = "background: rgba(255, 0, 0, 0.647)";

            this.selectList.appendChild(this.selectHolder);
            this.selectList.appendChild(this.selectTodo);
            this.selectList.appendChild(this.selectProgress);
            this.selectList.appendChild(this.selectCompleted);
            this.selectList.appendChild(this.selectCancel);
        
            this.taskCard.appendChild(this.selectList);

            this.selectList.addEventListener('change', (e) => {
                let newLane = e.target.value;
                this.moveIt(newLane);
                
            })
        }
        else
        {
            this.moveIt("Close");
        };
        
    }
    moveIt(newLane) 
    {
        if (newLane == "To Do Lane") {
            this.manager.todoLane.appendChild(this.taskCard);
            this.status = newLane;
            this.manager.saveTasks();
        }
        else if (newLane == "In Progress Lane") {
            this.manager.progressLane.appendChild(this.taskCard);
            this.status = newLane;
            this.manager.saveTasks();
        }
        else if (newLane == "Completed Lane") {
            this.manager.completedLane.appendChild(this.taskCard);
            this.status = newLane;
            this.manager.saveTasks();
        }
        else if (newLane == "Close")
        {
            this.selectList.removeChild(this.selectHolder);
            this.selectList.removeChild(this.selectTodo);
            this.selectList.removeChild(this.selectProgress);
            this.selectList.removeChild(this.selectCompleted);
            this.selectList.removeChild(this.selectCancel);

            this.taskCard.removeChild(this.selectList);
        }

        if (this.taskCard.contains(this.selectList)) {
            this.taskCard.removeChild(this.selectList);

            this.selectList.removeChild(this.selectHolder);
            this.selectList.removeChild(this.selectTodo);
            this.selectList.removeChild(this.selectProgress);
            this.selectList.removeChild(this.selectCompleted);
            this.selectList.removeChild(this.selectCancel);
        }
    }

    deleteTask()
    {   //Object calls Manager Class delete
        let confirmDlt = document.createElement("button");
        confirmDlt.classList.add("edit-btn");
        confirmDlt.innerHTML = "Confirm?";

        let cancelDlt = document.createElement("button");
        cancelDlt.classList.add("edit-btn");
        cancelDlt.innerHTML = "Cancel";

        if (this.taskCard.contains(this.selectList)) {
            this.moveIt("Close");
        };

        this.taskCard.appendChild(confirmDlt);
        this.taskCard.appendChild(cancelDlt);
        this.deleteBtn.style = "display:none";
        this.moveBtn.style = "display:none";
        this.editBtn.style = "display:none";

        confirmDlt.addEventListener('click', () => {
            this.manager.deleteTask(this.id);
            this.deleteBtn.style = "display:block";
        });
        cancelDlt.addEventListener('click', () => {
            this.deleteBtn.style = "display:block";
            this.editBtn.style = "display:block";
            this.moveBtn.style = "display:block";
            this.taskCard.removeChild(confirmDlt);
            this.taskCard.removeChild(cancelDlt);
        });
    }
    //-----Class Methods End-----//
};
export{Task};