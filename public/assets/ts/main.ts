
interface IModal {
    parent: String,
    modalWrap: String,
    btnClose: String,
}

class Modal implements IModal {

    parent = '.js-modal'
    modalWrap = '.js-modal-wrap'
    btnClose = '.js-modal-close'
    dom: any

    constructor() {
        this.dom = {}
        this.catchDom();
        this.events();
    }

    catchDom() {
        this.dom.parent = $(this.parent);
        this.dom.modalWrap = $(this.modalWrap, this.dom.parent);
        this.dom.btnClose = $(this.btnClose, this.dom.parent);
    }

    events() {
        this.dom.btnClose.on('click', this.hideModal)
        this.dom.modalWrap.on('click', this.hideModal)
    }

    showModal() {
        this.dom.parent.show();
    }

    hideModal(e: any) {
        console.log('this', this)
        console.log('e.target ', e.target)
        if (e.target != this)
            return
        $('.js-modal').hide();
    }
}

let modal = new Modal();

