// 'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab"); // buttons
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// you can ignore the (Array.from) and use forEach immediately
Array.from(btnsOpenModal).forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener("click", () =>
{
  section1.scrollIntoView({behavior: 'smooth'});
});

///////////////////////////////////////
// Page navigation : header nav smooth scroll

// document.querySelectorAll(".nav__link").forEach(el =>
// {
//   el.addEventListener("click", (e) =>
//   {
//     e.preventDefault();
//     let id = el.getAttribute("href");
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   });
// }); // it is a bad practise with too many things (links)(ex: 1000 links cause we will make a 1000 copy of that event function for each link)

document.querySelector(".nav__links").addEventListener("click", (e) =>
{
  e.preventDefault();
  if(e.target.classList.contains("nav__link")) 
  {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

///////////////////////////////////////
// Tabbed component: video 13

tabsContainer.addEventListener("click", (e)=>
{
  const clicked = e.target.closest(".operations__tab"); // we used closest .. because we may click on the span inside the button
  // console.log(clicked);
  if(!clicked) return;

  // remove active classes from tabs and contents
  tabs.forEach(el => el.classList.remove("operations__tab--active"));
  tabsContent.forEach(el => el.classList.remove("operations__content--active"));

  // Activate tab
  clicked.classList.add("operations__tab--active");
  // console.log(clicked.dataset.tab);
  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});

///////////////////////////////////////
// Menu fade animation (hover ove logo or links next to it): video 14

const handleHover = (e, opacity) =>
// const handleHover = function(e)
{
  if(e.target.classList.contains("nav__link"))
  {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(el => 
    {
      if(el !== link) el.style.opacity = opacity; // if you don't use the arrow function ... the param in bind will refer to opacity (this)
    });
    logo.style.opacity = opacity;
  }
}
nav.addEventListener("mouseover", e => handleHover(e, .5)); // bad practise
nav.addEventListener("mouseout", e => handleHover(e, 1));
// nav.addEventListener("mouseover", handleHover.bind(0.5));
// nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation: video 16

// old way
// const section1Coordinates = section1.getBoundingClientRect();
// window.addEventListener("scroll", () =>
// {
//   if(window.scrollY > section1Coordinates.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// }); // old way

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const navSticky = (entries) =>
{
  const [entry] = entries; // const entry = entries[0] // deconstructuring ... we have only one thresold
  if(!entry.isIntersecting) nav.classList.add("sticky"); // if you are out of the header
  else nav.classList.remove("sticky"); // if you are inside the header
}

const headerObserver = new IntersectionObserver(navSticky, 
  { // options
    root: null,
    threshold: 0, // when you enter the header or get out of it ... in percentage  .... if you wrote .2 .... it will appear before the header appears or gets hidden by 20% of its height
    rootMargin: `-${navHeight}px` // to appear before the header ends 
  });
headerObserver.observe(header);

///////////////////////////////////////
// Revealing elements on scroll: video 17

const allSections = document.querySelectorAll(".section");

const revealSection = (entries, observer) =>
{
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};


const sectionObserver = new IntersectionObserver(revealSection, 
{
  root: null,
  threshold: .15 // .15 ..... when 15% of the section is visible
});

allSections.forEach(section =>
{
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

///////////////////////////////////////
// Lazy loading image: video 18

const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = (entries, observer) =>
{
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  // repalce src with data-src // at line 73 in the HTML, we set data attribute to the img
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => // remove the "lazy-img" only when the image(src) loads 
  {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, 
{
  root: null,
  threshold: 0,
  rootMargin: '200px'
});
imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider video: 19, 20
const sliderWork = () =>
{
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  let maxSlides = slides.length;

  // Functions
  const createDots = () =>
  {
    slides.forEach((_, i) =>
    {
      dotContainer.insertAdjacentHTML("beforeend", 
      `
        <button class="dots__dot" data-slide=${i}></button>
      `);
    });
  };

  const goToSlide = (slide) =>
  {
    slides.forEach((sl, i) =>
    {
      sl.style.transform = `translateX(${100 * ( i - slide )}%)`;
    });
  };

  const activateDot = (slide) =>
  {
    document.querySelectorAll(".dots__dot").forEach(el => el.classList.remove("dots__dot--active"));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
  }

  // Next slide
  const nextSlide = () =>
  {
    if(curSlide === maxSlides - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Prev slide
  const prevSlide = () =>
  {
    if(curSlide === 0) curSlide = maxSlides - 1;
    else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init =() =>
  {
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();
  // Event handlers
  btnRight.addEventListener("click",nextSlide);
  btnLeft.addEventListener("click",prevSlide);

  // Keyboard right and left arrow
  document.addEventListener("keydown", (e)=>
  {
    if(e.key === "ArrowLeft") prevSlide();
    else if (e.key === "ArrowRight") nextSlide();
  });

  // dots press
  dotContainer.addEventListener("click", (e)=>
  {
    if(e.target.classList.contains("dots__dot"))
    {
      const slideNumber = e.target.dataset.slide;
      goToSlide(slideNumber);
      activateDot(slideNumber);
    }
  })
};
sliderWork();


































///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Lectures



//////////////////////////////////////// 5 ////////////////////////////////////////
// Selecting, Creating and deleting elements
// console.log(document.documentElement); // the whole html page


// // Selecting
// const header = document.querySelector(".header");
// const allSections = document.querySelectorAll('.section');
// // these were the most common ways
// document.getElementById("section--1");
// const allButtons = document.getElementsByTagName("button"); // returns HTMLCollection ... another type .. remember nodeList !
// const allButtons2 = document.getElementsByClassName("btn"); // returns HTMLCollection
// console.log(allButtons);
// console.log(allButtons2);


// // Creating and Inserting elements
// // remember ..... btnShow.insertAdjacentHTML("afterbegin", html); ...... the most popular way we will use

// const message = document.createElement("div");
// message.classList.add("cookie-message");
// // message.textContent = "Hello from the other side";
// message.innerHTML = `Hello from the other side  <button class = "btn btn--close-cookies">Click to learn more</button>`
// header.prepend(message); // put the message as the first child of the header
// // header.append(message); // put the message as the last child of the header
// // but this will make a single copy of the message div ... it will put the message div as the first child of the header,
// // then it will put it (move) as the last child
// // what if we wanted to make 2 elements of the message div ? 
// // header.append(message.cloneNode(true));
// // header.before(message); .. not working for the same reason as before
// // header.before(message.cloneNode(true)); // put the message before the header
// // header.after(message.cloneNode(true)); // put the message after the header


// // Delete elements
// document.querySelector(".btn--close-cookies").addEventListener("click", () =>
// {
//   message.remove();
//   // document.querySelector(".btn--close-cookies").remove();
//   // before the remove method existed....if we wanted to delete element, we first choose its parent then remove its child
//   // message.parentElement.removeChild(message);
// });






//////////////////////////////////////// 6 ////////////////////////////////////////
// Styles, Atributes and Classes

// code from the last lecture
// const header = document.querySelector(".header");
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.innerHTML = `Hello from the other side  <button class = "btn btn--close-cookies">Click to learn more</button>`
// header.append(message);


// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '105%';
// // if you wanted to read a style property
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// // message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; // not working

// // custom properties such as variables in the root .. accessing them
// document.documentElement.style.setProperty("--color-primary", "orangered");


// // Attributes
// const logo = document.querySelector(".nav__logo");
// // getAttribute
// console.log(logo.alt, logo.getAttribute("alt")); // the same
// console.log(logo.className);
// console.log(logo.src, logo.getAttribute("src")); // the getAttribute here will get the relative img position in the project(returns what's written in the HTML)
// // setAttribute
// logo.alt = 'hello from the other world';
// logo.setAttribute("id", 'logossssssssss'); 
// logo.id = 'hello, it is me, new id hahaha'; // the same
// console.log(logo.id)

// const link = document.querySelector(".twitter-link");
// console.log(link.href);

// // Data attribute
// // look at HTML line: 25 .... in the HTML, the data attribute has to start with "data-" ... them when we call it here is js
// // we use camelCase
// console.log(logo.dataset.versionNumber);


// // Classes
// logo.classList.add("c", 'j'); // add multiple classes
// logo.classList.remove("c", 'j'); // remove multiple classes
// logo.classList.toggle("c");
// logo.classList.contains("c"); // contains not includes
// // Don't use this, because it will override all the classes
// logo.className = 'abdallah';
// console.log(logo.className);






//////////////////////////////////////// 7 ////////////////////////////////////////
// Smooth scrolling

// const btnScrollTo = document.querySelector(".btn--scroll-to");
// const section1 = document.querySelector("#section--1");
// btnScrollTo.addEventListener("click", () =>
// {
//   // const section1Coords = section1.getBoundingClientRect();
//   // window.scrollTo(
//   //   {
//   //     left: section1Coords.left + window.pageXOffset,
//   //     top: section1Coords.top + window.pageYOffset,
//   //     behavior: 'smooth'
//   //   }
//   // );

//   // an easy way which is used in modern browsers
//   section1.scrollIntoView({behavior: 'smooth'});
// });






//////////////////////////////////////// 8 ///////////////////////////////////////
// Events

// const h1 = document.querySelector("h1");
// // h1.addEventListener("mouseenter", () => //  (for mouse)mouseenter:click or hover, click......(for keyboard) keydown, keyup, keypress
// // {
// //   alert("the h1 element is clickedor hovered");
// // });

// // if you wanted to listen to event only once.......we can  remove event listener .. 
// const fn = () =>
// {
//   alert("the h1 element is clickedor hovered");

//   h1.removeEventListener("mouseenter", fn);
// };
// h1.addEventListener("mouseenter", fn);
// setTimeout(()=>
// {
//   h1.removeEventListener("mouseenter", fn); // the event listener will be gone if you hover over h1 or waited 5 seconds
// }, 2000)






//////////////////////////////////////// 11 ///////////////////////////////////////
// Event Delegation .... it is in the website not the lectures....search for page navigation






//////////////////////////////////////// 12 ///////////////////////////////////////
// Dom traversing

// const h1 = document.querySelector("h1");

// // Going downwards: child
// console.log(h1.querySelectorAll(".highlight"));
// // if there are more 'highlight' elements in the page, they will not be selected cause they are not children of h1
// console.log(h1.children); // returns only direct children
// h1.firstElementChild.style.color = "yellow";
// h1.lastElementChild.style.color="orangered"

// // Going upwards: parents
// console.log(h1.parentElement);

// h1.closest(".header").style.background = "var(--color-secondary)";

// // Goind sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// // if we wanted to select all siblings .... select the parent ... then select all children
// console.log(h1.parentElement.children);

// // example
// [...h1.parentElement.children].forEach(el =>
// {
//  if(el !== h1) el.style.transform = "scale(.5)";
// });






//////////////////////////////////////// 21 ///////////////////////////////////////
// Lifecycle DOM events (ignore this lecture)

// document.addEventListener("DOMContentLoaded", ()=>
// {
//   console.log("asdasdasd");
// });// doesn't wait for images and other resources to load ... just HTML and JS .. when they are loaded

// document.addEventListener("load", ()=>
// {
//   console.log("asdasdasd");
// });// when HTML is parsed and images are loaded 

// document.addEventListener("beforeunload", (e)=>
// {
//   e.preventDefault();
//   alert("wait");
//   e.returnValue = "";
// });// is created before the user is about to leave the page (when you close the tab)






//////////////////////////////////////// 22 ///////////////////////////////////////
// ( i ignored this lecture )