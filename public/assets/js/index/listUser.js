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