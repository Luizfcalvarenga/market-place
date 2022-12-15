import React, { useEffect, useState } from "react";
import EquipamentImage from "../../../assets/images/helmet.png";
import AccessorieImage from "../../../assets/images/accessories.png";
import ComponentImage from "../../../assets/images/frame.png";
import CasualImage from "../../../assets/images/cap.png";
import ClotheImage from "../../../assets/images/tshirt.png";
import MaintenanceImage from "../../../assets/images/tools.png";




export function Products(props) {
  const [products, setProducts] = useState([])
  const [productTypes, setProductTypes] = useState([])
  const [productTypeAttributes, setProductTypeAttributes] = useState([])
  const [attributesForProduct, setAttributesForProduct] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [productTypeFilter, setProductTypeFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");

  const [modalityFilter, setModalityFilter] = useState("");
  const [productAttributesFilter, setProductAttributesFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [minYearFilter, setMinYearFilter] = useState("");
  const [maxYearFilter, setMaxYearFilter] = useState("");

  const [localityFilter, setLocalityFilter] = useState("");
  const [filteredLink, setFilteredLink] = useState("");




  const [sortBy, setSortBy] = useState("");

  useEffect(async () => {
    let url = "/api/v1/products?";
    if (categoryFilter) url = url + `&category=${categoryFilter}`
    if (modalityFilter) url = url + `&modality=${modalityFilter}`
    if (productTypeFilter) url = url + `&product_type_id=${productTypeFilter}`
    if (conditionFilter) url = url + `&condition=${conditionFilter}`
    if (minPriceFilter) url = url + `&min_price=${minPriceFilter}`
    if (maxPriceFilter) url = url + `&max_price=${maxPriceFilter}`

    if (productAttributesFilter) url = url + `&product_attribute_value=${productAttributesFilter}`
    if (brandFilter) url = url + `&brand=${brandFilter}`
    if (modelFilter) url = url + `&model=${modelFilter}`
    if (localityFilter) url = url + `&locality=${localityFilter}`
    if (minYearFilter) url = url + `&min_year=${minYearFilter}`
    if (maxYearFilter) url = url + `&max_year=${maxYearFilter}`
    if (filteredLink) url = url + `&product_type_id=${filteredLink}`



    console.log(window.location)

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if (params.product_type_id) {
      setFilteredLink(params.product_type_id)
    }

    const response = await axios.get(url);
    console.log(response)
    setProducts(response.data.products);
    setProductTypes(response.data.product_types.sort(function (a, b) {
      if (a.prompt < b.prompt) {
        return -1;
      }
      if (a.prompt > b.prompt) {
        return 1;
      }
      return 0;
    }))
    setProductTypeAttributes(response.data.product_type_attributes)

  }, [categoryFilter, modalityFilter, sortBy, productTypeFilter, conditionFilter, minPriceFilter, maxPriceFilter, productAttributesFilter, brandFilter, modelFilter, localityFilter, minYearFilter, maxYearFilter, filteredLink])




  const handleProductAtributes = (e) => {
    console.log(e)
    setProductTypeFilter(e.target.value)
    const attrs = productTypeAttributes.filter(attribute => attribute.product_type_id === Number(e.target.value))
    setAttributesForProduct(attrs)

    if (attrs.length > 1 ) {
      attrs.pop()
      console.log(attrs)
      attrs.shift()
      console.log(attrs)
    }
  }

  const renderProductAttributeSelect = (attribute, index) => {
    // VERIFICAR RETORNO DO ESCOLHA DE TIPO DE SUSPENSÃO PARA COMPONENTO QUADROAPARENTEMENTE PRA QUADRO E HARDTAIL NÃO PERGUNTA CURSO DE NENHUMA SUSPANSÃO(CONFERIR)
    let options = []
    if (["mountain_bike", "dirt_street"].includes(categoryFilter) && attribute.name === "frame_size") {
      options = [ "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL" ]
    } else if (categoryFilter === "road" && attribute.name === "frame_size") {
      options = ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
    } else if (!categoryFilter && attribute.name === "frame_size") {
      options = ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "M/L", "XL", "XXL"]
    } else if (attribute.name === "frame_brand") {
      return
    } else if (attribute.name === "suspension_type") {
      options = [ ["no_suspension", "Sem Suspensão"], ["full_suspension", "Full Suspension" ]]
    } else if (attribute.name === "brake_type") {
      options = [ ["v_brake", "V-Brake"], ["hydraulic_disc", "À Disco Hidraulico" ], ["mechanical_disc", "À Disco Mecânico" ], ["coaster_brake", "Contra Pedal" ]]
    }  else if (attribute.name === "condition") {
      options = [ ["new", "Novo"], ["used", "Usado" ]]
    }  else if (attribute.name === "documentation_type") {
      options = [ ["receipt", "Nota Fiscal"], ["import_document", "Documento de Importação" ], ["foreign_tax_coupon", "Cupom Fiscal Estrangeiro" ], ["no_documentation", "Sem Documentação" ]]
    } else if (attribute.name === "frame_material") {
      options = [ ["carbon", "Carbono"], ["aluminum", "Aluminio" ], ["carbon_aluminum_chainstay", "Carbono/Aumínio (Chainstay)" ], ["other", "Outro" ]]
    } else if (attribute.name === "rim_material") {
      options = [ ["carbon", "Carbono"], ["aluminum", "Aluminio" ], ["carbon_aluminum_chainstay", "Carbono/Aumínio (Chainstay)" ], ["other", "Outro" ]]
    } else if (attribute.name === "brake_model" || attribute.name === "model" ) {
      return
    } else if (attribute.name === "seat_post_type") {
      options = [ ["retractable", "Retrátil"], ["rigid", "Rigido" ]]
    } else if (attribute.options.includes("other") ) {
      attribute.options.pop()
      options = attribute.options
    } else {
      options = attribute.options
    }

    return (
      <div className="attributes-filters">
        <h5 className="text-success mt-3" key={index}>{attribute.prompt}</h5> <br />
        <select
        className="select-answer"
        onChange={(e) => setProductAttributesFilter(e.target.value)}
        >
          <option value=""></option>
          {options?.map((option, index) => {
             if (Array.isArray(option)) {
              return (
                <option key={index} value={option[0]}>{option[1]}</option>
              )
            } else {
              return (

                <option key={index} value={option}>{option}</option>
              )
            }
          })}
        </select>
      </div>
    )
  }

  const handleConditionFilter = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      setConditionFilter(e.target.value)
    } else {
      setConditionFilter("")
    }
  }

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


  const componentBrands = ["SHIMANO", "SRAM", "FOX", "ROCKSHOX", "SPECIALIZED", "Alfameq",
  "Astro",
  "Audax",
  "BH",
  "Bianchi",
  "BMC",
  "Caloi",
  "Cannondale",
  "Canyon",
  "Carrera",
  "Cervelo",
  "Corratec",
  "Cube",
  "Dabomb",
  "Felt",
  "First",
  "Focus",
  "Fuji",
  "Giant",
  "Groove",
  "GT",
  "GTS",
  "Ibis",
  "Jamis",
  "Kona",
  "Lapierre",
  "Marin",
  "Merida",
  "Mosso",
  "Oggi",
  "Orbea",
  "Pinarello",
  "Raleigh",
  "Rava",
  "Ridley",
  "Santa_cruz",
  "Schwinn",
  "Scott",
  "Sense",
  "Soul",
  "Specialized",
  "Swift Carbon",
  "Trek",
  "Tsw",
  "Wilier",
  "YT",
  "Argon 21",
  "Bliv",
  "Blue",
  "Bottecchia",
  "Cipollini",
  "Cly",
  "Cumberland",
  "De Rosa",
  "E Moving",
  "Gary Fisher",
  "Gioia",
  "Kaiena",
  "Kestrel",
  "Kode",
  "Kuota",
  "Lazzaretti",
  "Lev E-Bike",
  "Litespeed",
  "Look",
  "Lotus",
  "Mercian",
  "Miyamura Gravel",
  "Open",
  "Quintana Roo",
  "Redland",
  "Riva",
  "Rose",
  "Sava",
  "Sundown",
  "Time",
  "Trinx",
  "Trust",
  "Velorbis",
  "Vicinitech",
  "Victory",
  "Eddy Merckx",
  "Salsa",
  "Surly",
  "Soma",
  "Diamondback",
  "Dahon"].sort()
  const componentModels = ["SLX", "ACERA", "ALIVIO", "ALTUS", "DEORE", "SAINT", "TOURNEY", "XT", "XTR", "ZEE", "Code", "DB", "G2", "GUIDE", "Level",
    "32", "34", "36", "38", "40", "30", "35", "BLUTO", "BOXXER", "DOMAIN", "JUDY", "LYRIK", "PARAGON", "PIKE", "REBA ", "RECON", "REVELATION", "RUDY", "SEKTOR", "SID", "YARI", "ZEB",
    "DHX", "DHX2 ", "FLOAT DPS", "FLOAT DPX2", "FLOAT X", "FLOAT X2", "DELUXE", "MONARCH", "SIDLUXE", "SUPER DELUXE", "105", "CLARIS", "DURA-ACE", "SORA", "TIAGRA", "TOURNEY", "ULTEGRA", "Force", "GRX", "RED", "Rival"
  ].sort()



  return (
    <div className="p-5 br-8 index-container">
      <h2 className="text-center text-success">Produtos</h2>
      <div className="row row-cols-1 mt-5">
        <div className="filters col-12 col-md-3 my-1">
          <p className="text-success">Filtrar</p>
          <div className="">
            <div className="condition-filter">
              <h5 className="text-success mt-3">condição</h5>
              <div className="d-flex justify-content-between">
                <label htmlFor="new" className="me-2 text-success">
                  <input
                    type="checkbox"
                    value="new"
                    name="condition"
                    onChange={(e) => handleConditionFilter(e)}
                  />  Novo
                </label>

                <label htmlFor="used" className="me-2 text-success">
                  <input
                    type="checkbox"
                    value="used"
                    name="condition"
                    onChange={(e) => handleConditionFilter(e)}
                  />  Usado
                </label>
              </div>
            </div>
            <h5 className="text-success mt-3">Produto</h5>
            <select
              value={productTypeFilter}
              onChange={(e) => handleProductAtributes(e)}
              className="select-answer"
            >
              <option value=""></option>
              {productTypes.map((productType, index) => {
                return (<option key={index} value={productType.id}>{productType.prompt}</option>)
              })}
            </select>



            <h5 className="text-success mt-3">categoria</h5>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="select-answer"
            >
              <option value=""></option>
              <option value="mountain_bike">Mountain Bike</option>
              <option value="dirt_street">Dirt</option>
              <option value="road">Road</option>
              <option value="infant">Infantil</option>
              <option value="urban">Urbano</option>
            </select>

            {categoryFilter === "mountain_bike" && (<>
              <h5 className="text-success mt-3">Modalidade</h5>
              <select
                value={modalityFilter}
                onChange={(e) => setModalityFilter(e.target.value)}
                className="select-answer"
              >
                <option value=""></option>
                <option value="downhill">Downhill</option>
                <option value="enduro">Enduro</option>
                <option value="gravel">Gravel</option>
                <option value="speed">Speed</option>
                <option value="trail">Trail</option>
                <option value="xc_cross_country">XC Cross Country</option>
              </select>
            </>)}

            {categoryFilter === "dit_street" && (<>
              <h5 className="text-success mt-3">Modalidade</h5>
              <select
                value={modalityFilter}
                onChange={(e) => setModalityFilter(e.target.value)}
                className="select-answer"

              >
                <option value=""></option>
                <option value="street_bmx">Street BMX</option>
                <option value="race_bmx">Race BMX</option>
                <option value="big_wheel_bmx">Big Wheel BMX</option>
                <option value="dirt_jump">Dirt Jump</option>
              </select>
            </>)}

            {categoryFilter === "road" && (<>
              <h5 className="text-success mt-3">Modalidade</h5>
              <select
                value={modalityFilter}
                onChange={(e) => setModalityFilter(e.target.value)}
                className="select-answer"
              >
                <option value=""></option>
                <option value="speed_performance">Speed Performance</option>
                <option value="triathlon">Triathon</option>
                <option value="ciclocross">Ciclocross</option>
                <option value="cicloviagem">Cicloviagme</option>
                <option value="gravel">Gravel</option>
              </select>
            </>)}

            {!categoryFilter && (<>
              <h5 className="text-success mt-3">Modalidade</h5>
              <select
                value={modalityFilter}
                onChange={(e) => setModalityFilter(e.target.value)}
                className="select-answer"

              >
                <option value=""></option>
                <option value="speed_performance">Speed Performance</option>
                <option value="triathlon">triathon</option>
                <option value="ciclocross">Ciclocross</option>
                <option value="cicloviagem">Cicloviagme</option>
                <option value="gravel">Gravel</option>
                <option value="downhill">Downhill</option>
                <option value="enduro">Enduro</option>
                <option value="speed">Speed</option>
                <option value="trail">Trail</option>
                <option value="xc_cross_country">XC Cross Country</option>
                <option value="street_bmx">Street BMX</option>
                <option value="race_bmx">Race BMX</option>
                <option value="big_wheel_bmx">Big Wheel BMX</option>
                <option value="dirt_jump">Dirt Jump</option>
              </select>
            </>)}

            <div className="brand-filter">
              <h5 className="text-success mt-3">Marca</h5>
              <select
              value={brandFilter ? brandFilter : ""}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="select-answer"
              >
                <option value=""></option>
                {componentBrands.map((componentBrand, index) => {
                  return (<option key={index} value={componentBrand}>{componentBrand}</option>)
                })}
              </select>
            </div>

            <div className="model-filter">
              <h5 className="text-success mt-3">Modelo</h5>
              <select
              value={modelFilter ? modelFilter : ""}
              onChange={(e) => setModelFilter(e.target.value)}
              className="select-answer"
              >
                <option value=""></option>
                {componentModels.map((componentModel, index) => {
                  return (<option key={index} value={componentModel}>{componentModel}</option>)
                })}
              </select>
            </div>

            <div className="locality-filter">
              <h5 className="text-success mt-3">Local</h5>
              <input type="text" className="text-input" onChange={(e) => setLocalityFilter(e.target.value)}/>
            </div>

            <div className="price-filter">
              <div className="">
                <h5 className="text-success mt-3">preço</h5>
                <div className="d-flex justify-content-between">
                  <input type="number" className="text-input" placeholder="DE"  onChange={(e) => setMinPriceFilter(e.target.value * 100)}/>
                  <input type="number" className="text-input" placeholder="ATÉ" onChange={(e) => setMaxPriceFilter(e.target.value * 100)}/>
                </div>
              </div>
            </div>

            <div className="year-filter">
            <div className="">
                <h5 className="text-success mt-3">ano</h5>
                <div className="d-flex justify-content-between">
                  <input type="number" className="text-input" placeholder="DE" onChange={(e) => setMinYearFilter(e.target.value)}/>
                  <input type="number" className="text-input" placeholder="ATÉ" onChange={(e) => setMaxYearFilter(e.target.value)}/>
                </div>
              </div>
            </div>

            {productTypeFilter.length > 1 && (<>
              <h5 className="text-success mt-3">Atributos</h5>
                {attributesForProduct.map((attribute, index) => {
                  return renderProductAttributeSelect(attribute, index)
                })}
            </>)}

            {productTypeFilter.length === 1 && (<>
              <h5 className="text-success mt-3">Atributos</h5>
                {attributesForProduct.map((attribute, index) => {
                  return renderProductAttributeSelect(attribute, index)
                })}
            </>)}


          </div>
        </div>
        <div className="col-12 col-md-9 d-flex flex-wrap">
          {products.map((product, idx) => {
            return (
              <div className="w-25" product={product} key={product.id} id="mobile">
                <a href={"products/" + product.id} className="remove-link">
                  <div className="cards-products">
                    <div id={"carouselExampleControls" + product.id.toString()} className="carousel slide" data-bs-ride="carousel">
                      <div className="carousel-inner">
                        {product.photos.map((photo, index) => {
                          return (

                            <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                              <img src={photo} className="d-block w-100 img-card-index" alt="" />
                            </div>
                          )
                        })}
                      </div>
                      {product.photos.length === 0 && (
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-index" alt="" />
                          </div>
                          <div className="carousel-item">
                            <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-index" alt="" />
                          </div>
                        </div>
                      )}
                      <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleControls" + product.id.toString()} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next" type="button" data-bs-target={"#carouselExampleControls" + product.id.toString()} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                    <div className="d-flex justify-content-center gap-2 mt-1">
                      <h4 className="card-title text-center">{product.brand}</h4>
                      <h4 className="card-title text-center">{product.model}</h4>
                    </div>
                    <h4 className="text-center card-title mt-1">
                      {(product.price_in_cents / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h4>
                    <hr className="index-line"/>
                    <div className="card-content mt-2">
                      <div className="d-flex justify-content-around mb-2">
                        <div className="infos">
                          <p>{product.locality}</p>
                          <p>{product.product_type.prompt}</p>
                        </div>
                        <div className="infos">
                          <button type="button" onClick={(e) => handleLike(e)} className="like-btn" id={product.id}><i className="far fa-heart"></i></button> <br />
                          { ["car_accessories", "bike_accessories", "training_accessories", "pre_after_pedal_accessories"].includes(product.product_type.name) &&(
                            <img src={AccessorieImage} alt="" className="icon-card-index ms-1"/>
                          )}
                          { ["battery", "brake", "brake_levers", "cassete","chain", "chainring", "crankset", "fender", "frame", "front_derailleur", "front_shifter", "front_suspension", "full_wheel", "grips", "handlebar", "headset", "hub", "pedals", "rim", "saddle", "seat_post", "spoke", "rear_derailleur", "rear_shifter", "rear_suspension", "stem", "tyre"].includes(product.product_type.name) &&(
                            <img src={ComponentImage} alt="" className="icon-card-index ms-1"/>
                          )}
                          { ["helmet", "elbow_pad", "knee_pad", "water_bottle", "bottle_cage", "hydration_backpack", "fanny_pack", "sneaker"].includes(product.product_type.name) &&(
                            <img src={EquipamentImage} alt="" className="icon-card-index ms-1"/>
                          )}
                          { ["cap", "glasses"].includes(product.product_type.name) &&(
                            <img src={CasualImage} alt="" className="icon-card-index ms-1"/>
                          )}
                          { ["air_bomb", "lubricant", "sealant"].includes(product.product_type.name) &&(
                            <img src={MaintenanceImage} alt="" className="icon-card-index ms-1"/>
                          )}
                          { ["bretelle", "shorts", "inner_shorts", "shirt", "vest", "windbreaker", "thermal_clothing"].includes(product.product_type.name) &&(
                            <img src={ClotheImage} alt="" className="icon-card-index ms-1"/>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
