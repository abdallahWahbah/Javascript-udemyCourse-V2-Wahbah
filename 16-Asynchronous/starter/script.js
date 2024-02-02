'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = (data, className = "") =>
{
    const html =
    `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 10000000).toFixed(1)} population</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = "1";
};

const renderError = (msg) =>
{
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = "1";
}

/////////////////////////////////////// 4 ///////////////////////////////////////
// XMLHTTPRequest: old school (igonre it or just read it)

// const getCountryData = (country) =>
// {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`); // https://github.com/public-apis/public-apis
//     request.send();

//     request.addEventListener("load", () =>
//     {
//         const [data] = JSON.parse(request.responseText);
//         console.log(data);

//         const html =
//         `
//         <article class="country">
//         <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//           <h3 class="country__name">${data.name}</h3>
//           <h4 class="country__region">${data.region}</h4>
//           <p class="country__row"><span>👫</span>${(+data.population / 10000000).toFixed(1)} population</p>
//           <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//           <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//         </div>
//         </article>
//         `;
//         countriesContainer.insertAdjacentHTML("afterbegin", html);
//         countriesContainer.style.opacity = "1";
//     });
// };
// getCountryData("egypt");
// getCountryData("germany");
// getCountryData("usa");






/////////////////////////////////////// 6 ///////////////////////////////////////
// guarantee the second call will be after the first one



// const getCountryAndNeighbour = (country) =>
// {
//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`); // https://github.com/public-apis/public-apis
//     request.send();

//     request.addEventListener("load", () =>
//     {
//         const [data] = JSON.parse(request.responseText);
//         console.log(data);

//         // render country 1
//         renderCountry(data);

//         // get neighbout country 2
//         const [neighbour] = data.borders;
//         if(!neighbour) return;

//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener("load", ()=>
//         {
//             const data2 = JSON.parse(request2.responseText);
//             console.log(data2);
//             renderCountry(data2, 'neighbour');
//         });
//     });
// };
// getCountryAndNeighbour("portugal");






/////////////////////////////////////// 8 ///////////////////////////////////////
// fetch
//returns a promise which is a placeholder for the (future) data that comes from the asynchronos operation

// // const getCountryDate = (country) =>
// // {
// //     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
// //     .then(response => 
// //     {
// //         return response.json(); // the json() itself will return a promise, so we have to use "then" again
// //     })
// //     .then(data =>
// //     {
// //         console.log(data);
// //         renderCountry(data[0]);  
// //     });
// // };

// // the same as above but without comments and logs 
// const getCountryDate = (country) =>
// {
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]))    
// };
// getCountryDate("usa");






/////////////////////////////////////// 9, 10, 11 ///////////////////////////////////////
// Chaining  promises, Handling Rejected Promises, Throwing Errors Manually
// whatever you return from "then" will be a promise...even if it is a number ... you can use it from the next "then" after it

// // const getCountryData = (country) =>
// // {
// //     // Country 1
// //     fetch(`https://restcountries.eu/rest/v2/name/${country}`)
// //     .then(response => 
// //         {
// //             // Throwing Errors Manually
// //             if(!response.ok) 
// //             {
// //                 throw new Error(`Country not found (${response.status})`); // response.status = 404 or 200 but im this case will be 404
// //             } // if no counrty is found, "throw" will end the fetch() and the "throw" will pass the error to catch()
            
// //             return response.json();
// //         })
// //     .then(data => 
// //     {
// //         renderCountry(data[0]);

// //         // Country 2
// //         const neighbour = data[0].borders[0];
// //         if(!neighbour) return;
// //         return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`); // return a new promise
// //     })
// //     .then(response => response.json())
// //     .then(data => renderCountry(data, 'neighbour'))
// //     .catch((error) => // catch also returns a promise
// //     {
// //         console.log(error);
// //         renderError(`Something went wrong: ${error.message}. Try again later`);
// //     })
// //     .finally(() => // is called whenever the promise is called .. no matter if the promise if fulfilled or rejected
// //     {
// //         console.log("hello from the other side");
// //         countriesContainer.style.opacity = "1";
// //     });
// // };
// // getCountryData("germany");
// // btn.addEventListener("click",()=> getCountryData("usssssa"));

