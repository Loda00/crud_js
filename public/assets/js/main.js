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
        parent: '.external-box',
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
        dom.container = $(st.container);
        dom.content = $(st.content);
        dom.parent = $(st.parent);
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
            dom.parent.addClass('hide');
            dom.parent.empty();
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
        externalBox: '.external-box',
        parent: '.grilla-users',
        container: '.list-users',
        list: []
    }

    let dom = {}

    function catchDom() {
        dom.externalBox = $(st.externalBox);
        dom.parent = $(st.parent);
        dom.container = $(st.container);
    }

    function suscribeEvents() {
        events.hidePopup();
        events.showListUsers();
        ps.run('modal:init')
        ps.run('deleteUser:init')
    }

    let events = {
        showListUsers() {
            fn.getListUsers();
            fn.setListUsers();

        },
        hidePopup() {
            dom.externalBox.addClass('hide');
        },

    }

    let fn = {
        getListUsers() {
            let Users = JSON.parse(localStorage.getItem('listUsers'))

            st.list = Users.map((user, index) => {
                return `<div class="form">
                        <span>${user.user}</span><span>${user.pass}</span><span>${user.name}</span><span>${user.lastName}</span><span><img class='btn-update-user' data-id='${user.id}' src="https://icon-icons.com/icons2/215/PNG/256/edit-validated256_25237.png" alt="" srcset=""></span><span><img class='btn-delete-user' data-id='${user.id}' src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-4/256/Open-Folder-Delete-icon.png" alt="" srcset=""></span>
                        </div>`
            })
        },
        setListUsers() {
            let Users = st.list;
            dom.container.html(Users);
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
        idUser: null,
        parent: '.external-box',
        container: '.center-box',
        content: '.form-user',
        updateUser: '.update-user',
        user: '.user',
        password: '.password',
        name: '.name',
        lastName: '.last-name'
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.container = $(st.container);
        dom.content = $(st.content);
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
