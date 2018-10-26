
class ShowUsers {

    

    speak(params) {
        return this;
    }

}

class Animal {

    /**
     * 
     * @return void
     * 
     */

    constructor(){

    }
    
    speak() {
        console.log('speak')
    }
    static eat() {
        console.log('eat')
    }
}

let animal = new Animal();

animal.speak();
eat();