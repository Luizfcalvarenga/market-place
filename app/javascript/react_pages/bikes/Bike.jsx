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


  return (

    <div className="bike-show" bike={bike} key={bike} >
      {bike && (
        <div className="row row-cols-1">
          <div className="other-infos  col-12 col-md-8">
            <div id="carouselExampleControls" className="carousel slide product-photos" data-bs-ride="carousel">
              <div className="carousel-inner">
                <i className="fas fa-heart card-favorite"></i>
                <div className="carousel-item active">
                  <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-show-bike" alt="" />
                </div>
                <div className="carousel-item">
                  <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-show-bike" alt="" />
                </div>
                <div className="carousel-item">
                  <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-show-bike" alt="" />
                </div>
              </div>
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
            <ul class="main__menu">
              <li class="list-item">
                <a href="#" class="kabobs item--js">
                  <span>Quadro</span>
                  <img src={FrameImage} alt="" className="bike-part-card"/>
                </a>
                <ul class="drop-menu menu-2">
                  <li class="drop-item"><p className="me-2 mb-3 text-success ms-2"><strong>Marca:</strong> <span className="me-3 bike-info">{bike.frame_brand}</span></p></li>
                  <li class="drop-item"><p className="me-2 mb-3 text-success ms-2"><strong>Tamanho:</strong> <span className="me-3 bike-info">{bike.frame_size}</span></p></li>
                  <li class="drop-item"><p className="me-2 mb-3 text-success ms-2"><strong>Material:</strong> <span className="me-3 bike-info">{bike.frame_material}</span></p></li>
                </ul>
              </li>
            </ul>
            <div className="row row-cols-1">
              <div className="col-10 col-md-4">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img src={FrameImage} alt="" className="bike-part-card"/>
                      <h4 className="mt-3 text-success">Quadro</h4>
                    </div>
                    <div class="flip-card-back">
                      <h4 className="mt-3 text-success">Quadro</h4>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Marca:</strong> <span className="me-3 bike-info">{bike.frame_brand}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Tamanho:</strong> <span className="me-3 bike-info">{bike.frame_size}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Material:</strong> <span className="me-3 bike-info">{bike.frame_material}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-10 col-md-4">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img src={CrankImage} alt="" className="bike-part-card"/>
                      <h4 className="mt-3 text-success">Transmissão</h4>
                    </div>
                    <div class="flip-card-back">
                      <h4 className="mt-3 text-success">Transmissão</h4>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Nº Marchas(D):</strong> <span className="me-3 bike-info">{bike.number_of_front_gears}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Modelo:</strong> <span className="me-3 bike-info">{bike.front_derailleur_model}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Nº Marchas(T):</strong> <span className="me-3 bike-info">{bike.number_of_rear_gears}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Modelo:</strong> <span className="me-3 bike-info">{bike.rear_derailleur_model}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Pedivela:</strong> <span className="me-3 bike-info">{bike.crankset}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Corrente:</strong> <span className="me-3 bike-info">{bike.chain}</span></p>
                    </div>
                  </div>
                </div>
              </div><div className="col-10 col-md-4">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img src={SuspensionImage} alt="" className="bike-part-card"/>
                      <h4 className="mt-3 text-success">Suspensão</h4>
                    </div>
                    <div class="flip-card-back">
                      <h4 className="mt-3 text-success">Suspensão</h4>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Dianteira:</strong> <span className="me-3 bike-info">{bike.front_suspension_travel}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Modelo:</strong> <span className="me-3 bike-info">{bike.front_suspension_model}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Traseira:</strong> <span className="me-3 bike-info">{bike.rear_suspension_travel}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Modelo:</strong> <span className="me-3 bike-info">{bike.rear_suspension_model}</span></p>
                    </div>
                  </div>
                </div>
              </div><div className="col-10 col-md-4 mt-3">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img src={BrakesImage} alt="" className="bike-part-card"/>
                      <h4 className="mt-3 text-success">Freios</h4>
                    </div>
                    <div class="flip-card-back">
                      <h4 className="mt-3 text-success">Freios</h4>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Tipo:</strong> <span className="me-3 bike-info">{bike.brake_type}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Disco:</strong> <span className="me-3 bike-info">{bike.brake_disc_size}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Modelo:</strong> <span className="me-3 bike-info">{bike.brake_model}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-10 col-md-4 mt-3">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img src={HandlebarImage} alt="" className="bike-part-card"/>
                      <h4 className="mt-3 text-success">Cockpit</h4>
                    </div>
                    <div class="flip-card-back">
                      <h4 className="mt-3 text-success">Cockpit</h4>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Mesa:</strong> <span className="me-3 bike-info">{bike.stem}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Guidão:</strong> <span className="me-3 bike-info">{bike.handlebar}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-10 col-md-4 mt-3">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img src={MountainBikeImage} alt="" className="bike-part-card"/>
                      <h4 className="mt-3 text-success">Rodas</h4>
                    </div>
                    <div class="flip-card-back">
                      <h4 className="mt-3 text-success">Rodas</h4>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Tamanho:</strong> <span className="me-3 bike-info">{bike.rim_size}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Aro(D):</strong> <span className="me-3 bike-info">{bike.front_rim_model}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Aro(T):</strong> <span className="me-3 bike-info">{bike.rear_rim_model}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Pneu(D):</strong> <span className="me-3 bike-info">{bike.front_tyre}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Pneu(T):</strong> <span className="me-3 bike-info">{bike.rear_tyre}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Cubo(D):</strong> <span className="me-3 bike-info">{bike.front_hub}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Cubo(T):</strong> <span className="me-3 bike-info">{bike.rear_hub}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-10 col-md-4 mt-3">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img src={SaddleImage} alt="" className="bike-part-card"/>
                      <h4 className="mt-3 text-success">Canote</h4>
                    </div>
                    <div class="flip-card-back">
                      <h4 className="mt-3 text-success">Canote</h4>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Tipo:</strong> <span className="me-3 bike-info">{bike.seat_post_type}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Tamanho:</strong> <span className="me-3 bike-info">{bike.seat_post_travel}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-10 col-md-4 mt-3">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img src={AccessorieImage} alt="" className="bike-part-card"/>
                      <h4 className="mt-3 text-success">Acessórios</h4>
                    </div>
                    <div class="flip-card-back">
                      <h4 className="mt-3 text-success">Acessórios</h4>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Qual:</strong> <span className="me-3 bike-info">{bike.accessories}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Descrição:</strong> <span className="me-3 bike-info">{bike.accessories_description}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {bike.bike_type === "e-bike" && (
                <div className="col-10 col-md-4 mt-3">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img src={EBikeImage} alt="" className="bike-part-card"/>
                      <h4 className="mt-3 text-success">Elétrica</h4>
                    </div>
                    <div class="flip-card-back">
                      <h4 className="mt-3 text-success">Elétrica</h4>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Bateria:</strong> <span className="me-3 bike-info">{bike.battery}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Ciclos:</strong> <span className="me-3 bike-info">{bike.battery_cycles}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Km:</strong> <span className="me-3 bike-info">{bike.mileage}</span></p>
                      <p className="me-2 mb-3 text-success ms-2"><strong>Motor:</strong> <span className="me-3 bike-info">{bike.motor}</span></p>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>

          <div className="col-12 col-md-4 card-bike">
            <div className="d-flex justify-content-between">
              <div>
                <h3 className="card-title mt-3"> {bike.frame_brand} {bike.model}</h3>
                {/* <h3 className="card-title mt-3"> {bike.model}</h3> */}
              </div>
              <i className="far fa-heart mt-4"></i>
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
