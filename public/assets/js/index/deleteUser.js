class DeleteUser {
    constructor(id) {
        this.id = id

        this.instance = null

        this.deleteUser();
    }

    deleteUser() {
        axios.delete(`http://localhost:4000/data/${this.id}`)
            .then(result => {
                new LoadListUser;
            })
            .catch(err => console.log(err))
    }
}