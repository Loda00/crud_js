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

let ComponenteCrud = function () {
    let st = {
        parent: '.grilla',
        btnAddUser: '.grilla__btnAddUser',
        btnUpdateUser: '.grilla__btnUpdateUser',
        btnDeleteUser: '.grilla__btnDeleteUser',
        templateSetUsers: '#template-setUsers',
        container: '.popUp__centerBox'
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
            ps.run('addUser:init', undefined, function () {

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
        container: '.popUp__centerBox',
        childrenBox: '.popUp__childrenBox',
        parent: '.popUp',
        closeModal: '.popUp__closeModal',
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
        parent: '.form',
        saveUser: '.form__saveUser',
        userId: '.category',
        title: '.title',
        completed: '.completed',
        afterSave: null,
    }
 
    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.saveUser = $(st.saveUser, dom.parent);
        dom.userId = $(st.userId, dom.parent);
        dom.title = $(st.title, dom.parent);
        dom.completed = $(st.completed, dom.parent);
    }

    function suscribeEvents() {
        dom.saveUser.on('click', events.saveData)
    }

    let events = {
        saveData() {

            ps.run('loding.showLoading')

            let users = localStorage.getItem('listUsers') ? JSON.parse(localStorage.getItem('listUsers')) : [];

            let userID = JSON.parse(sessionStorage.getItem('idUser'));

            let userId = dom.userId.val();
            let title = dom.title.val();
            let completed = dom.completed.val();

            fn.addData(users, userID, { userId, title, completed });

            localStorage.setItem('listUsers', JSON.stringify(users));

            setTimeout(() => {
                ps.run('loding.hideLoading')
                st.afterSave()
            }, 500);
        }
    }

    let fn = {
        fillInput(user) {
            console.log(user)
            dom.userId.val(user[0].userId);
            dom.title.val(user[0].title);
            dom.completed.val(user[0].completed);
        },
        setData(idUser) {

            if (idUser != undefined || idUser != null || idUser == "") {

                let users = JSON.parse(localStorage.getItem('listUsers'));

                let objUser = users.filter((user, index) => user.id == idUser)

                fn.fillInput(objUser);

                sessionStorage.setItem('idUser', JSON.stringify(idUser));
            }
        },
        addData(users, userID, objUser) {

            if (userID == undefined) {

                let id = (Math.random() * 1000).toString().split('.')[1];
                users.push({ id, ...objUser })

            } else {

                users.forEach((user) => {

                    if (user.id == userID) {

                        user.userId = userId
                        user.title = title
                        user.completed = completed

                    }
                })
            }
        }
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
        parent: '.popUp',
        content: '.loading',
        container: '.popUp__centerBox',
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
            let load = dom.content.html();
            dom.container.html(load);
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
        parent: '.grilla__users',
        externalBox: '.popUp',
        container: '.grilla__listUser',
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
        }, servicio() {

            axios.get('https://jsonplaceholder.typicode.com/todos?userId=1')
                .then(rs => {

                    localStorage.setItem('listUsers', JSON.stringify(rs.data));
                })
                .catch(err => console.log(err))


            // fetch('https://jsonplaceholder.typicode.com/todos?userId=2')
            //     .then(rs => {
            //         // console.log('pruebar', rs);
            //         // console.log('pruebar', rs.json());
            //         // console.log('pruebar', rs.text());
            //         return rs.json();
            //         // localStorage.setItem('listUsers', JSON.stringify(JSON.parse(rs)));

            //     })
            //     .then(data => {
            //         console.log('data', data)
            //     })
            //     .catch(err => console.log(err));
        }
    }

    function init() {
        catchDom();
        fn.throwEvents();
        ps.run('modal:init')
        fn.servicio();
    }

    return {
        init
    }
}

let DeleteUser = function () {
    let st = {
        parent: '.grilla__contentItems',
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

let ps = new Fn();
let componenteCrud = new ComponenteCrud();
let modal = new Modal();
let addUser = new AddUser();
let showUsers = new ShowUsers();
let loading = new Loading();
let deleteUser = new DeleteUser();


ps.add('modal:init', modal.init);
ps.add('componenteCrud:init', componenteCrud.init);
ps.add('modal:showModal', modal.showModal);
ps.add('loding.showLoading', loading.showLoading);
ps.add('loding.hideLoading', loading.hideLoading);
ps.add('addUser:init', addUser.init);
ps.add('showUsers:init', showUsers.init);
ps.add('loading:init', loading.init);
ps.add('deleteUser:init', deleteUser.init);


loading.init();
showUsers.init();
componenteCrud.init();

