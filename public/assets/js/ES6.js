xhttp

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
}

class ListUser {

    constructor() {

        this.parent = '.js-listUser'
        this.btnAdd = '.js-btn-add'
        this.btnUpdate = '.js-btn-update'
        this.btnDelete = '.js-btn-delete'
        this.template = 'template-Form'
        this.container = '.js-modal-center'

        this.dom = {};

        this.catchDom();
        this.events();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.btnAdd = $(this.btnAdd, this.dom.parent);
        this.dom.btnUpdate = $(this.btnUpdate, this.dom.parent);
        this.dom.btnDelete = $(this.btnDelete, this.dom.parent);
        this.dom.template = $(this.template);
        this.dom.container = $(this.container);
    }

    events() {

        this.dom.btnAdd.on('click', () => {
            this.addUser()
        })
        this.dom.btnUpdate.on('click', (e) => {
            this.updateUser(e)
        })
        this.dom.btnDelete.on('click', (e) => {
            this.deleteUser(e)
        })
    }

    addUser() {

        modal.showModal();

        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ Title: 'Add User', Button: 'Add' })

        this.dom.container.html(compiled)

        new SetUser(undefined);
    }

    updateUser(e) {

        modal.showModal();

        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ Title: 'Update User', Button: 'Update' })

        this.dom.container.html(compiled)

        let id = $(e.target).attr('data-id')

        new SetUser(id);
    }

    deleteUser(e) {

        let id = $(e.target).attr('data-id')

        new DeleteUser(id);
    }
}

class SetUser {
    constructor(id) {

        this.parent = '.js-listUser'
        this.container = '.js-items-user'
        this.template = 'template-listUsers'
        this.btnSave = '.js-form-btn-save'
        this.category = '.category'
        this.fullName = '.full-name'
        this.age = '.age'
        this.completed = '.completed'
        this.id = id
        this.dom = {};

        this.catchDom();
        this.events();
        this.getDataUser();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
        this.dom.template = $(this.template);
        this.dom.btnSave = $(this.btnSave);
        this.dom.category = $(this.category);
        this.dom.fullName = $(this.fullName);
        this.dom.age = $(this.age);
        this.dom.completed = $(this.completed);
    }

    events() {
        this.dom.btnSave.on('click', () => {
            this.setUser();
        })
    }

    setUser() {

        let category = this.dom.category.val();
        let fullName = this.dom.fullName.val();
        let age = this.dom.age.val();
        let completed = this.dom.completed.val();

        if (this.id == undefined) {

            let id = (Math.random() * 1000).toString().split('.')[1];

            this.addUser({ id, category, fullName, age, completed })
                .then(() => {
                    new LoadListUser();
                    modal.closeModal();
                })

        } else {
            this.updateUser(this.id, { category, fullName, age, completed })
                .then(() => {
                    new LoadListUser();
                    modal.closeModal();
                })
        }
    }

    addUser(data) {
        return axios.post(`http://localhost:4000/data`, {
            category: data.category,
            name: data.fullName,
            age: parseInt(data.age),
            completed: data.completed,
            id: parseInt(data.id),
        })
    }

    updateUser(id, data) {
        return axios.put(`http://localhost:4000/data/${id}`, {
            category: data.category,
            name: data.fullName,
            age: parseInt(data.age),
            completed: data.completed
        })
    }

    getDataUser() {

        if (this.id != undefined) {
            axios.get(`http://localhost:4000/data`)
                .then(result => {

                    let data = result.data.filter(value => {
                        return value.id == this.id
                    })

                    this.loadDataUser(data)

                })
                .catch(err => console.log(err));
        }
    }

    loadDataUser(data) {

        this.dom.category.val(data[0].category)
        this.dom.fullName.val(data[0].name)
        this.dom.age.val(data[0].age)
        this.dom.completed.val(data[0].completed)
    }
}

class LoadListUser {

    constructor() {
        this.parent = '.js-listUser'
        this.container = '.js-items-user'
        this.template = 'template-listUsers'

        this.dom = {}
        this.catchDom();
        this.showListUser();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
        this.dom.template = $(this.template);
    }

    showListUser() {
        let data = this.getData();

        data
            .then(result => {
                this.setData(result.data)
                new ListUser();
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
}

class DeleteUser {
    constructor(id) {
        this.id = id

        this.instance = null

        this.deleteUser();
    }

    deleteUser() {
        axios.delete(`http://localhost:4000/data/${this.id}`)
            .then(result => {
                new LoadListUser;
            })
            .catch(err => console.log(err))
    }
}

let modal = new Modal();
new LoadListUser();
modal.events();

let search = ""
$('#inp').keypress(function (e) {
    const val = e.key;
    search = search + val;
    console.log(e.target.value)
})

