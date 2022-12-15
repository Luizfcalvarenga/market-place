import React, { useEffect, useState } from "react";
import EquipamentImage from "../../../assets/images/helmet.png";
import AccessorieImage from "../../../assets/images/accessories.png";
import ComponentImage from "../../../assets/images/frame.png";
import CasualImage from "../../../assets/images/cap.png";
import ClotheImage from "../../../assets/images/tshirt.png";
import MaintenanceImage from "../../../assets/images/tools.png";

export function Product(props) {
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState()
  let productId = window.location.pathname.split("/").pop();

  useEffect(async () => {
    let url = `/api/v1/products/${productId}`;
    const response = await axios.get(url);
    setProduct(response.data);
  }, [])

  const handleLike = (e) => {
    e.preventDefault()
    const dataObject = new FormData();
    dataObject.append( "like[likeble_id]", e.nativeEvent.path[1].id );
    dataObject.append( "like[likeble_type]", "Product" );

    console.log(e.nativeEvent.path[1].id)
    axios.post('/likes', dataObject)

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

  return (

    <div className="product-show index-container" product={product} key={product}>
      {product && (
        <div className="row row-cols-1">
          <div className="other-infos  col-12 col-md-8">
            <div id="carouselExampleControls" className="carousel slide product-photos" data-bs-ride="carousel">
              <div className="carousel-inner">
                {product.photos.map((photo, index) => {
                  return (

                    <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                      <img src={photo} className="d-block w-100 img-card-show" alt="" />
                    </div>
                  )
                })}
              </div>
              {product.photos.length === 0 && (
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-show" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-show" alt="" />
                  </div>
                </div>
              )}
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>


            <h3 className="text-success mb-4 mt-3">Outras Informações</h3>
            <ul className="main__menu">
            <li className="list-item w-100">
                <div className="kabobs item--js">
                  { ["car_accessories", "bike_accessories", "training_accessories", "pre_after_pedal_accessories"].includes(product.product_type.name) &&(<>
                    <img src={AccessorieImage} alt="" className="bike-part-card mt-1"/> <br />
                    </>)}
                  { ["battery", "brake", "brake_levers", "cassete","chain", "chainring", "crankset", "fender", "frame", "front_derailleur", "front_shifter", "front_suspension", "full_wheel", "grips", "handlebar", "headset", "hub", "pedals", "rim", "saddle", "seat_post", "spoke", "rear_derailleur", "rear_shifter", "rear_suspension", "stem", "tyre"].includes(product.product_type.name) &&(<>
                    <img src={ComponentImage} alt="" className="bike-part-card mt-1"/> <br />
                    </>)}
                  { ["helmet", "elbow_pad", "knee_pad", "water_bottle", "bottle_cage", "hydration_backpack", "fanny_pack", "sneaker"].includes(product.product_type.name) &&(<>
                    <img src={EquipamentImage} alt="" className="bike-part-card mt-1"/> <br />
                    </>)}
                  { ["cap", "glasses"].includes(product.product_type.name) &&(<>
                    <img src={CasualImage} alt="" className="bike-part-card mt-1"/> <br />
                    </>)}
                  { ["air_bomb", "lubricant", "sealant"].includes(product.product_type.name) &&(<>
                    <img src={MaintenanceImage} alt="" className="bike-part-card mt-1"/> <br />
                    </>)}
                  { ["bretelle", "shorts", "inner_shorts", "shirt", "vest", "windbreaker", "thermal_clothing"].includes(product.product_type.name) &&(<>
                    <img src={ClotheImage} alt="" className="bike-part-card mt-1"/> <br />
                    </>)}
                  <span className="text-success mb-3">Ver mais</span>
                </div>
                <ul className="drop-menu menu-2">
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Descrição:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{product.description}</p>
                    </div>
                  </li>
                  {product.product_attributes.map((attribute) => {
                    return (
                      <li className="drop-item">
                        <div className="text-success item list-item d-flex ms-3">
                          <p className="bike-attrs-parts"><strong>{product.product_type_attributes.find(element => element.id === attribute.product_type_attribute_id).prompt}:</strong> </p>
                          <p className="bike-info ms-2 align-middle">{attribute.value}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </div>

          <div className="col-11 col-md-4 card-product">
            <div className="d-flex justify-content-between">
              <div>
                <h3 className="card-title mt-3"> {product.brand} {product.model}</h3>
              </div>
              { ["car_accessories", "bike_accessories", "training_accessories", "pre_after_pedal_accessories"].includes(product.product_type.name) &&(
                <img src={AccessorieImage} alt="" className="icon-card-index mt-4"/>
              )}
              { ["battery", "brake", "brake_levers", "cassete","chain", "chainring", "crankset", "fender", "frame", "front_derailleur", "front_shifter", "front_suspension", "full_wheel", "grips", "handlebar", "headset", "hub", "pedals", "rim", "saddle", "seat_post", "spoke", "rear_derailleur", "rear_shifter", "rear_suspension", "stem", "tyre"].includes(product.product_type.name) &&(
                <img src={ComponentImage} alt="" className="icon-card-index mt-4"/>
              )}
              { ["helmet", "elbow_pad", "knee_pad", "water_bottle", "bottle_cage", "hydration_backpack", "fanny_pack", "sneaker"].includes(product.product_type.name) &&(
                <img src={EquipamentImage} alt="" className="icon-card-index mt-4"/>
              )}
              { ["cap", "glasses"].includes(product.product_type.name) &&(
                <img src={CasualImage} alt="" className="icon-card-index mt-4"/>
              )}
              { ["air_bomb", "lubricant", "sealant"].includes(product.product_type.name) &&(
                <img src={MaintenanceImage} alt="" className="icon-card-index mt-4"/>
              )}
              { ["bretelle", "shorts", "inner_shorts", "shirt", "vest", "windbreaker", "thermal_clothing"].includes(product.product_type.name) &&(
                <img src={ClotheImage} alt="" className="icon-card-index mt-4"/>
              )}
              <button type="button" onClick={(e) => handleLike(e)} className="like-btn" id={product.id}><i className="far fa-heart"></i></button>
            </div>
            <div className="card-content">
              <h4 className="text-success mt-1">
                {(product.price_in_cents / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h4>
              <p className=""><strong className="text-success">Categoria:</strong> {product.category.name} </p>
              <p className=""><strong className="text-success">Modalidade:</strong> {product.modality}</p>
              <p className=""><strong className="text-success">Tipo da produto:</strong> {product.product_type.prompt}</p>
              <p className=""><strong className="text-success">Ano:</strong> {product.year}</p>
              <p className=""><strong className="text-success">Local:</strong> {product.locality}</p>
            </div>
            <a href={"/user/" + product.user.id}>
              <button className="btn-chat w-100 mt-3 mb-2"><i className="fas fa-comments me-2"></i>Conversar com anunciante</button>
            </a>
          </div>
        </div>
      )
      }
    </div>
  );
}
