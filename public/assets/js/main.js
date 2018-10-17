var fn = function () {
    let fns = {}
    let add = (nameFn, Fn) => {
        fns[nameFn] = Fn;
    }
    let run = (nameFn, ...args) => {
        fns[nameFn](...args)
    }
    return {
        add, run
    }
}

let ps = new fn();

let ComponenteCrud = function () {
    let st = {
        parent: '.crud',
        btnAddUser: '.btn-add-user',
        btnUpdateUser: '.btn-update-user',
        btnDeleteUser: '.btn-delete-user',
        templateSetUsers: '#template-setUsers',
        container: '.center-box'
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.btnUpdateUser = $(st.btnUpdateUser, dom.parent);
        dom.btnAddUser = $(st.btnAddUser, dom.parent);
        dom.btnDeleteUser = $(st.btnDeleteUser, dom.parent);
        dom.templateSetUsers = $(st.templateSetUsers);
        dom.container = $(st.container);
    }

    function suscribeEvents() {
        dom.btnAddUser.on('click', events.showPopupAddUser);
        dom.btnUpdateUser.on('click', events.showPopupUpdate);
        dom.btnDeleteUser.on('click', events.deleteUser);
    }

    let events = {
        showPopupAddUser() {

            fn.cleanIdUser();

            let html = fn.getTemplate('Add User', 'Add')

            ps.run('modal:showModal', html)
            ps.run('addUser:init', null, function () {

                ps.run('showUsers:init')
                ps.run('componenteCrud:init')

            })
        },
        showPopupUpdate(e) {

            fn.cleanIdUser();

            let id = $(e.target).attr('data-id');

            let html = fn.getTemplate('Update User', 'Update')

            ps.run('modal:showModal', html)
            ps.run('addUser:init', id, function () {

                ps.run('showUsers:init')
                ps.run('componenteCrud:init')

            })
        },
        deleteUser(e) {

            let arg = $(e.target).attr('data-id');

            ps.run('deleteUser:init', arg, function () {

                ps.run('showUsers:init')
                ps.run('componenteCrud:init')

            })
        }
    }

    let fn = {
        getTemplate(title, button) {

            let form = dom.templateSetUsers.html();

            let template = _.template(form);

            let compiled = template({ tmpTitle: title, tmpBtn: button });

            return compiled;
        },
        cleanIdUser() {
            sessionStorage.clear();
        }
    }

    function init() {
        catchDom();
        suscribeEvents();
    }

    return {
        init
    }
}

let Modal = function () {
    let st = {
        container: '.center-box',
        childrenBox: '.children-box',
        parent: '.external-box',
        closeModal: '.close-modal',
    }
    let dom = {}

    function asnyCatchDom() {
        dom.parent = $(st.parent);
        dom.container = $(st.container, dom.parent);
        dom.childrenBox = $(st.childrenBox, dom.parent);
        dom.closeModal = $(st.closeModal, dom.parent);
    }
    function asynSuscribeEvents() {
        dom.closeModal.on('click', events.hidePopup);

        dom.childrenBox.on('click', events.hidePopup);
    }
    let events = {
        hidePopup(e) {

            if (e.target != this)
                return
            dom.parent.addClass('hide');
        }
    }

    let fn = {
        showModal(html) {
            dom.container.empty();
            dom.parent.removeClass('hide');
            dom.container.show();
            dom.container.html(html);
        },
    }

    function init() {
        asnyCatchDom();
        asynSuscribeEvents();
    }

    return {
        init,
        showModal: fn.showModal,
    }
}

