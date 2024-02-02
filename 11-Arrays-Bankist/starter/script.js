'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// FUNCTIONS
const displayMovements = (movements, sort = false) =>
{
  containerMovements.innerHTML = '';

  // sorting the array
  const movs = movements.slice().sort((a, b) => sort ? a-b : movements);
  
  movs.forEach((mov, i) =>
  {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = 
    `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
};

const calcDisplayBalance = (acc) =>
{
  acc.balance = acc.movements.reduce((acc, mov) => acc+mov);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = (acc) =>
{
  const incomes = acc.movements.filter(el => el > 0).reduce((acc, el) => acc+el);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements.filter(el => el < 0).reduce((acc, el) => acc+el, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  // suppose you wanna present the interest which is the summation of every +ve movement multiplied by .12
  // but for elements that are > 1 ... this is why we used the second filter
  const interest = acc.movements.filter(el => el > 0).map(el => (el * acc.interestRate) / 100)
                  .filter((el, i, arr) =>
                  {
                    //console.log(arr); // you will find elements less than 1 ... this filter will remove them
                    return el >= 1;
                  }).reduce((acc, el) => acc + el);
  labelSumInterest.textContent = `${interest}€`;
};



// const name = "Abdallah Mahmoud Wahbah" // we want it like this: amw(first letter of each word)
// const nameLower = name.toLowerCase();
// const nameSplitted = nameLower.split(" ");
// const firstLetters = nameSplitted.map((el, i) =>
// {
//   return el[0];
// })
// console.log(firstLetters.join(""));
// the previous few lines i will make them in one line
// name.toLowerCase().split(" ").map((el, i) => el[0]).join("");
const createUserName = (accs) =>
{
  accs.forEach((acc) =>
  {
    acc.username = acc.owner.toLowerCase().split(" ").map((el, i) => el[0]).join("");
  });  
};
createUserName(accounts);
// console.log(accounts);


const updateUI = (acc) =>
{
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
}





let currentAccount;

// EVENT LISTENERS

btnLogin.addEventListener("click", (e) =>
{
  e.preventDefault();

  currentAccount = accounts.find(acc => inputLoginUsername.value === acc.username);
  console.log(currentAccount);

  if(currentAccount && currentAccount.pin === Number(inputLoginPin.value))
  {
    // Display UI and welcome
    labelWelcome.textContent =`Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = "1";

    // clear inputs and clear focus from input fields
    inputLoginUsername.value = inputLoginPin.value =  '';
    inputLoginPin.blur();

    updateUI(currentAccount);

  }
});

