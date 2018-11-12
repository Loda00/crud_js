interface IModal {
    parent: String,
    modalWrap: String,
    btnClose: String,
}

export class Modal implements IModal {

    parent = '.js-modal'
    modalWrap = '.js-modal-wrap'
    btnClose = '.js-modal-close'

    dom: any
    refThis: any

    constructor() {
        this.dom = {}
        this.catchDom();
        this.events();
    }

    catchDom(): void {
        this.refThis = this
        this.dom.parent = $(this.parent);
        this.dom.modalWrap = $(this.modalWrap, this.dom.parent);
        this.dom.btnClose = $(this.btnClose, this.dom.parent);
    }

    events(): void {
        this.dom.btnClose.on('click', { parameter1: this.refThis }, this.hideModal)
        this.dom.modalWrap.on('click', { parameter1: this.refThis }, this.hideModal)
    }

    showModal(): void {
        this.dom.parent.show();
    }

    hideModal(e: any){
        if (e.target != this) {
            return
        }
        $(e.data.parameter1.parent).hide();
    }

    closeModal(): void{
        this.dom.parent.hide();
    }
}