// const getJSON = (url, msgError = "Something went wrong") =>
// {
//     return fetch(url)
//             .then(response =>
//             {
//                 // Throwing Errors Manually
//                 if(!response.ok)  throw new Error(`${msgError} (${response.status})`); 
                
//                 return response.json();
//             });
// }

// const getCountryData = (country) =>
// {
//     // Country 1
//     getJSON(`https://restcountries.eu/rest/v2/name/${country}`,'Country not found  ')
//     .then(data => 
//     {
//         renderCountry(data[0]);

//         // Country 2
//         // const neighbour = "askljkldjfkljsldjfsg";
//         const neighbour = data[0].borders[0];
//         // console.log(neighbour);
//         if(!neighbour) throw new Error('No neighbour found!');
//         return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, "Country neighbour not found");
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch((error) => // catch also returns a promise
//     {
//         console.log(error);
//         renderError(`Something went wrong: ${error.message}. Try again later`);
//     })
//     .finally(() => // is called whenever the promise is called .. no matter if the promise if fulfilled or rejected
//     {
//         // console.log("hello from the other side");
//         countriesContainer.style.opacity = "1";
//     });
// };
// getCountryData("germany");






/////////////////////////////////////// 12 ///////////////////////////////////////
///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. 
    For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) 
    (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. 
    Reverse geocoding means to convert coordinates to a meaningful location, 
    like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. 
    Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you 
    recieved about the provided location. Then, using this data, log a messsage like this to the console: 
    'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, 
    you will get this error with code 403. This is an error with the request.   
    Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself,  
    with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. 
    So take the relevant attribute from the geocoding API result, 
    and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture 
    (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = (lat, lng) =>
// {
//     fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response =>
//     { 
//         if(!response.ok) throw new Error(`problem with geocoding (${response.status})`)   
//         return response.json();
//     })
//     .then(data => 
//     {
//         console.log(data);
//         console.log(`You are in ${data.city}, ${data.country}`);   

//         return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res =>
//     {
//         if(!res.ok) throw new Error(`Country not found  (${response.status})`)   
//         return res.json();  
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(error =>
//     {
//         console.log(error.message);  
//     })
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);






/////////////////////////////////////// 14 ///////////////////////////////////////
// any top level code (code outside of any callback) will run first ... from synchronous ... console.log()
// after this, micro-task queue will be executed before callback functions
// console.log('Test start'); // 1) top level
// setTimeout(() => console.log('0 sec timer'), 0); // 5) callback
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3) micro-task queue 

// Promise.resolve('Resolved promise 2').then(res => { // 4) micro-task queue
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });

// console.log('Test end'); // 2) top level
// // and of course ... this is when they are all executed at the same time ... meaning no delay
// // in result, you can't do high percision tasks using setTimeout()






/////////////////////////////////////// 15 ///////////////////////////////////////
// Building promise
// takes one parameter (executor function with 2 inputs)
// const lotteryPromise = new Promise((resolve, reject) =>
// {
//     if(Math.random() > .5)
//     {
//         resolve("You won"); // is called when the promise takes place (not failed) 
//     }// that string will be passed when you consume it using "then" in the parameter
//     else
//     {
//         reject(new Error("You lost the compitition")); // is called when the promise fails
//     }
// })
// lotteryPromise.then(data => console.log(data)).catch(error => console.error(error));


// // Promisifying setTimeout
// const wait =(seconds) =>
// {
//     return new Promise(resolve =>
//     {
//         setTimeout(resolve, seconds * 1000); // call the resolve function after seconds  
//     })
// };
// wait(1).then(() => 
// {
//     console.log("I waited 1 seconds");
//     return wait(2);
// }).then(() => 
// {
//     console.log('I waited 2 second');
//     return wait(3);
// }).then(() =>
// {
//     console.log('I waited 3 second');
//     return wait(4);
// }).then(() =>
// {
//     console.log('I waited 4 second'); 
// });

// // we can use create and use promise علي طول كده
// Promise.resolve("hello").then(x => console.log(x));
// Promise.reject(new Error("Why!!!!")).catch(error => console.error(error));






