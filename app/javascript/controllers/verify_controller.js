import { Controller } from "@hotwired/stimulus"
import Rails from "@rails/ujs"

// Connects to data-controller="verify"
export default class extends Controller {
  static targets = [ "form", "verified" ]

  connect() {
    console.log(this.verifiedTarget)

    console.log(this.formTarget)
  }
  submit(e) {
    e.preventDefault();
    Rails.fire(this.formTarget, 'submit')

    this.formTarget.submit();
  }
}
