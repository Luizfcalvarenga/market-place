document.addEventListener("turbo:load", () => {
  const chatImages = document.querySelectorAll(".message-img")
  const body = document.body
  const screenWidth = screen.width

  for (var i = 0; i < chatImages.length; i++) {
    chatImages[i].addEventListener('click', function() {
      // Código para exibir a imagem em tamanho maior
      if (screenWidth < 768) {
        this.classList.toggle('enlarged-img-chat-mobile')
        body.classList.toggle('no-scroll')
      } else {
        this.classList.toggle('enlarged-img-chat')
        body.classList.toggle('no-scroll')

      }
    });
  }
})
