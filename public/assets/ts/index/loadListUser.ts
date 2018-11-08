declare var axios: any;
declare var _: any;

import { ListUser } from './listUser'

interface ILoadListUser {
    parent: String,
    container: String,
    template: String,
}

export class LoadListUser implements ILoadListUser {

    parent = '.js-listUser'
    container = '.js-items-user'
    template = 'template-listUsers'
    dom: any

    constructor() {
        this.dom = {}
        this.catchDom();
        this.autoExec();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
    }

    autoExec() {
        this.getData();
    }

    getData() {
        axios.get(`http://localhost:4000/data`)
            .then((result: any) => {
                this.setData(result.data)
                new ListUser();
            })
            .catch((err: any) => console.log(err))
    }

    setData(data: Array<String>) {
        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ data })
        this.dom.container.html(compiled);
    }
}
