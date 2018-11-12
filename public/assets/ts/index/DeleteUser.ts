declare var axios: any;

import { LoadListUser } from './LoadListUser'


export class DeleteUser {

    id: number

    constructor(id: number) {
        this.id = id;

        this.autoExec();
    }

    autoExec(): void {
        this.deleteUser();
    }

    deleteUser(): void {
        axios.delete(`http://localhost:4000/data/${this.id}`)
            .then(() => {
                new LoadListUser();
            })
    }

}