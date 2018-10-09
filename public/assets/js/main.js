
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
        container: '.center-box',
        content: '.form-user-add',
        childrenBox: '.children-box',
        closeModal: '.close-modal',
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent)
        dom.btnAddUser = $(st.btnAddUser)
        dom.container = $(st.container, dom.parent)
        dom.content = $(st.content)
        dom.childrenBox = $(st.childrenBox, dom.parent)
        dom.closeModal = $(st.closeModal, dom.parent)
    }

    function suscribeEvents() {
        dom.btnAddUser.on('click', events.showPopup);
        dom.closeModal.on('click', events.hidePopup);
        dom.childrenBox.on('click', events.hidePopup);
    }

    let events = {
        showPopup() {
            dom.parent.removeClass('hide');
            dom.container.show();
            fn.getForm();
        },
        hidePopup(e) {
            if (e.target != this)
                return
            dom.parent.addClass('hide');
        }
    }

    let fn = {
        getForm() {
            let form = dom.content.html();
            dom.container.html(form);
            ps.run('addUser:init');
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
        content: '.form-user-add',
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

            st.db.push({
                user, pass, name, lastName
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
            $('.center-box').html(load);
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
    }

    let events = {
        showListUsers() {
            fn.getListUsers();
            fn.setListUsers();
        },
        hidePopup() {
            dom.externalBox.addClass('hide');
        }
    }

    let fn = {
        getListUsers() {
            let listUsers = localStorage.getItem('listUsers')
            console.log(typeof (listUsers))


            st.list = JSON.parse(listUsers).map((user, index) => {
                return `<div class="form-header">
                        <span class="hide">${index}</span><span>${user.user}</span><span>${user.pass}</span><span>${user.name}</span><span>${user.lastName}</span><span><img src="https://cdn.pixabay.com/photo/2013/07/13/01/15/edit-155387_960_720.png" alt="" srcset=""></span><span><img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-4/256/Open-Folder-Delete-icon.png" alt="" srcset=""></span>
                        </div>`
            })
        },
        setListUsers() {
            let listUser = st.list

            dom.container.html(listUser)
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
modal.init();
ps.add('addUser:init', addUser.init);
ps.add('showUsers:init', showUsers.init);
ps.add('loading:init', loading.init);
