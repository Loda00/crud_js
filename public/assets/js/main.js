var fn = function () {
    let fns = {}
    let add = (nameFn, Fn) => {
        fns[nameFn] = Fn;
    }
    let run = (nameFn, args) => {
        fns[nameFn](args)
    }
    return {
        add, run
    }
}

_.templateSettings = {
    evaluate: /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g
}

let ps = new fn();

let Modal = function () {
    let st = {
        parent: '.external-box',
        btnAddUser: '.btn-add-user',
        btnUpdateUser: '.btn-update-user',
        container: '.center-box',
        formAddUser: '.form-user',
        formUpdateUser: '.form-user-update',
        childrenBox: '.children-box',
        closeModal: '.close-modal',
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.btnAddUser = $(st.btnAddUser);
        dom.container = $(st.container, dom.parent);
        dom.formAddUser = $(st.formAddUser);
        dom.formUpdateUser = $(st.formUpdateUser);
        dom.btnUpdateUser = $(st.btnUpdateUser);
        dom.childrenBox = $(st.childrenBox, dom.parent);
        dom.closeModal = $(st.closeModal, dom.parent);
    }

    function suscribeEvents() {
        dom.btnAddUser.on('click', events.showPopupAddUser);
        dom.btnUpdateUser.on('click', events.showPopupUpdateUser);
        dom.closeModal.on('click', events.hidePopup);
        dom.childrenBox.on('click', events.hidePopup);
    }

    let events = {
        showPopupAddUser() {
            dom.parent.removeClass('hide');
            dom.container.show();
            fn.getFormAdd();
        },
        hidePopup(e) {
            if (e.target != this)
                return
            dom.parent.addClass('hide');
        },
        showPopupUpdateUser() {
            let arg = this;
            dom.parent.removeClass('hide');
            dom.container.show();
            fn.getFormUpdate(arg);

        }
    }

    let fn = {
        getFormAdd() {
            let form = dom.formAddUser.html();
            dom.container.html(form);
            ps.run('addUser:init');
        },
        getFormUpdate(arg) {
            let form = dom.formUpdateUser.html();
            dom.container.html(form)

            let id = $(arg).attr('data-id');
            ps.run('updateUser:updateData', id);
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

let AddUser = function () {

    let st = {
        parent: '.btn-add-user',
        externalBox: '.external-box',
        container: '.center-box',
        content: '.form-user',
        saveUser: '.save-user',
        user: '.user',
        password: '.password',
        name: '.name',
        lastName: '.last-name'
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.externalBox = $(st.externalBox);
        dom.container = $(st.container);
        dom.content = $(st.content);
        dom.saveUser = $(st.saveUser);
        dom.user = $(st.user);
        dom.password = $(st.password);
        dom.name = $(st.name);
        dom.lastName = $(st.lastName);
    }

    function suscribeEvents() {
        dom.saveUser.on('click', events.saveData)
    }

    let events = {
        saveData() {

            let users = JSON.parse(localStorage.getItem('listUsers'));

            let user = dom.user.val();
            let pass = dom.password.val();
            let name = dom.name.val();
            let lastName = dom.lastName.val();
            let id = (Math.random() * 1000).toString().split('.')[1];

            if (users == null)
                users = [];

            users.push({
                id, user, pass, name, lastName
            })

            localStorage.setItem('listUsers', JSON.stringify(users))

            fn.loading();
            setTimeout(() => {
                ps.run('showUsers:init')
            }, 800);
        }
    }

    let fn = {
        hidePopup(e) {
            dom.externalBox.addClass('hide');
            dom.externalBox.empty();
        },
        loading() {
            ps.run('loading:init')
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

let Loading = function () {
    let st = {
        content: '.efectLoading',
        container: '.center-box',
    }

    let dom = {}

    function catchDom() {
        dom.content = $(st.content);
        dom.container = $(st.container);
    }

    function suscribeEvents() {
        events.showLoading();
    }

    let events = {
        showLoading() {
            fn.getLoading();
            dom.container.delay(800).hide(1);
        },
        hideLoading() {
            dom.container.empty();
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
        suscribeEvents();
    }

    return {
        init
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
        dom.btn = $('.btn');
    }

    function suscribeEvents() {
        dom.btn.on('click', events.btn)
        events.hidePopup();
        events.showListUsers();
        ps.run('modal:init')
        ps.run('deleteUser:init')
    }
    // var users = JSON.parse(localStorage.getItem('listUsers'))
    let events = {
        showListUsers() {
            let html = fn.getListUsers();
            console.log('html', html);
            fn.setListUsers(html);

        },
        hidePopup() {
            dom.externalBox.addClass('hide');
        },
        btn() {
            let users = JSON.parse(localStorage.getItem('listUsers'))
            let html = dom.templateListUsers.html()
            console.log('html', html);
            let tmp = _.template(html, { users: users })

            console.log('tmp', tmp);

            dom.container.html(tmp);
        }
    }

    let fn = {
        getListUsers() {


        },
        setListUsers(html) {
            dom.container.html(html);
        },
        showListuser() {
            fn.getListUsers();
            fn.setListUsers();
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

let UpdateUser = function () {
    let st = {
        parent: '.external-box',
        updateUser: '.update-user',
        user: '.user',
        password: '.password',
        name: '.name',
        lastName: '.last-name',
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.updateUser = $(st.updateUser);
        dom.user = $(st.user);
        dom.password = $(st.password);
        dom.name = $(st.name);
        dom.lastName = $(st.lastName);
    }

    function suscribeEvents() {
        events.setData();
        dom.updateUser.on('click', events.update);
    }

    let events = {
        setData() {
            let user = JSON.parse(sessionStorage.getItem('userID'))

            fn.fillInput(user);
        },
        update() {

            let Users = JSON.parse(localStorage.getItem('listUsers'))
            let User = JSON.parse(sessionStorage.getItem('userID'))

            Users.forEach((user, index) => {

                if (user.id == User[0].id) {

                    user.user = dom.user.val();
                    user.pass = dom.password.val();
                    user.name = dom.name.val();
                    user.lastName = dom.lastName.val();

                }

            })

            localStorage.setItem('listUsers', JSON.stringify(Users));
            ps.run('showUsers:init');
        }
    }

    let fn = {
        fillInput(user) {

            dom.user.val(user[0].user);
            dom.password.val(user[0].pass);
            dom.name.val(user[0].name);
            dom.lastName.val(user[0].lastName);

        },
        getData(idUser) {

            let users = JSON.parse(localStorage.getItem('listUsers'));

            let user = users.filter((user, index) => {
                return user.id == idUser
            })

            sessionStorage.setItem('userID', JSON.stringify(user))
        },
        updateData(id) {
            fn.getData(id);
            catchDom();
            suscribeEvents();
        }

    }

    function init() {
        catchDom();
        suscribeEvents();
    }

    return {
        init,
        updateData: fn.updateData
    }
}

let DeleteUser = function () {
    let st = {
        parent: '.form-header',
        deleteUser: '.btn-delete-user',
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.deleteUser = $(st.deleteUser);
    }

    function suscribeEvents() {
        dom.deleteUser.on('click', events.deleteUser)
    }

    let events = {
        deleteUser() {
            let id = fn.getId(this);
            fn.delete(id);
            ps.run('showUsers:init');
        }
    }

    let fn = {
        getId(arg) {
            let id = $(arg).attr('data-id');
            return id;
        },
        delete(idUser) {

            let users = JSON.parse(localStorage.getItem('listUsers'));

            let list = users.filter((user, index) => {

                return user.id != idUser;

            })

            localStorage.setItem('listUsers', JSON.stringify(list));
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


let modal = new Modal();
let addUser = new AddUser();
let showUsers = new ShowUsers();
let loading = new Loading();
let updateUser = new UpdateUser();
let deleteUser = new DeleteUser();

modal.init();
ps.add('modal:init', modal.init);
ps.add('addUser:init', addUser.init);
ps.add('showUsers:init', showUsers.init);
ps.add('loading:init', loading.init);
// ps.add('updateUser:init', updateUser.init);
ps.add('updateUser:updateData', updateUser.updateData);
ps.add('deleteUser:init', deleteUser.init);

showUsers.init();

