// class Persona {

//     constructor(nombre, edad, hola, adios) {
//         this.nombre = nombre;
//         this.edad = edad;
//         this.hola = hola;
//         this.adios = adios;
//     }
//     adios() {
//         console.log(`Te equivocaste de funcion  :v`);
//     }

//     saludar() {
//         console.log(`Hola soy ${this.nombre} y tengo ${this.edad}`)
//         // adios();
//     }

//     static despedir(param) {
//         console.log(param)
//     }

// }


// // let persn = new Persona('Jhon', '23', 'Hola', 'Adios');
// // persn.saludar();


// class Programador extends Persona {

//     constructor(nombre, edad, hola, adios, area) {
//         super(nombre, edad, hola, adios);
//         this.area = area;
//     }

//     saludoProgramador() {
//         super.saludar();
//         console.log(`Soy programador ${this.area} , ${this.adios} ?`)
//     }

//     adios() {
//         console.log(`Te equivocaste de funcion  :v`);
//     }
// }


// let programador = new Programador('Jhon', '23', 'Hola', 'Adios', 'Front-end');

// programador.saludoProgramador();




class Modal {

    constructor() {

    }
    
    static showModal() {
        console.log('show')
    }

    static hideModal() {
        console.log('hide')
    }

    catchDom() {
        
    }

    init(){

    }

}

let MODAL_ = new Modal();

MODAL_.showModal();

Modal.catchDom();


class ShowUsers{

    constructor(){

    }

    events(){
        $('.grid__btn-add').on('click')
    }


    showModalAddUser(){
        Modal.showModal();
    }

    showModalUpdateUser() {
        Modal.showModal();
    }

    catchDom() {
        console.log('hide')
    }

}


alert(`Probando rebase y merge`);