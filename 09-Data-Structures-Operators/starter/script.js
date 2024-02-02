'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

const openingHours= {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
}

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function(starterIndex, mainIndex)
  { 
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours,
  // destructuring the parameters with default value
  orderDelivery: function({time, address, mainIndex = 1, starterIndex = 0})
  {
    console.log(`order receives, ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} 
    will be delevered to ${address} at ${time}`)
  },
  orderPizza: function(mainIngredient, ...otherIngredients)
  {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
  // you can write the function in an easy way
  orderPizzassssssss(mainIngredient, ...otherIngredients)
  {
    console.log(mainIngredient);
    console.log(otherIngredients);
  }
};






////////////////////////////// 3 //////////////////////////////
// Destructuring arrays
// const arr = [1, 2, 3];
// const [x, y, z] = arr;
// console.log(x, y, z);

// const [first, second] = restaurant.categories;
// // if we wanted to skip the second element and retreive the third element we do this
// // const [first, , third]= restaurant.categories;
// console.log(first, second)

// // if we wanted to swap 2 variable
// let [main, secondary] = restaurant.categories;
// console.log(main, secondary);
// [secondary, main] = [main, secondary];
// console.log(main, secondary);
// // this was instead of swapping
// // let a = 1;
// // let b = 2;
// // let temp;

// // temp = a;
// // a = b;
// // b = temp;

// // receive 2 return values from a function
// const [starter, final] = restaurant.order(2, 0);
// console.log(starter,final);


// // Nested destructuring
// const nested = [1, 2, [3, 4]];
// const[a, ,b] = nested;
// console.log(a, b);
// const [k, , [l, m]] = nested;
// console.log(k, l, m)

// // Default values
// const [r, t, i=1] = [8, 9];
// console.log(r, t, i);






////////////////////////////// 4 //////////////////////////////
// Destructuring object
// you have to use the same name of properties in the object using desctructuring. Order is not important
// const {name, openingHours, categories} = restaurant;
// console.log(name, openingHours, categories);

// // if we wanted to make new names for the properties
// const {name: restName, openingHours: hours, categories: cat} = restaurant;
// console.log(restName, hours, cat);

// // Default value in case the property doesn't exist
// const {menu =[], starterMenu: starter = []} = restaurant;
// console.log(menu, starter);

// // Mutating variables

// let a = 111;
// let b = 999;
// const obj ={a: 23, b: 7, c:14};
// ({a, b} = obj); // we can't use destructuring without using let or const that's why i put the whole line inside "()"
// console.log(a, b);

// // Nested Objects : not important
// const{fri:{open, close}} = openingHours; // openingHours is declared above
// console.log(open, close);

// // Passing object to the function and destructuring the object in the function
// restaurant.orderDelivery (
//   {
//     time: `22:30`,
//     address:'mit ghamr',
//     mainIndex:2,
//     starterIndex: 3
//   }
// )
// restaurant.orderDelivery (
//   {
//     time: `22:30`,
//     address:'mit ghamr',
//   }
// )






////////////////////////////// 5 //////////////////////////////
// Spread operator (...)
// const arr = [1, 2, 3];
// let newArr = [4, 5, ...arr];
// console.log(newArr);

// const newMenu = [...restaurant.mainMenu, 'Gauchi'];
// console.log(newMenu);

// // copy array
// const mainMenuCopy = [...restaurant.mainMenu];

// // join 2 arrays or more
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);

// let abdo = 'abdallah';
// let abdoNew = [...abdo, ' ', 'N']; // will spread of letter of "abdo" into an individual element
// console.log(abdoNew);

// // let newObj =
// // {
// //   orderPasta: function(ing1, ing2, ing3)
// //   {
// //     console.log(`Here is your pasta with ingredients: ${ing1}, ${ing2}, ${ing3}`);
// //   }
// // };

// // let input = [
// //   prompt('enter ing1'),
// //   prompt(`enter ing2`),
// //   prompt(`enter ing3`)
// // ];

// // newObj.orderPasta(...input)

// const newRestaurentObject = 
// {
//   foundedIn: 1990,
//   ...restaurant,
//   founder: 'wahbah'
// }
// console.log(newRestaurentObject);






////////////////////////////// 6 //////////////////////////////
// Rest operator: to collect multiple elements and condense them into array
// Spread operator: to unpack an array while rest to pack elements to an array


