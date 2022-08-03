function hideLinks() {

  const navLinks = document.getElementById('navbar-links');
  const closeBTN = document.getElementById('close-btn');
  const searchBTN = document.getElementById('search-btn');
  const form = document.getElementById('navbar-form');

  navLinks.classList.toggle('d-none');
  closeBTN.classList.toggle('d-none');
  searchBTN.classList.toggle('d-none');
  form.classList.toggle('d-none');
}

// function hideForm() {

//   const navLinks = document.getElementById('navbar-links');
//   const closeBTN = document.getElementById('close-btn');
//   const searchBTN = document.getElementById('search-btn');
//   const form = document.getElementById('navbar-form');

//   let width = parseInt(form.style.width);
//   width -= 10; // reduce width 10 pixels at a time

//   if (width < 0) width = 0;

//   form.style.width = width + 'px';

//   if (width > 0) {
//       // keep doing this until width is zero:
//       setTimeout(collapseForm,100);
//   }
//   navLinks.classList.toggle('d-none');
//   closeBTN.classList.toggle('d-none');
//   searchBTN.classList.toggle('d-none');
//   form.classList.toggle('d-none');
// }


const searchBTN = document.getElementById('search-btn');

if (searchBTN) searchBTN.addEventListener('click', hideLinks);

const closeBTN = document.getElementById('close-btn');

if (closeBTN) closeBTN.addEventListener('click', hideLinks);
