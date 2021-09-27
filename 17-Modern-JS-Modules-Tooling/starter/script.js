// Importing module
// Code in the exporting module is executed before code in the importing one

///////////////////////////////// 5 /////////////////////////////////
console.log(`importing code will be executed second`);

// import {addToCart, totalPrice as price, totalQuantity} from './shoppingCart.js';
// when you import named export ... you have to call it the same name or use "as" to change the name

// addToCart("bread", 10);
// console.log(price, totalQuantity);

// // import every thing export from shoppingCart
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart("apple", 3)
// console.log(ShoppingCart.totalPrice);

// import the default export

// import add, {cart} from './shoppingCart.js';
// add(4, 6);
// add(1, 2);
// add(5, 3);
// console.log(cart)






///////////////////////////////// 6 /////////////////////////////////
// Module pattern using IIFE

// const shippingCart2 = (()=>
// {
//     const cart =[];
//     const shippingCost =10;
//     const totalPrice = 238;
//     const totalQuantity = 23;

//     const addToCart = (product, quantity) =>
//     {
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} are added to the cart, shipping cost is ${shippingCost}`);
//     };
//     const orderStock = (product, quantity) =>
//     {
//         cart.push(product);
//         console.log(`${quantity} ${product} are added to the cartfrom stock`);
//     }

//     // we can't access any variable or function except those we return
//     return {
//         cart,
//         totalPrice,
//         addToCart,
//         totalQuantity
//     }
// })();
// shippingCart2.addToCart("apple", 2);
// shippingCart2.addToCart("orange", 3);
// console.log(shippingCart2.cart);
// // shippingCart2.orderStock("apple", 23); // will not work because it is private and we didn't return it






///////////////////////////////// 9 /////////////////////////////////
// you don't have to see this shit lecture .. just look at the notes ... npm init


// create a copy from an object
// // import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es'

// const state = 
// {
//     cart: [
//         {product: 'pizza', quantity: 4},
//         {product: 'orange', quantity: 4},
//     ],
//     user: {loggenIn: true}
// };

// const stateClone = Object.assign({}, state);
// const stateCloneDeep = cloneDeep(state);
// state.user.loggenIn = false; 
// console.log(stateClone); // loggedIn in stateClone will be false also because the 2 objects refer to the same position in the memory
// console.log(stateCloneDeep); // this library makes a complee copy ... not just refers to the position in memory






///////////////////////////////// 10 /////////////////////////////////
// see the parcel video instead of this shit




if(module.hot) module.hot.accept(); // if you made a small change to the code, don't reload the whole page, just reload that small change
console.log(`object`);




///////////////////////////////// 11 /////////////////////////////////
// Parcel automatically uses BABEL to transpiles the code to old code
// BABEL only transpiles ES6 syntax (arrow, const, let....etc) ... not promises or array methods .. etc
// so we must use polyfill 
// see the script file after bundling and search for People and watch the difference


import 'core-js/stable';
import 'regenerator-runtime/runtime';

class Person
{
    #greeting = 'hey';
    constructor(name)
    {
        this.name=name;
        console.log(`${this.#greeting}, ${this.name}`);
    }
}
const ahmed = new Person("ahmed");

import cloneDeep from 'lodash-es'
const state = 
{
    cart: [
        {product: 'pizza', quantity: 1},
        {product: 'orange', quantity: 4},
    ],
    user: {loggenIn: true}
};

const stateClone = Object.assign({}, state);
const stateCloneDeep = cloneDeep(state);
state.user.loggenIn = false; 
console.log(stateClone); // loggedIn in stateClone will be false also because the 2 objects refer to the same position in the memory
console.log(stateClone);
// console.log(cart);
console.log(state.cart.find(el => el.quantity > 2));