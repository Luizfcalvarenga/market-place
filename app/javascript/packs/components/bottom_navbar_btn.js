document.addEventListener("turbo:load", () => {
  const screenWidth = screen.width
  const plusBtn = document.getElementById("plus-btn-bottom-navbar")
  const bottomMenu = document.getElementById("bottom-navbar-menu")
  if (plusBtn) plusBtn.addEventListener("click", toggleMenu);

  function toggleMenu() {
    bottomMenu.classList.toggle("d-none")
    plusBtn.classList.toggle("plus-btn-selected")
  }
})
