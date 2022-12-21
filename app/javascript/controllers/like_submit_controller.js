import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="like-submit"
export default class extends Controller {
  static targets = [ "likebleId", "likebleType" ]

  connect() {
    // console.log(this.likebleIdTarget.innerText);
    // console.log(this.likebleTypeTarget.innerText);
  }

  likeSubmit(event) {
    event.preventDefault()
    console.log(event)
    dataObject.append( "like[likeble_id]", this.likebleIdTarget.value );
    dataObject.append( "like[likeble_type]", "Bike" );

    console.log(e.nativeEvent.path[1].id)
    axios.post('/likes',dataObject)

    .then(function (response) {
      console.log(response);
      if (response.data.success) {
        swal(" OHH YEAHH!", "Produto adicionada aos favoritos!!!", "success");
      } else {
        if (response.data.errors.user) {
          swal("OPS", "Não pode curtir seu produto", "error");
        } else if (response.data.errors.like) {
          swal("OPS", "Você já curtiu esse produto", "error");
        }
      }
    })



  }
}
