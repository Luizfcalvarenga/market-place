import React, { useEffect, useState } from "react";
import HandlebarImage from "../../../assets/images/handlebar.png";
import CrankImage from "../../../assets/images/crank.png";
import BrakesImage from "../../../assets/images/brakes.png";
import SaddleImage from "../../../assets/images/saddle.png";
import SuspensionImage from "../../../assets/images/suspension.png";
import MountainBikeImage from "../../../assets/images/mountain-bike.png";
import FrameImage from "../../../assets/images/frame.png";
import AccessorieImage from "../../../assets/images/accessories.png";
import EBikeImage from "../../../assets/images/e-bike.png";

export function Bike(props) {
  const [bike, setBike] = useState()
  let bikeId = window.location.pathname.split("/").pop();

  useEffect(async () => {
    let url = `/api/v1/bikes/${bikeId}`;
    const response = await axios.get(url);
    setBike(response.data);
  }, [])

  const handleLike = (e) => {
    e.preventDefault()
    const dataObject = new FormData();
    dataObject.append( "like[likeble_id]", e.nativeEvent.path[1].id );
    dataObject.append( "like[likeble_type]", "Bike" );
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

    <div className="bike-show" bike={bike} key={bike} >
      {bike && (
        <div className="row row-cols-1">
          <div className="other-infos  col-12 col-md-8">
            <div id="carouselExampleControls" className="carousel slide product-photos" data-bs-ride="carousel">
              <div className="carousel-inner">
                {bike.photos.map((photo, index) => {
                  return (

                    <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                      <img src={photo} className="d-block w-100 img-card-show" alt="" />
                    </div>
                  )
                })}
              </div>
              {bike.photos.length === 0 && (
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

            <h3 className="text-success mb-4 mt-3">Características Técnicas</h3>
            <ul className="main__menu">
              <li className="list-item w-100 mb-4">
                <div className="kabobs item--js">
                  <img src={FrameImage} alt="" className="bike-part-card mt-1"/> <br />
                  <span className="text-success mb-3">Quadro</span>
                </div>
                <ul className="drop-menu menu-2">
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Marca:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.frame_brand}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Tamanho:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.frame_size}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Material:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.frame_material}</p>
                    </div>
                  </li>
                </ul>
              </li>

              <li className="list-item w-100 mb-4">
                <div className="kabobs item--js">
                  <img src={CrankImage} alt="" className="bike-part-card mt-1"/> <br />
                  <span className="text-success mb-3">Transmissão</span>
                </div>
                <ul className="drop-menu menu-2">
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Pedivela:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.rear_derailleur_model}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Corrente:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.rear_derailleur_model}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-orientation"><strong>DIANTEIRA</strong> </p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Nº Marchas:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.number_of_front_gears}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Marca | Modelo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.front_derailleur_model}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-orientation"><strong>TRASEIRA</strong> </p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Nº Marchas:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.number_of_rear_gears}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Marca | Modelo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.rear_derailleur_model}</p>
                    </div>
                  </li>

                </ul>
              </li>

              <li className="list-item w-100 mb-4">
                <div className="kabobs item--js">
                  <img src={SuspensionImage} alt="" className="bike-part-card mt-1"/> <br />
                  <span className="text-success mb-3">Suspensão</span>
                </div>
                <ul className="drop-menu menu-2">
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Tipo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.suspension_type}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-orientation"><strong>DIANTEIRA</strong> </p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Curso:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.front_suspension_travel}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Marca | Modelo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.front_suspension_model}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-orientation"><strong>TRASEIRA</strong> </p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Curso:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.rear_suspension_travel}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Marca | Modelo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.rear_suspension_model}</p>
                    </div>
                  </li>
                </ul>
              </li>


              <li className="list-item w-100 mb-4">
                <div className="kabobs item--js">
                  <img src={BrakesImage} alt="" className="bike-part-card mt-1"/> <br />
                  <span className="text-success mb-3">Freios</span>
                </div>
                <ul className="drop-menu menu-2">
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Tipo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.brake_type}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Disco:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.brake_disc_size}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Marca | Modeo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.brake_model}</p>
                    </div>
                  </li>
                </ul>
              </li>

              <li className="list-item w-100 mb-4">
                <div className="kabobs item--js">
                  <img src={HandlebarImage} alt="" className="bike-part-card mt-1"/> <br />
                  <span className="text-success mb-3">Cockpit</span>
                </div>
                <ul className="drop-menu menu-2">
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Mesa:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.stem}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Guidão:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.handlebar}</p>
                    </div>
                  </li>
                </ul>
              </li>

              <li className="list-item w-100 mb-4">
                <div className="kabobs item--js">
                  <img src={MountainBikeImage} alt="" className="bike-part-card mt-1"/> <br />
                  <span className="text-success mb-3">Rodas</span>
                </div>
                <ul className="drop-menu menu-2">
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Tamano:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.rim_size}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-orientation"><strong>DIANTEIRA</strong> </p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Aro:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.front_rim_model}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Cubo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.front_hub}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Pneu:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.front_tyre}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-orientation"><strong>TRASEIRA</strong> </p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Aro:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.rear_rim_model}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Cubo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.rear_hub}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Pneu:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.rear_tyre}</p>
                    </div>
                  </li>
                </ul>
              </li>

              <li className="list-item w-100 mb-4">
                <div className="kabobs item--js">
                  <img src={SaddleImage} alt="" className="bike-part-card mt-1"/> <br />
                  <span className="text-success mb-3">Canote</span>
                </div>
                <ul className="drop-menu menu-2">
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Tipo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.seat_post_type}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Tamanho:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.seat_post_travel}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Marca | Modelo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.seat_post_model}</p>
                    </div>
                  </li>
                </ul>
              </li>


              <li className="list-item w-100">
                <div className="kabobs item--js">
                  <img src={AccessorieImage} alt="" className="bike-part-card mt-1"/> <br />
                  <span className="text-success mb-3">Acessórios</span>
                </div>
                <ul className="drop-menu menu-2">
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Possui:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.accessories}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Descrição:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.accessories_description}</p>
                    </div>
                  </li>
                </ul>
              </li>

              { bike.bike_type === "e-bike" && (
                <li className="list-item w-100 mt-4">
                  <div className="kabobs item--js">
                    <img src={EBikeImage} alt="" className="bike-part-card mt-1"/> <br />
                    <span className="text-success mb-3">Elétrica</span>
                  </div>
                  <ul className="drop-menu menu-2">
                    <li className="drop-item">
                      <div className="text-success item list-item d-flex ms-3">
                        <p className="bike-attrs-parts"><strong>Bateria:</strong> </p>
                        <p className="bike-info ms-2 align-middle">{bike.battery}</p>
                      </div>
                    </li>
                    <li className="drop-item">
                      <div className="text-success item list-item d-flex ms-3">
                        <p className="bike-attrs-parts"><strong>Ciclos:</strong> </p>
                        <p className="bike-info ms-2 align-middle">{bike.battery_cycles}</p>
                      </div>
                    </li>
                    <li className="drop-item">
                      <div className="text-success item list-item d-flex ms-3">
                        <p className="bike-attrs-parts"><strong>Km:</strong> </p>
                        <p className="bike-info ms-2 align-middle">{bike.mileage}</p>
                      </div>
                    </li> <li className="drop-item">
                      <div className="text-success item list-item d-flex ms-3">
                        <p className="bike-attrs-parts"><strong>Motor:</strong> </p>
                        <p className="bike-info ms-2 align-middle">{bike.motor}</p>
                      </div>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>

          <div className="col-11 col-md-4 card-bike">
            <div className="d-flex justify-content-between">
              <div>
                <h3 className="card-title mt-3"> {bike.frame_brand} {bike.model}</h3>
              </div>
              <button type="button" onClick={(e) => handleLike(e)} className="like-btn" id={bike.id}><i className="far fa-heart"></i></button>
            </div>
            <h4 className="card-title mt-1">{bike.modality}</h4>
            <div className="card-content">
              <h4 className="text-success mt-1">
                {(bike.price_in_cents / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h4>
              <p className=""><strong className="text-success">Categoria:</strong> {bike.category.name} </p>
              <p className=""><strong className="text-success">Modalidade:</strong> {bike.modality}</p>
              <p className=""><strong className="text-success">Tipo da bike:</strong> {bike.bike_type}</p>
              <p className=""><strong className="text-success">Ano:</strong> {bike.year}</p>
              <p className=""><strong className="text-success">Tamanho do quadro:</strong> {bike.frame_size}</p>
              <p className=""><strong className="text-success">Material do quadro:</strong> {bike.frame_material}</p>
              <p className=""><strong className="text-success">Local:</strong> {bike.locality}</p>
              <p className=""><strong className="text-success">Descrição:</strong> {bike.description}</p>
            </div>
            <a href={"/user/" + bike.user_id}>
              <button className="btn-chat w-100 mt-3 mb-2"><i className="fas fa-comments me-2"></i>Conversar com anunciante</button>
            </a>
          </div>
        </div>
      )
      }
    </div>
  );
}
