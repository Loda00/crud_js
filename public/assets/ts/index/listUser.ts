declare var _: any;
import { Modal } from './modal'
import { SetUser } from './setUser'
import { DeleteUser } from './deleteUser'

interface IListUser {
    parent: String,
    btnAdd: String,
    btnUpdate: String,
    btnDelete: String,
    template: String,
    container: String
}

export class ListUser implements IListUser {

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
let modal = new Modal();