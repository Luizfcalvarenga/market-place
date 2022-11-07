import React, { useEffect, useState } from "react";

export function Bike(props) {
  const [bike, setBike] = useState()
  let bikeId = window.location.pathname.split("/").pop();

  useEffect(async () => {
    let url = `/api/v1/bikes/${bikeId}`;
    const response = await axios.get(url);
    setBike(response.data);
  }, [])


  return (

    <div className="product-show" bike={bike} key={bike} >
      {bike && (
        <div className="row row-cols-1">
          <div className="other-infos  col-12 col-md-8">
            <div id="carouselExampleControls" className="carousel slide product-photos" data-bs-ride="carousel">
              <div className="carousel-inner">
                <i className="fas fa-heart card-favorite"></i>
                <div className="carousel-item active">
                  <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-show" alt="" />
                </div>
                <div className="carousel-item">
                  <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-show" alt="" />
                </div>
                <div className="carousel-item">
                  <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-show" alt="" />
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

            <div className="technical-details-bike mt-5">
              <h3 className="text-success mb-4">Características Técnicas</h3>

              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="me-2 mb-3 text-black"><strong>Tamanho do quadro:</strong> <span className="text-success me-3">{bike.frame_size}</span></h4>
                  <h4 className="me-2 mb-3 text-black"><strong>Material do quadro:</strong> <span className="text-success me-3">{bike.frame_material}</span></h4>
                  <h4 className="me-2 mb-3 text-black"><strong>Tamanho do aro:</strong> <span className="text-success me-3">{bike.rim_size}</span></h4>
                  <h4 className="me-2 mb-3 text-black"><strong>Marchas dianteiras:</strong> <span className="text-success me-3">{bike.number_of_front_gears}</span></h4>
                  <h4 className="me-2 mb-3 text-black"><strong>Marchas traseiras:</strong> <span className="text-success me-3">{bike.number_of_rear_gears}</span></h4>
                  <h4 className="me-2 mb-3 text-black"><strong>Tipo de freio:</strong> <span className="text-success me-3">{bike.brake_type}</span></h4>
                </div>

                <div>
                  <h4 className="me-2 mb-3 text-black"><strong>Tipo de suspensão:</strong> <span className="text-success me-3">{bike.suspension_type}</span></h4>
                  <h4 className="me-2 mb-3 text-black"><strong>Suspensão dianteira:</strong> <span className="text-success me-3">{bike.front_suspension_travel}</span></h4>
                  <h4 className="me-2 mb-3 text-black"><strong>Suspensão traseira:</strong> <span className="text-success me-3">{bike.rear_suspension_travel}</span></h4>
                  <h4 className="me-2 mb-3 text-black"><strong>Tipo de canote:</strong> <span className="text-success me-3">{bike.seat_post_type}</span></h4>
                  <h4 className="me-2 mb-3 text-black"><strong>Curso do canote:</strong> <span className="text-success me-3">{bike.seat_post_travel}</span></h4>
                  <h4 className="me-2 mb-3 text-black"><strong>Peso:</strong> <span className="text-success me-3">{bike.weight}</span></h4>
                </div>
              </div>
            </div>

            <div className="technical-details-bike mt-5">
              <h3 className="text-success mb-4">Condições e descrição</h3>

              <div className="d-flex justify-content-between">
                <h4 className="me-2 mb-3 text-black"><strong>Condições da bike:</strong> <span className="text-success me-3">{bike.bike_conditions}</span></h4>
                <h4 className="me-2 mb-3 text-black"><strong>Tipo de documento:</strong> <span className="text-success me-3">{bike.documentation_type}</span></h4>
              </div>
              <h4 className="me-2 mb-3 text-black"><strong>Acompanha acessórios:</strong> <span className="text-success me-3">{bike.accessories  ? "Sim" : "Não"}</span></h4>
              <h4 className="me-2 mb-3 text-black"><strong>Condições operacionais:</strong> <span className="text-success me-3">{bike.operating_condition}</span></h4>
              <h4 className="me-2 mb-3 text-black"><strong>Condições estruturais:</strong> <span className="text-success me-3">{bike.structural_visual_condition}</span></h4>
              <h4 className="me-2 mb-3 text-black"><strong>Descrição:</strong> <span className="text-success me-3">{bike.description}</span></h4>
            </div>
          </div>

          <div className="col-12 col-md-4 card-product">
            <div className="d-flex justify-content-between">
              <h3 className="card-title mt-3"> {bike.category.name}</h3>
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
              <p className=""><strong>Local:</strong> {bike.locality} </p>
              <p className=""><strong>Modelo:</strong> {bike.model}</p>
              <p className=""><strong>Ano:</strong> {bike.year}</p>
              <p className=""><strong>Quadro:</strong> {bike.frame_brand}</p>
              <p className=""><strong>Tipo da bike:</strong> {bike.bike_type}</p>
            </div>

            <button className="btn-chat w-100 mt-3 mb-2"><i className="fas fa-comments me-2"></i>Conversar com anunciante</button>
          </div>
        </div>
      )
      }
    </div>
  );
}
