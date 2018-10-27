
let ShowList = function () {
    let st = {
        templateList: '#template-list',
        list: '.list',
    }

    let dom = {}

    function catchDom() {
        dom.templateList = $(st.templateList);
        dom.list = $(st.list);
    }

    let fn = {
        getList() {
            axios.get('https://randomuser.me/api/?results=100')
                .then(result => {
                    fn.setList(result.data.results)
                })
                .catch(err => console.log(err))
        },
        setList(data) {

            let html = dom.templateList.html();

            let tmp = _.template(html);

            let compiled = tmp({ data: data })

            dom.list.html(compiled);

        }
    }

    function init() {
        catchDom();
        fn.getList();
    }

    return {
        init
    }
}

let showList = new ShowList();

showList.init();



/*

valor 1     -----      valor 2




1000 nacional
600  importado
750  mixto

5000 si se producen más de 1000 unidades

*/


let precios = [];
let materiaPrima = [];
let materiaImportada = [];
let mixta = [];
function dataProduct(value1,value2){

    let cod = value1 + value2;

    let precio = Math.sqrt(cod).toFixed(2);

    precios.push(precio);

    switch(value1){
        case 1000 : materiaPrima.push(value1); break;
        case 600  : materiaImportada.push(value1); break;
        default     : mixta.push(value1);
    }
    
    let precioMayor = 0;

    precios.forEach((precio,index) => {

        if(precio > precioMayor){
            precioMayor = precio;
        }
        
    });

    console.log(`El código del producto es -> ${cod}`)
    console.log(`El precio del producto es -> ${precio}`)
    console.log(`El precio mayor es -> ${precioMayor}`)
    console.log(`La cantidad de productos con materia prima es -> ${materiaPrima.length}`)
    console.log(`La cantidad de productos con materia importada -> ${materiaImportada.length}`)
    console.log(`La cantidad de productos con materia mixta -> ${mixta.length}`)

}

// dataProduct(1000,5000);