// // 1) Destructuring

// // // spread becomes on RHS of "="
// const arr = [1, 2, ...[3, 4]];

// // // Rest becoms on LHS of "="
// const [a, b, ...others] = [5, 6, 7, 8, 9, 0];
// console.log(a, b, others);

// // The rest element must be the last element
// const [pizza, ,resotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]
// console.log(pizza, resotto, otherFood);

// // Objects
// const {sat, ...weekdays} = restaurant.openingHours;
// console.log(sat, weekdays); 



// // 2) Functions
// const add = (...numbers) =>
// {
//   // console.log(numbers);
//   let sum = 0;
//   numbers.forEach(el =>
//   {
//     sum+=el;
//   })
//   console.log(sum);
// };

// add(2, 3);
// add(5, 6, 1);
// add(1, 2, 3, 4);

// // Spread with Rest
// const x = [2, 3, 5, 7];
// add(...x);

// const newObject = 
// {
//   orderPizza: function(mainIngredient, ...otherIngredients)
//   {
//     console.log(mainIngredient);
//     console.log(otherIngredients);
//   }
// }

// newObject.orderPizza("pizza", "mushroom", "apple", "orange");






////////////////////////////// 7 //////////////////////////////
// Short circuiting: (&& and ||)

// console.log('---- OR ----');
// بيدور علي التروثي فاليو ولو ملاقاش تروثي فاليو هيرجع اخر قيمة
// // if the first value is a truthy value, it will return the first value (2 different data types)

// console.log(3 || "abdo");  // returns 3
// console.log('' || 'abdo'); // first value is falsy one : return abdo
// console.log(true || 0); // true: different data types
// console.log(undefined || null); // first value is falsy >>> print the other one
// console.log(undefined || 0 || '' || "hello" || 23) // print hello

// const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guest1);

// // you can write the code above in a different way
// const guest2 = restaurant.numGuests || 10;
// console.log(guest2); // the first value will be undefined (falsy) so it will assign the second value

// console.log('---- AND ----');
// // And operator short circuits
// بيدور علي الفولسي فاليو .. ولو مفيش فولسي فاليو هيجيب اخر فيمة
// // when the first value is falsy it will return that falsy value without evaluating the second operand
// // if the first value is truthy, it will continue until it founds a falsy one. if it doesn't find falsy, it will return the last value
// console.log(0 && 'abdo'); // 0
// console.log(7 && 'abdo') // abdo
// console.log('hello' && 34 && null && 'abdo') // null

// // خلاصة الفيديو ابن الكلب ده
// // OR
// // بيدور علي truthy value
// // ولو ملاقاش هياخد اخر حاجة
// // AND
// // بيدور علي falsy value
// // ولو ملاقاش هياخد اخر حاجة
// // OR operator will return the first truthy value or the last one if all are falsy
// // AND operator will return the first falsy value or the last one if all are truthy

// // practical example
// if(restaurant.orderPizza) // if there is a function called "orderPizza" inside the object, call it
// {
//   restaurant.orderPizza("apple", "orange");
// }

// // we can write the code above in a different way
// restaurant.orderPizza && restaurant.orderPizza("apple", "orange");






////////////////////////////// 8 //////////////////////////////
// Nullish Coalscing Operator "??"
// nullish operator works with nullish values (undefined and null) not falsy values(undefined and null, 0, "", false)

// restaurant.numGuests = 0;
// let guest = restaurant.numGuests || 10; // it returns 10 but we want to return 0 
// console.log(guest);

// // in es11 (2020)
// // Nullish values: undefined and null (Not 0 or ''). And that "??" works with nullish values
// let guest3 = restaurant.numGuests ?? 10; // works the same as OR but will fix the problem
// console.log(guest3);






////////////////////////////// 9 //////////////////////////////
// Coding challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). 
In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. 
  For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, 
  and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. 
So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) 
  and prints each of them to the console, along with the number of goals that were scored in total 
  (number of player names passed in)
7. The team with the lower odd is more likely to win. 
Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. 
Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // 1)
// const [player1, player2] = game.players;
// console.log(player1, player2);

// // 2)
// const [gk1, ...fieldPlayers1] = player1;
// console.log(gk1, fieldPlayers1);
// const [gk2, ...fieldPlayers2] = player2;
// console.log(gk2, fieldPlayers2);

