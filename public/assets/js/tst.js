
// /**
//  * Declaracion de la clase.
//  */
// class CalculadoraUsandoClass {
//     /**
//      * Metodo principal para incializar nuestra clase.
//      *
//      * @return void.
//      */
//     constructor() {
//         //Variables que estaran disponibles en el scope global
//         //de la clase
//         // this.valor_a = 0;
//         // this.valor_b = 0;
//         console.log("Se genero la instancia de CalculadoraUsandoClass");
//     }//constructor

//     //=================================================//

//     /**
//      * Metodo para definir los valores de la clase
//      *
//      * @param Integer valor_a Primer valor.
//      * @param Integer valor_b Segundo valor.
//      *
//      * @return void.
//      */
//     setValores(valor_a, valor_b) {
//         this.valor_a = valor_a;
//         this.valor_b = valor_b;
//         console.log(`El valor de a es => ${this.valor_a}`);
//         console.log(`El valor de b es => ${this.valor_b}`);
//     }

//     //setValores

//     static test() {
//         console.log(`Hi`)
//     }

// }//CalculadoraUsandoClass

// //========== Instanciando nuestro Objeto ==========//
// /**
//  * Instancia de la clase CalculadoraUsandoClass.
//  * 
//  * @type CalculadoraUsandoClass.
//  */
// const CALCULADORA_USANDO_CLASS = new CalculadoraUsandoClass();

// //declaracion de los valores

// CALCULADORA_USANDO_CLASS.setValores('ss', 2)

// CalculadoraUsandoClass.test();




class Animal {

    constructor() {
        console.log(`Se ejecutó el constructor`)
    }

    getAnimal(){

        let sonido =  'miau'; 

        console.log(`El sonido es ${sonido}`);

    }

}

class Gato extends Animal {

    constructor() {
        super();        
    }
    
    getAnimal()


}


let animal = new Animal();
