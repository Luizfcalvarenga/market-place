document.addEventListener("turbo:load", () => {
  console.log("aqui")

  function hideLinksShowForm() {
    const navLinks = document.getElementById('navbar-links-mobile');
    const closeBTN = document.getElementById('close-btn-mobile');
    const searchBTN = document.getElementById('search-btn-mobile');
    const form = document.getElementById('navbar-form-mobile');
    console.log(searchBTN)

    navLinks.classList.toggle('d-none');
    closeBTN.classList.toggle('d-none');
    searchBTN.classList.toggle('d-none');
    form.classList.toggle('d-none') ;
  }

  const searchBTN = document.getElementById('search-btn-mobile');
  if (searchBTN) searchBTN.addEventListener('click', hideLinksShowForm);

  const closeBTN = document.getElementById('close-btn-mobile');
  if (closeBTN) closeBTN.addEventListener('click', hideLinksShowForm)

})
