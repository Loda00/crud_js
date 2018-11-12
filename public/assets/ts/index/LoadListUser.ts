declare var axios: any;
declare var _: any;

import { ListUser } from './ListUser'

interface ILoadListUser {
    parent: String,
    container: String,
    template: String,
}

interface IUser {
    category: string
    fullName: string
    age: string
    completed: string
    id: Number
    data?: any
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

    catchDom(): void {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
    }

    autoExec(): void {
        this.getData();
    }

    getData(): void {
        axios.get(`http://localhost:4000/data`)
            .then((result: IUser) => {
                this.setData(result.data)
                new ListUser();
            })
            .catch((err: Error) => console.log(err))
    }

    setData(data: IUser): void {
        let html = document.getElementById(this.template).innerHTML;

        let tmp = _.template(html);
        let compiled = tmp({ data })
        this.dom.container.html(compiled);
    }
}
