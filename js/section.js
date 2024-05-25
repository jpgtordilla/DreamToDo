/** SECTION CLASS */

class Section {

    constructor(div, defaultDivElem, defaultTrashBtn, createBtn, listType) {
        this.div = div; 
        this.defaultDivElem = defaultDivElem;  
        this.defaultTrashBtn = defaultTrashBtn; 
        this.createBtn = createBtn; 

        this.listTrashBtn = []; 
        
        this.divCount = 1; 
        
        this.listType = listType; 

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
                // get list of type div ids
                let listOfInputs = document.getElementsByTagName("div"); 
                let listOfTypes = []; 
                for (let i = 0; i < listOfInputs.length; i++) {
                    listOfTypes.push(listOfInputs[i].id); 
                }
                let listOfTypeIDs = listOfTypes.filter((id) => id.split("-")[2] == "div"); 
                listOfTypeIDs = listOfTypeIDs.filter((id) => id.split("-")[0] == this.listType); 
                // add event listeners to list of saved trash buttons
                for (let i = 0; i < listOfTypeIDs.length; i++) {
                    const currentTypeDiv = document.getElementById(listOfTypeIDs[i]); 
                    const currentTrashBtn = currentTypeDiv.lastChild.previousSibling; 
                    this.listTrashBtn.push(currentTrashBtn);   
                    this.listTrashBtn[i].addEventListener("click", () => this.deleteElem(listOfTypeIDs[i].split("-")[1])); 
                }
                typeNums = listOfTypeIDs.map((elem) => Number(elem.split("-")[1])); 
            }
            maxDivNum = Math.max(...typeNums); 
            this.divCount = maxDivNum; 
        } else {
            // otherwise, treat as a normal, unsaved section
            defaultTrashBtn.addEventListener("click", () => this.deleteElem(1)); 
        }
        this.createBtn.addEventListener("click", () => this.addElem()); 
    }

    /** Adds a smaller element (with input and buttons) to the larger div */
    addElem() { 
        // create a clone of the default elements and their children 
        const defaultDivClone = this.defaultDivElem.cloneNode(true);
        
        this.divCount++; 

        // change ids of div, input, and button
        defaultDivClone.id = this.listType + "-" + this.divCount + "-div"; 
        defaultDivClone.firstChild.nextSibling.id = this.listType + "-" + this.divCount + "-input"
        // set default text to Untitled
        defaultDivClone.firstChild.nextSibling.value = "Untitled"; 
        // add trash button to list
        let currentTrashBtn = defaultDivClone.lastChild.previousSibling; 
        // update trash button id
        currentTrashBtn.id = this.listType + "-" + this.divCount + "-trash";  
        this.listTrashBtn.push(currentTrashBtn); 
        // add to larger div chain and render
        this.div.appendChild(defaultDivClone);
        // update all elements and add event listeners to all trash buttons
        this.addDeleteEvent(); 
    }

    /** Deletes the corresponding element with the trash button */
    deleteElem(divNum) {
        let elementToDelete = document.getElementById(this.listType + "-" + divNum + "-div"); 
        if (elementToDelete !== undefined && elementToDelete !== null) {
            this.div.removeChild(elementToDelete); 
        }
    }

    /** for each trash button, add function with specific div ids */
    addDeleteEvent() {
        const currLength = this.listTrashBtn.length; 
        const currDiv = this.listTrashBtn[currLength - 1].id.split("-")[1]; 
        this.listTrashBtn[currLength - 1].addEventListener("click", () => this.deleteElem(currDiv)); 
    }
}