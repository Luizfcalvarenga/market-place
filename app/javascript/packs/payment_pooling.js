document.addEventListener("turbo:load", () => {
  const paymentContainer = document.querySelector(".payment-container");



  if (!paymentContainer) return;

  const advertisementId = paymentContainer.dataset.advertisementId;
  let stopPolling = false;
  if (!advertisementId) return;

  const poolFunction = async () => {
    if (stopPolling) return;
    const url = `/advertisements/${advertisementId}/status.json`;

    const response = await axios.get(url);
    console.log(response)

    if (response.data.status === "paid") {
      document.querySelector(".payment-confirmed").classList.remove("hide");
      document.querySelector(".payment-container").classList.add("hide");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      document.querySelector(".after-payment-button-link").href = response.data.button_url
      stopPolling = true;
    }
  };

  poolFunction();

  setInterval(poolFunction, 4000);
});
