class Modal {

    constructor() {

        this.parent = '.js-modal'
        this.modalChild = '.js-modal-wrap'
        this.btnClose = '.js-modal-close'
        console.log('se efectuo esta shet')
        this.dom = {}

        this.catchDom();
    }

    catchDom() {
        this.dom.parent = $(this.parent)
        this.dom.modalChild = $(this.modalChild, this.dom.parent)
        this.dom.btnClose = $(this.btnClose, this.dom.parent)
    }

    events() {
        this.dom.modalChild.on('click', this.hideModal)
        this.dom.btnClose.on('click', this.hideModal)
    }

    showModal() {
        this.dom.parent.show();
    }

    hideModal(e) {
        if (e.target != this)
            return
        $('.js-modal').hide();
    }

    closeModal() {
        this.dom.parent.hide();
    }
}