
/*=include ./index/modal.js */
/*=include ./index/deleteUser.js */
/*=include ./index/listUser.js */
/*=include ./index/loadListUser.js */
/*=include ./index/setUser.js */


let modal = new Modal();
new LoadListUser();
modal.events();

let search = ""
$('#inp').keypress(function (e) {
    const val = e.key;
    search = search + val;
    console.log(e.target.value)
})

