

/////////////////////////////////// 5 ///////////////////////////////////
// Arrow function doesn't use "this" keyword






/////////////////////////////////// 8 ///////////////////////////////////
// Hoisting: makes some variables accessibly/used before they are declared

// if we attempt to use let and const variable before it's declared, we get an error
// console.log(letVariable); // error
// let variable = 0;


// x(); // we can't access the function using let before decleration
// let x = () =>
// {

// }
// x();






/////////////////////////////////// 9 ///////////////////////////////////
// TDZ: temperal dead zone >>>> the code above let or const variable in the same block scope

// Variables
// console.log(me); // undefined (cause var is hoisted)
// console.log(job); // ReferenceError: Cannot access 'job' before initialization
// console.log(year); // ReferenceError: year is not defined

// var me = "abdalla"
// const job = "engineer";

// if(!numProducts) console.log("hello"); // will be printed cause numProducts is undefined here in this line
// var numProducts = 10;



// Functions
// console.log(addDecleration(1, 2)); // 3 cause function declaration is hoisted
// // console.log(addExpression(1, 2)); // ReferenceError: Cannot access 'addExpression' before initialization (not hoisted)
// // console.log(addArrow(1, 2)); // ReferenceError: Cannot access 'addArrow' before initialization (not hoisted)

// function addDecleration(n, m){return n+m}
// const addExpression = function(n, m){return n + m}
// const addArrow = (n, m) => n + m






/////////////////////////////////// 10 ///////////////////////////////////
// "this" points to the owner of the function in which the "this" keyword is used
// If you use "this" in an arrow function, it will be the "this" keyword of the suurounding (parent) function

// "this" never points to the function we are using

// if you have "this" inside a funciton, when you call the function, "this" will refer to the object calling the mehod

// function calcAge(birthYear)
// {
//     console.log(2021-birthYear);
//     console.log(this); // this = window
// }
// calcAge(2020);


// let calcAgeArrow = birthYear =>
// {
//     console.log(2021-birthYear);
//     console.log(this); // this = window cause arrow doesn't deal with this
// }
// calcAgeArrow(2020);

// const abdo =
// {
//     firstName: 'Abdallah',
//     lastName: 'Wahbah',
//     year: 1998,
//     calcAge: ()=>
//     {
//         console.log(this) // this = window cause arrow doesn't deal with this
//         console.log(this.year); // undefined
//     },
//     calcAge2: function()
//     {
//         console.log(this) // this = abdo object for the first example (line 100) >>> this = jonas (line 106, 107)
//         console.log(2021 - this.year); // abdo.age | jonas.age (the object calling the function)
//     }
// }
// abdo.calcAge();
// abdo.calcAge2();

// const jonas = {
//     year: 1990
// }

// jonas.calcAge2 = abdo.calcAge2;
// jonas.calcAge2(); //






/////////////////////////////////// 13 ///////////////////////////////////
// Primitive vs Reference values

// Primitive
let age1 = 20;
let age2 = age1;
age1 = 60;
console.log(age1, age2);

// Reference
const me = 
{
    name: "abdallah",
    age: 30
}
const friend = me;
friend.age = 17; // it is okay to change it although it is a const because friend value points to address in the memory heap

console.log("me", me.age); // 17
console.log("friend", friend.age); // 17
// friend and me point to the same address in the memory heap


// if you want to avoid the last case, you can take a copy of the object

const newFriend = Object.assign({}, me);
newFriend.age = 5555555555;
console.log(me.age, newFriend.age)