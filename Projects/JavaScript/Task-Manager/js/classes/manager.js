import {Task} from './todo.js';



class TaskManager
{
    constructor()
    {
        this.taskList = [];
        this.localData = [];
        const form = document.getElementById("tasks-form");
        const input = document.getElementById("task-input");
        this.todoLane = document.getElementById("todo-lane");
        this.progressLane = document.getElementById("progress-lane");
        this.completedLane = document.getElementById("completed-lane");
        
        this.loadFiles();

        // Add Task Btn // 
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const value = input.value;
            if (!value) return;

            this.addTask(value);
            input.value = "";
        });
        // Add Task Btn //

        // Delete All Btn // 
        this.deleteAllBtn = document.getElementById("deleteAll");

        this.deleteAllBtn.addEventListener("click", (e) => {
            this.deleteAll();
        })
    }
    //Add Task//
    addTask(title, status)
    {   
        this.taskList.push(new Task(title, this, status));
        this.saveTasks();
    };
    //Load Files// 
    loadFiles() 
    {
        this.localData = localStorage.getItem("List");
        this.localData = eval(this.localData);

        if(this.localData != null)
        {
            this.localData.forEach((task) => {
                this.addTask(task.taskTitle, task.taskStatus);
            });
        };
    };
    //Save Tasks//
    saveTasks()
    {
        const storedList = [];
        this.taskList.forEach((task) => {
            const taskTitle = task.title.innerText;

            if (this.todoLane.contains(task.taskCard))
            {task.status = "To Do";}
            else if (this.progressLane.contains(task.taskCard))
            { task.status = "In Progress";}
            else if (this.completedLane.contains(task.taskCard))
            { task.status = "Completed";}

            const taskStatus = task.status;
            storedList.push({taskTitle, taskStatus});
        });
        
        let jsonList = JSON.stringify(storedList);
        localStorage.clear("List");
        localStorage.setItem("List", jsonList);
    }
    //Delete Task//
    deleteTask(id)
    {
        let indexToUpdate = this.taskList.findIndex((task) => task.id == id);

        if(this.todoLane.contains(this.taskList[indexToUpdate].taskCard))
        {this.todoLane.removeChild(this.taskList[indexToUpdate].taskCard);}
        else if (this.progressLane.contains(this.taskList[indexToUpdate].taskCard))
        {this.progressLane.removeChild(this.taskList[indexToUpdate].taskCard);}
        else if (this.completedLane.contains(this.taskList[indexToUpdate].taskCard)) { this.completedLane.removeChild(this.taskList[indexToUpdate].taskCard);}

        this.taskList = this.taskList.filter((task) => task.id !== id);
        this.saveTasks();
    };
    deleteAll()
    {   
        if (window.confirm("Delete All?"))
        {
            this.taskList.forEach((task) => {
                this.deleteTask(task.id);
            });
            localStorage.clear("List");
            this.loadFiles();
        }
        
    }
};
export{TaskManager};
