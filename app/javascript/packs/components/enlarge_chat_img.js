document.addEventListener("turbo:load", () => {

  const chatImages = document.querySelectorAll(".message-img")
  const messageContents = document.querySelectorAll("#message")

  chatImages.forEach(function(image) {
    image.addEventListener('click', function() {
      // Verifica se a imagem pertence à sua própria mensagem ou à mensagem do outro participante
      if (image.closest('#message').classList.contains('me')) {
        // Se a imagem pertence à sua própria mensagem, aplica o toggle de classes "my-class-1" e "my-class-2"
        image.classList.toggle('enlarged-img-chat-me');
      } else if (image.closest('#message').classList.contains('other')) {
        // Se a imagem pertence à mensagem do outro participante, aplica o toggle de classes "other-class-1" e "other-class-2"
        image.classList.toggle('enlarged-img-chat-other');
      }
    });
  });

  // for (var i = 0; i < chatImages.length; i++) {

  //   if (messageContents[i].classList.contains("other")) {
  //     console.log("Você clicou na outra imagem!");
  //     for (var i = 0; i < chatImages.length; i++) {
  //       chatImages[i].addEventListener("click", function() {
  //         this.classList.toggle("enlarged-img-chat-other")
  //       });
  //     }
  //   } else  {
  //     console.log("Você clicou na sua imagem!");
  //     for (var i = 0; i < chatImages.length; i++) {
  //       chatImages[i].addEventListener("click", function() {
  //         this.classList.toggle("enlarged-img-chat-me")
  //       });
  //     }

  //   }
  // }


})
