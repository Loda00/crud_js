declare var axios: any;
import { LoadListUser } from './LoadListUser'
import { Modal } from './Modal'

interface ISetUser {
    parent: String,
    container: String,
    template: String,
    btnSave: String,
    category: String,
    fullname: String,
    age: String,
    completed: String,
}

interface IUser {
    category: string
    fullname: string
    age: string
    completed: string
    id: Number
    data?: Array<IUser>
}

export class SetUser implements ISetUser {

    parent = '.js-listUser'
    container = '.js-items-user'
    template = 'template-listUsers'
    btnSave = '.js-form-btn-save'
    category = '.js-category'
    fullname = '.js-full-name'
    age = '.js-age'
    completed = '.js-completed'
    id?: number

    categorya = '.js-categorya'
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
        this.dom.fullname = $(this.fullname);
        this.dom.age = $(this.age);
        this.dom.completed = $(this.completed);
        this.dom.template = $(this.template);
        this.dom.btnSave = $(this.btnSave);
        this.dom.categorya = $(this.categorya)
        console.log('this.dom.categorya', this.dom.categorya)
        console.log('this.dom.completed', this.dom.completed)
    }

    events(): void {
        this.dom.btnSave.on('click', () => {
            this.setUser()
        })
    }

    setUser(): void {
        let category = this.dom.categorya.val();
        let fullname = this.dom.fullname.val();
        let age = this.dom.age.val();
        let completed = this.dom.completed.val();

        if (this.id == undefined) {

            let id = parseInt((Math.random() * 1000).toString().split('.')[1]);

            this.addUser({ id, category, fullname, age, completed })
                .then(() => {
                    new LoadListUser();
                    modal.closeModal();
                })
        } else {

            this.updateUser({ id: this.id, category, fullname, age, completed })
                .then(() => {
                    new LoadListUser();
                    modal.closeModal();
                })
        }
    }

    addUser(obj: IUser) {
        return axios.post(`http://localhost:4000/data`, {
            category: obj.category,
            fullname: obj.fullname,
            age: parseInt(obj.age),
            completed: obj.completed,
            id: obj.id,
        })
    }

    updateUser(obj: IUser) {
        return axios.put(`http://localhost:4000/data/${obj.id}`, {
            category: obj.category,
            fullname: obj.fullname,
            age: parseInt(obj.age),
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
        this.dom.categorya.val(obj[0].category);
        this.dom.fullname.val(obj[0].fullname);
        this.dom.age.val(obj[0].age);
        this.dom.completed.val([obj[0].completed]);
        console.log('obj', obj[0])
        console.log('obj[0].completed', [obj[0].completed])
    }
}
let modal = new Modal();