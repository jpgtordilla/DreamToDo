// TODO: 
// - fix loading issue with list buttons

/** LIST ITEM CLASS */

const emptyArray = (arr) => {
    while(arr.length > 0) {
        arr.pop();
    }
}

class ListItem extends Section {
    // static variable for tracking color background
    colorCounter = 0;

    constructor(div, defaultDivElem, defaultInputElem, defaultTrashBtn, createBtn, listType, defaultUpBtn, defaultDownBtn, defaultColorBtn) {
        super(div, defaultDivElem, defaultTrashBtn, createBtn, listType);
        
        this.defaultInputElem = defaultInputElem; 
        this.defaultUpBtn = defaultUpBtn; 
        this.defaultDownBtn = defaultDownBtn; 
        this.defaultColorBtn = defaultColorBtn; 
        
        // empty array to enable swapping
        this.listDivElems = []; 
        emptyArray(this.listDivElems); 
        this.listInputElems = []; 
        emptyArray(this.listInputElems); 
        this.listUpBtn = []; 
        emptyArray(this.listUpBtn); 
        this.listDownBtn = []; 
        emptyArray(this.listDownBtn); 
        this.listColorBtn = []; 
        emptyArray(this.listColorBtn); 

        // this.listDivElems.push(defaultDivElem); 
        // this.listInputElems.push(defaultInputElem); 
        // this.listUpBtn.push(defaultUpBtn); 
        // this.listDownBtn.push(defaultDownBtn); 
        // this.listColorBtn.push(defaultColorBtn); 
        // this.listTrashBtn.push(defaultTrashBtn); 

        // TODO: 
        // - modify to add the amount already on screen (if not empty, access from localStorage based on listType, otherwise default)

        // retrieve data from localStorage
        const storageKeys = ["numTitle", "numMonday", "numTuesday", "numWednesday", "numThursday", "numFriday", "numSaturday", "numSunday", "numOther", "numText"]; 
        // delete the first letter
        let typeList = this.listType.split(""); 
        let firstLetterType = typeList[0].toUpperCase(); 
        const sectionKey = "num" + firstLetterType + typeList.splice(1, typeList.length, 1).join(""); 
        // get number of section elements
        this.numTypes = Number(localStorage.getItem(sectionKey)); 
        let maxDivNum = 1; // store the max ID number so that there are no duplicates when creating types
        let typeNums = []; 
        // if there are more than 1 type in localStorage, event listeners must be added to the buttons
        if (this.numTypes > 1) {
            for (let i = 0; i < this.numTypes; i++) {
                // get list of type li tags
                let listOfInputs = document.getElementsByTagName("li"); 
                let listOfTypes = []; 
                for (let i = 0; i < listOfInputs.length; i++) {
                    listOfTypes.push(listOfInputs[i].id); 
                }
                let listOfTypeIDs = listOfTypes.filter((id) => id.split("-")[2] == "div"); 
                listOfTypeIDs = listOfTypeIDs.filter((id) => id.split("-")[0] == this.listType); 
                // add event listeners to list of saved trash buttons
                for (let i = 0; i < listOfTypeIDs.length; i++) {
                    // access the current buttons
                    const currentTypeDiv = document.getElementById(listOfTypeIDs[i]); 
                    const currentUpBtn = currentTypeDiv.firstElementChild.nextSibling.nextSibling; 
                    const currentDownBtn = currentUpBtn.nextSibling.nextSibling; 
                    const currentColorBtn = currentDownBtn.nextSibling.nextSibling; 
                    const currentTrashBtn = currentTypeDiv.lastChild.previousSibling; 
                    // add to lists and add to event listener
                    this.listUpBtn.push(currentUpBtn); 
                    this.listDownBtn.push(currentDownBtn); 
                    this.listColorBtn.push(currentColorBtn); 
                    this.listTrashBtn.push(currentTrashBtn);  

                    this.listUpBtn[i].addEventListener("click", () => this.swap("up", listOfTypeIDs[i].split("-")[1]));
                    this.listDownBtn[i].addEventListener("click", () => this.swap("down", listOfTypeIDs[i].split("-")[1]));
                    this.listColorBtn[i].addEventListener("click", () => this.changeColor(listOfTypeIDs[i].split("-")[1])); 
                    this.listTrashBtn[i].addEventListener("click", () => this.deleteElem(listOfTypeIDs[i].split("-")[1])); 
                } 

                typeNums = listOfTypeIDs.map((elem) => Number(elem.split("-")[1])); 
            }
            maxDivNum = Math.max(...typeNums); 
            this.divCount = maxDivNum; 
        } else {
            // event listeners
            defaultTrashBtn.addEventListener("click", () => this.deleteElem(1)); 
            defaultColorBtn.addEventListener("click", () => this.changeColor(1)); 
            defaultUpBtn.addEventListener("click", () => this.swap("up", 1));
            defaultDownBtn.addEventListener("click", () => this.swap("down", 1));
        }
    }

