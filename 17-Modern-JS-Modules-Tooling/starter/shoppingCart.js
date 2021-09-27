// Exporting module
// Code in the exporting module is executed before code in the importing one
console.log(`exporting code will be executed first`);
// all variables are private except if you exported it 

// const shoppingCart = 5;
// export const cart = [];

// export const addToCart = (product, quantity) =>
// {
//     cart.push({product, quantity});
//     console.log(`${quantity} ${product} are added to the cart`);
// };

// const totalPrice = 10;
// const totalQuantity = 40;
// export {totalPrice, totalQuantity};


// // export default is used when you want to export only one thing from the module
// export default (msg, num) =>
// {
//     console.log(`${msg}, ${num}` );
//     cart.push({msg, num});
// };