////////////////////////////// 11 //////////////////////////////

// let markWeight = 78, johnWeight=92;
// let markHeight = 1.69, johnHeight = 1.95;

// let markBMI = markWeight / (markHeight)**2;

// let johnBMI = johnWeight / (johnHeight)**2;

// console.log(markBMI, johnBMI);

// let markHeightBMI = markBMI > johnBMI;
// console.log(markHeightBMI);






////////////////////////////// 12 //////////////////////////////

// console.log(`hello \nfrom \nthe \nother \nside`)
// console.log(`hello 
// from 
// the 
// other
// side`); // the same result






////////////////////////////// 14 //////////////////////////////

// let mark = 'Mark', john = 'John';
// let markWeight = 78, johnWeight=92;
// let markHeight = 1.69, johnHeight = 1.95;

// let markBMI = markWeight / (markHeight)**2;

// let johnBMI = johnWeight / (johnHeight)**2;

// let markHeightBMI = markBMI > johnBMI;

// markHeightBMI > 0 ? console.log(`${mark}'s BMI is greater than ${john}'s BMI`) : 
//                     console.log(`${john}'s BMI is greater than ${mark}'s BMI`);
// markHeightBMI > 0 ? console.log(`${mark}'s BMI (${markBMI}) is greater than ${john}'s BMI (${johnBMI})`) : 
//                     console.log(`${john}'s BMI (${johnBMI}) is greater than ${mark}'s BMI (${markBMI})`);






////////////////////////////// 15 //////////////////////////////

// Types conversion

// convert from string to number
// let year = '1998';
// console.log(year, typeof(year));
// console.log(Number(year), typeof(Number(year))); // the original value is not converted
// console.log(typeof(year)); // string
// console.log(Number('abdallah')); // NaN

// // convert from number to string
// console.log(String(23));
// console.log(String(23), typeof(String(23)));

// // Types coercion

// // only the "+" sign converts the number to string (concatination) (of course i am talking about when the number is in "")

// console.log('Iam ' + 23 +" years old"); // result is : "Iam 23 years old"

// console.log('23' - '13' + 5); // result is 15 as a number
// console.log('23' + '11' +'1'); // result is '23111'
// console.log('23' + '11' - 1); // result is '2311' - 1 = 2310
// console.log('12' * '2') // result is 24 
// console.log('222' > '2') // return true


// let n = '1' + 1;
// n = n -1;
// console.log(n) // result is 10
// console.log(2+3+4+"5") // "95"
// console.log('10'-'4'-'3'-2+'5')// '15'






////////////////////////////// 16 //////////////////////////////

// 5 falsy values: 0, '', undefiened, null, NaN

// let x;
// if(x)
// {
//     console.log("x is defined");
// }
// else
// {
//     console.log("x is undefined");
// }






////////////////////////////// 17 //////////////////////////////
// "==" vs "==="

// "===" doesn't perform type coercion. Called (Strict equality) // always use this
// "==" performs type coercion. Called (Loose equality) // avoid this

// console.log('18' == 18) // true
// console.log('18' === 18) // false

// let input = prompt("enter a number"); //prompt is just like an alert but it takes an input
// console.log(input); // the data type of the input will be string, you can convert to number if you want

// if(input == 23) console.log("loose type coercion: which means that it will convert the input to number to compare with 23");
// if(input === 23) console.log("Strict type coercion: which means that it won't convert the input to number to compare with 23 so it won't be working");

// let x = Number(prompt("enter another number"));
// if(x !== 22) console.log("why not 22!");






////////////////////////////// 19 //////////////////////////////
// AND OR NOT

// let x = true;
// let y = false;
// console.log( x && y);
// console.log( x || y);
// console.log( x && !y);






////////////////////////////// 21 //////////////////////////////
// Switch

// let day = 'tues';

// switch(day)
// {
//     case 'sat':
//         console.log("Saturday");
//         break;
//     case 'sun':
//         console.log("Sunday");
//         break;

//     case 'wed':
//     case 'tues':
//         console.log("It may be Wednesday or Tuesday");
//         break;

//     case 'mon':
//         console.log("Monday");
//         breadk;
//     default:
//         console.log("Friday");
// }






////////////////////////////// 23 //////////////////////////////
// Ternary operators

// let hate = 'spiderman';
// console.log(`I don't like ${hate === 'spiderman' ? hate : 'batman'}`);






////////////////////////////// 25 //////////////////////////////
// Switch