import React, { useEffect, useState } from "react";
import NormalBikeImage from "../../../assets/images/normal-bike.png";
import EBikeImage from "../../../assets/images/e-bike.png";

export function Bikes(props) {
  const [bikes, setBikes] = useState([])
  const [categoryFilter, setCategoryFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [modalityFilter, setModalityFilter] = useState("");
  const [minYearFilter, setMinYearFilter] = useState("");
  const [maxYearFilter, setMaxYearFilter] = useState("");
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
  const [brakeTypeFilter, setBrakeTypeFilter] = useState("");
  const [brakeDiscSizeFilter, setBrakeDiscSizeFilter] = useState("");
  const [brakeModelFilter, setBrakeModelFilter] = useState("");
  const [rimSizeFilter, setRimSizeFilter] = useState("");
  const [seatPostTypeFilter, setSeatPostTypeFilter] = useState("");
  const [seatPostTravelFilter, setSeatPostTravelFilter] = useState("");
  const [seatPostModelFilter, setSeatPostModelFilter] = useState("");
  const [batteryFilter, setBatteryFilter] = useState("");
  const [batteryCyclesFilter, setBatteryCyclesFilter] = useState("");
  const [mileageFilter, setMileageFilter] = useState("");
  const [localityFilter, setLocalityFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [cranksetFilter, setCranksetFilter] = useState("");
  const [chainFilter, setChainFilter] = useState("");
  const [rimFilter, setRimFilter] = useState("");
  const [hubFilter, setHubFilter] = useState("");
  const [tyreFilter, setTyreFilter] = useState("");
  const [stemFilter, setStemFilter] = useState("");
  const [handlebarFilter, setHandlebarFilter] = useState("");
  const [filteredLink, setFilteredLink] = useState("");


  useEffect(async () => {
    let url = "/api/v1/bikes?";
    if (categoryFilter) url = url + `&category=${categoryFilter}`
    if (modalityFilter) url = url + `&modality=${modalityFilter}`
    if (conditionFilter) url = url + `&condition=${conditionFilter}`
    if (minPriceFilter) url = url + `&min_price=${minPriceFilter}`
    if (maxPriceFilter) url = url + `&max_price=${maxPriceFilter}`
    if (minYearFilter) url = url + `&min_year=${minYearFilter}`
    if (maxYearFilter) url = url + `&max_year=${maxYearFilter}`
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
    if (brakeTypeFilter) url = url + `&brake_type=${brakeTypeFilter}`
    if (brakeDiscSizeFilter) url = url + `&brake_disc_size=${brakeDiscSizeFilter}`
    if (brakeModelFilter) url = url + `&brake_model=${brakeModelFilter}`
    if (rimSizeFilter) url = url + `&rim_size=${rimSizeFilter}`
    if (seatPostTypeFilter) url = url + `&seat_post_type=${seatPostTypeFilter}`
    if (seatPostTravelFilter) url = url + `&seat_post_travel=${seatPostTravelFilter}`
    if (seatPostModelFilter) url = url + `&seat_post_model=${seatPostModelFilter}`
    if (batteryFilter) url = url + `&battery=${batteryFilter}`
    if (batteryCyclesFilter) url = url + `&battery_cycles=${batteryCyclesFilter}`
    if (mileageFilter) url = url + `&mileage=${mileageFilter}`
    if (localityFilter) url = url + `&locality=${localityFilter}`
    if (modelFilter) url = url + `&model=${modelFilter}`
    if (cranksetFilter) url = url + `&crankset=${cranksetFilter}`
    if (chainFilter) url = url + `&chain=${chainFilter}`
    if (rimFilter) url = url + `&rim=${rimFilter}`
    if (hubFilter) url = url + `&hub=${hubFilter}`
    if (tyreFilter) url = url + `&tyre=${tyreFilter}`
    if (stemFilter) url = url + `&stem=${stemFilter}`
    if (handlebarFilter) url = url + `&handlebar=${handlebarFilter}`
    if (filteredLink) url = url + `&category=${filteredLink}`

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if (params.category) {
      setFilteredLink(params.category)
    } else if (params.bike_type) {
      setFilteredLink(params.bike_type)
    }

    const response = await axios.get(url);
    console.log(response)
    setBikes(response.data.bikes);

  }, [categoryFilter, modalityFilter, conditionFilter, minPriceFilter, maxPriceFilter, minYearFilter, maxYearFilter, bikeTypeFilter, frameSizeFilter, frameBrandFilter, frameMaterialFilter, suspensionTypeFilter,
  suspensionTypeFilter, frontSuspensionTravelFilter, rearSuspensionTravelFilter, frontSuspensionModelFilter, rearSuspensionModelFilter, frontDerailleurModelFilter,
  rearDerailleurModelFilter, frontGearsFilter, rearGearsFilter, brakeTypeFilter, brakeDiscSizeFilter, brakeModelFilter, rimSizeFilter, seatPostTypeFilter, seatPostTravelFilter,
  seatPostModelFilter, batteryFilter, batteryCyclesFilter, mileageFilter, localityFilter, modelFilter, cranksetFilter, chainFilter, hubFilter, rimFilter, tyreFilter, stemFilter,
  handlebarFilter, filteredLink])



  const handleFilter = (e) => {
    const sectionFilter = document.getElementById(e.target.innerText);
    const sectionActive = e.target;

    console.log(sectionFilter);
    sectionFilter.classList.toggle("d-none")
    sectionActive.classList.toggle("selected")

    console.log(e)

  }

  const handleBikeTypeFilter = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      setBikeTypeFilter(e.target.value)
    } else {
      setBikeTypeFilter("")
    }
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
    dataObject.append( "like[likeble_type]", "Bike" );

    console.log(e.nativeEvent.path[1].id)
    axios.post('/likes',dataObject)

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

  //?///////////////////////////////////FRAME FILTERS/////////////////////////////////////////
  const frameBrands = [
    "Alfameq",
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
    "dabomb",
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
    "Dahon"
  ].sort()

  const roadFrameSizes =  ["<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL"]
  const dirtMtbFrameSizes =   ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
  const allFrameSizes = ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "M/L", "XL", "XXL"].sort()

  /////////////////////////////////////////////////////////////////////////////////////SUSPENSÃO////////////////////////////////////////////////////////////////////////////


  const frontSuspensionTravels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm"]
  const rearSuspensionTravels = ["80 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm"]

  const shockSizes = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197" ]
  const allRearSuspensionTravel = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "80 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm"]
  const mtbDirtUrbanFrontSuspensionModels = ["FOX 32", "FOX 34", "FOX 36", "FOX 38", "FOX 40", "ROCKSHOX 30", "ROCKSHOX 35", "ROCKSHOX BLUTO", "ROCKSHOX BOXXER", "ROCKSHOX DOMAIN", "ROCKSHOX JUDY", "ROCKSHOX LYRIK", "ROCKSHOX PARAGON", "ROCKSHOX PIKE", "ROCKSHOX REBA ", "ROCKSHOX RECON", "ROCKSHOX REVELATION", "ROCKSHOX RUDY", "ROCKSHOX SEKTOR", "ROCKSHOX SID", "ROCKSHOX YARI", "ROCKSHOX ZEB"]


  const mtbDirtUrbanRearSuspensionModels = ["FOX DHX", "FOX DHX2 ", "FOX FLOAT DPS", "FOX FLOAT DPX2", "FOX FLOAT X", "FOX FLOAT X2", "ROCKSHOX DELUXE", "ROCKSHOX MONARCH", "ROCKSHOX SIDLUXE", "ROCKSHOX SUPER DELUXE", "other"]


