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

// _.templateSettings = {
//     evaluate: /\{\{([\s\S]+?)\}\}/g,
//     interpolate: /\{\{=([\s\S]+?)\}\}/g
// }

let ps = new fn();

let Modal = function () {
    let st = {
        parent: '.external-box',
        btnAddUser: '.btn-add-user',
        container: '.center-box',
        formAddUser: '.form-user',
        childrenBox: '.children-box',
        closeModal: '.close-modal',
        templateSetUsers: '#template-setUsers'
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
        dom.templateSetUsers = $(st.templateSetUsers);
    }

    function suscribeEvents() {
        dom.btnAddUser.on('click', events.showPopupAddUser);
        dom.btnUpdateUser.on('click', events.showPopupAddUser);
        dom.closeModal.on('click', events.hidePopup);
        dom.childrenBox.on('click', events.hidePopup);
    }

    let events = {
        showPopupAddUser() {
            dom.parent.removeClass('hide');
            dom.container.show();
            fn.getFormAdd(this);
        },
        hidePopup(e) {
            if (e.target != this)
                return
            dom.parent.addClass('hide');
        }
    }

    let fn = {
        getFormAdd(arg) {

            let id = $(arg).attr('data-id') == undefined ? 0 : $(arg).attr('data-id');

            let form = dom.templateSetUsers.html();

            let template = _.template(form);
            let compiled = null

            if (id > 1) {

                compiled = template({ tmpTitle: 'Update User', tmpBtn: 'Update' });

                dom.container.html(compiled);

                fn.clearIdUser()

                ps.run('addUser:getArgument', id);
                ps.run('addUser:init');

            } else {

                compiled = template({ tmpTitle: 'Add User', tmpBtn: 'Add' });

                dom.container.html(compiled);

                fn.clearIdUser()

                ps.run('addUser:init');

            }
        },
        clearIdUser() {
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
        dom.user = $(st.user); 'text'
        dom.password = $(st.password);
        dom.name = $(st.name);
        dom.lastName = $(st.lastName);
    }

    function suscribeEvents() {
        events.setData();
        dom.saveUser.on('click', events.saveData)
    }

    let events = {
        saveData() {

            fn.loading();
            let users = localStorage.getItem('listUsers') ? JSON.parse(localStorage.getItem('listUsers')) : [];

            let userID = JSON.parse(sessionStorage.getItem('userID'));

            let user = dom.user.val();
            let pass = dom.password.val();
            let name = dom.name.val();
            let lastName = dom.lastName.val();

            if (userID == undefined) {
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


            fn.hideLoading();
            // setTimeout(() => {
            //     ps.run('showUsers:init')
            // }, 800);

        },
        setData() {
            let sessionUser = JSON.parse(sessionStorage.getItem('userID'));
            if (sessionUser != undefined || sessionUser != null) {

                let users = JSON.parse(localStorage.getItem('listUsers'));

                let objUser = users.filter((user, index) => {
                    return user.id == sessionUser;
                })

                fn.fillInput(objUser);
            }
        }
    }

    let fn = {
        hidePopup(e) {
            dom.externalBox.addClass('hide');
            dom.externalBox.empty();
        },
        loading() {
            ps.run('loading:init')
        },
        fillInput(user) {
            dom.user.val(user[0].user);
            dom.password.val(user[0].pass);
            dom.name.val(user[0].name);
            dom.lastName.val(user[0].lastName);
        },
        getArgument(id) {
            sessionStorage.setItem('userID', JSON.stringify(id))
        }
    }

    function init() {
        catchDom();
        suscribeEvents();
    }

    return {
        init,
        getArgument: fn.getArgument,
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
    }

    function suscribeEvents() {
        events.hidePopup();
        events.showListUsers();
        ps.run('modal:init')
        ps.run('deleteUser:init')
    }

    let events = {
        showListUsers() {
            let html = fn.getListUsers();
            fn.setListUsers(html);
        },
        hidePopup() {
            dom.externalBox.addClass('hide');
        }
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

            let list = users.filter((user) => user.id != idUser)

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
let deleteUser = new DeleteUser();

modal.init();
ps.add('modal:init', modal.init);
ps.add('addUser:getArgument', addUser.getArgument);
ps.add('addUser:init', addUser.init);
ps.add('showUsers:init', showUsers.init);
ps.add('loading:init', loading.init);
ps.add('deleteUser:init', deleteUser.init);

showUsers.init();



// function prueba() {

//     let fn = {
//         getInput() {

//         },
//         saveData() {

//         }
//     }

//     return {
//         saveData: fn.saveData
//     }
// }

// let oPrueba = prueba()
// console.log(oPrueba.saveData)

// button#prueba

// $("#prueba").on('click', function(){
//     let tmp = -.template("#template")

//     fn.showLoading()

//     fn.run('modal', tmp )

//     setTimeout(()=>{
//         fn.hiddeLoding()
//         fn.run('addUser')
//     },100)
// })