import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  initialize() {
    this.resetScroll(messages);
  }
  connect() {
    // console.log("Connected scroll");
    const messages = document.getElementById("messages");
    messages.addEventListener("DOMNodeInserted", this.resetScroll);
    this.resetScroll(messages);
  }
  /** On stop */
  disconnect() {
    // console.log("Disconnected");
  }
  /** Custom function */
  resetScroll() {
    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
  }

}
