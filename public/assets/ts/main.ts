declare var axios: any;
declare var _: any;

import { Modal } from './index/modal'
import { DeleteUser } from './index/deleteUser'
import { ListUser } from './index/listUser'
import { LoadListUser } from './index/loadListUser'
import { SetUser } from './index/setUser'

let modal = new Modal();
new LoadListUser();
