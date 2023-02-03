import React, { useEffect, useState } from "react";
import AccessorieImage from "../../../assets/images/accessories.png";
import ComponentImage from "../../../assets/images/frame.png";
import ClotheImage from "../../../assets/images/tshirt.png";
import VerifiedImage from "../../../assets/images/badge.png";


export function Product(props) {
  const [product, setProduct] = useState()
  const [presentIds, setPresentIds] = useState([])
  const [city, setCity] = useState("")
  const [state, setState] = useState("")

  const [quantity, setQuantity] = useState()
  let productId = window.location.pathname.split("/").pop();

  useEffect(async () => {
    let url = `/api/v1/products/${productId}`;
    const response = await axios.get(url);
    setProduct(response.data);
    setPresentIds(response.data.present_ids);
    setCity(response.data.city);
    setState(response.data.state);

    console.log(window.location)
  }, [])

  const handleLike = (e) => {
    e.preventDefault()
    const dataObject = new FormData();
    dataObject.append( "like[likeble_id]", e.target.id );
    dataObject.append( "like[likeble_type]", "Product" );

    // console.log(e.target.id)
    axios.post('/likes', dataObject)

    .then(function (response) {
      // console.log(response);
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

  const handleNextPrevious = () => {
    const nextId = presentIds.filter(element => element > productId ).shift()
    const previousId = presentIds.filter(element => element < productId ).pop()
    if (nextId && previousId) {
      return (
        <div className="d-flex justify-content-between my-3">
          <a href={`http://localhost:3000/products/${(previousId)}`} className="btn-back-step "> <i className="fas fa-angle-double-left mt-1 me-2"></i>anterior</a>
          <a href={`http://localhost:3000/products/${(nextId)}`} className="btn-next-step ">próximo <i className="fas fa-angle-double-right mt-1 ms-1"></i></a>
        </div>
      )
    } else if (nextId && !previousId) {
      return (
        <div className="d-flex justify-content-end my-3">
          <a href={`http://localhost:3000/products/${(nextId)}`} className="btn-next-step ">próximo <i className="fas fa-angle-double-right mt-1 ms-1"></i></a>
        </div>
      )
    } else if (previousId && !nextId) {
      return (
        <div className="d-flex justify-content-between my-3">
          <a href={`http://localhost:3000/products/${(previousId)}`} className="btn-back-step "><i className="fas fa-angle-double-left mt-1 me-2"></i> anterior</a>
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

    <div className="product-show index-container" product={product} key={product}>
      {product && (
        <div className="row row-cols-1 mt-3">
          {/* {handleNextPrevious()} */}
          <div className="other-infos col-12 col-md-8">
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

            <h3 className="mb-4 mt-3">Mais Informações</h3>
            <div className="card-for-info">
              {product.product_attributes.length > 0 && (<>
                {product.product_attributes.map((attribute) => {
                  return (
                    <div className="text-success item list-item d-flex ms-3">
                      <p className="bike-attrs-parts"><strong>{product.product_type_attributes.find(element => element.id === attribute.product_type_attribute_id).prompt}:</strong></p>
                      <p className="bike-info ms-2 align-middle">{translateWord(attribute.value) ? translateWord(attribute.value) : attribute.value}</p>
                    </div>
                  )
                })}
              </>)}
              <p className=""><strong className="text-success">Documentação:</strong> {translateWord(product.documentation_type)}</p>
              <p className=""><strong className="text-success">Condição:</strong> {translateWord(product.condition)}</p>
              <p className=""><strong className="text-success">Estado:</strong> {translateWord(product.product_condition_status)}</p>
              {product.product_condition_description && (
                <p className=""><strong className="text-success">mais informações:</strong> {translateWord(product.product_condition_description)}</p>
              )}
              <p className=""><strong className="text-success">Descrição:</strong> {product.description}</p>
            </div>
          </div>

          <div className="col-11 col-md-4 card-product">
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
              <button className="btn-chat w-100 mt-3 mb-2" onClick={() => showSellerContact()}>Mostrar contato do vendedor</button>
              <div id="user-contact" className="d-none">
                <p className=" text-center"><strong className="text-success mask-phone">Telefone:</strong>  {product.user.phone_number}</p>
              </div>
            </>)}
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
