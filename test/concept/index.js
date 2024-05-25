// PROOF OF CONCEPT

const addTaskBtn = document.getElementById("task-button"); 
const deleteLastBtn = document.getElementById("delete-button");
const textField = document.getElementById("text-field");

let list; 

// create queue of list items

let listItems = []

function addTask() {
    const child = document.createElement("li");  
    const node = document.createTextNode(textField.value); 
    child.appendChild(node); 

    list = document.getElementById("task-list"); 
    list.appendChild(child); 

    listItems.push(child); 
}

function deleteTask() {
    list.removeChild(listItems.shift()); 
}

addTaskBtn.addEventListener("click", addTask); 
deleteLastBtn.addEventListener("click", deleteTask); 

