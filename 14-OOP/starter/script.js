// 'use strict';

// when revising ... just read constructor function ... I will use ES6 classes always
///////////////////////////////// 5 /////////////////////////////////
// Constructor function
// constructor function always starts with a capital letter
// const Person = function(firstName, birthYear)
// {
//     // Instance properties
//     this.firstName = firstName;
//     this.birthYear = birthYear;
// }
// // what happens when you instantiate new object ?  
// // 1. New {} is created .... // {} = empty object
// // 2. Function is called, this = {}
// // 3. {} is linked to prototype
// // 4. Function automatically returns {}
// const abdo = new Person("abdallah", 1998);
// console.log(abdo);
// const wahbah = new Person("wahbah", 1000);
// console.log(wahbah);
// console.log(wahbah instanceof Person); // true






///////////////////////////////// 6 /////////////////////////////////
// Prototypes
// const Person = function(firstName, birthYear)
// {
//     this.firstName=firstName;
//     this.birthYear=birthYear;
// }
// // every function hase a property called prototype including the constructor function
// Person.prototype.calcAge = function()
// {
//     console.log(2037 - this.birthYear);
// }
// Person.prototype.species = "hello from the other side"

// const abdo = new Person("abdallah", 1998);
// const wahbah = new Person("wahbah", 1990);
// abdo.calcAge();
// wahbah.calcAge();
// console.log(abdo.species, wahbah.species);
// // console.log(Person.prototype.isPrototypeOf(abdo)); // true
// console.log(abdo.hasOwnProperty("firstName")); // true
// console.log(abdo.hasOwnProperty("species")); // false






///////////////////////////////// 9 /////////////////////////////////
///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. 
    A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function(make, speed) 
// {
//     this.make=make;
//     this.speed=speed;
// }

// Car.prototype.accelerate = function()
// {
//     this.speed += 10;
//     console.log(`${this.make} is going at speed of: ${this.speed}`);
// }
// Car.prototype.brake = function()
// {
//     this.speed -= 10;
//     console.log(`${this.make} is going at speed of: ${this.speed}`);
// }

// const bmw = new Car("BMW", 120);
// const mercedes = new Car("Mercedes", 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// mercedes.brake();






///////////////////////////////// 10 /////////////////////////////////
// ES6 CLASSES
// class PersonCL 
// {
//     constructor(firstName, birthYear)
//     {
//         this.firstName=firstName;
//         this.birthYear=birthYear;
//     }
//     // Methods will be added to prototype property automatically ... or you can write it manually .. but here is better
//     calcAge()
//     {
//         console.log(2021 - this.birthYear);
//     }
// }

// const abdo = new PersonCL("Abdallah", 1998);
// abdo.calcAge();

// PersonCL.prototype.greet = function() 
// {
//     console.log(`Hey, ${this.firstName}`);
// }
// abdo.greet();

// Classes are not hoisted: you can't use them before decleration
// Classed are first-class citizes: you can pass class to function and return class from a function






///////////////////////////////// 11 /////////////////////////////////
// Getter and Setter (ignore all about this shit lecture)

// getters and setters in Objects
// const account = 
// {
//     name: 'Abdallah', 
//     movs: [10, 20, 40, 50],

//     get latest()
//     {
//         return this.movs.slice(-1).pop();
//     },
//     set latest(mov)
//     {
//         this.movs.push(mov)
//     }
// };
// console.log(account.latest);
// account.latest = 100;
// console.log(account.movs);

// class PersonCL 
// {
//     constructor(fullName, birthYear)
//     {
//         this.fullName=fullName;
//         this.birthYear=birthYear;
//     }
//     calcAge()
//     {
//         console.log(2021 - this.birthYear);
//     }
//     greet()
//     {
//         console.log(`Hey, ${this.fullName}`);
//     }