/////////////////////////////////////// 16 ///////////////////////////////////////
// Promisifying the Geolocation API (read this)
// const getPosition = () =>
// {
//     return new Promise((resolve, reject) =>
//     {
//         // remember that it takes 2 functions ... the first is called in case f seccess and the second is called in case of failure
//         navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err));
//         // a more simpler way
//         // navigator.geolocation.getCurrentPosition(resolve, reject); // as a callback function
//     })
// }
// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//     getPosition()
//       .then(pos => {
//         const { latitude: lat, longitude: lng } = pos.coords;
  
//         return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//       })
//       .then(res => {
//         if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         console.log(data);
//         console.log(`You are in ${data.city}, ${data.country}`);
  
//         return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//       })
//       .then(res => {
//         if (!res.ok) throw new Error(`Country not found (${res.status})`);
  
//         return res.json();
//       })
//       .then(data => renderCountry(data[0]))
//       .catch(err => console.error(`${err.message} 💥`));
//   };
  
//   btn.addEventListener('click', whereAmI);






/////////////////////////////////////// 17 ///////////////////////////////////////
/////////////////////////////////////// (ignore this or just watch the video)
// Coding Challenge #2






/////////////////////////////////////// 18, 19 ///////////////////////////////////////
// async-await
// try-catch

// // const whereAmI = async() =>
// // {
// //     const res = await fetch(``);
// //     const data = await res.json();
// //     console.log(data);
// // }
// const getPosition =  () =>
// {
//     return new Promise((resolve, reject) =>
//     {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };

// const whereAmI = async () =>
// {
//     try
//     {
//         // i commented that dirty code because he uses a dirty api ..... 
//         // // Geo location
//         // const pos = await getPosition();
//         // const {latitude: lat, longitude: lng} = pos.coords;
//         // // console.log(lat, lng);
        
//         // // Reverse geocoding
//         // const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//         // const dataGeo = await resGeo.json();
//         // console.log(dataGeo);

//         // Country data
//         const res = await fetch(`https://restcountries.eu/rest/v2/name/portugal`); // name/${dataGeo.country}
//         if(!res.ok) throw new Error("Problem getting country");
//         const data = await res.json();
//         // console.log(data);
//         renderCountry(data[0]);
//     }
//     catch(error)
//     {
//         console.log(error.message);
//         renderError(error.message);
//     }
// };
// whereAmI();






/////////////////////////////////////// 20 ///////////////////////////////////////
// return value from async function
// const wherAmI = async ()=>
// {
//     try
//     {
//         const res = await fetch(`https://restcountries.eu/rest/v2/name/portsugal`);
//         if(!res.ok) throw new Error("Problem getting country");
//         const data = await res.json();
//         console.log(data);
//         renderCountry(data[0]);

//         return `Name: ${data[0].name}, Population: ${data[0].population}`;
//     }
//     catch(error)
//     {
//         console.log(error.message);

//         // reject promise returned from async func ... to handle the error when you call the function in catch
//         throw error;
//     }
// }
// wherAmI().then(data => console.log(data)).catch(err => console.log(`2: ${err.message}`));

// // another way to take the return from async is using IIFE
// ( async ()=>
// {
//     try
//     {
//         const data = await wherAmI();
//         console.log(data);
//     }
//     catch(err)
//     {
//         console.log(`2: ${err.message}`)
//     }
// })();






/////////////////////////////////////// 21 ///////////////////////////////////////
// Promise.all(): Running promises in parallel

// const getJSON = (url, msgError = "Something went wrong") =>
// {
//     return fetch(url)
//             .then(response =>
//             {
//                 // Throwing Errors Manually
//                 if(!response.ok)  throw new Error(`${msgError} (${response.status})`); 
                
//                 return response.json();
//             });
// }

// const get3Countries = async (c1, c2, c3) =>
// {
//     try
//     {    
//         const data1 = await getJSON(`https://restcountries.eu/rest/v2/name/${c1}`);
//         const data2 = await getJSON(`https://restcountries.eu/rest/v2/name/${c2}`);
//         const data3 = await getJSON(`https://restcountries.eu/rest/v2/name/${c3}`);
//         console.log(data1[0].capital, data2[0].capital, data3[0].capital);
//         // they will be called one after another
//         // so if we wanted them to be called at the same time, use Promise.all([])
    
