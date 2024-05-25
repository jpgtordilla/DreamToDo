// TODO: 
// - constructor event listener conditional

/** LIST ITEM CLASS */

class ListItem extends Section {
    // static variable for tracking color background
    colorCounter = 0;

    constructor(div, defaultDivElem, defaultInputElem, defaultTrashBtn, createBtn, listType, defaultUpBtn, defaultDownBtn, defaultColorBtn) {
        super(div, defaultDivElem, defaultTrashBtn, createBtn, listType);
        
        this.defaultInputElem = defaultInputElem; 
        this.defaultUpBtn = defaultUpBtn; 
        this.defaultDownBtn = defaultDownBtn; 
        this.defaultColorBtn = defaultColorBtn; 
        
        this.listDivElems = []; 
        this.listInputElems = []; 
        this.listUpBtn = []; 
        this.listDownBtn = []; 
        this.listColorBtn = []; 

        this.listDivElems.push(defaultDivElem); 
        this.listInputElems.push(defaultInputElem); 
        this.listUpBtn.push(defaultUpBtn); 
        this.listDownBtn.push(defaultDownBtn); 
        this.listColorBtn.push(defaultColorBtn); 

        // event listeners

        // TODO: 
        // - modify to add the amount already on screen (if not empty, access from localStorage based on listType, otherwise default)

        defaultColorBtn.addEventListener("click", () => this.changeColor(1)); 
        defaultUpBtn.addEventListener("click", () => this.swap("up", 1));
        defaultDownBtn.addEventListener("click", () => this.swap("down", 1));
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

    /** Adds an event listener for the most recently added list element */
    addOtherEvent() {
        const currLength = this.listColorBtn.length; 
        this.listColorBtn[currLength - 1].addEventListener("click", () => this.changeColor(currLength)); 
        this.listUpBtn[currLength - 1].addEventListener("click", () => this.swap("up", currLength)); 
        this.listDownBtn[currLength - 1].addEventListener("click", () => this.swap("down", currLength)); 
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
        if (direction == "up") {
            if (divNum != 1) {
                let currElem = document.getElementById(this.listType + "-" + divNum + "-input");
                let prevElem = document.getElementById(this.listType + "-" + (divNum - 1) + "-input");
                this.swapElements(currElem, prevElem);
            }
        } else if (direction == "down") {
            if (divNum != this.listDownBtn.length) {
                let currElem = document.getElementById(this.listType + "-" + divNum + "-input");
                let nextElem = document.getElementById(this.listType + "-" + (divNum + 1) + "-input");
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