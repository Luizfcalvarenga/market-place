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
