import React, { useEffect, useState } from "react";



export function Bikes(props) {
  const [bikes, setBikes] = useState([])
  const [categoryFilter, setCategoryFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [modalityFilter, setModalityFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [bikeTypeFilter, setBikeTypeFilter] = useState("");
  const [frameBrandFilter, setFrameBrandFilter] = useState("");
  const [frameSizeFilter, setFrameSizeFilter] = useState("");
  const [frameMaterialFilter, setFrameMaterialFilter] = useState("");
  const [suspensionTypeFilter, setSuspensionTypeFilter] = useState("");
  const [frontSuspensionTravelFilter, setFrontSuspensionTravelFilter] = useState("");
  const [frontSuspensionModelFilter, setFrontSuspensionModelFilter] = useState("");
  const [rearSuspensionTravelFilter, setRearSuspensionTravelFilter] = useState("");
  const [rearSuspensionModelFilter, setRearSuspensionModelFilter] = useState("");

  const [frontGearsFilter, setFrontGearsFilter] = useState("");
  const [rearGearsFilter, setRearGearsFilter] = useState("");
  const [frontDerailleurModelFilter, setFrontDerailleurModelFilter] = useState("");
  const [rearDerailleurModelFilter, setRearDerailleurModelFilter] = useState("");

  useEffect(async () => {
    let url = "/api/v1/bikes?";
    if (categoryFilter) url = url + `&category=${categoryFilter}`
    if (modalityFilter) url = url + `&modality=${modalityFilter}`
    if (conditionFilter) url = url + `&condition=${conditionFilter}`
    if (priceFilter) url = url + `&price=${priceFilter}`
    if (yearFilter) url = url + `&year=${yearFilter}`
    if (bikeTypeFilter) url = url + `&bike_type=${bikeTypeFilter}`
    if (frameSizeFilter) url = url + `&frame_size=${frameSizeFilter}`
    if (frameBrandFilter) url = url + `&frame_brand=${frameBrandFilter}`
    if (frameMaterialFilter) url = url + `&frame_material=${frameMaterialFilter}`
    if (suspensionTypeFilter) url = url + `&suspension_type=${suspensionTypeFilter}`
    if (frontSuspensionTravelFilter) url = url + `&front_suspension_travel=${frontSuspensionTravelFilter}`
    if (rearSuspensionTravelFilter) url = url + `&rear_suspension_travel=${rearSuspensionTravelFilter}`
    if (frontSuspensionModelFilter) url = url + `&front_suspension_model=${frontSuspensionModelFilter}`
    if (rearSuspensionModelFilter) url = url + `&rear_suspension_model=${rearSuspensionModelFilter}`
    if (frontDerailleurModelFilter) url = url + `&front_derailleur_model=${frontDerailleurModelFilter}`
    if (rearDerailleurModelFilter) url = url + `&rear_derailleur_model=${rearDerailleurModelFilter}`
    if (frontGearsFilter) url = url + `&number_of_front_gears=${frontGearsFilter}`
    if (rearGearsFilter) url = url + `&number_of_rear_gears=${rearGearsFilter}`





    const response = await axios.get(url);
    setBikes(response.data.bikes);
  }, [categoryFilter, modalityFilter, conditionFilter, priceFilter, yearFilter, bikeTypeFilter, frameSizeFilter, frameBrandFilter, frameMaterialFilter, suspensionTypeFilter,
    suspensionTypeFilter, frontSuspensionTravelFilter, rearSuspensionTravelFilter, frontSuspensionModelFilter, rearSuspensionModelFilter, frontDerailleurModelFilter,
    rearDerailleurModelFilter, frontGearsFilter, rearGearsFilter])


  const handleFilter = (e) => {
    const sectionFilter = document.getElementById(e.target.innerText);
    console.log(sectionFilter);
    sectionFilter.classList.toggle("d-none")
  }

  //?///////////////////////////////////FRAME FILTERS/////////////////////////////////////////
  const frameBrands = ["",
    "alfameq",
    "astro",
    "audax",
    "bH",
    "bianchi",
    "bMC",
    "caloi",
    "cannondale",
    "canyon",
    "carrera",
    "cervelo",
    "corratec",
    "cube",
    "dabomb",
    "felt",
    "first",
    "focus",
    "fuji",
    "giant",
    "groove",
    "gT",
    "gTS",
    "ibis",
    "jamis",
    "kona",
    "lapierre",
    "marin",
    "merida",
    "mosso",
    "oggi",
    "orbea",
    "pinarello",
    "raleigh",
    "rava",
    "ridley",
    "santa_cruz",
    "schwinn",
    "scott",
    "sense",
    "soul",
    "specialized",
    "swift Carbon",
    "trek",
    "tsw",
    "wilier",
    "yt",
    "argon_21",
    "bliv",
    "blue",
    "bottecchia",
    "cipollini",
    "cly",
    "cumberland",
    "de_rosa",
    "e_moving",
    "gary_fisher",
    "gioia",
    "kaiena",
    "kestrel",
    "kode",
    "kuota",
    "lazzaretti",
    "lev_e_bike",
    "litespeed",
    "look",
    "lotus",
    "mercian",
    "miyamura Gravel",
    "open",
    "quintana_roo",
    "redland",
    "riva",
    "rose",
    "sava",
    "sundown",
    "time",
    "trinx",
    "trust",
    "velorbis",
    "vicinitech",
    "victory",
    "eddy_merckx",
    "salsa",
    "surly",
    "soma",
    "diamondback",
    "dahon",
    "other"
  ].sort()

  const roadFrameSizes =  ["", "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL"]
  const dirtMtbFrameSizes =   ["", "<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
  const allFrameSizes = ["", "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL", "<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''"
  , "M/L"]
  const frameMaterials = ["", "aluminum ", "carbon", "carbon_aluminum_chainstay", "other"]


  /////////////////////////////////////////////////////////////////////////////////////SUSPENSÃO////////////////////////////////////////////////////////////////////////////


  const suspensionTypes = ["", "no_suspension", "full_suspension", "hardtail"]
  const frontSuspensionTravels = ["", "80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm"]
  const rearSuspensionTravels = ["", "80 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm"]

  const shockSizes = ["", "165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
  const allRearSuspensionTravel = ["", "165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "80 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm"]
  const mtbDirtUrbanFrontSuspensionModels = ["", "FOX 32", "FOX 34", "FOX 36", "FOX 38", "FOX 40", "ROCKSHOX 30", "ROCKSHOX 35", "ROCKSHOX BLUTO", "ROCKSHOX BOXXER", "ROCKSHOX DOMAIN", "ROCKSHOX JUDY", "ROCKSHOX LYRIK", "ROCKSHOX PARAGON", "ROCKSHOX PIKE", "ROCKSHOX REBA ", "ROCKSHOX RECON", "ROCKSHOX REVELATION", "ROCKSHOX RUDY", "ROCKSHOX SEKTOR", "ROCKSHOX SID", "ROCKSHOX YARI", "ROCKSHOX ZEB", "other"]


  const mtbDirtUrbanRearSuspensionModels = ["", "FOX DHX", "FOX DHX2 ", "FOX FLOAT DPS", "FOX FLOAT DPX2", "FOX FLOAT X", "FOX FLOAT X2", "ROCKSHOX DELUXE", "ROCKSHOX MONARCH", "ROCKSHOX SIDLUXE", "ROCKSHOX SUPER DELUXE", "other"]


////////////////////////////////////////////////////////////////////////////////////////////TRANSMISSÂO//////////////////////////////////////////////////////////////////////

  const frontDerailleurModels = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival"]
  const rearDerailleurModels = [ "SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", , "SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SRAM XX1"]

  const frontGears = [0, 1, 2, 3]
  const rearGears = [0, 1, 7, 8, 9, 10, 11, 12]



  return (
    <div className="p-5 br-8">
      <h2>Bikes</h2>
      <div className="row row-cols-1 mt-5">
        <div className="filters col-12 col-md-3 my-1">
          <p className="text-success">Filtrar</p>
            <div className="condition-filter">
                <h5 className="text-success mt-3">tipo</h5>
                <label htmlFor="new" className="me-2">
                  <input
                    type="radio"
                    value="e-bike"
                    onChange={(e) => setBikeTypeFilter(e.target.value)}
                  />Elétrica
                </label>

                <label htmlFor="used" className="me-2">
                  <input
                    type="radio"
                    value="normal"
                    onChange={(e) => setBikeTypeFilter(e.target.value)}
                  />Normal
                </label>
              </div>

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
                <option value="triathlon">triathon</option>
                <option value="ciclocross">Ciclocross</option>
                <option value="cicloviagem">Cicloviagme</option>
                <option value="gravel">Gravel</option>
              </select>
            </>)}

            <div className="condition-filter">
              <h5 className="text-success mt-3">condição</h5>
              <label htmlFor="new" className="me-2">
                <input
                  type="radio"
                  value="new"
                  onChange={(e) => setConditionFilter(e.target.value)}
                />Novo
              </label>

              <label htmlFor="used" className="me-2">
                <input
                  type="radio"
                  value="used"
                  onChange={(e) => setConditionFilter(e.target.value)}
                />Usado
              </label>
            </div>

            <div className="price-filter">
              <div className="d-flex justify-content-between">
                <h5 className="text-success mt-3">preço</h5>
                {priceFilter && (<>
                  <h5 className="text-success mt-3">
                  {(priceFilter / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h5>
                </>)}
              </div>
              <input type="range" class="form-range" min="0" max="50000" id="customRange1" step="100" onChange={(e) => setPriceFilter(e.target.value)} />
              <div className="d-flex justify-content-between">
                <h6 className="text-success price-filter-text"><small>R$0,00</small></h6>
                <h6 className="text-success price-filter-text"><small>R$50.000,00</small></h6>
              </div>
            </div>

            <div className="year-filter">
              <div className="d-flex justify-content-between">
                <h5 className="text-success mt-3">ano</h5>
                {yearFilter && (<>
                  <h5 className="text-success mt-3">
                  {yearFilter}
                </h5>
                </>)}
              </div>
              <input type="range" class="form-range" min="2002" max="2022" id="customRange1" step="1" onChange={(e) => setYearFilter(e.target.value)} />
              <div className="d-flex justify-content-between">
                <h6 className="text-success price-filter-text"><small>2002</small></h6>
                <h6 className="text-success price-filter-text"><small>2022</small></h6>
              </div>
            </div>

            <button type="button" className="btn-filter mt-1" onClick={(e) => handleFilter(e)}>Quadro</button>
            <div id="Quadro" className="frame-filter d-none">

              {!categoryFilter && (<>
                <h5 className="text-success mt-3">tamanho</h5>

                <select
                  className="select-answer"
                  value={frameSizeFilter}
                  onChange={(e) => setFrameSizeFilter(e.target.value)}

                >
                  {allFrameSizes.map((frameSize, index)=> {
                    return (<option key={index}>{frameSize}</option>);
                  })}
                </select>
              </>)}

              {categoryFilter === "road" && (<>
                <h5 className="text-success mt-3">tamanho</h5>

                <select
                  className="select-answer"
                  value={frameSizeFilter}
                  onChange={(e) => setFrameSizeFilter(e.target.value)}

                >
                  {roadFrameSizes.map((frameSize, index)=> {
                    return (<option key={index}>{frameSize}</option>);
                  })}
                </select>
              </>)}

              {["dirt_street", "mountain_bike", "infant", "urban"].includes(categoryFilter) && (<>
                <h5 className="text-success mt-3">tamanho</h5>
                <select
                  className="select-answer"
                  value={frameSizeFilter}
                  onChange={(e) => setFrameSizeFilter(e.target.value)}

                >
                  {dirtMtbFrameSizes.map((frameSize, index)=> {
                    return (<option key={index}>{frameSize}</option>);
                  })}
                </select>
              </>)}

              <h5 className="text-success mt-3">marca</h5>
              <select
                className="select-answer"
                value={frameBrandFilter}
                onChange={(e) => setFrameBrandFilter(e.target.value)}

              >
                {frameBrands.map((frameBrand, index) => {
                  return (<option key={index}>{frameBrand}</option>);
                })}
              </select>

              <h5 className="text-success mt-3">material</h5>
              <select
                className="select-answer"
                value={frameMaterialFilter}
                onChange={(e) => setFrameMaterialFilter(e.target.value)}

              >
                {frameMaterials.map((frameMaterial, index)=> {
                  return (<option key={index}>{frameMaterial}</option>);
                })}
              </select>
            </div>

            <button type="button" className="btn-filter mt-2" onClick={(e) => handleFilter(e)}>Suspensão</button>
            <div id="Suspensão" className="suspension-filter d-none">
              <>
                <h5 className="text-success mt-3">tipo</h5>
                <select
                  className="select-answer"
                  value={suspensionTypeFilter}
                  onChange={(e) => setSuspensionTypeFilter(e.target.value)}

                >
                  {suspensionTypes.map((suspensionType, index)=> {
                    return (<option key={index}>{suspensionType}</option>);
                  })}
                </select>
              </>

              {["full_suspension", "hardtail"].includes(suspensionTypeFilter) && (<>
                <h5 className="text-success mt-3">curso dianteira</h5>

                <select
                  className="select-answer"
                  value={frontSuspensionTravelFilter}
                  onChange={(e) => setFrontSuspensionTravelFilter(e.target.value)}

                >
                  {frontSuspensionTravels.map((frontSuspensionTravel, index)=> {
                    return (<option key={index}>{frontSuspensionTravel}</option>);
                  })}
                </select>

                <h5 className="text-success mt-3">modelo</h5>

                <select
                  className="select-answer"
                  value={frontSuspensionModelFilter}
                  onChange={(e) => setFrontSuspensionModelFilter(e.target.value)}

                >
                  {mtbDirtUrbanFrontSuspensionModels.map((frontSuspensionModel, index)=> {
                    return (<option key={index}>{frontSuspensionModel}</option>);
                  })}
                </select>
              </>)}

              {suspensionTypeFilter === "full_suspension" && (<>
                <h5 className="text-success mt-3">curso traseira</h5>
                <select
                  className="select-answer"
                  value={rearSuspensionTravelFilter}
                  onChange={(e) => setRearSuspensionTravelFilter(e.target.value)}

                >
                  {allRearSuspensionTravel.map((frameSize, index)=> {
                    return (<option key={index}>{frameSize}</option>);
                  })}
                </select>

                <h5 className="text-success mt-3">modelo</h5>
                <select
                  className="select-answer"
                  value={rearSuspensionModelFilter}
                  onChange={(e) => setRearSuspensionModelFilter(e.target.value)}

                >
                  {mtbDirtUrbanRearSuspensionModels.map((rearSuspensionModel, index)=> {
                    return (<option key={index}>{rearSuspensionModel}</option>);
                  })}
                </select>


              </>)}
            </div>

            <button type="button" className="btn-filter mt-2" onClick={(e) => handleFilter(e)}>Transmissão</button>
            <div id="Transmissão" className="suspension-filter d-none">
              <>
                <h5 className="text-success mt-3">marchas dianteiras</h5>
                <select
                  className="select-answer"
                  value={frontGearsFilter}
                  onChange={(e) => setFrontGearsFilter(e.target.value)}

                >
                  {frontGears.map((frontGear, index)=> {
                    return (<option key={index}>{frontGear}</option>);
                  })}
                </select>
              </>


              <h5 className="text-success mt-3">modelo dianteira</h5>
              <select
                className="select-answer"
                value={frontDerailleurModelFilter}
                onChange={(e) => setFrontDerailleurModelFilter(e.target.value)}

              >
                {frontDerailleurModels.map((frontDerailleurModel, index)=> {
                  return (<option key={index}>{frontDerailleurModel}</option>);
                })}
              </select>

              <h5 className="text-success mt-3">marchas traseiras</h5>

              <select
                className="select-answer"
                value={rearGearsFilter}
                onChange={(e) => setRearGearsFilter(e.target.value)}

              >
                {rearGears.map((rearGear, index)=> {
                  return (<option key={index}>{rearGear}</option>);
                })}
              </select>



              <h5 className="text-success mt-3">modelo traseira</h5>
              <select
                className="select-answer"
                value={rearDerailleurModelFilter}
                onChange={(e) => setRearDerailleurModelFilter(e.target.value)}

              >
                {rearDerailleurModels.map((frameSize, index)=> {
                  return (<option key={index}>{frameSize}</option>);
                })}
              </select>
            </div>
        </div>

        <div className="col-12 col-md-9 d-flex flex-wrap">
          {bikes.map((bike, idx) => {
            return (
              <div className="cards-index" bike={bike} key={bike.id}>
                <a href={"bikes/" + bike.id} className="remove-link">
                  <div className="cards-bikes">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                      <div className="carousel-inner">
                        <i className="fas fa-heart card-favorite"></i>
                        <div className="carousel-item active">
                          <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-index" alt="" />
                        </div>
                        <div className="carousel-item">
                          <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-index" alt="" />
                        </div>
                        <div className="carousel-item">
                          <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-index" alt="" />
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
                    <h4 className="card-title text-center mt-3">{bike.model}</h4>
                    <h4 className="text-center mt-1">
                      {(bike.price_in_cents / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h4>
                    <hr/>
                    <div className="card-content mt-2">
                      <p className="text-center mt-1">{bike.category.name} | {bike.modality}</p>
                      <div className="d-flex justify-content-around">
                        <p>{bike.suspension_type}</p>
                        <p>{bike.brake_type}</p>
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
