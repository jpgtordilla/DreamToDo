class Planet {
    constructor() {
        console.log("hi"); 
    }
}

class Earth extends Planet {
    constructor() {
        super(); 
    }
}

pee = new Earth(); 