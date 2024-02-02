'use strict'; //With strict mode, you can not, for example, use undeclared variables : to make the errors visible for us

///////////////////////// 2 /////////////////////////
// strict mode

// let hasLicence = false;
// let go = true;
// if(go) newVariable = true; // it will tell you in the dev tools that it's not defined
// // without strict mode, it will create a new variable (newVariable) and assing true to it
// console.log(hasLicence);






///////////////////////// 3 /////////////////////////
// Functions

// function fruitProcessor(apple, orange)
// {
//     return `This fruit salad is made out of ${apple} apples and ${orange} oranges`;
// }
// console.log(fruitProcessor(2, 4));






///////////////////////// 4 /////////////////////////
// Function decleration vs expression

// Function decleration
// console.log(calcAge(1998));
// function calcAge(birthYear)
// {
//     return 2021-birthYear;
// }
// console.log(calcAge(1998));

// // Function expression >>> anonymous function
// const calcAge2 = function(birthYear)
// {
//     return 2021 - birthYear;
// }
// console.log(calcAge2(1998));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                              Big Note
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// we can call function decleration before they are defined in the code(casue they are hoisted)






///////////////////////// 5 /////////////////////////
// Arrow function 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                              Big Note
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Arrow function doesn't have "this" keyword
// A special form of function expression that is shorter and faster to write 

// one param - one line of code
// let calc3 = birth => 2021-1998;
// console.log(calc3(1998));

// // one param - many lines of code
// let yearsUntilRetirement = birth =>
// {
//     const age = 2021 - birth;
//     const retireAfter = 60 - age;
//     return retireAfter;
// }
// console.log(yearsUntilRetirement(1998));

// // many param - many lines of code
// let yearsUntilRetirement2 = (birth, name) =>
// {
//     const age = 2021 - birth;
//     const retireAfter = 60 - age;
//     return `${name} will retire after ${retireAfter} years`;
// }
// console.log(yearsUntilRetirement2(1998, 'Abdallah'));






///////////////////////// 6 /////////////////////////
// Functions calling other functions
// const cutPieces = fruit => fruit *4;

// const fruitProcessor = (apple, orange) =>
// {
//     const appleCut = cutPieces(apple);
//     const orangeCut = cutPieces(orange);

//     return `Juice with ${appleCut} pieces of apple and ${orangeCut} pieces of orange`;
// }
// console.log(fruitProcessor(2, 4));






///////////////////////// 9 /////////////////////////
// Arrays

// let friends = ['Ali', 'Ahmed', 'Mohamed'];
// let years = new Array(1998, 1999, 2000, 2001);
// console.log(friends[friends.length-1]);
// friends[2] = 'Ebrahim';
// console.log(friends);

// let abdallahInfo = ['Abdallah', 'Wahbah', 2021-1998, friends];
// console.log(abdallahInfo)






///////////////////////// 10 /////////////////////////
// Array methods

// let friends = ['Ali', 'Ahmed', 'Mohamed', 'John'];

// // Add elements
// friends.push("Ebrahim"); // Add 'Ebrahim' to the end of the array
// friends.unshift("Jay"); // Add 'Jay' to the beginning of the array
// console.log(friends);

// // Remove elements
// const popFriend = friends.pop(); // remove the last element from the array
// const john = friends.shift(); // remove the first element fromt the array
// console.log(friends);
// console.log(popFriend, john);

// // indexOf, includes
// console.log(friends.indexOf('Ahmed')); // returns 1
// console.log(friends.includes('Ahmed')); // returns true






///////////////////////// 12, 13 /////////////////////////
// Objects, Retreiving data from objects using dot vs bracket notation

// const abdallahArray = [
//     'Abdallah',
//     'Wahbah',
//     23,
//     'Mit Ghamr'
// ];

// const abdallahObject = {
//     firstName: 'Abdallah',
//     lastName: 'Wahbah',
//     age: 23,
//     city: 'Mit Ghamr',
//     friends: ['Ali', 'Ahmed', 'Mohamed']
// };
// console.log(abdallahObject);

// // retreiving data
// console.log(abdallahObject.firstName);
// console.log(abdallahObject['firstName']);
// let name = 'Name';
// console.log(abdallahObject['first'+name]);

// // let input = prompt("what do you wanna know about abdallah");
// // if(abdallahObject[input])
// // {
// //     console.log(abdallahObject[input]);
// // }
// // else
// // {
// //     console.log("no information about that  ")
// //}

// // Adding properties
// abdallahObject['job']= 'front end developer';
// abdallahObject.birth = 1998;
// console.log(abdallahObject);


// // challenge
// console.log(`${abdallahObject.firstName} has ${abdallahObject.friends.length} friends, and his best friend is ${abdallahObject.friends[0]}`)






///////////////////////// 14 /////////////////////////
// const abdallahObject = {
//     firstName: 'Abdallah',
//     lastName: 'Wahbah',
//     age: 23,
//     birthYear: 1998,
//     city: 'Mit Ghamr',
//     friends: ['Ali', 'Ahmed', 'Mohamed'],
//     hasLicense: true,
//     calcAge: function()
//     {
//         // console.log(this); // returns the total object
//         return 2021-this.birthYear; // "this" equals to the object calling the method
//     },
//     calc2: birth =>
//     {
//         return 2021 - birth;
//     },
//     calc3: function()
//     {
//         this.age = 2000-this.birthYear;
//         return this.age;
//     },
//     getSummary: function()
//     {
//         return `${this.firstName} is ${this.calcAge()} years old and he ${this.hasLicense? 'has':"desb't have"} a license`
//     }
// };
// console.log(abdallahObject.calcAge());
// console.log(abdallahObject.calc2(1998));

// console.log(abdallahObject.calc3());

// console.log(abdallahObject.getSummary());






///////////////////////// 18 /////////////////////////
// loop backword
// const abdallahArray = [
//     'Abdallah',
//     'Wahbah',
//     23,
//     'Mit Ghamr',
//     ['ALi', 'Ahmed', 'Mohamed', 'Ebrahim'],
//     true
// ];

// for(let i = abdallahArray.length - 1; i >= 0; i--)
// {
//     console.log(i, abdallahArray[i]);
// }

// // nested loops
// for(let exercise =0; exercise < 4; exercise++)
// {
//     console.log(`--------- starting exercise number ${exercise}`);
//     for(let practise = 0; practise < 6; practise++)
//     {
//         console.log(`Exercise ${exercise}: lifting practing number ${practise}`);
//     }
// }






///////////////////////// 19 /////////////////////////
console.log(Math.floor(1.9) + " floor"); // Round a number downward to its nearest integer: 1
console.log(Math.ceil(1.1) + " ceil");  // Round a number upward to its nearest integer: 2
console.log(Math.round(1.7) + " round"); // Round a number to the nearest integer: التقريب
console.log(Math.trunc(2.2) + " trunc"); // Return the integer part of a number: 2 (just like the floor method)(removes the decimal part)

let dice = Math.trunc(Math.random()* 6) +1; // Math.random() returns a random number between 0 (inclusive),  and 1 (exclusive)
// in this example (Math.random()* 6) will return number between 0 and 5.99999999 
// trunc will get the integer part >>> 0 to 5
// then we add 1 >>> so the range is 0 to 6
console.log(dice);


while(dice !== 6)
{
    console.log(`rolling dice with number ${dice}`);
    dice = Math.trunc(Math.random()* 6) +1;
    if(dice === 6)
    {
        console.log("The loop is ending with number 6");
    }
}