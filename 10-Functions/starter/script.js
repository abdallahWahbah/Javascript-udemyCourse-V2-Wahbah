// 'use strict';
////////////////////////////// 3 //////////////////////////////
// Default parameters
// const bookings = [];
// const createBooking = (flightNum, numPassengers = 1, price = 199 * numPassengers) =>
// {
//     const booking = 
//     {
//         flightNum, 
//         numPassengers,
//         price
//     };
//     bookings.push(booking);
//     console.log(booking)
// };
// createBooking("aksjd");
// createBooking("aksjd", 1);
// createBooking("aksjd", 2, 5);
// createBooking("aksjd", 2);
// createBooking("aksjd", undefined, 1000); // if we want to skip passing the second (default) parameter






////////////////////////////// 4 //////////////////////////////
// value vs reference
// const flight = 'LH230';
// const abdallah = 
// {
//     name: 'abdallah wahbah',
//     passport: 4567
// };

// const checkIn = (flightNum, passenger) =>
// {
//     flightNum = 'AH092';
//     passenger.name = "Mr." + passenger.name;
// }
// checkIn(flight, abdallah);
// console.log(flight);
// console.log(abdallah); // abdallah.name will be changed cause we changed it in the function ... both abdallah.name and the change happened in the function refers to the same memory heep

// const newPassport = (person) =>
// {
//     person.passport = Math.trunc(Math.random() * 1000); // between 0 and 999
// }
// newPassport(abdallah);
// console.log(abdallah); // abdallah.passport will be changed also






////////////////////////////// 6 //////////////////////////////
// functions accepting callback functions (Higher-order functions)
 
// const oneWord = (str) =>
// {
//     return str.replace(/ /g, '').toLowerCase(); // returns the same string but with no space and in a lower case
// } 

// const upperFirstWord = (str) =>
// {
//     const [firstWord, ...others] = str.split(' ');
//     return [firstWord.toUpperCase(), ...others].join(' ');
// }

// // Higher-order function
// const transform = (str, fn) =>
// {
//     console.log(`Original string: ${str}`);
//     console.log(`Transformed string: ${fn(str)}`);
//     console.log(`Called by: ${fn.name}`);
// }

// transform("javascript is the best", upperFirstWord);
// transform("Javascript is the best", oneWord);






////////////////////////////// 7 //////////////////////////////
// Function returning function
// const greet = (greeting) =>
// {
//     return (name) =>
//     {
//         console.log(`${greeting}, ${name}`);
//     }
// }
// const greetingHey = greet("hey");
// greetingHey("Ahmed");
// greetingHey("Ali");

// greet("hey")("Ahmed");

// // simplifying the function with arrow in one line 
// const greet2 = greeting => name => console.log(`${greeting}, ${name}`);
// greet2("hey")("arrow");






////////////////////////////// 8 //////////////////////////////
// Call and Apply methods
// const lufthansa = 
// {
//     airline: 'Lufthansa',
//     itiCode: 'LH',
//     bookings: [],
//     book(flightNum, name)
//     {
//         console.log(`${name} booked a seat on ${this.airline} flight ${this.itiCode}${flightNum}`);
//         this.bookings.push({flight: `${this.itiCode}${flightNum}`, name});
//     }
// }

// lufthansa.book(239, 'Abdallah');
// lufthansa.book(839 , 'Wahbah');

// const eurowings = 
// {
//     airline: 'Eurowings',
//     itiCode: 'EW',
//     bookings: []
// }

// // call method
// // we want to use the book function in lufthansa in the eurowings object so that we don't write the function twice
// lufthansa.book.call(eurowings, 189, 'John'); // 1st param is the new object we are using the book for // this keyword will refer to eurowings object
// console.log(eurowings);


// lufthansa.book.call(lufthansa ,777 , 'Mariam'); // this keyword will refer to lufthansa object
// console.log(lufthansa);


// const swiss = 
// {
//     airline: 'Swiss',
//     itiCode: 'SW',
//     bookings: []
// };

// lufthansa.book.call(swiss, 222, 'Swiss');
// console.log(swiss);

// // apply method
// // the same as call except that it accepts an array after the this keyword instead of arguments
// const flightData = [684, 'Cooper'];
// lufthansa.book.apply(swiss, flightData);
// console.log(swiss);

// // you can use spread operator in call method
// lufthansa.book.call(swiss, ...flightData);
// console.log(swiss);






////////////////////////////// 9 //////////////////////////////
// bind
// continue on the last lecture variables and objects

// const bookEuro = lufthansa.book.bind(eurowings);
// // it will not call the book function, instead it will return a new function where the this keywork will always be set to eurowings
// bookEuro(2, "hello");
// console.log(eurowings)

// // we can pass the first argument to use it multiple times instead of writing it multiple times
// const bookeu2 = lufthansa.book.bind(eurowings, 00000);
// bookeu2("hello from");
// bookeu2("the other side");
// console.log(eurowings);

// // bind with event listener (important)

// lufthansa.planes = 400;
// lufthansa.buyPlane = function()
// {
//     console.log(this);
//     this.planes++;
//     console.log(this.planes);
// }

// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa)); // if you don't use bind here, the this keyword will refer to the button, and the button doesn't have planes variable

// // Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(.1, 200));

// const addVat = addTax.bind(null, .1); // null: because we don't care about the object
// console.log(addVat(400));

// // rewrite the last example with function returning function
// const addTaxRate = (rate) =>
// {
//     return (value) =>
//     {
//         return value + value *rate;
//     }
// }
// console.log(addTaxRate(.1)(200));






////////////////////////////// 10 //////////////////////////////
// i just watched the video challenge, if you are free, go play cs go






////////////////////////////// 11 //////////////////////////////
// IIFE

// (function()
// {
//     console.log("this will never run again");
//     const isPrivate = 23;
// })();

// (
//     (x, y) =>
//     {
//         console.log("this will ALSO never run again");
//         console.log(x+y);
//     }
// )(1, 2);
// (()=> console.log("never ever run again"))();






////////////////////////////// 12 //////////////////////////////
// Closures
// A closure gives a function access to all the variables of its parent function, even after the parent function has returned.
// The function keeps a reference to its outer scope, which preserves the scope chain throughout the time

// A closure makes sure that a function doesn't lose connection to variables that existed at the function's birth place

// more obvious definition

// A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables
// that were present in the environment where the function was created

const secureBooking = function()
{
    let passengerCount = 0;
    return function() 
    {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}
const booker = secureBooking();
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers
booker(); // 4 passengers






////////////////////////////// 13 //////////////////////////////
// Closure examples, setTimeOut()

// Example #1
let f;
const g =function()
{
    const a = 23;
    f = function() // reassign
    {
        console.log(a*2);
    }
}
const h = function()
{
    const b = 444;
    f = function()
    {
        console.log(b * 2);
    }
}
g(); // after execution the g(), f will be a function 
f();

// Re-assigning f function
h();
f();

// Example #2
const boardPassengers = (n, time) =>
{
    const perGroup = n / 3;
    setTimeout(function()
    {
        console.log(`we are now boarding all the passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, time * 1000);

    console.log("this line of code will be executed before the timer");
}

boardPassengers(1800, 3);

// even if you declared a global variable (perGroup) with the same in inside, it won't be considered
// cause the closure has more priority than the scope chain
const perGroup = 9;
boardPassengers(1800, 5);






///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, 
    attach an event listener that changes the color of the selected h1 element ('header') to blue, 
    each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. 
    Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/


(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