btnTransfer.addEventListener("click", (e) =>
{
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(cur => cur.username === inputTransferTo.value);
  console.log(amount, receiverAcc);

  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferTo.blur();

  if(amount > 0 && receiverAcc && currentAccount.username !== receiverAcc.username && currentAccount.balance >= amount)
  {
    console.log("Transfer valid");
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", (e) =>
{
  e.preventDefault();
  
  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(cur => cur >= amount * .1))
  {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnClose.addEventListener("click", (e) => 
{
  e.preventDefault();

  const inputUsername = inputCloseUsername.value;
  const inputPin = Number(inputClosePin.value);
  console.log(inputUsername, inputPin);

  if(inputUsername && inputUsername === currentAccount.username && inputPin === currentAccount.pin)
  {
    const index = accounts.findIndex(cur => cur.username === currentAccount.username);
    // Delete account
    accounts.splice(index, 1);
    console.log(accounts);
    // Hide UI
    containerApp.style.opacity = "0";
  }
  inputClosePin.value = inputCloseUsername.value = "";
});


let sorted = false;
btnSort.addEventListener("click", (e) =>
{
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
});







































/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES






////////////////////////////// 3 //////////////////////////////
// slice, splice, reverse, concat, join

// slice 
// The slice() method returns selected elements in an array, as a new array.
// slice() selects the elements starting at the given start argument, and ends at, but does not include, the given end argument.
// slice() does not change the original array.

// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2)); // make new array from index 2 to the end // [c, d, e]
// console.log(arr.slice(2, 4)); // make new array at index 2 until index 4(excluding) // [c, d]
// console.log(arr.slice(-2)); // the last 2 elements
// console.log(arr.slice(-1)); // the last element

// you can use slice()  with no parameters to make a shallow copy of the array

// // splice 
// //the second parameter is howmany items will be removed
// // the same as slice but it mutates the original array (and throw them away)
// console.log(arr.splice(2)); // [c, d, e]
// console.log(arr); // [a, b]

// // a common example of splice is to git rid of the last element
// arr.splice(-1);
// console.log(arr); // [a]

// // reverse
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'j'];
// console.log(arr2.reverse()); // mutates the original array

// // concat
// const letters= arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]); // the same result 

// //join
// // converts the array to string with the join char
// console.log(letters.join('-'));






////////////////////////////// 4 //////////////////////////////


// // forEach takes 3 parameters: the element, index, and the whole array 
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for(const [i, mov] of movements.entries()) 
// {
//   if(mov > 0 ) console.log(`movement #${i}: you deposited ${mov}`);
//   else console.log(`movement #${i}: you withdrew ${Math.abs(mov)}`); // take the absolute value by removing the sign
// }
// console.log(`----forEach----`); // you can't break in forEach, if you want so, use for-of
// movements.forEach((el, i, arr) =>
// {
//   if(el > 0 ) console.log(`movement #${i}: you deposited ${el}`);
//   else console.log(`movement #${i}: you withdrew ${Math.abs(el)}`);
// }); 






////////////////////////////// 5 //////////////////////////////
// forEach with Maps and Sets

// Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((value, key, map) =>
// {
//   console.log(`${key}: ${value}`)
// });

// // Set
// const newSet = new Set(["EUR", 'SDF', "QWE", "EUR", "QWE"]);
// console.log(newSet, typeof newSet); // object
// newSet.forEach((value, key, map) =>
// {
//   console.log(`${key}: ${value}`); // the key is the same as the value
// });






////////////////////////////// 8 //////////////////////////////
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. 
  So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). 
  For now, they are just interested in knowing whether a dog is an adult or a puppy. 
  A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), 
  and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! 
  So create a shallow copy of Julia's array, and remove the cat ages from that copied array 
  (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult 
  ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = (dogsJulia, dogsKate) =>
// {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0,1);
//   dogsJuliaCorrected.splice(-2);
//   // console.log(dogsJuliaCorrected);
//   const array = [...dogsJuliaCorrected, ...dogsKate]; // another solution: const array = dogsJuliaCorrected.concat(dogsKate)
//   console.log(array);

//   array.forEach((el, i) =>
//   {
//     if(el >= 3 ) console.log(`Dog number ${i + 1} is an adult, and is ${el} years old`);
//     else console.log(`Dog number ${i + 1} is still a puppy 🐶`)
//   });

// };
// const juliaData1 = [3, 5, 2, 12, 7];
// const kateData1 = [4, 1, 15, 8, 3];
// const juliaData2 = [9, 16, 6, 8, 3];
// const kateData2 = [10, 5, 6, 1, 4];
// checkDogs(juliaData1, kateData1);
// console.log(`---- DATA 2 ----`);
// checkDogs(juliaData2, kateData2);






////////////////////////////// 9 //////////////////////////////
// map, filter, reduce

// map
  // returns a new array containing the results of applying an operation on all elements in the original array
  // such as multiplying each element by 2

// filter
  // returns a new array contaning the elements that passed a specific condition
  // such as returning the element that are greater than 2 

// reduce
  // reduces all the elements to a single value 
  // such as adding all the elements together






////////////////////////////// 10 //////////////////////////////
// map 

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const dollarToEgyptianPound = 15;

// const movementsTgyptian = movements.map((mov, i, arr) => mov * dollarToEgyptianPound);
// console.log(movementsTgyptian);

// const movementDescriptions = movements.map((el, i) =>
// {
//     if(el >= 0 ) return `movement #${i + 1}: you deposited ${el}`;
//     else return `movement #${i + 1}: you withdrew ${Math.abs(el)}`;
// });

// console.log(movementDescriptions);
// // we can write the last method in a simpler way
// const movementDescriptions2 = movements.map((el, i) => `movement #${i + 1}: you ${el >= 0 ? 'deposited' : 'withdrew'} ${Math.abs(el)}`);
// console.log(movementDescriptions2);






////////////////////////////// 12 //////////////////////////////
// filter
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter((mov, i, arr) => mov > 0); // return an array in which all elements are > 0
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(deposits, withdrawals);






////////////////////////////// 13 //////////////////////////////
// reduce
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // accumulator is like a sum or container >>>> accumulator ^_^
// const balance = movements.reduce((acc, el, i, arr) =>
// {
//   return acc + el;
// }, 1000); // the 1000 is the initial value of the accumulator ... and you can ignore it

// // the function in a simpler way
// const balance2 = movements.reduce((acc, el) => acc + el, 1000);
// console.log(balance, balance2);

// // MAXIMUM value
// const max = movements.reduce((acc, cur) =>
// {
  
//   if(acc > cur) return acc; //  for each iteration:if the acc(initialized as the first element) > cur .... consider the acc as the max
//   else return cur; // else consider the cur element is the max
// }, movements[0]);
// console.log(max);






////////////////////////////// 14 //////////////////////////////
///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. 
  This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), 
  and does the following things in order:

1. Calculate the dog age in human years using the following formula: 
  if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old 
  (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs 
  (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = (ages) =>
// {
//   const humanAges = ages.map (age => age <= 2 ? age * 2 : 16 + age*4);
//   // let humanAges = ages.map((age, i) =>
//   // {
//   //   if(age <= 2) return age * 2;
//   //   else return 16 + age * 4;
//   // });
//   console.log(humanAges);
  
//   // 2)
//   const adults = humanAges.filter((age, i) => age > 18);
//   console.log(adults);

//   // 3)
//   const average = adults.reduce((acc, age) => acc+age);
//   console.log(average/adults.length);
// };
// // 4)
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log("------------------------");

// const calcAverageHumanAge2 = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

//   return average;
// };
// const avg1 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);






////////////////////////////// 15 //////////////////////////////
// The magic of chaning  method

// get the sum of +ve values with each value multiplied by 1.1
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const dollatToUSD = 1.1;
// // PIPELINE
// const totalDepositsUSD = movements.filter((el) => el > 0).map((el) => el * dollatToUSD).reduce((acc, el) => acc+el);
// console.log(totalDepositsUSD);






////////////////////////////// 16 //////////////////////////////
///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, 
  but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = (ages) =>
// {
//   const humanAges = ages.map (age => age <= 2 ? age * 2 : 16 + age*4);
//   console.log(humanAges);
  
//   // 2)
//   const adults = humanAges.filter((age, i) => age > 18);
//   console.log(adults);

//   // 3)
//   const average = adults.reduce((acc, age) => acc+age);
//   console.log(average/adults.length);
// };
// // 4)
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// const calcAverageHumanAge2 = ages => ages.map (age => age <= 2 ? age * 2 : 16 + age*4).filter((age, i) => age > 18)
//                              .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
                             
// console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]));






////////////////////////////// 17 //////////////////////////////
// find
// it will return the first element in the array that meets the condition
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const firstWithDrawal = movements.find(el => el < 0);
// console.log(firstWithDrawal);

// console.log(accounts);

// const accountJessica = accounts.find(cur => cur.owner === 'Jessica Davis');
// console.log(accountJessica);






////////////////////////////// 21 //////////////////////////////
// some (you shall use it when you read "any")
// includes is for equality, some is for condition
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // Equality
// console.log(movements.includes(-400)); // true 

// // some: Condition
// // if we want to know if the array includes a +ve value (condition not equality)
// console.log(movements.some(cur => cur > 0));

// // every: returns true if all the elements in the array meet the condition
// console.log(movements.every(cur => cur > 0 )); //false
// console.log(account4.movements.every(mov => mov > 0)); // true: every elements are > 0






////////////////////////////// 22 //////////////////////////////
// flat, flatMap

// if we wanted to put all the elements in an array with no nesting(only 1 dimension)
// flat
// one level of nesting (array of arrays)
// let arr = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
// console.log(arr.flat());

// // 2 level of nesting
// let arr2 = [[1, 2, [3, 4]], [5, 6, 7], [8, 9], 10];
// console.log(arr2.flat(2)); // the 2 means that you should go deeper 2 time nesting

// // example ... we want to sum all the movements of all accounts

// // with flat
// const accountMovements = accounts.map(cur => cur.movements);
// console.log(accountMovements); // array of arrays
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, cur) => acc+cur);
// console.log(overallBalance);

// // we can write the codes above in a simpler way
// console.log(accounts.map(mov => mov.movements).flat().reduce((acc, cur) => acc+cur));

// // with faltMap ... it combines flat and map together
// // the same code without map ... and change flat to flatMap
// console.log(accounts.flatMap(mov => mov.movements).reduce((acc, cur) => acc+cur));






////////////////////////////// 23 //////////////////////////////
// sorting arrays: the sort method sorts based on strings

// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort()); // sort method mutates the original array

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);
// // // console.log(movements.sort()); // will not sort the array properly cause it will convert everything to string first and then sort them

