
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


class Testing {
    constructor(num1) {
        this.result = null
        this.num1 = num1
    }
}

Testing.prototype.date = new Date();
Testing.prototype.suma = function (num) { return this.result = this.num1 + num }

let test = new Testing(4)

console.log(test.suma(6))
console.log(test)



