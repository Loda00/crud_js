declare var axios: any;

import { LoadListUser } from './LoadListUser'


export class DeleteUser{

    id: number

    constructor(id: number) {
        this.id = id;

        this.autoExec();
    }

    autoExec() {
        this.deleteUser();
    }

    deleteUser() {
        axios.delete(`http://localhost:4000/data/${this.id}`)
            .then(() => {
                new LoadListUser();
            })
    }

}