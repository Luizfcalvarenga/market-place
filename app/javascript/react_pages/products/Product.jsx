import React, { useEffect, useState } from "react";
import AccessorieImage from "../../../assets/images/accessories.png";
import ComponentImage from "../../../assets/images/frame.png";
import ClotheImage from "../../../assets/images/tshirt.png";
import VerifiedImage from "../../../assets/images/badge.png";
import { Modal, Carousel } from "react-bootstrap";

export function Product(props) {
  const [product, setProduct] = useState()
  const [presentIds, setPresentIds] = useState([])
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [quantity, setQuantity] = useState()
  let productId = window.location.pathname.split("/").pop();
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index) => {
    setActiveIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(async () => {
    let url = `/api/v1/products/${productId}`;
    const response = await axios.get(url);
    setProduct(response.data);
    setPresentIds(response.data.present_ids);
    setCity(response.data.city);
    setState(response.data.state);
  }, [])

  const handleLike = (e) => {
    e.preventDefault()
    const dataObject = new FormData();
    dataObject.append( "like[likeble_id]", e.target.id );
    dataObject.append( "like[likeble_type]", "Product" );
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
      "front_and_rear" : "Dianteira e Traseira",

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

      "retractle" : "Retrátil",
      "rigid" : "Rigido",

      "e-bike" : "E-Bike",
      "bike" : "Bike",

      "new" : "Novo",
      "used" : "Usado",

      "receipt": "Nota Fiscal",
      "import_document": "Documento de Importação",
      "foreign_tax_coupon": "Cupom Fiscal Estrangeiro",
      "no_documentation": "Sem Documento",
      "foreign_tax_coupon_and_import_document": "Cupom Fiscal Estrangeiro + Documento de Importação",

      "bad": "Ruim",
      "reasonable": "Razoável",
      "good": "Bom",
      "excellent": "Ótimo",
    };

    return languageMap[word]
  }

  const breakLines = (text) => {
    return text.split(".").map((line, index) => {
      return <p key={index}>{line.trim()}.</p>;
    });
  };



  return (

    <div className="product-show index-container" product={product} key={product}>
      {product && (<>

          <div className="other-infos d-flex justify-content-between gap-3 product-show-infos">
            {product.photos.length > 1 ? (
              <div id="carouselExampleControls" className="carousel slide product-photos w-70" data-bs-interval="false">
                <div className="carousel-inner">
                  {product.photos.map((photo, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                      <button
                        type="button"
                        className="photo-btn"
                        onClick={() => openModal(index)}
                      >
                        <img src={photo} className="d-block w-100 img-card-show" alt="" />
                      </button>
                    </div>
                  ))}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </a>
              </div>
              ) : (<>
                {product.photos.length === 1 && (
                  <div id="carouselExampleControls" className="carousel slide product-photos w-70" data-bs-interval="false">
                    <div className="carousel-inner">
                      <div key={0} className="carousel-item active">
                        <button
                          type="button"
                          className="photo-btn"
                          onClick={() => openModal(0)}
                        >
                        <img src={product.photos[0]} className="d-block w-100 img-card-show" alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {product.photos.length === 0 && (
                  <div id="carouselExampleControls" className="carousel slide product-photos w-70" data-bs-interval="false">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-show" alt="" />
                      </div>
                      <div className="carousel-item">
                        <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-show" alt="" />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <Modal show={showModal} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered style={{ backgroundColor: "transparent" }} restoreFocus={false}>
              <Modal.Body>
                <Carousel activeIndex={activeIndex} onSelect={(index) => setActiveIndex(index)} controls={ product.photos.length <=1 ? false : true} indicators={false} interval={null} >
                  {product.photos.map((photo, index) => (
                    <Carousel.Item key={index}>
                      <img src={photo} className="d-block w-100 photo-modal" alt="" />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Modal.Body>
            </Modal>
            {showModal && (<div onClick={closeModal} className="closeModal"><i className="fa">&#xf00d;</i></div>)}
            <div className="card-product w-30 p-2">
              {product.verified && (
                <div className="d-flex justify-content-between mt-3">
                  <p className="text-verified">PRODUTO CERTIFICADO</p>
                  <img src={VerifiedImage} alt="" width="20" height="20" class="mt-1 me-1"/>
                </div>
              )}
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="card-title"> {product.brand} {product.model}</h3>
                </div>
                { ["air_bomb", "eletronics", "oil_lubricant", "stand", "tools", "car_protector", "training_roller", "bike_rack"].includes(product.product_type.name) &&(
                  <img src={AccessorieImage} alt="" className="icon-card-index mt-2"/>
                )}
                { ["battery", "brake", "brake_levers", "cassete", "chain", "chainring", "crankset", "fender", "frame", "front_derailleur", "front_shifter", "front_suspension", "full_wheel", "grips", "handlebar", "headset", "hub", "pedals", "rim", "saddle", "seat_post", "spoke", "rear_derailleur", "rear_shifter", "rear_suspension", "stem", "tyre", "adapters", "blocking", "bearing", "brake_pad", "central_movement", "chain_guide", "relation_kit_complete_group", "hanger", "power_meter", "sheave", "tube", "bottle_cage"].includes(product.product_type.name) &&(
                  <img src={ComponentImage} alt="" className="icon-card-index mt-2"/>
                )}
                { ["bretelle", "shorts", "inner_shorts", "shirt", "vest", "windbreaker", "thermal_clothing", "helmet", "elbow_pad", "knee_pad", "water_bottle", "hydration_backpack", "fanny_pack", "sneaker"].includes(product.product_type.name) &&(
                  <img src={ClotheImage} alt="" className="icon-card-index mt-2"/>
                )}
                <button type="button" onClick={(e) => handleLike(e)} className="like-btn" id={product.id}><i id={product.id} className="far fa-heart"></i></button>
              </div>
              <div className="card-content">
                <h4 className="text-success mt-1">
                  {(product.price_in_cents / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h4>
                <p className=""><strong className="text-success">Nome:</strong> {product.name} </p>
                <p className=""><strong className="text-success">Categoria:</strong> {translateWord(product.category.name)} </p>
                <p className=""><strong className="text-success">Modalidade:</strong> {translateWord(product.modality)}</p>
                <p className=""><strong className="text-success">Tipo da produto:</strong> {product.product_type.prompt}</p>
                <p className=""><strong className="text-success">Ano:</strong> {product.year}</p>
                <p className=""><strong className="text-success">Local:</strong> {city} - {state}</p>

              </div>
              {product.user.show_contact && (<>
                <button className="btn-chat w-100 mt-3 mb-2" id="show-seller-contact" onClick={() => showSellerContact()}>Mostrar contato do vendedor</button>
                <div id="user-contact" className="d-none">
                  <p className=" text-center"><strong className="text-success mask-phone">Telefone:</strong>  {product.user.phone_number}</p>
                </div>
              </>)}

              {Number(props.currentUser) !== product.user.id && (
                <a href={"/user/" + product.user.id + "?product_id=" + product.id + "&photo=" + product.photos[0]} id="chat-with-advertiser">
                  <button className="btn-chat w-100 mt-3 mb-2"><i className="fas fa-comments me-2"></i>Conversar com anunciante</button>
                </a>
              )}

            </div>
          </div>

          {product.description && (<>
            <h3 className="my-4">Descrição do vendedor</h3>
            <div className="card-for-info">
              <p className="bike-info align-middle my-3">{breakLines(product.description)}</p>
            </div>
          </>)}

          <h3 className="my-4">Mais Informações</h3>
          <div className="card-for-info p-3">
            {product.product_attributes.length > 0 && (<>
              {product.product_attributes.map((attribute) => {
                return (
                  <div className="text-success item list-item d-flex">
                    <p className="bike-attrs-parts"><strong>{product.product_type_attributes.find(element => element.id === attribute.product_type_attribute_id).prompt}:</strong></p>
                    <p className="bike-info ms-2 align-middle">{translateWord(attribute.value) ? translateWord(attribute.value) : attribute.value}</p>
                  </div>
                )
              })}
            </>)}
            {product.description && (
              <p className="bike-attrs-parts"><strong className="text-success">Documentação:</strong> {translateWord(product.documentation_type)}</p>
            )}
            {product.condition && (
              <p className="bike-attrs-parts"><strong className="text-success">Condição:</strong> {translateWord(product.condition)}</p>
            )}
            {product.product_condition_status && (
              <p className="bike-attrs-parts"><strong className="text-success">Estado:</strong> {translateWord(product.product_condition_status)}</p>
            )}
            {product.product_condition_description && (
              <p className=""><strong className="text-success">mais informações:</strong> {translateWord(product.product_condition_description)}</p>
            )}
          </div>
       </>
      )
      }
    </div>
  );
}
