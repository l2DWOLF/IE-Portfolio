//-----Drag & Drop Functionality------// 
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("on-drag");
    })
    task.addEventListener("dragend", () => {
        task.classList.remove("on-drag");
    })
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
        const currentTask = document.querySelector(".on-drag");
        if (!bottomTask) {
            zone.appendChild(currentTask);
            tManager.saveTasks();
        }
        else {
            zone.insertBefore(currentTask, bottomTask);
        }
    });
});

const insertAboveTask = (zone, mouseY) => {
    const elements = zone.querySelectorAll(".task:not(.on-drag)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    elements.forEach((task) => {
        const { top } = task.getBoundingClientRect();
        const offset = mouseY - top;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;

            task.status = zone.id;
            tManager.saveTasks();
        };

    });
    return closestTask;
};
//-----Drag & Drop Functionality End------// 