//         const dataAll = await Promise.all(
//             [
//                 getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
//                 getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
//                 getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)
//             ]
//         ); // note that if a single request failed, the whole "Promise.all" will fail
//         console.log(dataAll);
//         // console.log(dataAll.map(el => el[0].capital));
//     }
//     catch(error){console.log(error.message)}
// }

// get3Countries("portugal", "usa", "germany");






/////////////////////////////////////// 22 ///////////////////////////////////////
// race, allSettled

// const getJSON = (url, msgError = "Something went wrong") =>
// {
//     return fetch(url)
//             .then(response =>
//             {
//                 // Throwing Errors Manually
//                 if(!response.ok)  throw new Error(`${msgError} (${response.status})`); 
                
//                 return response.json();
//             });
// }

// // Promise.race(): receives an array of promises and returns a promise
// // just like the principle of "winner takes all" ... the promises race, and the one who finished first .. the promise will return it
// // or the promise that gets rejected will win the race(i mean if you wrote the country for example in a wrong way .. ittalyy)
// (async()=>
// {
//     const data = await Promise.race(
//         [
//             getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
//             getJSON(`https://restcountries.eu/rest/v2/name/usa`),
//             getJSON(`https://restcountries.eu/rest/v2/name/germany`),
//         ]
//     )
//     console.log(data[0]);
// })()


// // example: reject the AJAX call if it takes more than 1 second
// const timeout = (sec)=>
// {
//     return new Promise((_, reject)=>
//     {
//         setTimeout(()=>
//         {
//             reject(new Error ("Request took too long"));
//         }, sec * 1000);
//     })
// };

// Promise.race(
//     [
//         getJSON(`https://restcountries.eu/rest/v2/name/usa`),
//         timeout(1) // try to pass .001 
//     ]
// ).then(data => console.log(data[0])).catch(error => console.log(error));


// // Promise.allSettled(): takes array of promises and returns an array of all the settled promises .. no matter if a promise is rejected or not
// (async()=>
// {
//     const data = await Promise.allSettled(
//         [
//             getJSON(`https://restcountries.eu/rest/v2/name/eggggggypt`),
//             getJSON(`https://restcountries.eu/rest/v2/name/usa`),
//             getJSON(`https://restcountries.eu/rest/v2/name/germany`),
//         ]
//     )
//     console.log(data);
// })()






/////////////////////////////////////// 23 ///////////////////////////////////////
///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, 
  this time using async/await (only the part where the promise is consumed). 
  Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function 
  (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
const imgContainer = document.querySelector('.images');

const wait = async (seconds)=>
{
    return new Promise((resolve)=>
    {
        setTimeout(() => resolve(), seconds*1000)
    })
}

const createImage = (imgPath) =>
{
    return new Promise((resolve, reject) =>
    {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function () {
        imgContainer.append(img);
        resolve(img);
        });

        img.addEventListener('error', function () {
        reject(new Error('Image not found'));
        });
    });
};

let currentImg;

// Part 1
const loadNPause = async ()=>
{
    try
    {
        // Load image 1
        let img = await createImage('img/img-1.jpg');
        console.log('Image 1 loaded');
        await wait(2);
        img.style.display = 'none';

        // Load image 2
        img = await createImage('img/img-2.jpg');
        console.log('Image 2 loaded');
        await wait(2);
        img.style.display = 'none';
    }
    catch(error)
    {
        console.log(error.message);
    }
}

// Part 2
// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
// 2. Use .map to loop over the array, to load all the images with the 'createImage' function 
//   (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'paralell' class to all the images (it has some CSS styles).

// TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.
const loadAll = async (imgArr) =>
{
    try
    {
        const imgs = imgArr.map (async el => await createImage(el));
        const imgsEl = await Promise.all(imgs);
        console.log(imgsEl);
        imgsEl.forEach(img => img.classList.add('parallel'));
    }
    catch(error) {console.log(error)}
}
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
