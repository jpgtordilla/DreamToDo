// TODO: 
// - constructor event listener conditional

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

        this.numTitles = Number(localStorage.getItem("numTitle")); 
        let maxDivNum = 1; 
        let titleNums = []; 
        if (this.numTitles > 1) {
            for (let i = 0; i < this.numTitles; i++) {
                // get list of title div ids
                let listOfInputs = document.getElementsByTagName("div"); 
                let listOfTypes = []; 
                for (let i = 0; i < listOfInputs.length; i++) {
                    listOfTypes.push(listOfInputs[i].id); 
                }
                let listOfTitles = listOfTypes.filter((id) => id.split("-")[2] == "div"); 
                listOfTitles = listOfTitles.filter((id) => id.split("-")[0] == "title"); 
                // add event listeners to list of saved trash buttons
                for (let i = 0; i < listOfTitles.length; i++) {
                    const currentTitleDiv = document.getElementById(listOfTitles[i]); 
                    const currentTrashBtn = currentTitleDiv.lastChild.previousSibling; 
                    this.listTrashBtn.push(currentTrashBtn);   
                    this.listTrashBtn[i].addEventListener("click", () => this.deleteElem(listOfTitles[i].split("-")[1])); 
                }
                titleNums = listOfTitles.map((elem) => Number(elem.split("-")[1])); 
            }
            maxDivNum = Math.max(...titleNums); 
            this.divCount = maxDivNum; 
        } else {
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