    /** Adds a smaller element (with input and buttons) to the larger div */
    addElem() { 
        // create a clone of the default elements and their children 
        const defaultDivClone = this.defaultDivElem.cloneNode(true);

        this.divCount++; 

        // change ids of div, input, and button
        defaultDivClone.id = this.listType + "-" + this.divCount + "-div"; 
        let currentInputElem = defaultDivClone.firstChild.nextSibling; 
        currentInputElem.id = this.listType + "-" + this.divCount + "-input"
        // set default text to Untitled
        defaultDivClone.firstChild.nextSibling.value = "None"; 
        // set default background color to transparent
        defaultDivClone.firstChild.nextSibling.style.backgroundColor = "transparent"; 
        // add all buttons to list
        let currentTrashBtn = defaultDivClone.lastChild.previousSibling; 
        let currentColorBtn = defaultDivClone.lastChild.previousSibling.previousSibling.previousSibling; 
        let currentDownBtn = defaultDivClone.firstChild.nextSibling.nextSibling.nextSibling.nextElementSibling; 
        let currentUpBtn = defaultDivClone.firstChild.nextSibling.nextSibling.nextElementSibling;
        // update ids of each button
        currentTrashBtn.id = this.listType + "-" + this.divCount + "-trash";  
        currentColorBtn.id = this.listType + "-" + this.divCount + "-color";  
        currentDownBtn.id = this.listType + "-" + this.divCount + "-down";  
        currentUpBtn.id = this.listType + "-" + this.divCount + "-up";  
        // push to each list of buttons
        this.listDivElems.push(defaultDivClone); 
        this.listInputElems.push(currentInputElem); 
        this.listTrashBtn.push(currentTrashBtn); 
        this.listColorBtn.push(currentColorBtn); 
        this.listDownBtn.push(currentDownBtn); 
        this.listUpBtn.push(currentUpBtn); 
        // add to larger div chain and render
        this.div.appendChild(defaultDivClone);
        // update all elements and add event listeners to all trash and other buttons
        this.addDeleteEvent(); 
        this.addOtherEvent();  
    }

    /** Deletes the corresponding element with the trash button */
    deleteElem(divNum) {
        // get amount elements within a given div
        let listOfElems = document.getElementsByTagName("li");  
        // determine how many list elements there are
        let listOfTypes = []; 
        for (let i = 0; i < listOfElems.length; i++) {
            listOfTypes.push(listOfElems[i].id.split("-")[0]); 
        }
        listOfTypes = listOfTypes.filter((elem) => elem == this.listType); 
        let numElems = listOfTypes.length; 
        // only delete if more than 1 element
        if (numElems > 1) {
            let elementToDelete = document.getElementById(this.listType + "-" + divNum + "-div"); 
            if (elementToDelete !== undefined && elementToDelete !== null) {
                this.div.removeChild(elementToDelete); 
            }
        }   
    }

    /** Adds an event listener for the most recently added list element */
    addOtherEvent() {
        const currLength = this.listColorBtn.length; 
        const currDivNum = this.listColorBtn[currLength - 1].id.split("-")[1]; 
        this.listColorBtn[currLength - 1].addEventListener("click", () => this.changeColor(currDivNum)); 
        this.listUpBtn[currLength - 1].addEventListener("click", () => this.swap("up", currDivNum)); 
        this.listDownBtn[currLength - 1].addEventListener("click", () => this.swap("down", currDivNum)); 
    }

    /** Changes the color of a given list element based on its "div number" */
    changeColor(divNum) {
        // cycles through the color list
        if (this.colorCounter > 5) {
            this.colorCounter = 0; 
        }
        // school, work, hobby, social, urgent
        const color = ["#a0c4ff", "#fdffb6", "#caffbf", "#bdb2ff", "#ffadad", "transparent"]; 
        const currentDivElem = document.getElementById(this.listType + "-" + divNum + "-input"); 
        currentDivElem.style.backgroundColor = color[this.colorCounter];  
        this.colorCounter++;  
    }

    /** Swaps the text and color of two different elements, either up or down in the list */
    swap(direction, divNum) {

        let listOfInputs = document.getElementsByTagName("input"); 
        // get IDs from the input elements
        let listOfInputIDs = []; 
        for (let i = 0; i < listOfInputs.length; i++) {
            listOfInputIDs.push(listOfInputs[i].id); 
        }
        // filter so that searching only within the listType
        listOfInputIDs = listOfInputIDs.filter((elem) => elem.split("-")[0] == this.listType);
        let currID = this.listType + "-" + divNum + "-input"; 
        let currElem = document.getElementById(currID);
        let currIndex = listOfInputIDs.indexOf(currID); 

        if (direction == "up") {
            if (divNum != 1 && listOfInputIDs.indexOf(currID) != 0) {
                let prevElem = document.getElementById(listOfInputIDs[currIndex - 1]); 
                this.swapElements(currElem, prevElem);
            }
        } else if (direction == "down") {
            if (listOfInputIDs.indexOf(currID) != listOfInputIDs.length) {
                let nextElem = document.getElementById(listOfInputIDs[currIndex + 1]); 
                this.swapElements(currElem, nextElem);
            }
        }
    }

    // helper swap method
    swapElements(elem1, elem2) {
        let tempColor = elem1.style.backgroundColor;
        let tempText = elem1.value;
        // swap element values 
        elem1.style.backgroundColor = elem2.style.backgroundColor;
        elem1.value = elem2.value;
        elem2.style.backgroundColor = tempColor;
        elem2.value = tempText;
    }
}