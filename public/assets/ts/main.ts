declare var axios: any;
declare var _: any;

import { Modal } from './index/Modal'
import { DeleteUser } from './index/DeleteUser'
import { ListUser } from './index/ListUser'
import { LoadListUser } from './index/LoadListUser'
import { SetUser } from './index/SetUser'

let modal = new Modal();
new LoadListUser();
