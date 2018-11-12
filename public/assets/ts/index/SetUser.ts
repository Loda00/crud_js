declare var axios: any;
import { LoadListUser } from './LoadListUser'
import { Modal } from './Modal'

interface ISetUser {
    parent: String,
    container: String,
    template: String,
    btnSave: String,
    category: String,
    fullName: String,
    age: String,
    completed: String,
}

interface IUser {
    category: string
    fullName: string
    age: string
    completed: string
    id: Number
    data? : any
}

export class SetUser implements ISetUser {

    parent = '.js-listUser'
    container = '.js-items-user'
    template = 'template-listUsers'
    btnSave = '.js-form-btn-save'
    category = '.category'
    fullName = '.full-name'
    age = '.age'
    completed = '.completed'
    id?: number
    dom: any

    constructor(id: number) {
        this.id = id ? id : undefined;
        this.dom = {}

        this.catchDom();
        this.events();
        this.getDataUser();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
        this.dom.category = $(this.category);
        this.dom.fullName = $(this.fullName);
        this.dom.age = $(this.age);
        this.dom.completed = $(this.completed);
        this.dom.template = $(this.template);
        this.dom.btnSave = $(this.btnSave);
    }

    events() {
        this.dom.btnSave.on('click', () => {
            this.setUser()
        })
    }

    setUser() {
        let category = this.dom.category.val();
        let fullName = this.dom.fullName.val();
        let age = this.dom.age.val();
        let completed = this.dom.completed.val();

        if (this.id == undefined) {

            let id = parseInt((Math.random() * 1000).toString().split('.')[1]);

            this.addUser({ id, category, fullName, age, completed })
                .then(() => {
                    new LoadListUser();
                    modal.closeModal();
                })

        }

        this.updateUser({ id :this.id,  category, fullName, age, completed })
            .then(() => {
                new LoadListUser();
                modal.closeModal();
            })


    }

    addUser(obj: IUser) {
        return axios.post(`http://localhost:4000/data`, {
            category: obj.category,
            name: obj.fullName,
            age: obj.age,
            completed: obj.completed,
            id: obj.id,
        })
    }

    updateUser(obj: IUser) {
        return axios.put(`http://localhost:4000/data/${obj.id}`, {
            category: obj.category,
            name: obj.fullName,
            age: obj.age,
            completed: obj.completed,
        })
    }

    getDataUser() {
        axios.get(`http://localhost:4000/data/?id=${this.id}`)
            .then((result: Array<IUser>) => {
                this.fillDataUser(result);
            })
            .catch((err: Error) => { console.log(err) })
    }

    fillDataUser(obj: Array<IUser>) {
        this.dom.category.val(obj[0].category);
        this.dom.fullName.val(obj[0].fullName);
        this.dom.age.val(obj[0].age);
        this.dom.completed.val(obj[0].completed);
    }
}
let modal = new Modal();