// // 3)
// const allPlayers = [...player1, ...player2];
// console.log(allPlayers);

// // 4)
// const players1Final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 5)
// const {team1, x: draw, team2} = game.odds;
// console.log(team1, draw, team2);

// // 6)
// let printGoals = (...names) =>
// {
//   names.forEach(e =>
//   {
//     console.log(e);
//   });
//   console.log(names.length);
// };

// printGoals(...game.scored);

// // 7)
// team1 < team2 && console.log('Team 1 is more likely to win'); 
// team1 > team2 && console.log('Team 2 is more likely to win');






////////////////////////////// 10 //////////////////////////////
// For - of loop

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu)
// {
//   console.log(item); //  it will print each item in the array
// }
// // item && index
// for (const item of menu.entries())
// {
//   console.log(item); // it will print items, each item is an array consisting of the item and its index
// }
// for (const item of menu.entries())
// {
//   console.log(`${item[0] + 1}: ${item[1]}`); //  the same result as above but in a cool shape
// }
// // using desctruturing
// for( const [i, el] of menu.entries())
// {
//   console.log(`${i+1}: ${el}`);
// }






////////////////////////////// 12 //////////////////////////////
// Optional Chaining

// if(restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// // with optional chaning
// console.log(restaurant.openingHours.mon?.open); // if "monday" property exists, find "open" property inside it, else it will return undefiened
// console.log(restaurant.openingHours?.mon?.open);
// // Methods
// console.log(restaurant.orderHello?.(1, 4) ?? "method doesn't exist"); // remember "??" is nullish coalscing >> video #8 .... finds truthy value with nullish values(undefined and null)

// // Arrays
// const user = [{name: 'abdo', email: "abdo@yahoo.com"}];
// console.log(user[0]?.name ?? "user 0 doesn't exist");






////////////////////////////// 13 //////////////////////////////
// looping through object keys, values and entries(name + value)

// Property Names
// const properties = Object.keys(openingHours);
// console.log(properties)
// for(const day of properties)
// {
//   console.log(day);
// }

// // Property values
// const values = Object.values(openingHours);
// console.log(values);

// // Entries
// for(const [key, {open, close}] of Object.entries(openingHours))
// {
//   console.log(`On ${key}, we open at ${open} and close at ${close}`)
// }






////////////////////////////// 14 //////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
  Odd of victory Bayern Munich: 1.33
  Odd of draw: 3.25
  Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
  {
    Gnarby: 1,
    Hummels: 1,
    Lewandowski: 2
  }

GOOD LUCK 😀
*/

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // 1)
// for(const [index, player] of game.scored.entries())
// {
//   console.log(`Goal ${index + 1}: ${player}`)
// }

// // 2)
// let average = 0;
// for(const value of Object.values(game.odds))
// {
//     average += value;
// }
// average = average / Object.keys(game.odds).length;
// console.log(average);

// // 3)
// for (const [key, value] of Object.entries(game.odds)) {
//   const teamStr = key === 'x' ? 'draw' : `victory ${game[key]}`;
//   console.log(`Odd of ${teamStr} ${value}`);
// }

// Bonus)
// let playersScored = {};
// for(const player of game.scored)
// {
//   playersScored[player] ? playersScored[player]++ : (playersScored[player] = 1);
// }
// console.log(playersScored)






////////////////////////////// 15 //////////////////////////////
// Sets
// receives array and returns that array with no repitition
// returns object of non repeating values
// The main purpose of sets is to remove duplicates
// const ordersSet = new Set(['pizza', 'pasta', 'Risotto', 'pizza', 'pasta']); // all duplicates will be gone
// console.log(ordersSet);
// console.log(new Set('abdallah'));

// console.log(ordersSet.size);
// console.log(ordersSet.has('pizza'));
// console.log(ordersSet.has('bread'));
// ordersSet.add('apple');
// ordersSet.add('apple');
// console.log(ordersSet);
// ordersSet.delete('Risotto');
// console.log(ordersSet);

// // ordersSet.clear();
// // console.log(ordersSet);
// for(const order of ordersSet)
// {
//   console.log(order);
// }

// // Example
// const staff = ['teacher', 'teacher', 'prof', 'worker', 'worker', 'student'];
// const staffUnique = new Set(staff);
// console.log(staffUnique);

