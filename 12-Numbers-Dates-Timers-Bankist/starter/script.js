'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2021-09-11T14:11:59.604Z',
    '2021-09-10T17:01:17.194Z',
    '2021-09-14T23:36:17.929Z',
    '2021-09-15T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = (date, locale) =>
{
  const calcDaysPassed = (date2, date1) => Math.round(Math.abs((date2 - date1)) / (1000 * 60 * 60 * 24)); // it will return the difference in days
  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if(daysPassed === 0 ) return `Today`;
  else if(daysPassed === 1) return 'Yesterday';
  else if (daysPassed <= 7) return `${daysPassed} days age`;
  else
  {
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(locale).format(date);
  }
  
}

const formatCurrency = (value, locale, currency) =>
{
  return new Intl.NumberFormat(locale, 
    {
      style: 'currency',
      currency: currency
    }).format(value);
};


const displayMovements = (acc, sort = false) =>
{
  containerMovements.innerHTML = '';

  // sorting the array
  const movs = acc.movements.slice().sort((a, b) => sort ? a-b : acc.movements);
  
  movs.forEach((mov, i) =>
  {
    const type = mov > 0 ? 'deposit' : 'withdrawal';


    const date = new Date(currentAccount.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    // format movements' currency
    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

    const html = 
    `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
};

const calcDisplayBalance = (acc) =>
{
  acc.balance = acc.movements.reduce((acc, mov) => acc+mov);
  labelBalance.textContent = formatCurrency(acc.balance, acc.locale, acc.currency);
}

const calcDisplaySummary = (acc) =>
{
  const incomes = acc.movements.filter(el => el > 0).reduce((acc, el) => acc+el);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const outcomes = acc.movements.filter(el => el < 0).reduce((acc, el) => acc+el, 0);
  labelSumOut.textContent = formatCurrency(Math.abs(outcomes), acc.locale, acc.currency);

  // suppose you wanna present the interest which is the summation of every +ve movement multiplied by .12
  // but for elements that are > 1 ... this is why we used the second filter
  const interest = acc.movements.filter(el => el > 0).map(el => (el * acc.interestRate) / 100)
                  .filter((el, i, arr) =>
                  {
                    //console.log(arr); // you will find elements less than 1 ... this filter will remove them
                    return el >= 1;
                  }).reduce((acc, el) => acc + el);
  labelSumInterest.textContent = formatCurrency(interest, acc.locale, acc.currency)
};

const createUsernames = (accs) =>
{
  accs.forEach((acc) =>
  {
    acc.username = acc.owner.toLowerCase().split(" ").map((el, i) => el[0]).join("");
  });  
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = () =>
{
  
  // set time to 5 minutes
  let time = 120;

  const tick = ()=>
  {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // in each call, print the remaining time the UI
    labelTimer.textContent = `${min}: ${sec}`;
    time--;
    
    // when 0 seconds, stop timer and log out the user
    if(time < 0) 
    {
      clearInterval(timer);
      labelWelcome.textContent =`Log in to get started`;
      containerApp.style.opacity = "0";
    }
  }

  // call the timer every second
  tick(); // we call tick function here and at setInterval ... because at the first count ... the function will be called after 1 second and we want it to be called immediately
  timer = setInterval(tick, 1000);

  return timer;
}







///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// Fake logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = "1";



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

    // create current date and time
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0); // " + 1 " because the month is 0-based
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Internationalization API (date)
    const now = new Date();
    const options = 
    {
      hour: 'numeric',
      minute:'numeric',
      day: 'numeric',
      month: 'numeric', // numeric,long, 2-digit 
      year: 'numeric',
      // weekday: 'long'
    };
    const locale = navigator.language; // "ar-EG"  // see this website http://www.lingoes.net/en/translator/langcode.htm
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // clear inputs and clear focus from input fields
    inputLoginUsername.value = inputLoginPin.value =  '';
    inputLoginPin.blur();

    // Timer
    if(timer) clearInterval(timer);
    timer = startLogOutTimer();

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

    // Add current date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // Reset time
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener("click", (e) =>
{
  e.preventDefault();
  
  const amount = Math.floor(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(cur => cur >= amount * .1))
  {
    setTimeout(() => // execute this function after 2.5 seconds
    {
      currentAccount.movements.push(amount);

      // Add load date
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);

      // Reset time
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
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
// Number.isFinite(123) is the most important in this lecture and Number.parseFloat("12.5rem")

// there is an easy way to convert string to number
// console.log(Number('23'));
// console.log(+("23")); // the same result

// console.log(Number.parseInt("23adsdfsdf")); // result: 23 of type number. The string has to start with a number

// console.log(Number.parseInt("  2.5rem  ")); // 2
// console.log(Number.parseFloat("  2.5rem  ")); // 2.5

// // ----------------------- To check if the value is a number or not, use isFinite()
// console.log(Number.isFinite(23)); // true
// console.log(Number.isFinite('23')); // false: string
// console.log(Number.isFinite(+"23")); // true: number
// console.log(Number.isFinite(+"23x"), typeof(+"23x")); // false
// console.log(Number.isFinite(20 / 0)); // false: infinity

// // isInteger()
// console.log(Number.isInteger(23)); // true
// console.log(Number.isInteger(23.0)); // true
// console.log(Number.isInteger("23")); // false






////////////////////////////// 4 //////////////////////////////
// sqrt, min, max, parseFloat, floor, trunc, ceil, round, -------toFixed-------
// console.log(Math.sqrt(25));
// console.log(25 ** .5);
// console.log(25 ** (1/2));
// console.log(8 ** (1/3));

// console.log(Math.trunc(Math.random() * 6) +1);//value from 1 to 6

// console.log(Math.min(2, 3, 4, 5, 6));
// console.log(Math.min(2, 3, '4', 5, 6));
// console.log(Math.max(2, 3, 4, 5, 6));

// console.log(Math.PI * Number.parseFloat("10f")**2);

// console.log(Math.floor(1.9) + " floor"); // Round a number downward to its nearest integer: 1
// console.log(Math.ceil(1.1) + " ceil");  // Round a number upward to its nearest integer: 2
// console.log(Math.round(1.7) + " round"); // Round a number to the nearest integer: التقريب
// console.log(Math.trunc(2.2) + " trunc"); // Return the integer part of a number: 2 (just like the floor method when dealing with +ve numbers)

// console.log(Math.floor(-23.3)); // -24 .... هيقرب للرقم اللي اقل منه
// console.log(Math.trunc(-23.5)); // -23 just removes the decimal numer

// // rounding decimals
// console.log((2.77).toFixed(4)); // 2.7700 the return is tring






////////////////////////////// 5 //////////////////////////////
// remainder ... %
// const isEven = num => num % 2 === 0;
// console.log(isEven(2));
// console.log(isEven(99));

// // not practical example
// // make the numbers divisable by 2 color = red
// labelBalance.addEventListener("click", () =>
// {
//   [...document.querySelectorAll(".movements__row")].forEach((el, i) => 
//   {
//     // 0, 2, 4, 6, 8, 10 ....
//     if(i % 2 === 0) el.style.backgroundColor = "orangered";
//     // 0, 3, 6, 9, 12 ... override will be done
//     if(i % 3 === 0) el.style.backgroundColor = "blue";
//   });
// });






////////////////////////////// 6 //////////////////////////////
// BigInt

// console.log(189273716781683565137651365681238n); // you have to write "n" to indicate that it is a big int
// // or 
// console.log(BigInt(222222));

// // you can't mix (add-subtract-mul-div) BigInt with any other type

// const big = 18273713852365762357625376526834n;
// const notBig = 22;
// // console.log( big * notBig); // error
// console.log(big * BigInt(notBig));

// // DIVISION
// console.log(10n / 3n); // it will cut out the decimal part
// console.log(10 / 3);






////////////////////////////// 7 //////////////////////////////
// Dates
// const now = new Date();
// console.log(now);

// console.log(new Date(2021, 9 - 1 /** 0 based index, so subtract it with 1 to get september */, 16)); // year - month - day

// // working with dates
// const future = new Date(2021, 9 , 16);
// console.log(future.getFullYear());
// console.log(future.getMonth()); // 9 is 0-based so it refers to october
// console.log(future.getHours()); // get the day of the month
// console.log(future.getMinutes()); // get the day of the week ... starting from sunday (0-based)
// console.log(future.getSeconds());






////////////////////////////// 9 //////////////////////////////
// operations with dates
// const future = new Date(2037, 9 , 16, 15, 23); // this will return a number in milliseconds

// // how many days passed from .. to .. 
// const calcDaysPassed = (date2, date1) => Math.abs((date2 - date1)) / (1000 * 60 * 60 * 24); // it will return the difference in days
// // (/1000) to convert ms to s ... then * 60 to convert to minutes, *60 to convert to hours, * 24 to convert to days

// const days1 = calcDaysPassed(new Date(2037, 3, 27), new Date(2037, 3, 17));
// console.log(days1);






////////////////////////////// 10 //////////////////////////////
// Internationalizing Dates (Intl)

// const now = new Date();
// const options = 
// {
//   hour: 'numeric',
//   minute:'numeric',
//   day: 'numeric',
//   month: 'numeric', // numeric,long, 2-digit 
//   year: 'numeric',
//   // weekday: 'long'
// };
// const locale = navigator.language; // "ar-EG"  // see this website http://www.lingoes.net/en/translator/langcode.htm
// const x =  new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
// console.log(locale, x);
// // simple line
// console.log(new Intl.DateTimeFormat(navigator.language).format(new Date()));






////////////////////////////// 11 //////////////////////////////
// Internationalizing Numbers (Intl)
// const num = 1234567.99;

// const options = 
// {
//   style: 'unit',// unit, percent, currency ... if you defined the style as currency, the unit will be ignored and you have to define the currency
//   unit: 'celsius', // mile-per-hour, celsius
//   currency: 'EUR' // USD(dollars), EUR(يورو) 
// };
// console.log(new Intl.NumberFormat("en-UK", options).format(num));
// console.log(new Intl.NumberFormat('en-US', options).format(num));
// console.log(new Intl.NumberFormat('ar-EG', options).format(num));
// console.log(new Intl.NumberFormat(navigator.language, options).format(num));






////////////////////////////// 12 //////////////////////////////
// Timers
// setTimeOut: runs just once after a defined time ........ the execution doesn't stop when the compiler reaches this function .. it rigesters it to execute later(after .. seconds) and continue execution
// setInterval: keeps running forever until we stop it

// setTimeOut() 
// all the code inside it will be executed after a certain time
// setTimeout(() =>
// {
//   console.log("print this after 1 second")
// }, 1000);

// console.log('Waiting...')

// for(let i = 0; i < 4; i++)
// {
//   setTimeout(() =>
//   {
//     console.log("print this sentence 4 times, all the 4 times(together) is after a second....Actually the code above which is outside the loop will be printed with this line of code, cause they all wait the same 1 second")
//   }, 1000);
// }

// // if we wanted to pass parameters
// setTimeout((ing1, ing2) =>
// {
//   console.log(`We ate ${ing1} and ${ing2}`);
// }, 3000, 'fruit', 'apple');

// // if we want to stop setTImeOut from execution
// const ingredients = ['olives', 'spinach'];
// const pizzaTimer = setTimeout((ing3, ing4)=>
// {
//   console.log(`We ate ${ing3} and ${ing4}`);
// }, 5000, ...ingredients);

// if(ingredients.includes('olives')) clearTimeout(pizzaTimer);


// // setInterval
// // the function will be executed every 1 second
// setInterval(()=>
// {
//   // console.log('object');
//   const options = 
//   {
//     hour: 'numeric',
//     minute:'numeric',
//     second: 'numeric'
//   };

//   const time = new Intl.DateTimeFormat('en-UK', options).format(new Date);
//   console.log(time);
// }, 1000)