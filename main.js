/** MAIN */

const main = () => {    
    // LOCAL STORAGE
    // load HTML content
    const htmlContent = localStorage.getItem("savedHTML"); 
    if (htmlContent !== null && htmlContent != "") {
        let root = document.getElementById("root"); 
        root.innerHTML = ""; 
        document.documentElement.innerHTML += htmlContent; 
    }
    // save button
    const saveButton = document.getElementById("save-button"); 
    // hack solution with counter: fix later and solve the double click mystery
    // why does the method need to run twice to save? the input updates after one click successfully
    let counter = 0; 
    saveButton.addEventListener("click", () => {
        while (counter < 2) {
            // save HTML content 
            localStorage.setItem("savedHTML", document.documentElement.innerHTML); 
            // update all the values in the input boxes
            let inputList = document.getElementsByTagName("input"); 
            console.log(inputList); 
            for (let i = 0; i < inputList.length; i++) {
                inputList[i].setAttribute("value", inputList[i].value); 
            }
            counter++; 
        }
    });
    // clear button
    const clearButton = document.getElementById("clear-button"); 
    clearButton.addEventListener("click", () => {
        // clear storage
        localStorage.setItem("savedHTML", ""); 
    }); 

    // initialize title and text elements
    const titleDiv = document.getElementById("title");
    const defaultTitle = document.getElementById("title-1-div");
    const defaultTrashBtn = defaultTitle.lastChild.previousSibling; 
    const createTitleBtn = document.getElementById("create-title"); 
    let titleType = "title"; 
    const titleSection = new Section(titleDiv, defaultTitle, defaultTrashBtn, createTitleBtn, titleType); 

    const textDiv = document.getElementById("text");
    const defaultText = document.getElementById("text-1-div");
    const defaultTextTrashBtn = defaultText.lastChild.previousSibling; 
    const createTextBtn = document.getElementById("create-text"); 
    let textType = "text"; 
    const textSection = new Section(textDiv, defaultText, defaultTextTrashBtn, createTextBtn, textType); 

    // initialize all list elements for each day of the week 
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "other"]
    days.forEach((day) => {
        const listDiv = document.getElementById(day + "-div");
        const defaultListElem = document.getElementById(day + "-1-div");
        const defaultInputElem = document.getElementById(day + "-1-input");
        const defaultListTrashBtn = defaultListElem.lastChild.previousSibling; 
        const createListElemBtn = document.getElementById("create-item-" + day); 
        let listType = day; 
        const defaultListUpBtn = document.getElementById(day + "-1-up"); 
        const defaultListDownBtn = document.getElementById(day + "-1-down"); 
        const defaultListColorBtn = document.getElementById(day + "-1-color")
        const daySection = new ListItem(listDiv, defaultListElem, defaultInputElem, defaultListTrashBtn, createListElemBtn, listType, defaultListUpBtn, defaultListDownBtn, defaultListColorBtn);
    }); 
}
main(); 

/** CONCEPT: CREATE AND DELETE TITLES */

/*
// button that creates child elements within the title div element
const createTitleBtn = document.getElementById("create-title"); 

// larger title section containing smaller elements
const titleDiv = document.getElementById("title");
let titleCounter = 1; 

// default title div element
const defaultTitle = document.getElementById("title-1-div");

// create empty list of trash buttons to add to later
const defaultButton = defaultTitle.lastChild.previousSibling; 
defaultButton.addEventListener("click", () => deleteTitle(1)); 
let trashButtons = [defaultButton]; 
*/

/** Adds a title element to the the larger title div */

/*
const addTitle = () => {
    // create a clone of the default elements and their children 
    const titleClone = defaultTitle.cloneNode(true);
    titleCounter++; 
    // change ids of div, input, and button
    titleClone.id = "title-" + titleCounter + "-div"; 
    titleClone.firstChild.nextSibling.id = "title-" + titleCounter + "-input"
    // set default text to Untitled
    titleClone.firstChild.nextSibling.value = "Untitled"; 
    titleClone.lastChild.previousSibling.id = "title-" + titleCounter + "-button";  
    // add trash button to list
    let currentTrashBtn = titleClone.lastChild.previousSibling; 
    trashButtons.push(currentTrashBtn); 
    // add to larger div chain
    titleDiv.appendChild(titleClone);

    // for each trash button, add function with specific div ids
    for (let i = 0; i < trashButtons.length; i++) {
        // wrap with another function to prevent immediate execution
        trashButtons[i].addEventListener("click", () => deleteTitle(i + 1)); 
    }
}
createTitleBtn.addEventListener("click", addTitle); 
*/

/** Deletes the corresponding title element with the trash button */

/*
const deleteTitle = (divNum) => {
    const siblingDiv = document.getElementById("title-" + divNum + "-div");
    if (divNum == 1) {
        // reset text if first title is "deleted"
        siblingDiv.firstChild.nextSibling.value = "Untitled"; 
    } else if (divNum != 1) {
        titleDiv.removeChild(siblingDiv); 
        // decrease counter and remove button from list
        titleCounter--; 
        trashButtons = trashButtons.filter((btn) => btn.id !== "title-" + divNum + "-button"); 
    }
}
*/

/** CONCEPT: PROOF */ 

/*
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
*/