//     get age()
//     {
//         return 2037 - this.birthYear;
//     }
//     // Set a property that already exists
//     set fullName(name)
//     {
//         if(name.includes(' ')) this._fullName = name; // then you can access fullName with _fullName .. the old name will be changed
//         else console.log(`${name} is not a full name`)
//     }
//     get fullName()
//     {
//         return this._fullName;
//     }
// }
// const abdo = new PersonCL("Abdallah wahbah", 1998);
// console.log(abdo.age);
// console.log(abdo._fullName);
// console.log(abdo);

// const walter = new PersonCL("Walter w", 1990);
// console.log(walter);
// console.log(walter.fullName);






///////////////////////////////// 12 /////////////////////////////////
// Static methods
// class PersonCL 
// {
//     constructor(fullName, birthYear)
//     {
//         this.fullName=fullName;
//         this.birthYear=birthYear;
//     }
    
//     greet()
//     {
//         console.log(`Hey, ${this.fullName}`);
//     }

//     static hey()
//     {
//         console.log("hello");
//         console.log(this); //'this' refers to the entire class
//     }
// }
// PersonCL.hey();






///////////////////////////////// 13 /////////////////////////////////
// Object.create (the least used way of implementing prototypal inheritance)(just ignore this also)
// const PersonProto = {
//     calcAge() {
//       console.log(2037 - this.birthYear);
//     },
  
//     init(firstName, birthYear) {
//       this.firstName = firstName;
//       this.birthYear = birthYear;
//     },
//   };
  
//   const steven = Object.create(PersonProto);
//   console.log(steven);
//   steven.name = 'Steven';
//   steven.birthYear = 2002;
//   steven.calcAge();
  
//   console.log(steven.__proto__ === PersonProto);
  
//   const sarah = Object.create(PersonProto);
//   sarah.init('Sarah', 1979);
//   sarah.calcAge();






///////////////////////////////// 14 /////////////////////////////////
/////////////////////////////////////// (you can also ignore this challenge)
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, 
    by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
// class CarCl 
// {
//     constructor(make, speed)
//     {
//         this.make=make;
//         this.speed=speed;
//     }
//     accelerate()
//     {
//         this.speed += 10;
//         console.log(`${this.make} is going at ${this.speed} km/h`);
//     }
//     brake() 
//     {
//         this.speed -= 5;
//         console.log(`${this.make} is going at ${this.speed} km/h`);
//     }

//     get speedUS()
//     {
//         return this.speed / 1.6;
//     }
//     set speedUS(speed)
//     {
//         this.speed *= speed
//     }
// }
// const ford = new CarCl("ford", 120);
// ford.accelerate();
// ford.brake();
// console.log(ford.speedUS);
// ford.speedUS = 2;
// console.log(ford.speedUS);






///////////////////////////////// 15 /////////////////////////////////
// I ignored video 15, 16






///////////////////////////////// 17 /////////////////////////////////
// Inheritance between classes ... ES6 classes
// class PersonCL 
// {
//     constructor(fullName, birthYear)
//     {
//         this.fullName=fullName;
//         this.birthYear=birthYear;
//     }
//     calcAge()
//     {
//         console.log(2021 - this.birthYear);
//     }
//     greet()
//     {
//         console.log(`Hey, ${this.fullName}`);
//     }

//     get age()
//     {
//         return 2037 - this.birthYear;
//     }
//     // Set a property that already exists
//     set fullName(name)
//     {
//         if(name.includes(' ')) this._fullName = name; // then you can access fullName with _fullName .. the old name will be changed
//         else console.log(`${name} is not a full name`)
//     }
//     get fullName()
//     {
//         return this._fullName;
//     }
//     static hey()
//     {
//         console.log(`Hey there`);
//     }
// }

