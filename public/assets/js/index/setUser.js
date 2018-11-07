class SetUser {
    constructor(id) {

        this.parent = '.js-listUser'
        this.container = '.js-items-user'
        this.template = 'template-listUsers'
        this.btnSave = '.js-form-btn-save'
        this.category = '.category'
        this.fullName = '.full-name'
        this.age = '.age'
        this.completed = '.completed'
        this.id = id
        this.dom = {};

        this.catchDom();
        this.events();
        this.getDataUser();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.container = $(this.container, this.dom.parent);
        this.dom.template = $(this.template);
        this.dom.btnSave = $(this.btnSave);
        this.dom.category = $(this.category);
        this.dom.fullName = $(this.fullName);
        this.dom.age = $(this.age);
        this.dom.completed = $(this.completed);
    }

    events() {
        this.dom.btnSave.on('click', () => {
            this.setUser();
        })
    }

    setUser() {

        let category = this.dom.category.val();
        let fullName = this.dom.fullName.val();
        let age = this.dom.age.val();
        let completed = this.dom.completed.val();

        if (this.id == undefined) {

            let id = (Math.random() * 1000).toString().split('.')[1];

            this.addUser({ id, category, fullName, age, completed })
                .then(() => {
                    new LoadListUser();
                    modal.closeModal();
                })

        } else {
            this.updateUser(this.id, { category, fullName, age, completed })
                .then(() => {
                    new LoadListUser();
                    modal.closeModal();
                })
        }
    }

    addUser(data) {
        return axios.post(`http://localhost:4000/data`, {
            category: data.category,
            name: data.fullName,
            age: parseInt(data.age),
            completed: data.completed,
            id: parseInt(data.id),
        })
    }

    updateUser(id, data) {
        return axios.put(`http://localhost:4000/data/${id}`, {
            category: data.category,
            name: data.fullName,
            age: parseInt(data.age),
            completed: data.completed
        })
    }

    getDataUser() {

        if (this.id != undefined) {
            axios.get(`http://localhost:4000/data`)
                .then(result => {

                    let data = result.data.filter(value => {
                        return value.id == this.id
                    })

                    this.loadDataUser(data)

                })
                .catch(err => console.log(err));
        }
    }

    loadDataUser(data) {

        this.dom.category.val(data[0].category)
        this.dom.fullName.val(data[0].name)
        this.dom.age.val(data[0].age)
        this.dom.completed.val(data[0].completed)
    }
}