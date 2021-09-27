

/////////////////////////////////// 5 ///////////////////////////////////
// Arrow function doesn't use "this" keyword






/////////////////////////////////// 8 ///////////////////////////////////
// if we attempt to use let and const variable before it's declared, we get an error

//x(); // we can't access the function using let before decleration
// let x = () =>
// {

// }
// x();






/////////////////////////////////// 10 ///////////////////////////////////
// "this" points to the owner of the function in which the "this" keyword is used
// If you use "this" in an arrow function, it will be the "this" keyword of the suurounding (parent) function

// "this" never points to the function we are using

function calcAge(birthYear)
{
    console.log(2021-birthYear);
    console.log(this); // this = window
}
calcAge(2020);


let calcAgeArrow = birthYear =>
{
    console.log(2021-birthYear);
    console.log(this); // this = window cause arrow doesn't deal with this
}
calcAgeArrow(2020);

const abdo =
{
    firstName: 'Abdallah',
    lastName: 'Wahbah',
    age: 21,
    calcAge: ()=>
    {
        console.log(this) // this = window cause arrow doesn't deal with this
    },
    calcAge2: function()
    {
        console.log(this) // this = abdo object
        console.log(2021 - this.age);
    }
}
abdo.calcAge();
abdo.calcAge2();