// class StudentCl extends PersonCL
// {
//     constructor(fullName, birthYear, course)
//     {
//         super(fullName, birthYear);
//         this.course=course;
//     }
//     introduce() 
//     {
//         console.log(`Hey, I am ${this.fullName}, I study ${this.course}`);
//     }
//     // override function
//     calcAge()
//     {
//         console.log(`Hello, my age is ${2021 - this.birthYear}`);
//     }
// }
// const abdallah = new StudentCl("Abdallah Wahbah", 1998, 'Computer science');
// abdallah.introduce();
// abdallah.greet(); // from PersonCL 
// abdallah.calcAge();






///////////////////////////////// 18 /////////////////////////////////
// I ignored video 18






///////////////////////////////// 19, 20, 21, 22 /////////////////////////////////
// Encapsulation: keep some properties and method private inside the class so that they are not accessable from outside the class
// class Account 
// {
//     // 1) public fields(properties)(instances)
//     locale = navigator.language; // without "const" and without "this" .. you can access it later using "this" ... you cmust end with ";"
    
//     // 2) private fields(instances) ... has to start with "#" ... can't be accessed from outside .. has to be declared before the constructor
//     #movements = [];
//     #pin;
//     constructor(owner, currency, pin)
//     {
//         // 1) public fields(properties)
//         this.owner=owner;
//         this.currency=currency;
//         // this.locale = navigator.language;
//         // protected property(or method) ... but not private .. you can access from outside ... but agreed between developers not to use outside
//         // just put "_" before the property (or method)
//         // this._pin=pin;
//         this.#pin = pin;
//         console.log(`Thanks for opening new account, ${this.owner}`);
//     }

//     // 3) Public methods
//     getMovements()
//     {
//         return this.#movements;
//     }
//     deposite(val)
//     {
//         this.#movements.push(val);
//         // chaining
//         return this; // return the same object so that we can call another method after it(or call the same method) ... obj.deposit(1000).deposite(100).....
//     }
//     withdraw(val)
//     {
//         this.deposite(-val);
//         return this;
//     }
//     // 4) private methods
//     #approveLoad(val)
//     {
//         return true;
//     }
//     requestLoad(val)
//     {
//         if(this.#approveLoad(val))
//         {
//             this.deposite(val);
//             console.log(`Loan approved`);
//         }
//         return this;
//     }

//     // 5) static methods ... not available on instances .. available on the class itself
//     static helper()
//     {
//         console.log(`Helper`)
//     }
// }
// const abdallah = new Account("Abdallah", "EUR", 1111);
// abdallah.deposite(100);
// abdallah.withdraw(100);
// abdallah.requestLoad(4000);
// console.log(abdallah);
// // console.log(abdallah._pin);
// console.log(abdallah.getMovements());
// Account.helper();

// // Chaning
// abdallah.deposite(1000).deposite(1000).withdraw(500).requestLoad(13);
// console.log(abdallah.getMovements());






///////////////////////////////// 24 /////////////////////////////////
///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, 
    and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
class CarCL 
{
    constructor(make, speed)
    {
        this.make=make;
        this.speed=speed;
    }
    accelerate()
    {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    }
    brake()
    {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this;
    }
    getSpeed()
    {
        return this.speed / 1.6;
    }
    setSpeed(speed)
    {
        this.speed = speed * 1.6;
    }
}

class EVCl extends CarCL 
{
    #charge;
    constructor(make, speed, charge)
    {
        super(make, speed);
        this.#charge = charge;
    }
    chargeBattery(chargeTo)
    {
        this.#charge = chargeTo;
        return this;
    }
    accelerate()
    {
        this.speed += 20;
        this.#charge --;
        console.log(`${this.make} is going on speed ${this.speed} with charge of ${this.#charge}`);
        return this;
    }
    getCharge()
    {
        return this.#charge; // bad practise
    }
}

const rivian = new EVCl("Rivian", 120, 23);
console.log(rivian);
// console.log(rivian.#charge); // not working cause it is a private instance
rivian.accelerate().accelerate().chargeBattery(30).brake();
console.log(rivian.getCharge());