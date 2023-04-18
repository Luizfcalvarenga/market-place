document.addEventListener("turbo:load", () => {

  const chatImages = document.querySelectorAll(".message-img")

  chatImages.forEach(function(image) {
    image.addEventListener('click', function() {
      if (image.closest('#message').classList.contains('me')) {
        image.classList.toggle('enlarged-img-chat-me');
      } else if (image.closest('#message').classList.contains('other')) {
        image.classList.toggle('enlarged-img-chat-other');
      }
    });
  });
})
