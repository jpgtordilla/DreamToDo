/** SECTION CLASS */

class Section {

    // private variables 
    listTrashBtn = []; // set at zero, default button added during initialization

    constructor(div, defaultDivElem, defaultTrashBtn, createBtn, listType) {
        this.div = div; 
        this.defaultDivElem = defaultDivElem;  
        this.defaultTrashBtn = defaultTrashBtn; 
        this.createBtn = createBtn; 

        this.listTrashBtn = []; 
        this.listTrashBtn.push(defaultTrashBtn); 
        this.divCount = 1; 
        this.listType = listType; 
        // add listeners
        this.createBtn.addEventListener("click", () => this.addElem()); 
        this.addDeleteEvent(); 
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
        const siblingDiv = document.getElementById(this.listType + "-" + divNum + "-div");
        if (divNum == 1) {
            // reset text if first title is "deleted"
            siblingDiv.firstChild.nextSibling.value = "Untitled"; 
        } else if (divNum != 1) {
            this.div.removeChild(siblingDiv); 
            // decrease counter and remove button from list
            this.divCount--; 
            this.listTrashBtn = this.listTrashBtn.filter((btn) => btn.id !== this.listType + "-" + divNum + "-trash"); 
        }
    }

    /** for each trash button, add function with specific div ids */
    addDeleteEvent() {
        for (let i = 0; i < this.listTrashBtn.length; i++) {
            // wrap with another function to prevent immediate execution
            this.listTrashBtn[i].addEventListener("click", () => this.deleteElem(i + 1)); 
        }
    }
}