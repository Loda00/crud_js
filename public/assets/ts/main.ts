declare var axios: any;
declare var _: any;

interface IModal {
    parent: String,
    modalWrap: String,
    btnClose: String,
}

class Modal implements IModal {

    parent = '.js-modal'
    modalWrap = '.js-modal-wrap'
    btnClose = '.js-modal-close'
    dom: any

    constructor() {
        this.dom = {}
        this.catchDom();
        this.events();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.modalWrap = $(this.modalWrap, this.dom.parent);
        this.dom.btnClose = $(this.btnClose, this.dom.parent);
    }

    events() {
        this.dom.btnClose.on('click', this.hideModal)
        this.dom.modalWrap.on('click', this.hideModal)
    }

    showModal() {
        this.dom.parent.show();
    }

    hideModal(e: any) {
        if (e.target != this)
            return
        $('.js-modal').hide();
    }

    closeModal() {
        this.dom.parent.hide();
    }
}

interface IListUser {
    parent: String,
    btnAdd: String,
    btnUpdate: String,
    btnDelete: String,
    template: String,
    container: String
}

class ListUser implements IListUser {

    parent = '.js-listUser'
    btnAdd = '.js-btn-add'
    btnUpdate = '.js-btn-update'
    btnDelete = '.js-btn-delete'
    template = 'template-Form'
    container = '.js-modal-center'
    dom: any

    constructor() {
        this.dom = {}

        this.catchDom();
        this.events();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.btnAdd = $(this.btnAdd, this.dom.parent);
        this.dom.btnUpdate = $(this.btnUpdate, this.dom.parent);
        this.dom.btnDelete = $(this.btnDelete, this.dom.parent);
        this.dom.container = $(this.container);
    }

    events() {
        this.dom.btnAdd.on('click', (e: any) => {
            this.addUser(e)
        })
        this.dom.btnUpdate.on('click', (e: any) => {
            this.updateUser(e)
        })
        this.dom.btnDelete.on('click', (e: any) => {
            this.deleteUser(e)
        })
    }

    addUser(e: any) {

        modal.showModal();
        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html)

        let compiled = tmp({ Title: 'Add User', Button: 'Add' });

        this.dom.container.html(compiled);

        new SetUser(undefined);
    }

    updateUser(e: any) {

        modal.showModal();
        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);

        let compiled = tmp({ Title: 'Update User', Button: 'Update' });

        this.dom.container.html(compiled);

        let id = $(e.target).attr('data-id')

        new SetUser(parseInt(id));
    }

    deleteUser(e: any) {

        let id = $(e.target).attr('data-id')

        new DeleteUser(parseInt(id));
    }
}

interface ILoadListUser {
    parent: String,
    container: String,
    template: String,
}

class LoadListUser implements ILoadListUser {

    parent = '.js-listUser'
    container = '.js-items-user'
    template = 'template-listUsers'
    dom: any

    constructor() {
        this.dom = {}
        this.catchDom();
        this.autoExec();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
    }

    autoExec() {
        this.getData();
    }

    getData() {
        axios.get(`http://localhost:4000/data`)
            .then((result: any) => {
                this.setData(result.data)
                new ListUser();
            })
            .catch((err: any) => console.log(err))
    }

    setData(data: Array<String>) {
        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ data })
        this.dom.container.html(compiled);
    }
}

interface ISetUser {
    parent: String,
    container: String,
    template: String,
    btnSave: String,
    category: String,
    fullName: String,
    age: String,
    completed: String,
}

class SetUser implements ISetUser {

    parent = '.js-listUser'
    container = '.js-items-user'
    template = 'template-listUsers'
    btnSave = '.js-form-btn-save'
    category = '.category'
    fullName = '.full-name'
    age = '.age'
    completed = '.completed'
    id?: number
    dom: any

    constructor(id: number) {
        this.id = id ? id : undefined;
        this.dom = {}

        this.catchDom();
        this.events();
        this.getDataUser();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
        this.dom.category = $(this.category);
        this.dom.fullName = $(this.fullName);
        this.dom.age = $(this.age);
        this.dom.completed = $(this.completed);
        this.dom.template = $(this.template);
        this.dom.btnSave = $(this.btnSave);
    }

    events() {
        this.dom.btnSave.on('click', () => {
            this.setUser()
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

    addUser(obj: any) {
        return axios.post(`http://localhost:4000/data`, {
            category: obj.category,
            name: obj.fullName,
            age: obj.age,
            completed: obj.completed,
            id: obj.id,
        })
    }

    updateUser(id: Number, obj: any) {
        return axios.put(`http://localhost:4000/data/${id}`, {
            category: obj.category,
            name: obj.fullName,
            age: obj.age,
            completed: obj.completed,
        })
    }

    getDataUser() {
        axios.get(`http://localhost:4000/data/?id=${this.id}`)
            .then((result: any) => {
                this.fillDataUser(result.data);
            })
            .catch((err: any) => { console.log(err) })
    }

    fillDataUser(obj: any) {
        this.dom.category.val(obj[0].category);
        this.dom.fullName.val(obj[0].name);
        this.dom.age.val(obj[0].age);
        this.dom.completed.val(obj[0].completed);
    }
}

interface IDeleteUser {

}

class DeleteUser implements IDeleteUser {

    id: number

    constructor(id: number) {
        this.id = id;

        this.autoExec();
    }

    autoExec() {
        this.deleteUser();
    }

    deleteUser() {
        axios.delete(`http://localhost:4000/data/${this.id}`)
            .then(() => {
                new LoadListUser();
            })
    }

}

let modal = new Modal();
new LoadListUser();
