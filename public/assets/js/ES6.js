class Modal {

    constructor() {

        this.parent = '.js-modal'
        this.modalChild = '.js-modal-wrap'
        this.btnClose = '.js-modal-close'

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
        $('.js-modal').hide();
    }

    closeModal() {
        this.dom.parent.hide();
    }

    catchDom1() {
        console.log('catchDom1dsaffd')
    }
}

class List {
    constructor() {

        this.btnAdd = this.btnAdd ? this.btnAdd : '.js-btn-add';
        this.btnUpdate = '.js-grid-btn-update';
        this.btnDelete = '.js-grid-btn-delete';
        this.template = 'template-Form';
        this.container = '.js-modal-center';

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
        })
        this.dom.btnUpdate.on('click', (e) => {
            this.update(e)
        })
        this.dom.btnDelete.on('click', this.delete)
    }

    add() {

        modal.showModal();

        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ Title: 'Add User', Button: 'Add' })

        this.dom.container.html(compiled)

        let settingList = new SettingList(undefined);

    }

    update(e) {

        console.log(e.target)

        modal.showModal();

        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ Title: 'Update User', Button: 'Update' })

        this.dom.container.html(compiled)

        let id = $(e.target).attr('data-id')

        console.log(id)

        let settingList = new SettingList(id);
    }

    delete() {
        console.log('eliminando');
    }
}



class SettingList {
    constructor(id) {

        this.parent = '.js-grid'
        this.container = '.js-grid-list-user'
        this.template = 'template-listUsers'
        this.btnSave = '.js-form-btn-save'
        this.category = '.category'
        this.fullName = '.full-name'
        this.age = '.age'
        this.completed = '.completed'
        this.id = id

        this.dom = {};
        // console.log('Setting')
        this.catchDom();
        this.fn();

    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container);
        this.dom.template = $(this.template);
        this.dom.btnSave = $(this.btnSave);
        this.dom.category = $(this.category);
        this.dom.fullName = $(this.fullName);
        this.dom.age = $(this.age);
        this.dom.completed = $(this.completed);
    }

    fn() {
        this.dom.btnSave.on('click', () => {
            this.setUser()
        })
    }

    setUser() {
        console.log('this', this)

        let category = this.dom.category.val();
        let fullName = this.dom.fullName.val();
        let age = this.dom.fullName.val();
        let completed = this.dom.completed.val();

        if (!this.id) {

            let id = (Math.random() * 1000).toString().split('.')[1];

            this.addUser({ id, category, fullName, age, completed });


        } else {
            console.log('this.id', this.id)
            // this.updateUser(this.id);
        }
        
        let loadList = new LoadList(123);
        modal.closeModal();
        
        
    }

    addUser(data) {
        axios.post(`http://localhost:4000/data`, {
            id: data.id,
            category: data.category,
            name: data.fullName,
            age: data.age,
            completed: data.completed
        })
    }

    updateUser() {

    }
}

class LoadList {

    constructor() {
        this.parent = '.js-grid'
        this.container = '.js-grid-list-user'
        this.template = 'template-listUsers'

        this.dom = {}

        this.catchDom();
        this.fn();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
        this.dom.template = $(this.template);
    }

    fn() {
        let data = this.getData();

        data
            .then(result => {
                console.log(result.data)
                this.setData(result.data)
                let lista = new List();
            })
            .catch(err => console.log(err));
    }

    getData() {
        return axios.get(`http://localhost:4000/data`);
    }

    setData(data) {
        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ data });

        this.dom.container.html(compiled);

    }

    init() {
        this.catchDom();
        this.fn();
    }

}

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