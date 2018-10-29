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
        // var texto = contenido.replace(/<[^>]*>?/g, '')
        $('.modal').css({ 'display': 'block' });
    }

    static hideModal() {
        $('.modal__close').on('click', function () {
            $('.modal').css({ 'display': 'none' });
        })
    }

    catchDom1() {
        console.log('catchDom1dsaffd')
    }
}


class Listado {
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
        console.log(this.template);
    }

    events() {

        console.log(this.dom)

        this.dom.btnAdd.on('click', () => {
            this.add()
        })
        this.dom.btnUpdate.on('click', () => {
            this.update()
        })
        this.dom.btnDelete.on('click', this.delete)
    }

    add() {
        Modal.showModal();

        let html = this.dom.template.html();

        let tmp = _.template(html);
        let compiled = tmp({ Title: 'Add User', Button: 'Add' })

        this.dom.container.html(compiled)

        Modal.hideModal();
    }

    update() {
        console.log('Entrooooo')
        Modal.showModal();
        let html = document.getElementById(this.template).innerHTML;

        console.log('html', html)
        let tmp = _.template(html);
        let compiled = tmp({ Title: 'Update User', Button: 'Update' })

        this.dom.container.html(compiled)

        Modal.hideModal();
    }

    delete() {
        console.log('eliminando');
    }
}



let lista = new Listado();


// $(document).ready(
//     $('#inp').change(function (e) {
//         console.log(e.target.value);
//     })
// )


let search = ""
$('#inp').keypress(function (e) {
    const val = e.key;
    search = search + val;
    console.log(e.target.value)
})



