function hideLinksShowForm() {

  const navLinks = document.getElementById('navbar-links');
  const closeBTN = document.getElementById('close-btn');
  const searchBTN = document.getElementById('search-btn');
  const form = document.getElementById('navbar-form');

  navLinks.classList.toggle('d-none');
  closeBTN.classList.toggle('d-none');
  searchBTN.classList.toggle('d-none');
  form.classList.toggle('d-none');
}

const searchBTN = document.getElementById('search-btn');
if (searchBTN) searchBTN.addEventListener('click', hideLinksShowForm);

const closeBTN = document.getElementById('close-btn');
if (closeBTN) closeBTN.addEventListener('click', hideLinksShowForm);

let myNav = document.getElementById('navbar');
let logoNav = document.querySelector(".navbar-brand")

window.onscroll = function () {
    "use strict";
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 ) {
        myNav.classList.add("navbar-scroll");
        myNav.classList.remove("navbar");
        logoNav.classList.add("navbar-brand-scroll");
        logoNav.classList.remove("navbar-brand");
    }
    else {
        myNav.classList.add("navbar");
        myNav.classList.remove("navbar-scroll");
        logoNav.classList.add("navbar-brand");
        logoNav.classList.remove("navbar-brand-scroll");
    }
};
