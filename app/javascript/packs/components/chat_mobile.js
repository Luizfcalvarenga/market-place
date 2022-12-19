const screenWidth = screen.width
const sidePanel = document.getElementById("side_panel")
const chatContainer = document.getElementById("charoom_container")
const userSelected = document.getElementById("list_item")
const backBtn = document.getElementById("back-to-users")
const userBtn = document.querySelectorAll(".chat_pfp")


console.log(userBtn)
// if ( userSelected.classList.contains("active") && screen.width < 768) showConversation();

// function showConversation() {
//   console.log("cade?")
//   sidePanel.classList.add("d-none")
//   document.getElementById("footer").classList.add("d-none")

// }
if (screen.width < 768 && userSelected?.classList.contains("active")) {

  console.log("cade?")
  sidePanel.classList.add("d-none")
  document.getElementById("footer").classList.add("d-none")
}


if (backBtn) backBtn.addEventListener("click", removeDisplayNone);

function removeDisplayNone() {
  window.location = "http://localhost:3000/chats"
  sidePanel.classList.remove("d-none")

}
