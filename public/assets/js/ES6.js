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

        this.parent = '.js-grid'
        this.btnAdd = '.js-btn-add'
        this.btnUpdate = '.js-grid-btn-update'
        this.btnDelete = '.js-grid-btn-delete'
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

        let setUser = new SetUser.getSingletonInstance(undefined);
        // setUser.events();

    }

    update(e) {

        modal.showModal();

        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ Title: 'Update User', Button: 'Update' })

        this.dom.container.html(compiled)

        let id = $(e.target).attr('data-id')

        let setUser = new SetUser.getSingletonInstance(id);
    }

    delete(e) {

        let id = $(e.target).attr('data-id')

        let deleteUser = new DeleteUser.getSingletonInstance(id);
    }
}

class SetUser {
    constructor() {

        this.parent = '.js-grid'
        this.container = '.js-grid-list-user'
        this.template = 'template-listUsers'
        this.btnSave = '.js-form-btn-save'
        this.category = '.category'
        this.fullName = '.full-name'
        this.age = '.age'
        this.completed = '.completed'
        this.idUser = null

        this.instance = null
        this.dom = {};

        console.log('id1', this.idUser)
        this.catchDom();
        this.events();
        this.getDataUser();

    }

    catchDom() {
        console.log('this.idUser4', this.idUser)
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

    static getSingletonInstance(id) {

        if (this.instance == null) {
            this.instance = new SetUser();
        }
        console.log('id2', this)
        this.instance.idUser = id
        console.log('this.id', this.instance.idUser)
        return this.instance
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
                    let loadListUser = new LoadListUser.getSingletonInstance();
                    loadListUser.showListUser();
                    modal.closeModal();
                })

        } else {
            this.updateUser(this.id, { category, fullName, age, completed })
                .then(() => {
                    let loadListUser = new LoadListUser.getSingletonInstance();
                    loadListUser.showListUser();
                    modal.closeModal();
                })
        }

    }

    addUser(data) {
        return axios.post(`http://localhost:4000/data`, {
            id: data.id,
            category: data.category,
            name: data.fullName,
            age: data.age,
            completed: data.completed
        })
    }

    updateUser(id, data) {
        return axios.put(`http://localhost:4000/data/${id}`, {
            category: data.category,
            name: data.fullName,
            age: data.age,
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
        this.parent = '.js-grid'
        this.container = '.js-grid-list-user'
        this.template = 'template-listUsers'

        this.instance = null;
        this.dom = {}
        this.catchDom();
        this.showListUser();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
        this.dom.template = $(this.template);
    }

    static getSingletonInstance() {
        if (this.instance == null) {
            this.instance = new LoadListUser();
        }
        return this.instance
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
                let loadListUser = new LoadListUser.getSingletonInstance();
                loadListUser.showListUser();
            })
            .catch(err => console.log(err))
    }

    static getSingletonInstance() {
        if (this.instance == null) {
            this.instance = new SetUser();
        }
        return this.instance
    }
}

let modal = new Modal();
new LoadListUser();
modal.events();

// let search = ""
// $('#inp').keypress(function (e) {
//     const val = e.key;
//     search = search + val;
//     console.log(e.target.value)
// })