////////////////////////////////////////////////////////////////////////////////////////////TRANSMISSÂO//////////////////////////////////////////////////////////////////////

  const frontDerailleurModels = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival"]
  const rearDerailleurModels = [ "SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", , "SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SRAM XX1"]

  const frontGears = [0, 1, 2, 3]
  const rearGears = [0, 1, 7, 8, 9, 10, 11, 12]


///////////////////////////////////////////////////////////////////////////////////////////////FREIOS////////////////////////////////////////////////////////////////

  const discSizes = ["140mm", "160mm", "180mm", "200mm", "203mm", "205mm", "210mm", "215mm", "220mm", "225mm" ]
 const brakeModels = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SHIMANO ZEE", "SRAM Code", "SRAM DB", "SRAM G2", "SRAM GUIDE", "SRAM Level"]

 //////////////////////////////////////////////////////////////////////////////////////////////RODAS//////////////////////////////////////////////////////////////////

 const rimSizes = ["20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "700C", "650B", "Fatbike"]


 /////////////////////////////////////////////////////////////////////////////////////////////CANOTE//////////////////////////////////////////////////////////////////////

 const seatPostTravels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm", "210mm", "215mm", "220mm" ]

 ////////////////////////////////////////////////////////////////////////////////////////BATERIA/////////////////////////////

 const batteries = ["320wH", "500Wh", "625Wh", "700Wh"]

  return (
    <div className="p-5 br-8 index-container">
      <h2 className="text-center text-success">Bikes</h2>
      <div className="row row-cols-1 mt-5">
        <div className="filters col-12 col-md-3 my-1">
          <p className="text-success">Filtrar</p>
          <div className="">
            <div className="condition-filter">
              <h5 className="text-success mt-3">tipo</h5>
              <div className="d-flex justify-content-between">
                <label htmlFor="new" className="me-2 text-success">
                  <input
                    type="checkbox"
                    value="e-bike"
                    name="type"
                    onChange={(e) => handleBikeTypeFilter(e)}
                  />  E-bike
                </label>

                <label htmlFor="used" className="me-2 text-success">
                  <input
                    type="checkbox"
                    value="bike"
                    name="type"
                    onChange={(e) => handleBikeTypeFilter(e)}
                  />  Normal
                </label>
              </div>
            </div>

            <div className="condition-filter">
              <h5 className="text-success mt-3">condição</h5>
              <div className="d-flex justify-content-between">
                <label htmlFor="new" className="me-2 text-success">
                  <input
                    type="checkbox"
                    value="new"
                    name="condition"
                    onChange={(e) => handleConditionFilter(e)}
                  />  Nova
                </label>

                <label htmlFor="used" className="me-2 text-success">
                <input
                  type="checkbox"
                  value="used"
                  name="condition"
                  onChange={(e) => handleConditionFilter(e)}
                />  Usada
                </label>
              </div>
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

            {categoryFilter === "dirt_street" && (<>
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
                <option value="triathlon">Triathon</option>
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

            <h5 className="text-success mt-3">marca</h5>
            <select
              className="select-answer"
              value={frameBrandFilter}
              onChange={(e) => setFrameBrandFilter(e.target.value)}
            >
              <option value=""></option>
              {frameBrands.map((frameBrand, index) => {
                return (<option key={index}>{frameBrand}</option>);
              })}
            </select>

            <div className="model-filter">
              <h5 className="text-success mt-3">Modelo</h5>
              <input type="text" className="text-input" onChange={(e) => setModelFilter(e.target.value)}/>
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

            <div className="year-filter mb-3">
              <h5 className="text-success mt-3">ano</h5>
              <div className="d-flex justify-content-between">
                <input type="number" className="text-input" placeholder="DE" onChange={(e) => setMinYearFilter(e.target.value)}/>
                <input type="number" className="text-input" placeholder="ATÉ" onChange={(e) => setMaxYearFilter(e.target.value)}/>
              </div>
            </div>

            <h5 className=" text-success">Componentes</h5>
            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Quadro</button>
            <div id="Quadro" className="frame-filter d-none">
              {!categoryFilter && (<>
                <h5 className="text-success mt-3">tamanho</h5>
                <select
                  className="select-answer"
                  value={frameSizeFilter}
                  onChange={(e) => setFrameSizeFilter(e.target.value)}
                >
                  <option value=""></option>
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
                  <option value=""></option>
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
                  <option value=""></option>
                  {dirtMtbFrameSizes.map((frameSize, index)=> {
                    return (<option key={index}>{frameSize}</option>);
                  })}
                </select>
              </>)}

              <h5 className="text-success mt-3">material</h5>
              <select
                className="select-answer"
                value={frameMaterialFilter}
                onChange={(e) => setFrameMaterialFilter(e.target.value)}
              >
                <option value=""></option>
                <option value="carbon">Carbono</option>
                <option value="aluminum">Aluminio</option>
                <option value="carbon_aluminum_chainstay">Carbono/Aumínio (Chainstay)</option>
              </select>
            </div>

            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Suspensão</button>
            <div id="Suspensão" className="suspension-filter d-none">
              <h5 className="text-success mt-3">tipo</h5>
              <select
                className="select-answer"
                value={suspensionTypeFilter}
                onChange={(e) => setSuspensionTypeFilter(e.target.value)}
              >
                <option value=""></option>
                <option value="no_suspension">Sem Suspensão</option>
                <option value="full_suspension">Full Suspension</option>
                <option value="hardtail">hardtail</option>
              </select>

              {["full_suspension", "hardtail"].includes(suspensionTypeFilter) && (<>
                <h5 className="mt-3">dianteira</h5>
                <h5 className="text-success mt-3">curso</h5>
                <select
                  className="select-answer"
                  value={frontSuspensionTravelFilter}
                  onChange={(e) => setFrontSuspensionTravelFilter(e.target.value)}
                >
                  <option value=""></option>
                  {frontSuspensionTravels.map((frontSuspensionTravel, index)=> {
                    return (<option key={index}>{frontSuspensionTravel}</option>);
                  })}
                </select>

                <h5 className="text-success mt-3">Marca | modelo</h5>
                <select
                  className="select-answer"
                  value={frontSuspensionModelFilter}
                  onChange={(e) => setFrontSuspensionModelFilter(e.target.value)}
                >
                  <option value=""></option>
                  {mtbDirtUrbanFrontSuspensionModels.map((frontSuspensionModel, index)=> {
                    return (<option key={index}>{frontSuspensionModel}</option>);
                  })}
                </select>
              </>)}

              {suspensionTypeFilter === "full_suspension" && (<>
                <h5 className="mt-3">traseira</h5>
                <h5 className="text-success mt-3">curso</h5>
                <select
                  className="select-answer"
                  value={rearSuspensionTravelFilter}
                  onChange={(e) => setRearSuspensionTravelFilter(e.target.value)}
                >
                  <option value=""></option>
                  {allRearSuspensionTravel.map((frameSize, index)=> {
                    return (<option key={index}>{frameSize}</option>);
                  })}
                </select>

                <h5 className="text-success mt-3">Marca | modelo</h5>
                <select
                  className="select-answer"
                  value={rearSuspensionModelFilter}
                  onChange={(e) => setRearSuspensionModelFilter(e.target.value)}
                >
                  <option value=""></option>
                  {mtbDirtUrbanRearSuspensionModels.map((rearSuspensionModel, index)=> {
                    return (<option key={index}>{rearSuspensionModel}</option>);
                  })}
                </select>
              </>)}
            </div>

            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Transmissão</button>
            <div id="Transmissão" className="suspension-filter d-none">
              <h5 className="mt-3">dianteira</h5>
              <h5 className="text-success mt-3">n ºmarchas</h5>
              <select
                className="select-answer"
                value={frontGearsFilter}
                onChange={(e) => setFrontGearsFilter(e.target.value)}

              >
                <option value=""></option>
                {frontGears.map((frontGear, index)=> {
                  return (<option key={index}>{frontGear}</option>);
                })}
              </select>

              <h5 className="text-success mt-3">Marca | modelo</h5>
              <select
                className="select-answer"
                value={frontDerailleurModelFilter}
                onChange={(e) => setFrontDerailleurModelFilter(e.target.value)}
              >
                <option value=""></option>
                {frontDerailleurModels.map((frontDerailleurModel, index)=> {
                  return (<option key={index}>{frontDerailleurModel}</option>);
                })}
              </select>

              <h5 className="mt-3">traseira</h5>
              <h5 className="text-success mt-3">nº marchas</h5>
              <select
                className="select-answer"
                value={rearGearsFilter}
                onChange={(e) => setRearGearsFilter(e.target.value)}
              >
                <option value=""></option>
                {rearGears.map((rearGear, index)=> {
                  return (<option key={index}>{rearGear}</option>);
                })}
              </select>

              <h5 className="text-success mt-3">Marca | modelo</h5>
              <select
                className="select-answer"
                value={rearDerailleurModelFilter}
                onChange={(e) => setRearDerailleurModelFilter(e.target.value)}
              >
                <option value=""></option>
                {rearDerailleurModels.map((frameSize, index)=> {
                  return (<option key={index}>{frameSize}</option>);
                })}
              </select>

              <div className="crankset-filter">
                <h5 className="text-success mt-3">Pedivela</h5>
                <input type="text" className="text-input" onChange={(e) => setCranksetFilter(e.target.value)}/>
              </div>

              <div className="chain-filter">
                <h5 className="text-success mt-3">Corrente</h5>
                <input type="text" className="text-input" onChange={(e) => setChainFilter(e.target.value)}/>
              </div>
            </div>

            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Freios</button>
            <div id="Freios" className="suspension-filter d-none">
              <h5 className="text-success mt-3">tipo</h5>
              <select
                className="select-answer"
                value={brakeTypeFilter}
                onChange={(e) => setBrakeTypeFilter(e.target.value)}

              >
                <option value=""></option>
                <option value="v_brake">V-Brake (frenagem no aro)</option>
                <option value="hydraulic_disc">À Disco - Hidráulico</option>
                <option value="mechanical_disc">À Disco - Mecânico</option>
                <option value="coaster_brake">Contra pedal</option>
                <option value="caliper">Cantilevers</option>
              </select>

              {(brakeTypeFilter === "hydraulic_disc" || brakeTypeFilter === "mechanical_disc") && (<>
                <h5 className="text-success mt-3">disco</h5>
                <select
                  className="select-answer"
                  value={brakeDiscSizeFilter}
                  onChange={(e) => setBrakeDiscSizeFilter(e.target.value)}
                >
                  <option value=""></option>
                  {discSizes.map((discSize, index)=> {
                    return (<option key={index}>{discSize}</option>);
                  })}
                </select>
                </>)}

              <h5 className="text-success mt-3">Marca | modelo</h5>
              <select
                className="select-answer"
                value={brakeModelFilter}
                onChange={(e) => setBrakeModelFilter(e.target.value)}
              >
                <option value=""></option>
                {brakeModels.map((brakeModel, index)=> {
                  return (<option key={index}>{brakeModel}</option>);
                })}
              </select>
            </div>

            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Rodas</button>
            <div id="Rodas" className="suspension-filter d-none">
              <h5 className="text-success mt-3">tamanho aro</h5>
              <select
                className="select-answer"
                value={rimSizeFilter}
                onChange={(e) => setRimSizeFilter(e.target.value)}

              >
                <option value=""></option>
                {rimSizes.map((rimSize, index)=> {
                  return (<option key={index}>{rimSize}</option>);
                })}
              </select>


              <div className="rim-filter">
                <h5 className="text-success mt-3">Aro</h5>
                <input type="text" className="text-input" onChange={(e) => setRimFilter(e.target.value)}/>
              </div>

              <div className="hub-filter">
                <h5 className="text-success mt-3">Cubo</h5>
                <input type="text" className="text-input" onChange={(e) => setHubFilter(e.target.value)}/>
              </div>

              <div className="tyre-filter">
                <h5 className="text-success mt-3">Pneu</h5>
                <input type="text" className="text-input" onChange={(e) => setTyreFilter(e.target.value)}/>
              </div>
            </div>

            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Canote</button>
            <div id="Canote" className="suspension-filter d-none">
              <h5 className="text-success mt-3">tipo</h5>
              <select
                className="select-answer"
                value={seatPostTypeFilter}
                onChange={(e) => setSeatPostTypeFilter(e.target.value)}
              >
                <option value=""></option>
                <option value="retractable">Retratil</option>
                <option value="rigid">Rígido</option>

              </select>

              {seatPostTypeFilter === 'retractable' &&(
                <>
                <h5 className="text-success mt-3">curso</h5>
                <select
                  className="select-answer"
                  value={seatPostTravelFilter}
                  onChange={(e) => setSeatPostTravelFilter(e.target.value)}
                >
                  <option value=""></option>
                  {seatPostTravels.map((seatPostTravel, index)=> {
                    return (<option key={index}>{seatPostTravel}</option>);
                  })}
                </select>
              </>
              )}
              <h5 className="text-success mt-3">Modelo</h5>
              <input type="text" className="text-input" onChange={(e) => setSeatPostModelFilter(e.target.value)}/>
            </div>

            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Cockpit</button>
            <div id="Cockpit" className="cockpit-filter d-none">
              <div className="hub-filter">
                <h5 className="text-success mt-3">Mesa</h5>
                <input type="text" className="text-input" onChange={(e) => setStemFilter(e.target.value)}/>
              </div>

              <div className="handlebar-filter">
                <h5 className="text-success mt-3">Guidão</h5>
                <input type="text" className="text-input" onChange={(e) => setHandlebarFilter(e.target.value)}/>
              </div>
            </div>

            {bikeTypeFilter === "e-bike" && (<>
              <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Parte Elétrica</button>
              <div id="Parte Elétrica">
                <h5 className="text-success mt-3">bateria</h5>
                <select
                  className="select-answer"
                  value={batteryFilter}
                  onChange={(e) => setBatteryFilter(e.target.value)}
                >
                  <option value=""></option>
                  {batteries.map((battery, index)=> {
                    return (<option key={index}>{battery}</option>);
                  })}
                </select>

                <div className="d-flex justify-content-between">
                  <h5 className="text-success mt-3">Ciclos bateria</h5>
                  {batteryCyclesFilter && (<>
                    <h5 className="text-success mt-3">
                    {batteryCyclesFilter}
                  </h5>
                  </>)}
                </div>
                <input type="range" className="form-range" min="0" max="50" id="customRange1" step="1" onChange={(e) => setBatteryCyclesFilter(e.target.value)} />
                <div className="d-flex justify-content-between">
                  <h6 className="text-success price-filter-text"><small>0</small></h6>
                  <h6 className="text-success price-filter-text"><small>50</small></h6>
                </div>

                <div className="d-flex justify-content-between">
                  <h5 className="text-success mt-3">Km</h5>
                  {mileageFilter && (<>
                    <h5 className="text-success mt-3">
                    {mileageFilter} Km
                  </h5>
                  </>)}
                </div>
                <input type="range" className="form-range" min="0" max="200" id="customRange1" step="1" onChange={(e) => setMileageFilter(e.target.value)} />
                <div className="d-flex justify-content-between">
                  <h6 className="text-success price-filter-text"><small>0</small></h6>
                  <h6 className="text-success price-filter-text"><small>200Km</small></h6>
                </div>
              </div>
             </>
            )}
          </div>
        </div>

        <div className="col-12 col-md-9 d-flex flex-wrap">
          {bikes.map((bike, idx) => {
            return (
              <div className="w-25" bike={bike} key={bike.id} id="mobile">
                <a href={"bikes/" + bike.id} className="remove-link">
                  <div className="cards-bikes">
                    <div id={"carouselExampleControls" + bike.id.toString()} className="carousel slide" data-bs-ride="carousel">
                      <div className="carousel-inner">
                        {bike.photos.map((photo, index) => {
                          return (

                            <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                              <img src={photo} className="d-block w-100 img-card-index" alt="" />
                            </div>
                          )
                        })}
                      </div>
                      {bike.photos.length === 0 && (
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-index" alt="" />
                          </div>
                          <div className="carousel-item">
                            <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-index" alt="" />
                          </div>
                        </div>
                      )}
                      <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleControls" + bike.id.toString()} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next" type="button" data-bs-target={"#carouselExampleControls" + bike.id.toString()}  data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                    <div className="d-flex justify-content-center gap-2 mt-1">
                      <h4 className="card-title text-center">{bike.frame_brand}</h4>
                      <h4 className="card-title text-center">{bike.model}</h4>
                    </div>
                    <h4 className="text-center card-title mt-1">
                      {(bike.price_in_cents / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h4>
                    <hr className="index-line"/>
                    <div className="card-content mt-2">
                      <div className="d-flex justify-content-around mb-2">
                        <div className="infos">
                          <p>{bike.locality}</p>
                          <p>{bike.bike_type}</p>
                        </div>
                        <div className="infos">
                          <button type="button" onClick={(e) => handleLike(e)} className="like-btn" id={bike.id}><i className="far fa-heart"></i></button>
                          { bike.bike_type === "bike" &&(
                            <img src={NormalBikeImage} alt="" className="icon-card-index ms-1"/>
                          )}
                          {  bike.bike_type === "e-bike" &&(
                            <img src={EBikeImage} alt="" className="icon-card-index ms-1"/>
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
