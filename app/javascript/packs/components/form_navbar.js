
function toggleFormAndLinks() {

  const form = document.getElementById('navbar-form');
  const navLinks = document.getElementById('navbar-links');
  const closeBTN = document.getElementById('close-btn');
  const searchBTN = document.getElementById('search-btn');
  closeBTN.style.display = 'visible';
  form.style.display = 'visible';
  navLinks.style.display = 'none';
  searchBTN.style.display = 'none';
}



const searchBTN = document.getElementById('search-btn');

if (searchBTN) searchBTN.addEventListener('click', toggleFormAndLinks);

const closeBTN = document.getElementById('close-btn');

if (closeBTN) closeBTN.addEventListener('click', toggleFormAndLinks);
