class LoadListUser {

    constructor() {
        this.parent = '.js-listUser'
        this.container = '.js-items-user'
        this.template = 'template-listUsers'

        this.dom = {}
        this.catchDom();
        this.showListUser();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
        this.dom.template = $(this.template);
    }

    showListUser() {
        let data = this.getData();

        data
            .then(result => {
                this.setData(result.data)
                new ListUser();
            })
            .catch(err => console.log(err));
    }

    getData() {
        return axios.get(`http://localhost:4000/data`);
    }

    setData(data) {
        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ data });

        this.dom.container.html(compiled);
    }
}