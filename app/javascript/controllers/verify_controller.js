import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="verify"
export default class extends Controller {
  static targets = [ "form", "input" ]

  connect() {
  }

  submit(e) {
    e.preventDefault();

    this.formTarget.submit();
  }
}
