declare var axios: any;
import { LoadListUser } from './LoadListUser'
import { Modal } from './Modal'
import { Validation } from './Validation'

interface ISetUser {
    parent: String,
    container: String,
    template: String,
    btnSave: String,
    category: String,
    fullname: String,
    age: String,
    completed: String,
    valueCompleted: string
    error: string
}

interface IUser {
    category: string
    fullname: string
    age: Number
    completed?: boolean
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
    valueCompleted = 'input[name="completed"]:checked'
    error = '.js-error'
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
        this.dom.fullname = $(this.fullname);
        this.dom.age = $(this.age);
        this.dom.completed = $(this.completed);
        this.dom.template = $(this.template);
        this.dom.btnSave = $(this.btnSave);
        this.dom.error = $(this.error);
    }

    events(): void {
        this.dom.btnSave.on('click', () => {
            this.setUser()
        })
    }

    setUser(): void {

        let category = this.dom.category.val();
        let fullname = this.dom.fullname.val();
        let age = parseInt(this.dom.age.val());
        let completed = $(this.valueCompleted).val() ? $(this.valueCompleted).val().toString() : "";

        let result = this.validation(category, fullname, age, completed);

        if (result != null) {
            return
        }

        if (this.id == undefined) {

            let id = parseInt((Math.random() * 1000).toString().split('.')[1]);

            this.addUser({ id, category, fullname, age, completed: this.toBoolean(completed) })
                .then(() => {
                    new LoadListUser();
                    modal.closeModal();
                })
        } else {

            this.updateUser({ id: this.id, category, fullname, age, completed: this.toBoolean(completed) })
                .then(() => {
                    new LoadListUser();
                    modal.closeModal();
                })
        }
    }

    validation(category: string, fullname: string, age: number, completed: string): String {

        let validation = new Validation();

        let resultCategory = validation.validationComboBox(category);
        let resultName = validation.validationString(fullname);
        let resultAge = validation.validationNumber(age);
        let resultCompleted = validation.validationRadioButton(completed);

        if (resultCategory != undefined) {
            this.dom.error.text(resultCategory);
            return resultCategory
        }
        if (resultName != undefined) {
            this.dom.error.text(resultName);
            return resultName
        }
        if (resultAge != undefined) {
            this.dom.error.text(resultAge);
            return resultAge
        }
        if (resultCompleted != undefined) {
            this.dom.error.text(resultCompleted);
            return resultCompleted
        }
        
    }

    toBoolean(val: string): boolean {

        return (/true/i).test(val)

    }

    addUser(obj: IUser): Promise<Object> {
        return axios.post(`http://localhost:4000/data`, {
            category: obj.category,
            fullname: obj.fullname,
            age: obj.age,
            completed: obj.completed,
            id: obj.id,
        })
    }

    updateUser(obj: IUser): Promise<Object> {
        return axios.put(`http://localhost:4000/data/${obj.id}`, {
            category: obj.category,
            fullname: obj.fullname,
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
        this.dom.category.val(obj[0].category);
        this.dom.fullname.val(obj[0].fullname);
        this.dom.age.val(obj[0].age);
        this.dom.completed.val([obj[0].completed]);
    }
}
let modal = new Modal();