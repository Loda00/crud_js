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
        dom.btnUpdateUser.on('click', events.argumento);
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
            dom.parent.removeClass('hide');
            dom.container.show();
            fn.getFormUpdate();

        },
        argumento() {
            let data = this;
            return data;
        }
    }

    let fn = {
        getFormAdd() {
            let form = dom.formAddUser.html();
            dom.container.html(form);
            ps.run('addUser:init');
        },
        getFormUpdate() {
            let form = dom.formUpdateUser.html();
            dom.container.html(form)
            ps.run('updateUser:init');
        }
    }

    function init() {
        catchDom();
        suscribeEvents();
    }

    return {
        init,
        arg: events.argumento
    }
}

let AddUser = function () {

    let st = {
        parent: '.external-box',
        container: '.center-box',
        content: '.form-user',
        saveUser: '.save-user',
        db: []
    }

    let dom = {}

    function catchDom() {
        dom.container = $(st.container);
        dom.content = $(st.content);
        dom.parent = $(st.parent);
        dom.saveUser = $(st.saveUser);
    }

    function suscribeEvents() {
        dom.saveUser.on('click', events.saveData)
    }

    let events = {
        saveData() {

            let user = $('.user').val();
            let pass = $('.password').val();
            let name = $('.name').val();
            let lastName = $('.last-name').val();
            let id = (Math.random() * 1000).toString().split('.')[1];

            st.db.push({
                id, user, pass, name, lastName
            })

            localStorage.setItem('listUsers', JSON.stringify(st.db))

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
        //ps.run('modal:init')
        //ps.run('deleteUser:init')
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
            let listUsers = localStorage.getItem('listUsers')

            st.list = JSON.parse(listUsers).map((user, index) => {
                return `<div class="form-header item">
                        <span>${user.user}</span><span>${user.pass}</span><span>${user.name}</span><span>${user.lastName}</span><span><img class='btn-update-user' data-id='${user.id}' src="https://cdn.pixabay.com/photo/2013/07/13/01/15/edit-155387_960_720.png" alt="" srcset=""></span><span><img class='btn-delete-user' data-id='${user.id}' src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-4/256/Open-Folder-Delete-icon.png" alt="" srcset=""></span>
                        </div>`
            })
        },
        setListUsers() {
            let listUser = st.list;
            dom.container.html(listUser);
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
        container: '.center-box',
        content: '.form-user',
        updateUser: '.update-user',
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.container = $(st.container);
        dom.content = $(st.content);
        dom.updateUser = $(st.updateUser);

    }

    function suscribeEvents() {
        //events.setData();
        dom.updateUser.on('click', events.update);
    }

    let events = {
        setData() {
            //let x = ps.run('modal:events:argumento');
            console.log('actualizando ... ')
            let id = fn.getId(this)
            console.log(this)
            let data = fn.getData(id);
            fn.fillInput(data);
        },
        update() {

        }
    }

    let fn = {
        fillInput(data) {

            $('.user').val(data.user);
            $('.password').val(data.pass);
            $('.name').val(data.name);
            $('.last-name').val(data.lastName);

        },
        getData(idUser) {
            let users = JSON.parse(localStorage.getItem('listUsers'));
            //console.log(db)

            let user = users.filter((user, index) => {
                return user.id == idUser
            })

            return user;
        },
        getId(arg) {
            let data = ps.run('updateUser:init');

            console.log(data);
            let id = $(arg).attr('data-id');
            // console.log(id);
            return id;
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
        $(dom.deleteUser).on('click', events.deleteUser)
    }

    let events = {
        deleteUser() {
            let id = fn.getId(this);
            console.log(this)
            fn.delete(id);
            ps.run('showUsers:init');
            $('.list-users').empty();
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
showUsers.init();
ps.add('modal:init', modal.init);
// ps.add('modal:events:argumento', modal.arg);
ps.add('addUser:init', addUser.init);
ps.add('showUsers:init', showUsers.init);
ps.add('loading:init', loading.init);
ps.add('updateUser:init', updateUser.init);
ps.add('deleteUser:init', deleteUser.init);

