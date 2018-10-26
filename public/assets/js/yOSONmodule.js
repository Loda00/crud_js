yOSON.AppCore.addModule('Show-Users', function () {
    let st = {
        parent: '.grid',
        listUser: '.grid__list-user',
        templateListUsers: '#template-listUsers',
    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.listUser = $(st.listUser, dom.parent);
        dom.templateListUsers = $(st.templateListUsers);
    }

    let fn = {
        getTemplate() {

            fn.getData()
                .then(result => {

                    let html = dom.templateListUsers.html();

                    let tmp = _.template(html);

                    let compiled = tmp({ users: result.data });

                    fn.addTemplate(compiled);

                })
                .catch(err => console.log(err));

        },
        getData() {
            return axios.get(`http://localhost:4000/data`);
        },
        addTemplate(template) {
            dom.listUser.html(template);
        }

    }

    function init() {
        fn.getTemplate();
        catchDom();
    }

    return {
        init
    }
})

yOSON.AppCore.addModule('Modal', function () {
    let st = {
        parent: '.modal',
        container: '.modal__center',
        btnCloseModal: '.modal__close',
        templateLoading: 'template-loading',

    }

    let dom = {}

    function catchDom() {
        dom.parent = $(st.parent);
        dom.container = $(st.container, dom.parent);
        dom.btnCloseModal = $(st.btnCloseModal, dom.parent);
        dom.templateLoading = $(st.templateLoading);
    }

    function suscribeEvents() {

    }

    let events = {
        showModal() {
            dom.parent.show();
        }
    }

    let fn = {

    }

    function init() {
        events.showModal();
    }

    return {
        init
    }
})

yOSON.AppCore.runModule('Modal')
yOSON.AppCore.runModule('Show-Users')

