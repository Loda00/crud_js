var Fn = function () {
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

let GridUsers = function () {
    let st = {
        parent: '.grid',
        btnAddUser: '.grid__btn-add',
        btnUpdateUser: '.grid__btn-update',
        btnDeleteUser: '.grid__btn-delete',
        templateSetUsers: '#template-setUsers',
        container: '.modal__center'
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
        dom.btnAddUser.on('click', events.showModalAddUser);
        dom.btnUpdateUser.on('click', events.showModalUpdateUser);
        dom.btnDeleteUser.on('click', events.DeleteUser);
    }

    let events = {
        showModalAddUser() {

            fn.cleanIdUser();

            let html = fn.getTemplate('Add User', 'Add')

            ps.run('modal:showModal', html)
            ps.run('configUser:init', undefined, function () {

                ps.run('showUsers:init')

            })
        },
        showModalUpdateUser(e) {

            fn.cleanIdUser();

            let id = $(e.target).attr('data-id');

            let html = fn.getTemplate('Update User', 'Update')

            ps.run('modal:showModal', html)
            ps.run('configUser:init', id, function () {

                ps.run('showUsers:init')

            })
        },
        DeleteUser(e) {

            let id = $(e.target).attr('data-id');

            ps.run('deleteUser:init', id, function () {

                ps.run('showUsers:init')

            })
        }
    }

    let fn = {
        getTemplate(Title, Button) {

            let form = dom.templateSetUsers.html();

            let template = _.template(form);

            let compiled = template({ Title, Button });

            return compiled;
        },
        cleanIdUser() {
            sessionStorage.removeItem('objUser');
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
        container: '.modal__center',
        childrenBox: '.modal__children',
        parent: '.modal',
        closeModal: '.modal__close',
    }

    let dom = {}

    function asnyCatchDom() {
        dom.parent = $(st.parent);
        dom.container = $(st.container, dom.parent);
        dom.childrenBox = $(st.childrenBox, dom.parent);
        dom.closeModal = $(st.closeModal, dom.parent);
    }

    function asynSuscribeEvents() {
        dom.closeModal.on('click', events.hideModal);
        dom.childrenBox.on('click', events.hideModal);
    }

    let events = {
        hideModal(e) {

            if (e.target != this)
                return
            dom.parent.addClass('is_hide');

        }
    }

    let fn = {
        showModal(html) {
            dom.container.empty();
            dom.parent.removeClass('is_hide');
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

let ConfigUser = function () {

    let st = {
        parent: '.form',
        saveUser: '.form__btn-save',
        category: '.category',
        name: '.full-name',
        age: '.age',
        completed: '.completed',
        afterSave: null,
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.saveUser = $(st.saveUser, dom.parent);
        dom.category = $(st.category, dom.parent);
        dom.name = $(st.name, dom.parent);
        dom.age = $(st.age, dom.parent);
        dom.completed = $(st.completed, dom.parent);
    }

    function suscribeEvents() {
        dom.saveUser.on('click', events.saveData)
    }

    let events = {
        saveData() {

            ps.run('loding:showLoading')

            let objUser = sessionStorage.getItem('objUser') ? JSON.parse(sessionStorage.getItem('objUser')) : [];

            let category = dom.category.val();
            let name = dom.name.val();
            let age = dom.age.val();
            let completed = dom.completed.val();

            fn.configData(objUser, { category, name, age, completed });

            setTimeout(() => {
                ps.run('loding:hideLoading')
                st.afterSave()
            }, 400);
        }
    }

    let fn = {
        fillInput(user) {

            dom.category.val(user[0].category);
            dom.name.val(user[0].name);
            dom.age.val(user[0].age);
            dom.completed.val(user[0].completed);

        },
        getData(idUser) {

            if (idUser != undefined || idUser != null || idUser == "") {

                axios.get('http://localhost:4000/data')
                    .then(result => {

                        let objUser = result.data.filter(user => user.id == idUser)

                        fn.fillInput(objUser);

                        sessionStorage.setItem('objUser', JSON.stringify(objUser));
                    })
                    .catch(err => console.log(err))

            }
        },
        configData(objUser, newData) {

            objUser = objUser.length == 0 ? undefined : objUser;

            if (objUser == undefined) {

                let id = (Math.random() * 1000).toString().split('.')[1];

                axios.post(`http://localhost:4000/data/`, {
                    id: parseInt(id),
                    category: newData.category,
                    name: newData.name,
                    age: parseInt(newData.age),
                    completed: newData.completed,
                })
                    .then(result => console.log(result))
                    .catch(err => console.log(err))

            } else {
                axios.put(`http://localhost:4000/data/${objUser[0].id}`, {
                    category: newData.category,
                    name: newData.name,
                    age: parseInt(newData.age),
                    completed: newData.completed,
                })
                    .then(result => console.log(result.data))
                    .catch(err => console.log(err))

            }
        }
    }

    function init(idUser, callback) {
        catchDom();
        suscribeEvents();;
        fn.getData(idUser);
        st.afterSave = callback
    }

    return {
        init
    }
}

let Loading = function () {
    let st = {
        parent: '.modal',
        content: '#template-loading',
        container: '.modal__center',
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.container = $(st.container, dom.parent);
        dom.content = $(st.content);
    }

    let fn = {
        showLoading() {
            fn.getLoading();
            dom.container.show();
        },
        hideLoading() {
            dom.container.hide();
            dom.parent.addClass('is_hide');
        },
        getLoading() {
            let load = dom.content.html();
            dom.container.html(load);
        }
    }

    function init() {
        catchDom();
    }

    return {
        init,
        showLoading: fn.showLoading,
        hideLoading: fn.hideLoading,
    }
}

let ShowUsers = function () {
    let st = {
        parent: '.grid__users',
        externalBox: '.modal',
        container: '.grid__list-user',
        templateListUsers: '#template-listUsers',
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

            fn.service()
                .then(users => {
                    users = users == null ? [] : users;

                    let html = dom.templateListUsers.html();
                    let tmp = _.template(html);
                    let compiled = tmp({ users });
                    fn.showListUsers(compiled);
                })
                .catch(err => console.log(err))

        },
        setListUsers(html) {
            dom.container.html(html);
        },
        throwEvents() {
            fn.getListUsers();
        },
        showListUsers(html) {
            fn.setListUsers(html);
            ps.run('gridUsers:init')
            ps.run('modal:init')
        },
        service() {

            return axios.get('http://localhost:4000/data')
                .then(result => result.data)
                .catch(err => console.log(err))

        }
    }

    function init() {
        catchDom();
        fn.throwEvents();
    }

    return {
        init
    }
}

let DeleteUser = function () {
    let st = {
        parent: '.grid__items',
        deleteUser: '.btn-delete-user',
        afterDelete: null,
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.deleteUser = $(st.deleteUser, dom.parent);
    }

    let fn = {
        deleteUser(id) {

            axios.delete(`http://localhost:4000/data/${id}`)
                .then(result => st.afterDelete())
                .catch(err => console.log(err))

        }
    }

    function init(id, callback) {
        catchDom();
        st.afterDelete = callback;
        fn.deleteUser(id);
    }

    return {
        init
    }
}

let ps = new Fn();
let gridUsers = new GridUsers();
let modal = new Modal();
let configUser = new ConfigUser();
let showUsers = new ShowUsers();
let loading = new Loading();
let deleteUser = new DeleteUser();

ps.add('modal:init', modal.init);
ps.add('modal:showModal', modal.showModal);
ps.add('loding:showLoading', loading.showLoading);
ps.add('loding:hideLoading', loading.hideLoading);
ps.add('configUser:init', configUser.init);
ps.add('showUsers:init', showUsers.init);
ps.add('loading:init', loading.init);
ps.add('deleteUser:init', deleteUser.init);
ps.add('gridUsers:init', gridUsers.init);

loading.init();
showUsers.init();

function rebaseMerge() {
    console.log(`rebase y master`);
}

rebaseMerge()


