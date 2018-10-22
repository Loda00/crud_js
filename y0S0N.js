

yOSON.AppCore.addModule('nombre-del-modulo', 
function (Sb) {
    var afterCatchDom, catchDom, changeFile, clearFields, collection, defaults, dom, st, submitFiles, suscribeEvents;
    st = {};
    dom = {};
    collection = [];
    defaults = {
        form: 'formProyStep2',
        container: '#divPdfManager',
        txtFile: '#pdfUploader',
        olList: '#olPdfList',
        tpl: '#tplPdf',
        template: null,
        flag: true,
        files: null,
        regExPdfFile: /\.(pdf)$/i,
        postUrl: yOSON.baseHost + 'empresas/proyecto/upload',
        deleteUrl: yOSON.baseHost + 'empresas/proyecto/delete'
    };
    catchDom = function () {
        dom.form = $('#' + st.form);
        dom.container = $(st.container, dom.form);
        dom.txtFile = $(st.txtFile, dom.container);
        dom.olList = $(st.olList, dom.container);
        dom.tpl = $(st.tpl);
    };
    afterCatchDom = function () {
        st.template = st.template || $.trim(dom.tpl.html());
    };
    suscribeEvents = function () {
        dom.txtFile.on('change', changeFile);
    };
    // e por convencion seria para las funciones que son eventos
    eChangeFile = function (e) {

    };
    return {
        init: function (o) {
            st = $.extend(defaults, o);
            catchDom();
            afterCatchDom();
            suscribeEvents();
        }
    };
}, ['libs/plugins/jqCustomfile.js', 'backbone/libs/underscore/underscore.js']);