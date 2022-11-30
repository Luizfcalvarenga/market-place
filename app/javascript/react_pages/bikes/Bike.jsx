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

            <div className="technical-details-bike mt-5">
              <h3 className="text-success mb-4">Características Técnicas</h3>

              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="me-2 mb-3 text-success"><strong>Tamanho do quadro:</strong> <span className="me-3 bike-info">{bike.frame_size}</span></h4>
                  <h4 className="me-2 mb-3 text-success"><strong>Material do quadro:</strong> <span className="me-3 bike-info">{bike.frame_material}</span></h4>
                  <h4 className="me-2 mb-3 text-success"><strong>Tamanho do aro:</strong> <span className="me-3 bike-info">{bike.rim_size}</span></h4>
                  <h4 className="me-2 mb-3 text-success"><strong>Marchas dianteiras:</strong> <span className="me-3 bike-info">{bike.number_of_front_gears}</span></h4>
                  <h4 className="me-2 mb-3 text-success"><strong>Marchas traseiras:</strong> <span className="me-3 bike-info">{bike.number_of_rear_gears}</span></h4>
                  <h4 className="me-2 mb-3 text-success"><strong>Tipo de freio:</strong> <span className="me-3 bike-info">{bike.brake_type}</span></h4>
                </div>

                <div>
                  <h4 className="me-2 mb-3 text-success"><strong>Tipo de suspensão:</strong> <span className="me-3 bike-info">{bike.suspension_type}</span></h4>
                  <h4 className="me-2 mb-3 text-success"><strong>Suspensão dianteira:</strong> <span className="me-3 bike-info">{bike.front_suspension_travel}</span></h4>
                  <h4 className="me-2 mb-3 text-success"><strong>Suspensão traseira:</strong> <span className="me-3 bike-info">{bike.rear_suspension_travel}</span></h4>
                  <h4 className="me-2 mb-3 text-success"><strong>Tipo de canote:</strong> <span className="me-3 bike-info">{bike.seat_post_type}</span></h4>
                  <h4 className="me-2 mb-3 text-success"><strong>Curso do canote:</strong> <span className="me-3 bike-info">{bike.seat_post_travel}</span></h4>
                  <h4 className="me-2 mb-3 text-success"><strong>Peso:</strong> <span className="me-3 bike-info">{bike.weight}</span></h4>
                </div>
              </div>
            </div>

            <div className="technical-details-bike mt-5">
              <h3 className="text-success mb-4">Condições e descrição</h3>

              <div className="d-flex justify-content-between">
                <h4 className="me-2 mb-3 text-success"><strong>Condições da bike:</strong> <span className="me-3 bike-info">{bike.bike_condition}</span></h4>
                <h4 className="me-2 mb-3 text-success"><strong>Tipo de documento:</strong> <span className="me-3 bike-info">{bike.documentation_type}</span></h4>
              </div>
              <h4 className="me-2 mb-3 text-success"><strong>Acompanha acessórios:</strong> <span className="me-3 bike-info">{bike.accessories}</span></h4>
              <h4 className="me-2 mb-3 text-success"><strong>Condições operacionais:</strong> <span className="me-3 bike-info">{bike.operating_condition}</span></h4>
              <h4 className="me-2 mb-3 text-success"><strong>Condições estruturais:</strong> <span className="me-3 bike-info">{bike.structural_visual_condition}</span></h4>
              <h4 className="me-2 mb-3 text-success"><strong>Descrição:</strong> <span className="me-3 bike-info">{bike.description}</span></h4>
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
