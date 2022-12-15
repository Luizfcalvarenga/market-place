const screenWidth = screen.width
const sidePanel = document.getElementById("side_panel")
const chatContainer = document.getElementById("charoom_container")
const userSelected = document.getElementById("user_list_item")
const backBtn = document.getElementById("back-to-users")


console.log(screen.width)
if (userSelected) {

  if (screen.width < 768 && userSelected.classList.contains("active")) {
    sidePanel.classList.add("d-none")
    document.getElementById("footer")
    console.log("cade?")
  }
}

if (backBtn) backBtn.addEventListener("click", removeDisplayNone);

function removeDisplayNone() {
  window.location = "http://localhost:3000/chats"
  sidePanel.classList.remove("d-none")

}
