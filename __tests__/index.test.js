const { SetUser } = require('../../index/SetUser')

let setUser = new SetUser();

describe('toBoolean', () => {
    it('should transform to a Boolean', () => {
        expect(setUser.toBoolean("true")).toBe(true);
    });
    it('should transform to a Boolean', () => {
        expect(setUser.toBoolean("false")).toBe(false);
    });
});





const sumas = require('./add');
let suma = new sumas();
describe('add', () => {
    it('should add two numbers', () => {
        expect(suma.add(1, 2)).toBe(3);
    });
});