// // and if you wanted to return an array instead of object, you can use spread operator

// const staffUniqueArray = [...staffUnique];
// console.log(staffUniqueArray);






////////////////////////////// 16 //////////////////////////////
// Maps
// key-value pairs ..... the key can be any data type
// const rest = new Map();

// rest.set('name', 'Gabi');
// rest.set('place', 'Mansoura');
// rest.set(1, 'hello')
//     .set(2, 'welcome')
//     .set('open', 11)
//     .set('closed', 23)
//     .set(true, 'We are open')
//     .set(false, 'We are closed');

// console.log(rest.get(true));
// console.log(rest.get('name'));
// console.log(rest.get(1));

// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('closed')));

// console.log(rest.has('name'));
// rest.delete(2);
// console.log(rest);
// console.log(rest.size);
// // rest.clear();

// // we can use array as a key
// const arr = [1, 2];
// rest.set(arr, 'sdklhlhfgljdfklgj');
// console.log(rest.get(arr));






////////////////////////////// 17 //////////////////////////////

// const arr =[
// ['question', 'What is the best programming language in the world?'],
// [1, 'C'],
// [2, 'Java'],
// [3, 'JavaScript'],
// ['correct', 3],
// [true, 'Correct 🎉'],
// [false, 'Try again!']
// ];
// const question = new Map(arr);
// console.log(question);

// // converting object to map
// const hoursMap = (Object.entries(openingHours));
// console.log(hoursMap); // array of arrays


// // Quiz app
// console.log(question.get('question'));
// for(const [key, value] of question)
// {
//   if(typeof key === 'number')
//   {
//     console.log(`${key}: ${value}`);
//   }
// }
// const answer = Number(prompt('enter the correct number'));
// console.log(question.get(question.get('correct') === answer));

// // Convert map to array
// const arrMap = [...question];
// console.log(arrMap);






////////////////////////////// 19 //////////////////////////////

// Coding Challenge #3

