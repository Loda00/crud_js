declare var axios: any;
import { LoadListUser } from './LoadListUser'
import { Modal } from './Modal'

type asd = {

}

interface ISetUser {
    parent: String,
    container: String,
    template: String,
    btnSave: String,
    category: String,
    name: String,
    age: String,
    completed: String,
}

interface IUser {
    category: string
    name: string
    age: string
    completed: string
    id: Number
    data?: any
}

export class SetUser implements ISetUser {

    parent = '.js-listUser'
    container = '.js-items-user'
    template = 'template-listUsers'
    btnSave = '.js-form-btn-save'
    category = '.category'
    name = '.full-name'
    age = '.age'
    completed = '.completed'
    id?: number
    dom: any

    constructor(id: number) {
        this.id = id ? id : undefined;
        this.dom = {}

        this.catchDom();
        this.events();
        
        if (id) {
            this.getDataUser();
        }
    }

    catchDom(): void {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
        this.dom.category = $(this.category);
        this.dom.fullname = $(this.name);
        this.dom.age = $(this.age);
        this.dom.completed = $(this.completed);
        this.dom.template = $(this.template);
        this.dom.btnSave = $(this.btnSave);
    }

    events(): void {
        this.dom.btnSave.on('click', () => {
            this.setUser()
        })
    }

    setUser(): void {
        let category = this.dom.category.val();
        let name = this.dom.fullname.val();
        let age = this.dom.age.val();
        let completed = this.dom.completed.val();

        if (this.id == undefined) {

            let id = parseInt((Math.random() * 1000).toString().split('.')[1]);

            this.addUser({ id, category, name, age, completed })
                .then(() => {
                    new LoadListUser();
                    modal.closeModal();
                })
        } else {

            this.updateUser({ id: this.id, category, name, age, completed })
                .then(() => {
                    new LoadListUser();
                    modal.closeModal();
                })

        }

    }

    addUser(obj: IUser) {
        return axios.post(`http://localhost:4000/data`, {
            category: obj.category,
            name: obj.name,
            age: obj.age,
            completed: obj.completed,
            id: obj.id,
        })
    }

    updateUser(obj: IUser) {
        return axios.put(`http://localhost:4000/data/${obj.id}`, {
            category: obj.category,
            name: obj.name,
            age: obj.age,
            completed: obj.completed,
        })
    }

    getDataUser() {
        axios.get(`http://localhost:4000/data/?id=${this.id}`)
            .then((result: IUser) => {
                this.fillDataUser(result.data);
            })
            .catch((err: Error) => { console.log(err) })
    }

    fillDataUser(obj: IUser[]): void {
        console.log('obj', obj)
        this.dom.category.val(obj[0].category);
        this.dom.fullname.val(obj[0].name);
        this.dom.age.val(obj[0].age);
        this.dom.completed.val(obj[0].completed);
    }
}
let modal = new Modal();