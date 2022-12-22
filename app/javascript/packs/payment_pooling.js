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
    if (response.data.status === "paid") {
      document.querySelector(".payment-confirmed").classList.remove("d-none");
      document.querySelector(".payment-container").classList.add("d-none");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      stopPolling = true;
    }
  };

  poolFunction();

  setInterval(poolFunction, 4000);
});