/* 
Let's continue with our football betting app! 
  This time, we have a map with a log of the events that happened during the game. 
  The values are the events themselves, and the keys are the minutes in which each event happened 
  (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. 
  So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" 
  (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half 
  (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // 1) 
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// // 2)
// gameEvents.delete(64);

// // 3)
// console.log(`an An event happened, on average, every ${90 / gameEvents.size} minutes`);
// const time = [...gameEvents.keys()].pop();
// console.log(time);
// console.log(`An event happened, on average, every ${time / gameEvents.size} minutes`);

// // 4)
// for(const [min, event] of gameEvents)
// {
//   const firstHalf = min < 45 ? '[First half]' : "[Second half]";
//   console.log(`${firstHalf} ${min}: ${event}`);

// }






////////////////////////////// 20 //////////////////////////////
// Strings
// length, indexOf, slice
// const airline ='Tap air portugal';
// const plane = 'A320';
// console.log(plane[0], plane[1]);
// console.log('hello'[1]);

// console.log(airline.length);
// console.log("hello".length);

// console.log(airline.indexOf('r'));
// console.log(airline.indexOf('portugal'));

// console.log(airline.slice(4)); // start slicing at index = 4 (result: air portugal)
// console.log(airline.slice(4, 7)); // start index, final index(excluding) (result:air)

// // get the first word
// console.log(airline.slice(0, airline.indexOf(' ')));
// // get the last word
// console.log(airline.slice(airline.lastIndexOf(' ')+1));

// // slice with -ve param
// console.log(airline.slice(-2)); // start slicing from the last 2 char
// console.log(airline.slice(1, -1)); // start slicing from index 1 up until the char before the end

// // Example to check if you are in the middle seat (last char is B or E)
// const checkMiddleSeat = (seat) =>
// {
//   const s = seat.slice(-1);
//   if(s === 'B' || s === 'E')
//   {
//     console.log('You are a middle seat')
//   }
//   else
//   {
//     console.log('not middle seat');
//   }
// }
// checkMiddleSeat('23B');
// checkMiddleSeat('28N');
// checkMiddleSeat('23B');
// checkMiddleSeat('28E');






////////////////////////////// 21 //////////////////////////////
// Strings
// toLowerCase, toUpperCase, replace, trim, includes, startsWith, endsWith

// const airline ='Tap air portugal';
// console.log(airline.toLowerCase()); // tap air portugal
// console.log(airline.toUpperCase()); // TAP AIR PORTUGAL

// let passenger = 'abDAlLah'; // we want it like this "Abdallah"
// const passengerLower = passenger.toLowerCase();
// const passerModified = passenger[0].toUpperCase() + passengerLower.slice(1);
// console.log(passerModified);

// // Comparing emails
// const email = 'abdallah@yahoo.com';
// const loginEmail = '     aBdaLlah@YahoO.CoM  \n';
// const loginLower = loginEmail.toLowerCase();
// const correctLogin = loginLower.trim();
// console.log(correctLogin);
// //or
// console.log(loginEmail.toLowerCase().trim());

// // replace 
// const priceGB = '24,9#'; // replace '#' with '$' and replace ',' with '.'
// const priceUS = priceGB.replace('#', '$').replace(',', '.');
// console.log(priceUS);
// const announcement = 'welcome to door #3'; // replace door with gate
// console.log(announcement.replace('door', 'gate'));

// // Booleans
// const plane = 'Airbus A320neo';
// if(plane.includes('A320') && plane.startsWith('Airbus') && plane.endsWith('neo'))
// {
//   console.log('nice trip');
// }

// // practical exercise
// const checkBaggage = (items) =>
// {
//   const baggage = items.toLowerCase();
//   if(baggage.includes('knife') || baggage.includes('gun'))
//   {
//     console.log('Not allowed to enter the plane')
//   }
//   else console.log('Welcome')
// }
// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Socks and camera');
// checkBaggage('Got some snacks and a gun for protection');






////////////////////////////// 22 //////////////////////////////
// String
// split, join(opposite of split)(also tranforms array to string), padStart, padEnd(padding), repeat

// console.log('A+Hello+abdo'.split('+'));

// const [firstName, lastName] = 'Abdallah Wahbah'.split(' ');
// console.log(firstName, lastName);

// const joined = ["Mr.", firstName, lastName].join('----');
// console.log(joined);

// // Example: capitalize the first letter of each word
// const capitalizeName = (name) =>
// {
//   const names = name.split(' ');
//   const namesUpper = [];
//   for (const n of names)
//   {
//     namesUpper.push(n[0].toUpperCase() + n.toLowerCase().slice(1));

//     // another way
//     // namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }

//   console.log(namesUpper.join(' '));
// }
// capitalizeName("abdallah wahbah");
// capitalizeName("hello from the other side");

// // padStart, padEnd 
// // is to add for example "+" at the beginning or the end a number of times

// console.log('abdallah'.padStart(25, '+')); // the result will be a 25 length string "+++++++++++++++++abdallah": 17 char = "+" and 8 = "abdallah"
// console.log('abdallah'.padStart(25, '+').padEnd(50, "=")); // +++++++++++++++++abdallah=========================

// // Example of masking phone numbers (mask all numbers with * except last 4 numbers)
// const maskNumbers = (number) =>
// {
//   const str = number + '';
//   const last4Char = str.slice(-4);
//   return last4Char.padStart(str.length, "*");
// }
// console.log(maskNumbers(276376));
// console.log(maskNumbers(2762768746376)); // *********6376
// console.log(maskNumbers('276918273781871239376'));

// // repeat

// const msg = "hello from the other side ";
// console.log(msg.repeat(5));

// // practical example
// const NumPlanes = (n) =>
// {
//   const planeEmoji = 'x';
//   console.log(`There are ${n} planes in the line: ${planeEmoji.repeat(n)}`);
// }
// NumPlanes(4);
// NumPlanes(7);



///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), 
  and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. 
  Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', () =>
{
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  for(const row of rows)
  {
    const splitted = row.toLowerCase().trim().split('_');
    const secondWord = splitted[1];
    const secondWordCapital = secondWord.replace(secondWord[0], secondWord[0].toUpperCase());
    // console.log(secondWordCapital);
    console.log(`${splitted[0]}${secondWordCapital}`);
  }

  // for(const [index, value] of rows.entries())
  // {
  //   const splitted = value.toLowerCase().trim().split("_");
  //   console.log(splitted[0] + splitted[1][0].toUpperCase()+splitted[1].slice(1))
  // }
});

// Video solution

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   const rows = text.split('\n');

//   for (const [i, row] of rows.entries()) {
//     const [first, second] = row.toLowerCase().trim().split('_');

//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
//   }
// });