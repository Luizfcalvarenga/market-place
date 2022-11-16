import React, { useEffect, useState } from "react";
import swal from 'sweetalert';

export function BikeForm(props) {
  const [bikeId, setBikeId] = useState([]);
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState("");
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [modalities, setModalities] = useState([]);
  const [modality, setModality] = useState("");
  const [bikeType, setBikeType] = useState("");
  const [priceInCents, setPriceInCents] = useState(null);
  const [quantity, setQuantity ] = useState(null);
  const [frameBrand, setFrameBrand] = useState("");
  const [frameSize, setFrameSize] = useState("");
  const [frameMaterial, setFrameMaterial] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [rimSize, setRimSize] = useState("");
  const [frontRimSize, setFrontRimSize] = useState("");
  const [rearRimSize, setRearRimSize] = useState("");

  const [frontHub, setFrontHub] = useState("");
  const [rearHub, setRearHub] = useState("");

  const [frontTyre, setFrontTyre] = useState("");
  const [rearTyre, setRearTyre] = useState("");

  const [numberOfFrontGears, setNumberOfFrontGears] = useState("");
  const [numberOfRearGears, setNumberOfRearGears] = useState("");
  const [brakeType, setBrakeType] = useState("");
  const [brakeDiscSize, setBrakeDiscSize] = useState("");
  const [otherBrakeDiscSize, setOtherBrakeDiscSize] = useState("");
  const [brakeModel, setBrakeModel] = useState("");
  const [otherBrakeModel, setOtherBrakeModel] = useState("");
  const [suspensionType, setSuspensionType] = useState("");
  const [frontSuspensionTravel, setFrontSuspensionTravel] = useState("");
  const [frontSuspensionModel, setFrontSuspensionModel] = useState("");
  const [otherFrontSuspensionModel, setOtherFrontSuspensionModel] = useState("");
  const [rearSuspensionTravel, setRearSuspensionTravel] = useState("");
  const [rearSuspensionModel, setRearSuspensionModel] = useState("");
  const [otherRearSuspensionModel, setOtherRearSuspensionModel] = useState("");
  const [seatPostType, setSeatPostType] = useState("");
  const [seatPostTravel, setSeatPostTravel] = useState("");
  const [otherSeatPostTravel, setOtherSeatPostTravel] = useState("");

  const [weight, setWeight] = useState("");
  const [locality, setLocality] = useState("");
  const [bikeCondition, setBikeCondition] = useState("");
  const [structuralVisualCondition, setStructuralVisualCondition] = useState("");
  const [operatingCondition, setOperatingCondition] = useState("");
  const [documentationType, setDocumentationType] = useState("");
  const [description, setDescription] = useState("");
  const [frontDerailleurModel, setFrontDerailleurModel] = useState("");
  const [rearDerailleurModel, setRearDerailleurModel] = useState("");
  const [otherFrontDerailleurModel, setOtherFrontDerailleurModel] = useState("");
  const [otherRearDerailleurModel, setOtherRearDerailleurModel] = useState("");
  const [handlebar, setHandlebar] = useState("");
  const [stem, setStem] = useState("");
  const [crankset, setCrankset] = useState("");
  const [chain, setChain] = useState("");
  const [accessories, setAccessories] = useState("");
  const [accessoriesWithin, setAccessoriesWithin] = useState([]);
  const [accessoryDescription, setAccessoryDescription] = useState([]);
  const [otherAccessory, setotherAccessory] = useState([]);
  const [pedal, setPedal] = useState([]);

  const [battery, setBattery] = useState("");
  const [otherBattery, setOtherBattery] = useState("");

  const [photos, setPhotos ] = useState(null);

  const [errors, setErrors] = useState({
    bike: {},
  });

  useEffect(() => {
    fetch(`/get_information_for_new_bike`)
     .then((response) => response.json())
     .then((data) => {
      setCategories(data.categories)
      setServices(data.services)
      if (data.user) {
        setUser(data.user.id)
      }
     })
    if (props.bikeId) {
      fetchBike();
      setBikeId(props.bikeId)
    }
  }, []);

  useEffect(() => {
    if (category) {
      setModalities(categories.find(element => element.name === category).modalities)
      setCategoryId(categories.find(element => element.name === category).id);
    }
  });

  useEffect(() => {
    if (category === "urban") {
      setModality(modalities[0])
    } else if (category === "infant") {
      setModality(modalities[0])
    }
  });

  const createBikePhotos = (e) => {
    const photos = Object.values(e.target.files)
    setPhotos(photos)
  }

  async function fetchBike() {
    const response = await axios.get(
      `/api/v1/bikes/${props.bikeId}/edit`
    );
    alert(JSON.stringify(response.data))
    if (response.data) {
      setUser(response.data.bike.user_id);
      setCategory(response.data.category);
      setCategoryId(response.data.bike.category_id);
      setModality(response.data.bike.modality);
      setBikeType(response.data.bike.bike_type);
      setPriceInCents(response.data.bike.price_in_cents);
      setQuantity(response.data.bike.quantity);
      setFrameBrand(response.data.bike.frame_brand);
      setFrameSize(response.data.bike.frame_size);
      setFrameMaterial(response.data.bike.frame_material);
      setModel(response.data.bike.model);
      setYear(response.data.bike.year);
      setRimSize(response.data.bike.rim_size);
      setNumberOfFrontGears(response.data.bike.number_of_front_gears);
      setNumberOfRearGears(response.data.bike.number_of_rear_gears);
      setBrakeType(response.data.bike.brake_type);
      setSuspensionType(response.data.bike.suspension_type);
      setFrontSuspensionTravel(response.data.bike.front_suspension_travel);
      setRearSuspensionTravel(response.data.bike.rear_suspension_travel);
      setSeatPostType(response.data.bike.seat_post_type);
      setSeatPostTravel(response.data.bike.seat_post_travel);
      setWeight(response.data.bike.weight);
      setLocality(response.data.bike.locality);
      setBikeCondition(response.data.bike.bike_conditions);
      setStructuralVisualCondition(response.data.bike.structural_visual_condition);
      setOperatingCondition(response.data.bike.operating_condition);
      setDocumentationType(response.data.bike.documentation_type);
      setDescription(response.data.bike.description);
      setAccessories(response.data.bike.accessories);
      // setAccessoriesWithin(response.data.bike);
      setBattery(response.data.bike.battery);
      setPhotos(response.data.bike.photos);

    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const dataObject = new FormData();
    dataObject.append( "bike[user_id]", user );
    dataObject.append( "bike[category_id]", categoryId );
    dataObject.append( "bike[modality]", modality );
    dataObject.append( "bike[bike_type]", bikeType );
    dataObject.append( "bike[price_in_cents]", priceInCents );
    dataObject.append( "bike[quantity]", quantity );
    dataObject.append( "bike[frame_brand]", frameBrand );
    dataObject.append( "bike[frame_size]", frameSize );
    dataObject.append( "bike[frame_material]", frameMaterial );
    dataObject.append( "bike[model]", model );
    dataObject.append( "bike[year]", year );
    dataObject.append( "bike[rim_size]", rimSize );
    dataObject.append( "bike[number_of_front_gears]", numberOfFrontGears );
    dataObject.append( "bike[number_of_rear_gears]", numberOfRearGears );
    dataObject.append( "bike[brake_type]", brakeType );
    dataObject.append( "bike[suspension_type]", suspensionType );
    dataObject.append( "bike[front_suspension_travel]", frontSuspensionTravel );
    dataObject.append( "bike[rear_suspension_travel]", rearSuspensionTravel );
    dataObject.append( "bike[seat_post_type]", seatPostType );
    dataObject.append( "bike[seat_post_travel]", seatPostTravel );
    dataObject.append( "bike[weight]", weight );
    dataObject.append( "bike[locality]", locality );
    dataObject.append( "bike[bike_conditions]", bikeCondition );
    dataObject.append( "bike[structural_visual_condition]", structuralVisualCondition );
    dataObject.append( "bike[operating_condition]", operatingCondition );
    dataObject.append( "bike[documentation_type]", documentationType );
    dataObject.append( "bike[description]", description );
    dataObject.append( "bike[accessories]", accessories );
    dataObject.append( "bike[battery]", battery );
    if (photos) {
      photos.map((photo) => {
        dataObject.append( "bike[photos][]", photo );
      })
    }

    const url = props.bikeId
    ? `/api/v1/bikes/${props.bikeId}`
    : "/api/v1/bikes";
    const method = props.bikeId ? 'patch' : 'post';

    const response = await axios[method](url, dataObject);
    if (response.data.success) {
      window.location = response.data.redirect_url;
    } else {
      swal("OPS, Algo deu errado!", "Revise suas informaçoes", "error");
      setErrors(response.data.errors);
    }
  }





  const handleShowSection = (e) => {
    const firstSection = document.getElementById("first-section")
    const secondSection = document.getElementById("second-section")
    const thirdSection = document.getElementById("third-section")
    const fourthSection = document.getElementById("fourth-section")
    const fifthSection = document.getElementById("fifth-section")
    const sixthSection = document.getElementById("sixth-section")

    const progressOne = document.getElementById("progress-1")
    const progressTwo = document.getElementById("progress-2")
    const progressThree = document.getElementById("progress-3")
    const progressFour = document.getElementById("progress-4")
    const progressFive = document.getElementById("progress-5")
    const progressSix = document.getElementById("progress-6")

    if (e.target.innerHTML === "1") {
      firstSection.classList.remove("d-none")
      secondSection.classList.add("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.add("d-none")
      sixthSection.classList.add("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.remove("section-done")
      progressThree.classList.remove("section-done")
      progressFour.classList.remove("section-done")
      progressFive.classList.remove("section-done")
      progressSix.classList.remove("section-done")
    } else if (e.target.innerHTML === "2") {
      firstSection.classList.add("d-none")
      secondSection.classList.remove("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.add("d-none")
      sixthSection.classList.add("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.remove("section-done")
      progressThree.classList.remove("section-done")
      progressFour.classList.remove("section-done")
      progressFive.classList.remove("section-done")
      progressSix.classList.remove("section-done")
    } else if (e.target.innerHTML === "3") {
      firstSection.classList.add("d-none")
      secondSection.classList.add("d-none")
      thirdSection.classList.remove("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.add("d-none")
      sixthSection.classList.add("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.add("section-done")
      progressThree.classList.remove("section-done")
      progressFour.classList.remove("section-done")
      progressFive.classList.remove("section-done")
      progressSix.classList.remove("section-done")
    } else if (e.target.innerHTML === "4") {
      firstSection.classList.add("d-none")
      secondSection.classList.add("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.remove("d-none")
      fifthSection.classList.add("d-none")
      sixthSection.classList.add("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.add("section-done")
      progressThree.classList.add("section-done")
      progressFour.classList.remove("section-done")
      progressFive.classList.remove("section-done")
      progressSix.classList.remove("section-done")
    } else if (e.target.innerHTML === "5") {
      firstSection.classList.add("d-none")
      secondSection.classList.add("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.remove("d-none")
      sixthSection.classList.add("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.add("section-done")
      progressThree.classList.add("section-done")
      progressFour.classList.add("section-done")
      progressFive.classList.remove("section-done")
      progressSix.classList.remove("section-done")
    } else if (e.target.innerHTML === "6") {
      firstSection.classList.add("d-none")
      secondSection.classList.add("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.add("d-none")
      sixthSection.classList.remove("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.add("section-done")
      progressThree.classList.add("section-done")
      progressFour.classList.add("section-done")
      progressFive.classList.add("section-done")
      progressSix.classList.remove("section-done")
    }


  }


  const handleFirstStep = (e) => {

    const progressOne = document.getElementById("progress-1")
    const firstSection = document.getElementById("first-section")
    const secondSection = document.getElementById("second-section")

    progressOne.classList.add("section-done")
    firstSection.classList.add("d-none")
    secondSection.classList.remove("d-none")
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleSecondStep = (e) => {
    const progressTwo = document.getElementById("progress-2")
    const secondSection = document.getElementById("second-section")
    const thirdSection = document.getElementById("third-section")

    progressTwo.classList.add("section-done")
    secondSection.classList.add("d-none")
    thirdSection.classList.remove("d-none")
    window.scrollTo({ top: 0, behavior: 'smooth' });


  }

  const handleThirdStep = () => {
    const progressThird = document.getElementById("progress-3")
    const thirdSection = document.getElementById("third-section")
    const fourthSection = document.getElementById("fourth-section")

    progressThird.classList.add("section-done")
    thirdSection.classList.add("d-none")
    fourthSection.classList.remove("d-none")
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  const handleFourthStep = () => {
    const progressFourth = document.getElementById("progress-4")
    const fourthSection = document.getElementById("fourth-section")
    const fifthSection = document.getElementById("fifth-section")

    progressFourth.classList.add("section-done")
    fourthSection.classList.add("d-none")
    fifthSection.classList.remove("d-none")
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }


  const handleFifthStep = () => {
    const progressFifth = document.getElementById("progress-5")
    const fifthSection = document.getElementById("fifth-section")
    const sixthSection = document.getElementById("sixth-section")

    progressFifth.classList.add("section-done")
    fifthSection.classList.add("d-none")
    sixthSection.classList.remove("d-none")
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }




  //////////////////////////////////////////////// frames

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
  const frameMaterials = ["", "aluminum ", "carbon", "carbon_aluminum_chainstay", "other"]

  //////////////////////////////////////////////// suspensions

  const suspensionTypes = ["", "no_suspension", "full_suspension", "hardtail"]
  const frontSuspensionTravels = ["", "80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm"]
  const rearSuspensionTravels = ["", "80 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm"]

  const shockSizes = ["", "165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]

  const mtbDirtUrbanFrontSuspensionModels = ["", "FOX 32", "FOX 34", "FOX 36", "FOX 38", "FOX 40", "ROCKSHOX 30", "ROCKSHOX 35", "ROCKSHOX BLUTO", "ROCKSHOX BOXXER", "ROCKSHOX DOMAIN", "ROCKSHOX JUDY", "ROCKSHOX LYRIK", "ROCKSHOX PARAGON", "ROCKSHOX PIKE", "ROCKSHOX REBA ", "ROCKSHOX RECON", "ROCKSHOX REVELATION", "ROCKSHOX RUDY", "ROCKSHOX SEKTOR", "ROCKSHOX SID", "ROCKSHOX YARI", "ROCKSHOX ZEB", "other"]


  const mtbDirtUrbanRearSuspensionModels = ["", "FOX DHX", "FOX DHX2 ", "FOX FLOAT DPS", "FOX FLOAT DPX2", "FOX FLOAT X", "FOX FLOAT X2", "ROCKSHOX DELUXE", "ROCKSHOX MONARCH", "ROCKSHOX SIDLUXE", "ROCKSHOX SUPER DELUXE", "other"]

 ///////////////////////////////////////////////// brake

  const brakeTypes = ["", "v_brake", "hydraulic_disc", "mechanical_disc", "coaster_brake", "caliper" ]
  const discSizes = ["", "140mm", "160mm", "180mm", "200mm", "203mm", "other" ]
  const roadBrakeModels = ["", "SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  const mtbDirtUrbanBrakeModels = ["", "SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SHIMANO ZEE", "SRAM Code", "SRAM DB", "SRAM G2", "SRAM GUIDE", "SRAM Level", "other"]



  //////////////////////////////////////////////// seat post

  const seatPostTypes = ["", "retractable", "rigid" ]
  const seatPostTravels = ["", "50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm" ]

  /////////////////////////////////////////////// gears

  const frontGears = [0, 1, 2, 3]
  const rearGears = [0, 1, 7, 8, 9, 10, 11, 12]

  const roadFrontDerailleurModels = ["", "SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "other"]
  const mtbDirtUrbanFrontDerailleurModels = ["", "SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "other"]

  const roadRearDerailleurModels = ["", "SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  const mtbDirtUrbanRearDerailleurModels = ["", "SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SRAM XX1", "other"]

  ///////////////////////////////////////////// rim

  const rimSizes = ["", "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "700C", "650B", "Fatbike"]

  /////////////////////////////////////////// conditions
  const bikeConditions = ["", "new", "used", ];
  const structuralVisualConditions = ["", "perfect_condition", "minor_surface_scratches", "spalls_in_paint", "painted_frame", "frame_welded_repaired", "frame_cracks_or_fissures_must_be_repaired", "components_welded_repaired", "components_cracks_or_fissures_must_be_repaired" ]
  const operatingConditions = ["", "rears_worn_out_higher_75", "hifters_not_working_properly", "front_suspension_not_working_properly", "rear_suspension_not_working_properly", "suspensions_lock_not_working_properly", "brake_not_working_properly", "retractable_seat_post_not_working_properly", "creaking_when_pedaling", "wheels_bent", "tyres_worn_out_minus_50"]

 ////////////////////////////////////////////////// documentation

 const documentationTypes = ["", "Nota fiscal", "Documento de importação", "Cupom Fiscal Estrangeiro", "Sem Documento"]

 //////////////////////////////////////////////// batteries

 const batteries = ["", "320wH", "500Wh", "625Wh", "700Wh", "other"]

 //////////////////////////////////////////////YEARS


  const years = ["", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "other", ];


  /////////////////////////////////////////////////BIKE TYPES

  const bikeTypes = ["", "electric", "no_electric"]

  /////////////////////////////////////////////////BIKE TYPES

  const withinAccessories = ["", "no", "yes"]

  //////////////////////////////////////////////ACCESSORIES


  const accessoryOptions = ["", "Pedal", "Ciclocomputador", "Lanterna traseira", "Farol", "Bolsa de acessórios", "Suporte de garrafinha", "Outro"]

  return (

    <div className="w-60 new-bike-react py-5">
      <h1 className="text-success pb-3 text-center">Vamos lá...</h1>
      <ul className="list-group list-group-horizontal-sm progress-bar pb-5">
        <li id="progress-1" className="progress progress-1"><button className="btn-progress" onClick={(e) => handleShowSection(e)}>1</button></li>
        <hr className="progress-path"/>
        <li id="progress-2" className="progress progress-2"><button className="btn-progress" onClick={(e) => handleShowSection(e)}>2</button></li>
        <hr className="progress-path"/>
        <li id="progress-3" className="progress progress-3"><button className="btn-progress" onClick={(e) => handleShowSection(e)}>3</button></li>
        <hr className="progress-path"/>
        <li id="progress-4" className="progress progress-4"><button className="btn-progress" onClick={(e) => handleShowSection(e)}>4</button></li>
        <hr className="progress-path"/>
        <li id="progress-5" className="progress progress-5"><button className="btn-progress" onClick={(e) => handleShowSection(e)}>5</button></li>
        <hr className="progress-path"/>
        <li id="progress-6" className="progress progress-6"><button className="btn-progress" onClick={(e) => handleShowSection(e)}>6</button></li>
      </ul>

      <div id="first-section" className="card-bike-select mb-5">
        <h4 className="text-center text-success mt-2">Informações gerais</h4>

        <label htmlFor="bikeType" className="mt-3 text-start">Tipo da bike: <span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={bikeType}
          onChange={(e) => setBikeType(e.target.value)}

        >
          {bikeTypes.map((bikeType, index) => {
            return (<option key={index}>{bikeType}</option>);
          })}
        </select>
        { errors && errors.bike && errors.bike.bike_type && (
          <p className="text-danger">{errors.bike.bike_type[0]}</p>
        )}



        <label htmlFor="category" className="mt-4 text-start">Categoria:<span className="requested-information ms-1">*</span></label>
        <select
        value={category}
        onChange={(e) =>  setCategory(e.target.value) }
        className="select-answer"
        >
          {categories.map((category) => {
            return (<option key={category.id} value={category.name} className="answers-options">{category.name}</option>)
          })}
        </select>
        { errors && errors.bike && errors.bike.category && (
          <p className="text-danger">{errors.bike.category[0]}</p>
        )}

        { (category === "mountain_bike" || category === "dirt_street" || category === "road") && (<>

          <label htmlFor="modality" className="mt-4 text-start">Modalidade:<span className="requested-information ms-1">*</span></label>
          <select
            value={modality}
            onChange={(e) => e.preventDefault && setModality(e.target.value)}
            className="select-answer"
          >
            {modalities.map((modality, index) => {
              return (<option key={index}>{modality}</option>);
            })}
          </select>
          { errors && errors.bike && errors.bike.modality && (
            <p className="text-danger">{errors.bike.modality[0]}</p>
          )}
        </>)}


        {category === "road" && (<>
          <label htmlFor="frameSize" className="mt-4">tamanho do quadro:<span className="requested-information ms-1">*</span></label>
          <select
            className="select-answer"
            value={frameSize}
            onChange={(e) => setFrameSize(e.target.value)}

          >
            {roadFrameSizes.map((frameSize, index)=> {
              return (<option key={index}>{frameSize}</option>);
            })}
          </select>
          { errors && errors.bike && errors.bike.frame_size && (
            <p className="text-danger">{errors.bike.frame_size[0]}</p>
          )}
        </>)}

        {["dirt_street", "mountain_bike", "infant", "urban"].includes(category) && (<>
          <label htmlFor="frameSize" className="mt-4">tamanho do quadro:<span className="requested-information ms-1">*</span></label>
          <select
            className="select-answer"
            value={frameSize}
            onChange={(e) => setFrameSize(e.target.value)}

          >
            {dirtMtbFrameSizes.map((frameSize, index)=> {
              return (<option key={index}>{frameSize}</option>);
            })}
          </select>
          { errors && errors.bike && errors.bike.frame_size && (
            <p className="text-danger">{errors.bike.frame_size[0]}</p>
          )}
        </>)}

        <label htmlFor="frameBrand" className="mt-4 text-start">Marca do quadro:<span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={frameBrand}
          onChange={(e) => setFrameBrand(e.target.value)}

        >
          {frameBrands.map((frameBrand, index) => {
            return (<option key={index}>{frameBrand}</option>);
          })}
        </select>
        { errors && errors.bike && errors.bike.frame_brand && (
          <p className="text-danger">{errors.bike.frame_brand[0]}</p>
        )}

        <label htmlFor="frameMaterial" className="mt-4">Material do quadro:<span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={frameMaterial}
          onChange={(e) => setFrameMaterial(e.target.value)}

        >
          {frameMaterials.map((frameMaterial, index)=> {
            return (<option key={index}>{frameMaterial}</option>);
          })}
        </select>
        { errors && errors.bike && errors.bike.frame_material && (
          <p className="text-danger">{errors.bike.frame_material[0]}</p>
        )}

        <label htmlFor="documentationType" className="mt-4">Documentação:<span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={documentationType}
          onChange={(e) => setDocumentationType(e.target.value)}

        >
          {documentationTypes.map((documentationType, index)=> {
            return (<option key={index}>{documentationType}</option>);
          })}
        </select>
        { errors && errors.bike && errors.bike.documentation_type && (
          <p className="text-danger">{errors.bike.documentation_type[0]}</p>
        )}

        <label htmlFor="bikeCondition" className="mt-4">Condição da bike:<span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={bikeCondition}
          onChange={(e) => setBikeCondition(e.target.value)}

        >
          {bikeConditions.map((bikeCondition, index)=> {
              return (<option key={index}>{bikeCondition}</option>);
            })}
        </select>
        { errors && errors.bike && errors.bike.bike_conditions && (
          <p className="text-danger">{errors.bike.bike_conditions[0]}</p>
        )}

        <label htmlFor="Year" className="mt-4">Ano:<span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={year}
          onChange={(e) => setYear(e.target.value)}

        >
          {years.map((year, index)=> {
            return (<option key={index}>{year}</option>);
          })}
        </select>
        { errors && errors.bike && errors.bike.year && (
          <p className="text-danger">{errors.bike.year[0]}</p>
        )}

        { year === "other"  && (
          <>
            <label htmlFor="year" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
            <input type="text" className="text-input"/>
          </>
        )}

        <label htmlFor="model" className="mt-4">modelo:<span className="requested-information ms-1">*</span></label>
        <input type="text" className="text-input"  value={model}onChange={(e) => setModel(e.target.value)}/>
        { errors && errors.bike && errors.bike.model && (
          <p className="text-danger">{errors.bike.model[0]}</p>
        )}

        <label htmlFor="priceInCentes" className="mt-4">preço:<span className="requested-information ms-1">*</span></label>
        <input type="number" className="text-input" placeholder="Reais e centavos sem virgula" value={priceInCents}onChange={(e) => setPriceInCents(e.target.value)}/>
        { errors && errors.bike && errors.bike.price_in_cents  && (
          <p className="text-danger">{errors.bike.price_in_cents[0]}</p>
        )}

        <label htmlFor="quantity" className="mt-4">quantidade:<span className="requested-information ms-1">*</span></label>
        <input type="number" className="text-input" value={quantity}onChange={(e) => setQuantity(e.target.value)}/>
        { errors && errors.bike && errors.bike.quantity  && (
          <p className="text-danger">{errors.bike.quantity[0]}</p>
        )}

        <label htmlFor="locality" className="mt-4">cidade:<span className="requested-information ms-1">*</span></label>
        <input type="text" className="text-input"  value={locality}onChange={(e) => setLocality(e.target.value)}/>
        { errors && errors.bike && errors.bike.locality && (
          <p className="text-danger">{errors.bike.locality[0]}</p>
        )}


        <label htmlFor="weight" className="mt-4">peso:(opicional)</label>
        <input type="number" className="text-input" placeholder="Em Kg" value={weight}onChange={(e) => setWeight(e.target.value)}/>

        <button className="btn-next-step mt-4" type="button" onClick={(e) => handleFirstStep()}><i className="fas fa-angle-double-right"></i></button>
      </div>

                                  {/*/////////////////////////////////////////////////////////2ª SECTION////////////////////////////////////////////////////////////////*/}

      <div id="second-section" className="card-bike-select mb-5 d-none">
        <h4 className="text-center text-success">Informações técnicas</h4>
                                                                        {/*//////////////////TRANSMISSÂO///////////////////////*/}

        {/* BIKE <TRANSMISSION></TRANSMISSION>  fazer render das partials e diminuir código para todas as seções */}
        {category === "road" && (<>
          <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={() => document.getElementById("transmission").classList.toggle("d-none")}>Trasmissão<i class="fas fa-chevron-down ms-2"></i></button>
          <div id="transmission" className="transmission d-none mb-3">
            <label htmlFor="numberOfFrontGears" className="mt-3">Marchas dianteiras?</label>
            <select
              className="select-answer"
              value={numberOfFrontGears}
              onChange={(e) => setNumberOfFrontGears(e.target.value)}
            >
              {frontGears.map((frontGear, index)=> {
                return (<option key={index}>{frontGear}</option>);
              })}
            </select>

            <label htmlFor="front_gear" className="mt-2">Câmbio dianteiro:</label>
            <select class="select-answer" aria-label=".form-select-sm example"  value={frontDerailleurModel}
            onChange={(e) => setFrontDerailleurModel(e.target.value)}>
              {roadFrontDerailleurModels.map((frontDerailleurModel, index)=> {
                return (<option key={index}>{frontDerailleurModel}</option>);
              })}
            </select>
            <br />
            { frontDerailleurModel === "other"  && (
              <>
                <label htmlFor="front_gear" className="mx-3">Qual?</label>
                <input type="text" className="text-input" onChange={(e) => setOtherFrontDerailleurModel(e.target.value)}/>
              </>
            )}

            <label htmlFor="numberOfRearGears" className="mt-3">Marchas traseiras?</label>
            <select
              className="select-answer"
              value={numberOfRearGears}
              onChange={(e) => setNumberOfRearGears(e.target.value)}

            >
              {rearGears.map((rearGear, index)=> {
                return (<option key={index}>{rearGear}</option>);
              })}
            </select>

            <label htmlFor="rear_gear" className="mt-3">Câmbio traseiro:</label>
            <select class="select-answer" aria-label=".form-select-sm example"  value={rearDerailleurModel}
            onChange={(e) => setRearDerailleurModel(e.target.value)}>
              {roadRearDerailleurModels.map((rearDerailleurModel, index)=> {
                return (<option key={index}>{rearDerailleurModel}</option>);
              })}
            </select>
            <br />
            { rearDerailleurModel === "other"  && (
              <>
                <label htmlFor="front_gear" className="mx-3">Qual?</label>
                <input type="text" className="text-input" onChange={(e) => setOtherRearDerailleurModel(e.target.value)}/>
              </>
            )}

            <label htmlFor="front_gear" className="mx-3">Pédivela:</label>
            <input class="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setCrankset(e.target.value)}/>

            <label htmlFor="front_gear" className="mx-3">Corrente:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setChain(e.target.value)}/>

          </div>
        </>)}

        {(category === "mountain_bike" || category === "dirt_street" || category === "urban") && (<>
          <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={() => document.getElementById("transmission").classList.toggle("d-none")}>Trasmissão<i className="fas fa-chevron-down ms-2"></i></button>
          <div id="transmission" className="transmission d-none mb-3">

            <label htmlFor="front_gear" className="mt-3">Câmbio dianteiro:</label>
            <select className="select-answer" aria-label=".form-select-sm example"  value={frontDerailleurModel}
            onChange={(e) => setFrontDerailleurModel(e.target.value)}>
              {mtbDirtUrbanFrontDerailleurModels.map((frontDerailleurModels, index)=> {
                return (<option key={index}>{frontDerailleurModels}</option>);
              })}
            </select>

            { frontDerailleurModel === "other"  && (
              <>
                <label htmlFor="front_gear" className="mt-2">Qual?</label>
                <input type="text" onChange={(e) => setOtherFrontDerailleurModel(e.target.value)}/>
              </>
            )}

            <label htmlFor="rear_gear" className="mt-2">Câmbio traseiro:</label>
            <select className="select-answer" aria-label=".form-select-sm example"  value={rearDerailleurModel}
            onChange={(e) => setRearDerailleurModel(e.target.value)}>
              {mtbDirtUrbanRearDerailleurModels.map((rearDerailleurModels, index)=> {
                return (<option key={index}>{rearDerailleurModels}</option>);
              })}
            </select>
            <br />
            { rearDerailleurModel === "other"  && (
              <>
                <label htmlFor="front_gear" className="mt-2">Qual?</label>
                <input type="text" onChange={(e) => setOtherRearDerailleurModel(e.target.value)}/>
              </>
            )}

            <label htmlFor="crankset" className="mt-2">Pédivela:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setCrankset(e.target.value)}/>

            <label htmlFor="chain" className="mt-2">Corrente:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setChain(e.target.value)}/>
          </div>
        </>)}

                                                                       {/*//////////////////FREIOS///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={() => document.getElementById("brakes").classList.toggle("d-none")}>Freios<i className="fas fa-chevron-down ms-2"></i></button>
        <div id="brakes" className="brake d-none mb-3">

          <label htmlFor="brakeType" className="mt-3">Qual o tipo de freio?</label>
          <select
            className="select-answer" aria-label=".form-select-sm example"
            value={brakeType}
            onChange={(e) => setBrakeType(e.target.value)}

          >
            {brakeTypes.map((brakeType, index)=> {
              return (<option key={index}>{brakeType}</option>);
            })}
          </select>

          {(brakeType === "hydraulic_disc" || brakeType === "mechanical_disc") && (<>
            <label htmlFor="disc_size" className="mt-2">Tamanho do disco?</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={brakeDiscSize}
              onChange={(e) => setBrakeDiscSize(e.target.value)}

            >
              {discSizes.map((discSize, index)=> {
                return (<option key={index}>{discSize}</option>);
              })}
            </select>
          </>)}

          {brakeDiscSize === "other" && (<>
            <label htmlFor="other_disc_size" className="mt-2">Qual:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setOtherBrakeDiscSize(e.target.value)}/>
          </>)}

          {category === "road" && (<>
            <label htmlFor="brakeModel" className="mt-2">Modelo?</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={brakeModel}
              onChange={(e) => setBrakeModel(e.target.value)}

            >
              {roadBrakeModels.map((roadBrakeModel, index)=> {
                return (<option key={index}>{roadBrakeModel}</option>);
              })}
            </select>
          </>)}

          {(category === "mountain_bike" || category ===  "dirt_street" || category ===  "urban") && (<>
            <label htmlFor="brakeModel" className="mt-2">Modelo?</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={brakeModel}
              onChange={(e) => setBrakeModel(e.target.value)}

            >
              {roadBrakeModels.map((roadBrakeModel, index)=> {
                return (<option key={index}>{roadBrakeModel}</option>);
              })}
            </select>
          </>)}
          <br />

          {brakeModel === "other" && (<>

            <label htmlFor="front_gear" className="mt-2">Qual:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setOtherBrakeModel(e.target.value)}/>

          </>)}
        </div>

                                                                        {/*//////////////////SUSPENSÂO///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={() => document.getElementById("suspensions").classList.toggle("d-none")}>Suspensões<i className="fas fa-chevron-down ms-2"></i></button>

        <div id="suspensions" className="suspension d-none mb-3">
          <label htmlFor="suspensionType" className="mt-3">Qual o tipo de suspensão?</label>
          <select
            className="select-answer" aria-label=".form-select-sm example"
            value={suspensionType}
            onChange={(e) => setSuspensionType(e.target.value)}

          >
            {suspensionTypes.map((suspensionType, index)=> {
                return (<option key={index}>{suspensionType}</option>);
              })}

          </select>

          {suspensionType === "full_suspension" && (<>
            <label htmlFor="frontSuspensionTravel" className="mt-2">Suspensão dianteira?</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={frontSuspensionTravel}
              onChange={(e) => setFrontSuspensionTravel(e.target.value)}

            >
              {frontSuspensionTravels.map((frontSuspensionTravel, index)=> {
                return (<option key={index}>{frontSuspensionTravel}</option>);
              })}
            </select>

            <br/>

            <label htmlFor="rearSuspensionTravel" className="mt-2">Suspensão traseira?</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={rearSuspensionTravel}
              onChange={(e) => setRearSuspensionTravel(e.target.value)}

            >
              {rearSuspensionTravels.map((rearSuspensionTravel, index)=> {
                return (<option key={index}>{rearSuspensionTravel}</option>);
              })}
            </select>
          </>
          )}

          {suspensionType === "hardtail" && (<>
            <label htmlFor="frontSuspensionTravel" className="mt-2">Suspensão dianteira?</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={frontSuspensionTravel}
              onChange={(e) => setFrontSuspensionTravel(e.target.value)}

            >
              {frontSuspensionTravels.map((rearSuspensionTravel, index)=> {
                return (<option key={index}>{rearSuspensionTravel}</option>);
              })}
            </select>
          </>
          )}

          {(category === "mountain_bike" || category === "dirt_street" || category === "urban") && (suspensionType === "hardtail" || suspensionType === "full_suspension" ) &&(
            <>
              <label htmlFor="frontSuspensionModel" className="mt-2">modelo Suspensão dianteira:</label>
              <select className="select-answer" aria-label=".form-select-sm example"  value={frontSuspensionModel}
              onChange={(e) => setFrontSuspensionModel(e.target.value)}>
                {mtbDirtUrbanFrontSuspensionModels.map((frontSuspensionModels, index)=> {
                  return (<option key={index}>{frontSuspensionModels}</option>);
                })}
              </select>
              <br />
              { frontSuspensionModel === "other"  && (
                <>
                  <label htmlFor="otherFrontSuspensionModel" className="mt-2">Qual?</label>
                  <input type="text" className="text-input" onChange={(e) => setOtherFrontSuspensionModel(e.target.value)}/>
                </>
              )}

              <label htmlFor="RearSuspensionModel" className="mt-2">Modelo Suspensão traseira:</label>
              <select className="select-answer" aria-label=".form-select-sm example"  value={rearSuspensionModel}
              onChange={(e) => setRearSuspensionModel(e.target.value)}>
                {mtbDirtUrbanRearSuspensionModels.map((rearSuspensionModels, index)=> {
                  return (<option key={index}>{rearSuspensionModels}</option>);
                })}
              </select>
              <br />
              { rearSuspensionModel === "other"  && (
                <>
                  <label htmlFor="otherRearSuspensionModel" className="mt-2">Qual?</label>
                  <input type="text" className="text-input" onChange={(e) => setOtherRearSuspensionModel(e.target.value)}/>
                </>
              )}
            </>
          )}
        </div>

                                                                        {/*//////////////////RODAS///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={() => document.getElementById("rims").classList.toggle("d-none") }>Rodas<i className="fas fa-chevron-down ms-2"></i></button>
        <div id="rims" className="rims d-none mb-3">
          <label htmlFor="bikeCondition" className="mt-3">Tamanho da roda:<span className="requested-information ms-1">*</span></label>
          <select
            className="select-answer"
            value={rimSize}
            onChange={(e) => setRimSize(e.target.value)}

          >
            {rimSizes.map((rimSize, index)=> {
                return (<option key={index}>{rimSize}</option>);
              })}
          </select>

          <label htmlFor="frontRimSize" className="mt-2">Aro dianteiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setFrontRimSize(e.target.value)}/>

          <label htmlFor="rearRimSize" className="mt-2">Aro traseiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setRearRimSize(e.target.value)}/>

          <label htmlFor="frontHub" className="mt-2">Cubo dianteiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setFrontHub(e.target.value)}/>

          <label htmlFor="rearHub" className="mt-2">Cubo traseiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setRearHub(e.target.value)}/>

          <label htmlFor="frontTyre" className="mt-2">Pneu dianteiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setFrontTyre(e.target.value)}/>

          <label htmlFor="rearTyre" className="mt-2">Pneu traseiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setRearTyre(e.target.value)}/>
        </div>

                                                                        {/*//////////////////COCKPIT///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={() => document.getElementById("cockpit").classList.toggle("d-none") }>Cockpit<i className="fas fa-chevron-down ms-2"></i></button>
        <div id="cockpit" className="cockpit d-none mb-3">
          <label htmlFor="frontRimSize" className="mt-3">Guidao:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setHandlebar(e.target.value)}/>

          <label htmlFor="rearRimSize" className="mt-2">Mesa:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setStem(e.target.value)}/>
        </div>

                                                                        {/*//////////////////CANOTE///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={() => document.getElementById("seat-post").classList.toggle("d-none") }>Canote<i className="fas fa-chevron-down ms-2"></i></button>
        <div id="seat-post" className="seat-post d-none mb-3">

          <label htmlFor="seatPostType" className="mt-3">Tipo de canote?</label>
          <select
            className="select-answer" aria-label=".form-select-sm example"
            value={seatPostType}
            onChange={(e) => setSeatPostType(e.target.value)}

          >
            {seatPostTypes.map((seatPostType, index)=> {
                return (<option key={index}>{seatPostType}</option>);
              })}
          </select>

          {seatPostType === "retractable" && (<>
            <label htmlFor="seatPostTravel" className="mt-2">Curso do canote?</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={seatPostTravel}
              onChange={(e) => setSeatPostTravel(e.target.value)}

            >
              {seatPostTravels.map((seatPostTravel, index)=> {
                return (<option key={index}>{seatPostTravel}</option>);
              })}
            </select>

            { seatPostTravel === "other" && (
              <>
              <label htmlFor="otherSeatPostTravel" className="mt-2">Qual?</label>
              <input type="text" onChange={(e) => setOtherSeatPostTravel(e.target.value)}/>
            </>
            )}
          </>)}
        </div>

                                                                        {/*//////////////////BATERIA///////////////////////*/}

        { bikeType === "electric" && (<>
          <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={() => document.getElementById("battery").classList.toggle("d-none") }>Parte elétrica<i className="fas fa-chevron-down ms-2"></i></button>
          <div id="battery" className="rims d-none mb-3">
            <label htmlFor="frameSize" className="mt-3">Capacidade:</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
            >
              {batteries.map((battery, index)=> {
                return (<option key={index}>{battery}</option>);
              })}
            </select>

            { battery === "other" && (<>
              <label htmlFor="otherBattery" className="mt-2">Qual?</label>
              <input type="text" onChange={(e) => setOtherBattery(e.target.value)}/>
            </>)}



            <label htmlFor="motor" className="mt-2">Motor:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setMotor(e.target.value)}/>

            <label htmlFor="mileage" className="mt-2">KM:</label>
            <input className="text-input" type="number" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setMileage(e.target.value)}/>

            <label htmlFor="batteryCyle" className="mt-2">Ciclos da bateria:</label>
            <input className="text-input" type="number" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setBatteryCycles(e.target.value)}/>
          </div>
        </>)}

                                                                        {/*//////////////////Accessories///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={() => document.getElementById("accessories").classList.toggle("d-none") }>Acessórios<i className="fas fa-chevron-down ms-2"></i></button>
        <div id="accessories" className="accessories d-none mb-3">
          <label htmlFor="" className="mt-3">Sua bike acompanha algum acessório?</label>
          <select
            className="select-answer" aria-label=".form-select-sm example"
            value={accessories}
            onChange={(e) => setAccessories(e.target.value)}

          >
            {withinAccessories.map((withinAccessory, index)=> {
              return (<option key={index}>{withinAccessory}</option>);
            })}
          </select>

          {accessories === "yes" && (

            <>
              <label htmlFor="accessories" className="mt-2">Qual?</label>
              <select
                className="select-answer" aria-label=".form-select-sm example"
                value={accessories}
                onChange={(e) => setAccessoriesWithin(e.target.value)}

              >
                {accessoryOptions.map((accessorieOption, index)=> {
                  return (<option key={index}>{accessorieOption}</option>);
                })}
              </select>


              { accessoriesWithin === "Outro" && (<>
                <label htmlFor="otherAccessory" className="mt-2">Qual?</label>
                <input type="text" onChange={(e) => setOtherAccessory(e.target.value)}/>
              </>)}

              <label htmlFor="batteryCyle" className="mt-2">Descrição:</label>
              <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setAccessoriesDescription(e.target.value)}/>
            </>
          )}

          <label htmlFor="batteryCyle" className="mt-2">Pedal:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setPedal(e.target.value)}/>
        </div>
        <button className="btn-next-step" type="button" onClick={(e) => handleSecondStep()}><i className="fas fa-angle-double-right"></i></button>
      </div>

      <div id="third-section" className="card-bike-select mb-5 d-none">
        <div className="mb-3">
          <h4 className="text-center text-success">Informações adicionais</h4>
          <label for="description" className="">Descrição:</label>
          <textarea className="text-input" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

          {bikeCondition === "used" && (<>
            <label htmlFor="structuralVisualCondition" className="mt-3">Condição estrutural/visual?</label>
            <select
              className="select-answer"
              value={structuralVisualCondition}
              onChange={(e) => setStructuralVisualCondition(e.target.value)}

            >
              {structuralVisualConditions.map((structuralVisualCondition, index)=> {
                return (<option key={index}>{structuralVisualCondition}</option>);
              })}
            </select>

            <label htmlFor="operatingCondition" className="mt-3">Condição estrutural/visual?</label>
            <select
              className="select-answer"
              value={operatingCondition}
              onChange={(e) => setOperatingCondition(e.target.value)}
            >
              {operatingConditions.map((operatingCondition, index)=> {
                return (<option key={index}>{operatingCondition}</option>);
              })}
            </select>
          </>)}
        </div>
        <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleThirdStep()}><i className="fas fa-angle-double-right"></i></button>
      </div>

      <div id="fourth-section" className="card-bike-select mb-5 d-none">
        <h4 className="text-center text-success">Imagens</h4>
        <input type="file" className="form-control" multiple onChange={(e) => createBikePhotos(e)}/>
        <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleFourthStep()}><i className="fas fa-angle-double-right"></i></button>
      </div>

      <div id="fifth-section" className="card-bike-select mb-5 d-none">
        <h4 className="text-center text-success">Revise as informações</h4>
        <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleFifthStep()}><i className="fas fa-angle-double-right"></i></button>
      </div>

      <div id="sixth-section" className="card-bike-select mb-5 d-none">
        <button onClick={(e) => handleSubmit(e)} className="btn btn-outline mb-5 mt-3">Anunciar</button>
      </div>
    </div>
  );
}
