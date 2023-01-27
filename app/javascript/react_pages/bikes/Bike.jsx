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
  const [presentIds, setPresentIds] = useState([])


  useEffect(async () => {
    let url = `/api/v1/bikes/${bikeId}`;
    const response = await axios.get(url);
    setBike(response.data);
    setPresentIds(response.data.present_ids);

  }, [])

  const handleLike = (e) => {
    e.preventDefault()
    const dataObject = new FormData();
    dataObject.append( "like[likeble_id]", e.nativeEvent.path[1].id );
    dataObject.append( "like[likeble_type]", "Bike" );
    axios.post('/likes', dataObject)

    .then(function (response) {
      if (response.data.success) {
        swal(" OHH YEAHH!", "Produto adicionada aos favoritos!!!", "success");
      } else if (!response.data.errors) {
        swal("OPS", "Faça login ou cadastre-se antes de continuar!", "error");
      } else {
        if (response.data.errors.user) {
          swal("OPS", "Não pode curtir seu produto", "error");
        } else if (response.data.errors.like) {
          swal("OPS", "Você já curtiu esse produto", "error");
        }
      }
    })

  }

  const showSellerContact = () => {
    const userContact = document.getElementById("user-contact")
    if (props.userPresent === "true") {
      userContact.classList.toggle("d-none")
    } else {
      swal("OPS", "Você deve fazer login para ver o contato!!", "error");
    }
  }

  const translateWord = (word) => {
    const languageMap = {
      "mountain_bike" : "Mountain Bike",
      "dirt_street" : "Dirt",
      "road" : "Road",
      "urban" : "Urbana",
      "infant" : "Infantil",

      "downhill" : "Downhill",
      "enduro" : "Enduro",
      "gravel" : "Gravel",
      "speed" : "Speed",
      "trail" : "Trail",
      "xc_cross_country" : "XC Cross Country",
      "street_bmx" : "Street BMX",
      "race_bmx" : "Race BMX",
      "big_wheel_bmx" : "Big Wheel BMX",
      "dirt_jump" : "Dirt Jump",
      "speed_performance" : "Speed Performance",
      "triathlon" : "Triathlon",
      "ciclocross" : "Ciclocross",
      "cicloviagem" : "Cicloviagem",

      "aluminum" : "Alumínio",
      "carbon" : "Carbono",
      "carbon_aluminum_chainstay" : "Carbono/Aumínio (Chainstay)",
      "other" : "Outro",


      "v_brake" : "V-Brake (frenagem no aro)",
      "hydraulic_disc" : "À Disco - Hidráulico",
      "mechanical_disc" : "À Disco - Mecânico",
      "coaster_brake" : "Contra pedal",

      "no_suspension" : "Sem Suspensão",
      "hardtail" : "Hardtail",
      "full_suspension" : "Full Suspension",

      "retractable" : "Retrátil",
      "rigid" : "Rigido",

      "e-bike" : "E-Bike",
      "bike" : "Bike",


    };

    return languageMap[word]
  }

  const handleNextPrevious = () => {
    const nextId = presentIds.filter(element => element > bikeId ).shift()
    const previousId = presentIds.filter(element => element < bikeId ).pop()
    if (nextId && previousId) {
      return (
        <div className="d-flex justify-content-between my-3">
          <a href={`http://localhost:3000/bikes/${(previousId)}`} className="btn-back-step "> <i className="fas fa-angle-double-left mt-1 me-2"></i>anterior</a>
          <a href={`http://localhost:3000/bikes/${(nextId)}`} className="btn-next-step ">próximo <i className="fas fa-angle-double-right mt-1 ms-1"></i></a>
        </div>
      )
    } else if (nextId && !previousId) {
      return (
        <div className="d-flex justify-content-end my-3">
          <a href={`http://localhost:3000/bikes/${(nextId)}`} className="btn-next-step ">próximo <i className="fas fa-angle-double-right mt-1 ms-1"></i></a>
        </div>
      )
    } else if (previousId && !nextId) {
      return (
        <div className="d-flex justify-content-between my-3">
          <a href={`http://localhost:3000/bikes/${(previousId)}`} className="btn-back-step "><i className="fas fa-angle-double-left mt-1 me-2"></i> anterior</a>
        </div>
      )
    } else if (!previousId && !nextId) {
      return (
        <div className="d-flex justify-content-between my-3">

        </div>
      )
    }
  }

  return (

    <div className="bike-show" bike={bike} key={bike} >
      {bike && (
        <div className="row row-cols-1">
          {handleNextPrevious()}
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

            <h3 className="mb-4 mt-3">Características Técnicas</h3>
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
                      <p className="bike-info ms-2 align-middle">{translateWord(bike.frame_material)}</p>
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
                      <p className="bike-info ms-2 align-middle">{bike.crankset}</p>
                    </div>
                  </li>
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Corrente:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{bike.chain}</p>
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
              {bike.category.name !== "road" && (<>
                <li className="list-item w-100 mb-4">
                  <div className="kabobs item--js">
                    <img src={SuspensionImage} alt="" className="bike-part-card mt-1"/> <br />
                    <span className="text-success mb-3">Suspensão</span>
                  </div>
                  <ul className="drop-menu menu-2">
                    <li className="drop-item">
                      <div className="text-success item list-item d-flex ms-3">
                        <p className="bike-attrs-parts"><strong>Tipo:</strong> </p>
                        <p className="bike-info ms-2 align-middle">{translateWord(bike.suspension_type)}</p>
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
              </>)}


              <li className="list-item w-100 mb-4">
                <div className="kabobs item--js">
                  <img src={BrakesImage} alt="" className="bike-part-card mt-1"/> <br />
                  <span className="text-success mb-3">Freios</span>
                </div>
                <ul className="drop-menu menu-2">
                  <li className="drop-item">
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>Tipo:</strong> </p>
                      <p className="bike-info ms-2 align-middle">{translateWord(bike.brake_type)}</p>
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
                      <p className="bike-info ms-2 align-middle">{translateWord(bike.seat_post_type)}</p>
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

            <div className="card-content">
              <h3 className="mt-1">
                {(bike.price_in_cents / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
              <p className="text-white"><span className="text-gray">Categoria:</span> {translateWord(bike.category.name)} </p>
              <p className="text-white"><span className="text-gray">Modalidade:</span> {translateWord(bike.modality)}</p>
              <p className="text-white"><span className="text-gray">Tipo da bike:</span> {translateWord(bike.bike_type)}</p>
              <p className="text-white"><span className="text-gray">Ano:</span> {bike.year}</p>
              <p className="text-white"><span className="text-gray">Tamanho do quadro:</span> {bike.frame_size}</p>
              <p className="text-white"><span className="text-gray">Material do quadro:</span> {translateWord(bike.frame_material)}</p>
              <p className="text-white"><span className="text-gray">Local:</span> {bike.locality}</p>
              <p className="text-white"><span className="text-gray">Descrição:</span> {bike.description}</p>
            </div>
            {bike.user.show_contact && (<>
              <button className="btn-chat w-100 mt-3 mb-2" onClick={() => showSellerContact()}>Mostrar contato do vendedor</button>
              <div id="user-contact" className="d-none">
                <p className=" text-center"><strong className="text-success">Telefone:</strong>  {bike.user.phone_number}</p>
              </div>
            </>)}
            <a href={"/user/" + bike.user.id}>
              <button className="btn-chat w-100 mt-3 mb-2"><i className="fas fa-comments me-2"></i>Conversar com anunciante</button>
            </a>
          </div>
        </div>
      )
      }
    </div>
  );
}
