document.addEventListener("turbo:load", () => {
  const screenWidth = screen.width
  const sidePanel = document.getElementById("side_panel")
  const chatContainer = document.getElementById("charoom_container")
  const userSelected = document.querySelectorAll("#list_item")
  const backBtn = document.getElementById("back-to-users")

  if (screenWidth < 768 && userSelected) {
    userSelected.forEach((item) => {
      if (item.classList.contains("active")) {
        sidePanel.classList.add("d-none")
        document.getElementById("footer").classList.add("d-none")
        document.getElementById("bottom-navbar").classList.add("d-none")
      }
    })
  }

  if (backBtn) backBtn.addEventListener("click", removeDisplayNone);
  function removeDisplayNone() {
    window.location = "https://market.nuflow.com.br/chats"
    sidePanel.classList.remove("d-none")
  }
})
