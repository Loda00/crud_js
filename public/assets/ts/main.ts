import axios from 'axios';
import * as _ from "lodash";

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
        console.log('this', this)
        console.log('e.target ', e.target)
        if (e.target != this)
            return
        $('.js-modal').hide();
    }
}

interface IListUser {
    parent: String,
    btnAdd: String,
    btnUpdate: String,
    btnDelete: String,
    template: String,
}

class ListUser implements IListUser {

    parent = '.js-listUser'
    btnAdd = '.js-btn-add'
    btnUpdate = '.js-btn-update'
    btnDelete = '.js-btn-delete'
    template = 'template-Form'
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
    }

    events() {
        this.dom.btnAdd.on('click', () => {
            this.addUser()
        })
        this.dom.btnUpdate.on('click', () => {
            this.updateUser()
        })
        this.dom.btnDelete.on('click', this.deleteUser)
    }

    addUser() {
        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html)

        let compiled = tmp({ Title: 'Add User', Button: 'Add' });
        console.log(compiled)
    }

    updateUser() {
        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);

        let compiled = tmp({ Title: 'Update User', Button: 'Update' });
    }

    deleteUser() {

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
        this.getData();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
        this.dom.template = $(this.template);
        console.log('this', this)
    }

    events() {

    }

    getData() {
        axios.get(`http://localhost:4000/data`)
            .then(result => console.log(result.data))
            .catch(err => console.log(err))
    }

    setData() {

    }

}



let modal = new Modal();
new ListUser();
new LoadListUser();

