// alert('Done');

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
        content: '.form-user',
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
        container: '.center-box',
        content: '.form-user',
        saveUser: '.save-user'
    }

    let dom = {}

    function catchDom() {
        dom.container = $(st.container)
        dom.content = $(st.content)
        dom.saveUser = $(st.saveUser)
        alert('WDF')
    }

    function suscribeEvents() {
        dom.saveUser.on('click', events.saveData)
    }

    let events = {
        saveData() {

            let db = [];

            let user = $('.user').val();
            let pass = $('.password').val();
            let name = $('.name').val();
            let lastName = $('.last-name').val();

            db.push({
                user, pass, name, lastName
            })

            console.log(db);

            window.localStorage.setItem('listUsers', JSON.stringify(db))

        }
    }

    let fn = {

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

    }

    function suscribeEvents() {

    }

    let events = {

    }

    let fn = {

    }

    function init() {

    }

    return {

    }
}


let modal = new Modal();
let addUser = new AddUser();
modal.init();
ps.add('addUser:init', addUser.init);