// // ascending ... تصاعدي ....
// movements.sort((a, b) => a-b);
// console.log(movements);

// // descending .... تنازلي
// movements.sort((a, b) => b - a);
// console.log(movements);






////////////////////////////// 24 //////////////////////////////
// if we wanted to write an array of 100 element each with the same value

// Array.from()
// const y = Array.from({length: 10}, () => 1); // the arrow function is exactly like the map fucntion
// console.log(y);

// // make an array of elements from 1 to 10

// const z = Array.from({length: 10}, (cur, i) => i+1); // if we don't want to use the "cur" param ... we can write "_" instead (_, i)
// console.log(z);

// // querySelectorAll: returns a nodeList not a real array
// // suppose that you don't store the movements in arrays and you want them from the UI


// labelBalance.addEventListener("click", () =>
// {
//   const movements = Array.from(document.querySelectorAll(".movements__value"));
//   console.log(movements.map((el, i) => Number(el.textContent.replace("€", ''))));

//   // another way
//   // const mov2 = [...document.querySelectorAll(".......")]
// })






////////////////////////////// 26 //////////////////////////////
///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, 
  and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is 
  within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, 
  calculate the recommended food portion and add it to the object as a new property. 
  Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. 
  (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
  HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, 
  and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') 
  and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., 
  like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order 
  (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: 
  current > (recommended * 0.90) && current < (recommended * 1.10). 
  Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

// حاول تحل الكود شالنج ده عشان شكله فشيخ لاني فصلت

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] }
// ];

// // 1) 
// dogs.forEach((el, i) => el.recFood = el.weight ** 0.75 * 28);

// // 2)
// // Find Sarah's dog and log to the console whether it's eating too much or too little. 
// // HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, 
// // and so this one is a bit tricky (on purpose) 🤓
// const saraDog = dogs.find(el => el.owners.includes("Sarah"));
// console.log(saraDog);
// console.log(`Sara's dag is eating too ${saraDog.curFood > saraDog.recFood ? "much": "little"}`); 

// // 3)
// let ownersEatTooMuch = dogs.filter(el => el.curFood > el.recFood);
// console.log(ownersEatTooMuch);
// ownersEatTooMuch = ownersEatTooMuch.flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch);
// const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);

// // 4)
// // Log a string to the console for each array created in 3., 
// // like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// console.log(`${ownersEatTooMuch.join(" and ")} eat too much`);
// console.log(`${ownersEatTooLittle.join(" and ")} eat too little`);

// // 5)
// // Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// console.log(dogs.some(el => el.recFood === el.curFood));

// // 6)
// // Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

// // 7)
// // Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

// // 8)
// // Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order 
// //   (keep in mind that the portions are inside the array's objects)