let AddUser = function () {

    let st = {
        parent: '.form-user',
        saveUser: '.save-user',
        user: '.user',
        password: '.password',
        name: '.name',
        lastName: '.last-name',
        afterSave: null,
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.saveUser = $(st.saveUser, dom.parent);
        dom.user = $(st.user, dom.parent);
        dom.password = $(st.password, dom.parent);
        dom.name = $(st.name, dom.parent);
        dom.lastName = $(st.lastName, dom.parent);
    }

    function suscribeEvents() {
        dom.saveUser.on('click', events.saveData)
    }

    let events = {
        saveData() {

            ps.run('loding.showLoading')

            let users = localStorage.getItem('listUsers') ? JSON.parse(localStorage.getItem('listUsers')) : [];

            let userID = JSON.parse(sessionStorage.getItem('idUser'));

            let user = dom.user.val();
            let pass = dom.password.val();
            let name = dom.name.val();
            let lastName = dom.lastName.val();

            if (userID == null) {

                let id = (Math.random() * 1000).toString().split('.')[1];

                users.push({ id, user, pass, name, lastName })

            } else {

                users.forEach((user) => {

                    if (user.id == userID) {

                        user.user = dom.user.val();
                        user.pass = dom.password.val();
                        user.name = dom.name.val();
                        user.lastName = dom.lastName.val();

                    }
                })
            }

            localStorage.setItem('listUsers', JSON.stringify(users));

            setTimeout(() => {
                ps.run('loding.hideLoading')
                st.afterSave()
            }, 200);
        }
    }

    let fn = {
        fillInput(user) {
            dom.user.val(user[0].user);
            dom.password.val(user[0].pass);
            dom.name.val(user[0].name);
            dom.lastName.val(user[0].lastName);
        },
        setData(idUser) {

            if (idUser != undefined || idUser != null || idUser == "") {

                let users = JSON.parse(localStorage.getItem('listUsers'));

                let objUser = users.filter(user => user.id == idUser)

                fn.fillInput(objUser);

                sessionStorage.setItem('idUser', JSON.stringify(idUser));
            }
        },
    }

    function init(idUser, callback) {
        catchDom();
        suscribeEvents();;
        fn.setData(idUser);
        st.afterSave = callback
    }

    return {
        init
    }
}

let Loading = function () {
    let st = {
        parent: '.external-box',
        content: '.efectLoading',
        container: '.center-box',
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.container = $(st.container, dom.parent);
        dom.content = $(st.content);
    }

    let events = {
        showLoading() {
            fn.getLoading();
            dom.container.show();
        },
        hideLoading() {
            dom.container.hide();
        }
    }

    let fn = {
        getLoading() {
            let load = $('.efectLoading').html();
            $(dom.container).html(load);
        }
    }

    function init() {
        catchDom();
    }

    return {
        init,
        showLoading: events.showLoading,
        hideLoading: events.hideLoading,
    }
}

let ShowUsers = function () {
    let st = {
        parent: '.grilla-users',
        externalBox: '.external-box',
        container: '.list-users',
        templateListUsers: '#template-listUsers',
        list: []
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.externalBox = $(st.externalBox);
        dom.container = $(st.container, dom.parent);
        dom.templateListUsers = $(st.templateListUsers);
    }

    let fn = {
        getListUsers() {
            let users = JSON.parse(localStorage.getItem('listUsers'));

            users = users == null ? [] : users;

            let html = dom.templateListUsers.html();
            let tmp = _.template(html);
            let compiled = tmp({ users: users });

            return compiled;
        },
        setListUsers(html) {
            dom.container.html(html);
        },
        throwEvents() {
            fn.hidePopup();
            fn.showListUsers();
        },
        showListUsers() {
            let html = fn.getListUsers();
            fn.setListUsers(html);
        },
        hidePopup() {
            dom.externalBox.addClass('hide');
        }
    }

    function init() {
        catchDom();
        fn.throwEvents();
        ps.run('modal:init')
    }

    return {
        init
    }
}

let DeleteUser = function () {
    let st = {
        parent: '.form',
        deleteUser: '.btn-delete-user',
        afterDelete: null,
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.deleteUser = $(st.deleteUser, dom.parent);
    }

    function suscribeEvents() {
        dom.deleteUser.on('click', events.deleteUser)
    }

    let events = {
        deleteUser(id) {
            fn.delete(id);
            st.afterDelete()
        }
    }

    let fn = {
        delete(idUser) {

            let users = JSON.parse(localStorage.getItem('listUsers'));

            let list = users.filter(user => user.id != idUser)

            localStorage.setItem('listUsers', JSON.stringify(list));
        }
    }

    function init(arg, callback) {
        catchDom();
        suscribeEvents();
        st.afterDelete = callback;
        events.deleteUser(arg);
    }

    return {
        init
    }
}

let componenteCrud = new ComponenteCrud();
let modal = new Modal();
let addUser = new AddUser();
let showUsers = new ShowUsers();
let loading = new Loading();
let deleteUser = new DeleteUser();


ps.add('modal:init', modal.init);
ps.add('componenteCrud:init', componenteCrud.init)
ps.add('modal:showModal', modal.showModal);
ps.add('loding.showLoading', loading.showLoading)
ps.add('loding.hideLoading', loading.hideLoading)
ps.add('addUser:init', addUser.init);
ps.add('showUsers:init', showUsers.init);
ps.add('loading:init', loading.init);
ps.add('deleteUser:init', deleteUser.init);


loading.init();
showUsers.init();
componenteCrud.init();

