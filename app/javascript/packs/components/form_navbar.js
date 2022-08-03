
function toggleFormAndLinks() {

  const form = document.getElementById('navbar-form');
  form.classList.toggle('d-none')
  const searchIcon = document.getElementById('search-icon');
  searchForm.classList.toggle('d-none')
  const closeIcon = document.getElementById('close-icon');
  closeIcon.classList.toggle('d-none')

}


// function toggleLinks() {

//   const form = document.getElementById('navbar-form');
//   if (form.style.display === "none") {
//     form.style.display = "block";
//   } else {
//     form.style.display = "none";
//   }
//   const navLinks = document.getElementById('navbar-links');
//   if (navLinks.style.display === "none") {
//     navLinks.style.display = "block";
//   } else {
//     navLinks.style.display = "none";
//   }
//   const closeBTN = document.getElementById('close-btn');
//   if (closeBTN.style.display === "none") {
//     closeBTN.style.display = "block";
//   } else {
//     closeBTN.style.display = "none";
//   }
//   const searchBTN = document.getElementById('search-btn');
//   if (searchBTN.style.display === "none") {
//     searchBTN.style.display = "block";
//   } else {
//     searchBTN.style.display = "none";
//   }
// }





const searchBTN = document.getElementById('search-btn');

if (searchBTN) searchBTN.addEventListener('click', toggleFormAndLinks);

const closeBTN = document.getElementById('close-btn');

if (closeBTN) closeBTN.addEventListener('click', toggleFormAndLinks);
