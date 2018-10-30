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

        this.parent = '.modal'
        this.modalChild = '.modal__children'
        this.btnClose = '.modal__close'

        this.dom = {}

        this.catchDom();
    }

    catchDom() {
        this.dom.parent = $(this.parent)
        this.dom.modalChild = $(this.modalChild, this.dom.parent)
        this.dom.btnClose = $(this.btnClose, this.dom.parent)
    }

    events() {
        this.dom.modalChild.on('click', this.hideModal)
        this.dom.btnClose.on('click', this.hideModal)

    }

    showModal() {
        this.dom.parent.show();
    }

    hideModal(e) {
        if (e.target != this)
            return
        $('.modal').hide();
    }

    catchDom1() {
        console.log('catchDom1dsaffd')
    }
}

class List {
    constructor() {

        this.name = 'Juan';
        this.btnAdd = this.btnAdd ? this.btnAdd : '.grid__btn-add ';
        this.btnUpdate = '.grid__btn-update';
        this.btnDelete = '.grid__btn-delete';
        this.template = 'template-Form';
        this.container = '.modal__center';

        this.dom = {};

        this.catchDom();
        this.events();

    }

    catchDom() {
        this.dom.btnAdd = $(this.btnAdd);
        this.dom.btnUpdate = $(this.btnUpdate);
        this.dom.btnDelete = $(this.btnDelete);
        this.dom.template = $(this.template);
        this.dom.container = $(this.container);
    }

    events() {

        this.dom.btnAdd.on('click', () => {
            this.add()
            console.log(this)
        })
        this.dom.btnUpdate.on('click', () => {
            this.update()
        })
        this.dom.btnDelete.on('click', this.delete)
    }

    add() {
        modal.showModal();

        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ Title: 'Add User', Button: 'Add' })

        this.dom.container.html(compiled)

    }

    update() {

        modal.showModal();

        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ Title: 'Update User', Button: 'Update' })

        this.dom.container.html(compiled)
    }

    delete() {
        console.log('eliminando');
    }
}

class configList{
    constructor(){

        this.parent = '.grid'
        this.container = '.grid__list-user'
        this.template = 'template-listUsers'


    }

    catchDom(){

    }

    fn(){

    }

}

class LoadList {

    constructor() {
        this.parent = '.grid'
        this.container = '.grid__list-user'
        this.template = 'template-listUsers'
        
        this.dom = {}

        this.catchDom();
        this.fn();
    }

    catchDom(){
        this.dom.parent = $(this.parent);
        this.container = $(this.container);
        this.template = $(this.template);
    }

    fn = ()=> {
        let data = this.getData();

        data
        .then(result =>{
            console.log(result.data)
            this.setData(result.data)
        })
        .catch(err => console.log(err));
    }

    getData(){
        return axios.get(`http://localhost:4000/data`);
    }

    setData(data){
        // console.log(this)
        let html = document.getElementById(this.dom.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({data});
        // console.log(compiled)

        this.container.html(compiled);

    }

}


let lista = new List();
let modal = new Modal();
let loadList = new LoadList();

modal.events();

let search = ""
$('#inp').keypress(function (e) {
    const val = e.key;
    search = search + val;
    console.log(e.target.value)
})



// $('body').on('click', function (e) {
//     console.log(e.target)
// })