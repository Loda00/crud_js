
let ShowList = function () {
    let st = {
        templateList: '#template-list',
        list: '.list',
    }

    let dom = {}

    function catchDom() {
        dom.templateList = $(st.templateList);
        dom.list = $(st.list);
    }

    let fn = {
        getList() {
            axios.get('https://randomuser.me/api/?results=100')
                .then(result => {
                    fn.setList(result.data.results)
                })
                .catch(err => console.log(err))
        },
        setList(data) {

            let html = dom.templateList.html();

            let tmp = _.template(html);

            let compiled = tmp({ data: data })

            dom.list.html(compiled);

        }
    }

    function init() {
        catchDom();
        fn.getList();
    }

    return {
        init
    }
}

let showList = new ShowList();

showList.init();