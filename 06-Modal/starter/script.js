'use strict';

let modal =document.querySelector(".modal");
let overlay = document.querySelector(".overlay");

let btnCloseModal = document.querySelector(".close-modal");
let btnOpenModal = document.querySelectorAll(".show-modal");

// opening the modal and overlay
Array.from(btnOpenModal).forEach(e =>
{
    e.addEventListener("click", () =>
    {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    });
});

// closing the modal and overlay

// close 
let close = () =>
{
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

// close button
btnCloseModal.addEventListener("click",close);

// esc button
document.addEventListener("keydown", (e) =>
{
    if(e.key ==="Escape" && !modal.classList.contains("hidden") && !overlay.classList.contains("hidden"))
    {
        close();
    }
});

// "overlay" space click
overlay.addEventListener("click", close);