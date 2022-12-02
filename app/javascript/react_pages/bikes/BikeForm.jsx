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
  const [otherFrameMaterial, setOtherFrameMaterial] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [otherYear, setOtherYear] = useState("");
  const [rimSize, setRimSize] = useState("");
  const [frontRimModel, setFrontRimModel] = useState("");
  const [rearRimModel, setRearRimModel] = useState("");
  const [frontHub, setFrontHub] = useState("");
  const [rearHub, setRearHub] = useState("");
  const [frontTyre, setFrontTyre] = useState("");
  const [rearTyre, setRearTyre] = useState("");
  const [numberOfFrontGears, setNumberOfFrontGears] = useState("");
  const [numberOfRearGears, setNumberOfRearGears] = useState("");
  const [frontDerailleurModel, setFrontDerailleurModel] = useState("");
  const [rearDerailleurModel, setRearDerailleurModel] = useState("");
  const [otherFrontDerailleurModel, setOtherFrontDerailleurModel] = useState("");
  const [otherRearDerailleurModel, setOtherRearDerailleurModel] = useState("");
  const [brakeType, setBrakeType] = useState("");
  const [brakeDiscSize, setBrakeDiscSize] = useState("");
  const [otherBrakeDiscSize, setOtherBrakeDiscSize] = useState("");
  const [brakeModel, setBrakeModel] = useState("");
  const [otherBrakeModel, setOtherBrakeModel] = useState("");
  const [suspensionType, setSuspensionType] = useState("");
  const [frontSuspensionTravel, setFrontSuspensionTravel] = useState("");
  const [otherFrontSuspensionTravel, setOtherFrontSuspensionTravel] = useState("");
  const [frontSuspensionModel, setFrontSuspensionModel] = useState("");
  const [otherFrontSuspensionModel, setOtherFrontSuspensionModel] = useState("");
  const [rearSuspensionTravel, setRearSuspensionTravel] = useState("");
  const [otherRearSuspensionTravel, setOtherRearSuspensionTravel] = useState("");
  const [rearSuspensionModel, setRearSuspensionModel] = useState("");
  const [otherRearSuspensionModel, setOtherRearSuspensionModel] = useState("");
  const [seatPostType, setSeatPostType] = useState("");
  const [seatPostModel, setSeatPostModel] = useState("");
  const [seatPostTravel, setSeatPostTravel] = useState("");
  const [otherSeatPostTravel, setOtherSeatPostTravel] = useState("");
  const [weight, setWeight] = useState("");
  const [locality, setLocality] = useState("");
  const [bikeCondition, setBikeCondition] = useState("");
  const [structuralVisualCondition, setStructuralVisualCondition] = useState("");
  const [operatingCondition, setOperatingCondition] = useState("");
  const [documentationType, setDocumentationType] = useState("");
  const [description, setDescription] = useState("");
  const [handlebar, setHandlebar] = useState("");
  const [stem, setStem] = useState("");
  const [crankset, setCrankset] = useState("");
  const [chain, setChain] = useState("");
  const [accessories, setAccessories] = useState("");
  const [accessoriesDescription, setAccessoriesDescription] = useState("");
  const [otherAccessory, setOtherAccessory] = useState("");
  const [pedals, setPedals] = useState("");
  const [mileage, setMileage] = useState("");
  const [motor, setMotor] = useState("");
  const [batteryCycles, setBatteryCycles] = useState("");
  const [photosPreview, setPhotosPreview] = useState([]);
  const [battery, setBattery] = useState("");
  const [otherBattery, setOtherBattery] = useState("");
  const [advertisementPrice, setAdvertisementPrice ] = useState(null);
  const [photos, setPhotos ] = useState(null);
  const [photoFile, setPhotoFile] = useState({
    index: null,
  });
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
      setBikeId(props.bikeId);
    }
  }, []);

  useEffect(() => {
    if (category && !props.bikeId) {
      console.log(categories)
      setModalities(categories.find(element => element.name === category).modalities)
      setCategoryId(categories.find(element => element.name === category).id);
    } else if (props.bikeId) {
      //NO EDIT O COMPORTAMENTO ERA ESTRANHO, NÃO ACHAVA AS MODALIDADES, FIND EM CATEGORIAS RETORNAVA NULL, VERIFICAR CERTINHO DEPOIS
    }
  });

  useEffect(() => {
    if (category === "urban") {
      setModality(modalities[0])
    } else if (category === "infant") {
      setModality(modalities[0])
    }
  });

  useEffect(() => {
    if (!photos) {
        setPhotosPreview(undefined)
        return
    }
    const photoFile = []
    const objectUrls = []
    for (let i = 0; i < photos.length; i++) {
      const photoName = photos[i].name
      const file = photos[i];
      const fileURL = URL.createObjectURL(file)
      let nameURL = {
        name: photoName,
        url: fileURL
      }
      photoFile.push(nameURL)
      objectUrls.push(fileURL);
    }
    setPhotosPreview(objectUrls)
    setPhotoFile(photoFile)
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrls)
  }, [photos])


  const createBikePhotos = (e) => {
    const photos = Object.values(e.target.files)
    setPhotos(photos)
    console.log(photos)
  }

  function removeObjectWithId(arr, name) {
    const objWithNameIndex = arr.findIndex((obj) => obj.name === name);
    arr.splice(objWithNameIndex, 1);
    return arr;
  }

  const removePhoto = (e) => {
    console.log(e)
    console.log(e.nativeEvent.path[1].childNodes[0].src)
    if (e.nativeEvent.path[1].childNodes[0].src) {
      const newPhotosPreview = photosPreview.filter(element => element !== e.nativeEvent.path[1].childNodes[0].src)
      setPhotosPreview(newPhotosPreview);
      const photoToRemove = photoFile.find(element => element.url === e.nativeEvent.path[1].childNodes[0].src).name
      setPhotos(removeObjectWithId(photos, photoToRemove))
    } else if (e.nativeEvent.path[2].childNodes[0].src) {
      const newPhotosPreview = photosPreview.filter(element => element !== e.nativeEvent.path[1].childNodes[0].src)
      setPhotosPreview(newPhotosPreview);
      const photoToRemove = photoFile.find(element => element.url === e.nativeEvent.path[1].childNodes[0].src).name
      setPhotos(removeObjectWithId(photos, photoToRemove))
    }
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
      setBikeCondition(response.data.bike.bike_condition);
      setStructuralVisualCondition(response.data.bike.structural_visual_condition);
      setOperatingCondition(response.data.bike.operating_condition);
      setDocumentationType(response.data.bike.documentation_type);
      setDescription(response.data.bike.description);
      setAccessories(response.data.bike.accessories);
      setAccessoriesDescription(response.data.bike.accessories_description);
      setBattery(response.data.bike.battery);
      setFrontDerailleurModel(response.data.bike.front_derailleur_model);
      setRearDerailleurModel(response.data.bike.rear_derailleur_model);
      setFrontSuspensionModel(response.data.bike.front_suspension_model);
      setRearSuspensionModel(response.data.bike.rear_suspension_model);
      setBrakeModel(response.data.bike.brake_model);
      setBrakeDiscSize(response.data.bike.brake_disc_size);
      setFrontRimModel(response.data.bike.front_rim_model);
      setRearRimModel(response.data.bike.rear_rim_model);
      setFrontHub(response.data.bike.front_hub);
      setRearHub(response.data.bike.rear_hub);
      setFrontTyre(response.data.bike.front_tyre);
      setRearTyre(response.data.bike.rear_tyre);
      setSeatPostModel(response.data.bike.seat_post_model);
      setHandlebar(response.data.bike.handlebar);
      setStem(response.data.bike.stem);
      setMotor(response.data.bike.motor);
      setCrankset(response.data.bike.crankset);
      setChain(response.data.bike.chain);
      setMileage(response.data.bike.mileage);
      setBatteryCycles(response.data.bike.battery_cycles);
      setPedals(response.data.bike.pedals);
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
    dataObject.append( "bike[model]", model );
    dataObject.append( "bike[rim_size]", rimSize );
    dataObject.append( "bike[number_of_front_gears]", numberOfFrontGears );
    dataObject.append( "bike[number_of_rear_gears]", numberOfRearGears );
    dataObject.append( "bike[brake_type]", brakeType );
    dataObject.append( "bike[suspension_type]", suspensionType );
    dataObject.append( "bike[seat_post_type]", seatPostType );
    dataObject.append( "bike[seat_post_travel]", seatPostTravel );
    dataObject.append( "bike[seat_post_model]", seatPostModel );
    dataObject.append( "bike[weight]", weight );
    dataObject.append( "bike[locality]", locality );
    dataObject.append( "bike[bike_condition]", bikeCondition );
    dataObject.append( "bike[structural_visual_condition]", structuralVisualCondition );
    dataObject.append( "bike[operating_condition]", operatingCondition );
    dataObject.append( "bike[documentation_type]", documentationType );
    dataObject.append( "bike[description]", description );
    dataObject.append( "bike[accessories]", accessories );
    dataObject.append( "bike[accessories_description]", accessoriesDescription );
    dataObject.append( "bike[front_hub]", frontHub );
    dataObject.append( "bike[rear_hub]", rearHub );
    dataObject.append( "bike[front_tyre]", frontTyre );
    dataObject.append( "bike[rear_tyre]", rearTyre );
    dataObject.append( "bike[front_rim_model]", frontRimModel );
    dataObject.append( "bike[rear_rim_model]", rearRimModel );
    dataObject.append( "bike[motor]", motor );
    dataObject.append( "bike[pedals]", pedals );
    dataObject.append( "bike[mileage]", mileage );
    dataObject.append( "bike[chain]", chain );
    dataObject.append( "bike[crankset]", crankset );
    dataObject.append( "bike[handlebar]", handlebar );
    dataObject.append( "bike[stem]", stem );
    dataObject.append( "bike[battery_cycles]", batteryCycles );
    if (photos) {
      photos.map((photo) => {
        dataObject.append( "bike[photos][]", photo );
      })
    }

    if (frameMaterial === "other") {
      dataObject.append( "bike[frame_material]", otherFrameMaterial );
    } else {
      dataObject.append( "bike[frame_material]", frameMaterial );
    }

    if (frontSuspensionTravel === "other") {
      dataObject.append( "bike[front_suspension_travel]", otherFrontSuspensionTravel );
    } else {
      dataObject.append( "bike[front_suspension_travel]", frontSuspensionTravel );
    }

    if (rearSuspensionTravel === "other") {
      dataObject.append( "bike[rear_suspension_travel]", otherRearSuspensionTravel );
    } else {
      dataObject.append( "bike[rear_suspension_travel]", rearSuspensionTravel );
    }

    if (year === "other") {
      dataObject.append( "bike[year]", otherYear );
    } else {
      dataObject.append( "bike[year]", year );
    }

    if (frontDerailleurModel === "other") {
      dataObject.append( "bike[front_derailleur_model]", otherFrontDerailleurModel );
    } else {
      dataObject.append( "bike[front_derailleur_model]", frontDerailleurModel );
    }

    if (rearDerailleurModel === "other") {
      dataObject.append( "bike[rear_derailleur_model]", otherRearDerailleurModel );
    } else {
      dataObject.append( "bike[rear_derailleur_model]", rearDerailleurModel );
    }

    if (frontSuspensionModel === "other") {
      dataObject.append( "bike[front_suspension_model]", otherFrontSuspensionModel );
    } else {
      dataObject.append( "bike[front_suspension_model]", frontSuspensionModel );
    }

    if (rearSuspensionModel === "other") {
      dataObject.append( "bike[rear_suspension_model]", otherRearSuspensionModel );
    } else {
      dataObject.append( "bike[rear_suspension_model]", rearSuspensionModel );
    }

    if (brakeModel === "other") {
      dataObject.append( "bike[brake_model]", otherBrakeModel );
    } else {
      dataObject.append( "bike[brake_model]", brakeModel );
    }

    if (brakeDiscSize === "other") {
      dataObject.append( "bike[brake_disc_size]", otherBrakeDiscSize );
    } else {
      dataObject.append( "bike[brake_disc_size]", brakeDiscSize );
    }

    if (seatPostTravel === "other") {
      dataObject.append( "bike[seat_post_travel]", otherSeatPostTravel );
    } else {
      dataObject.append( "bike[seat_post_travel]", seatPostTravel );
    }

    if (battery === "other") {
      dataObject.append( "bike[battery]", otherBattery );
    } else {
      dataObject.append( "bike[battery]", battery );
    }

    if (accessories === "Outro") {
      dataObject.append( "bike[accessories]", otherAccessory );
    } else {
      dataObject.append( "bike[accessories]", accessories );
    }

    const url = props.bikeId
    ? `/api/v1/bikes/${props.bikeId}`
    : "/api/v1/bikes";
    const method = props.bikeId ? 'patch' : 'post';

    const response = await axios[method](url, dataObject);
    if (response.data.success) {
      window.location = response.data.redirect_url;
      swal("OHH YEAHH", "Anúncio criado com sucesso!!!", "success");
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

    const progressOne = document.getElementById("progress-1")
    const progressTwo = document.getElementById("progress-2")
    const progressThree = document.getElementById("progress-3")
    const progressFour = document.getElementById("progress-4")
    const progressFive = document.getElementById("progress-5")

    if (e.target.innerHTML === "1") {
      firstSection.classList.remove("d-none")
      secondSection.classList.add("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.add("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.remove("section-done")
      progressThree.classList.remove("section-done")
      progressFour.classList.remove("section-done")
      progressFive.classList.remove("section-done")
    } else if (e.target.innerHTML === "2") {
      firstSection.classList.add("d-none")
      secondSection.classList.remove("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.add("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.remove("section-done")
      progressThree.classList.remove("section-done")
      progressFour.classList.remove("section-done")
      progressFive.classList.remove("section-done")
    } else if (e.target.innerHTML === "3") {
      firstSection.classList.add("d-none")
      secondSection.classList.add("d-none")
      thirdSection.classList.remove("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.add("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.add("section-done")
      progressThree.classList.remove("section-done")
      progressFour.classList.remove("section-done")
      progressFive.classList.remove("section-done")
    } else if (e.target.innerHTML === "4") {
      firstSection.classList.add("d-none")
      secondSection.classList.add("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.remove("d-none")
      fifthSection.classList.add("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.add("section-done")
      progressThree.classList.add("section-done")
      progressFour.classList.remove("section-done")
      progressFive.classList.remove("section-done")
    } else if (e.target.innerHTML === "5") {
      firstSection.classList.add("d-none")
      secondSection.classList.add("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.remove("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.add("section-done")
      progressThree.classList.add("section-done")
      progressFour.classList.add("section-done")
      progressFive.classList.remove("section-done")
    } else if (e.target.innerHTML === "6") {
      firstSection.classList.add("d-none")
      secondSection.classList.add("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.add("d-none")

      progressOne.classList.add("section-done")
      progressTwo.classList.add("section-done")
      progressThree.classList.add("section-done")
      progressFour.classList.add("section-done")
      progressFive.classList.add("section-done")
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

  const handleTerms = (e) => {
    const btnAnnounce = document.getElementById("new-announce")
    btnAnnounce.classList.toggle("disable-btn-form")
  }

  const handleTechnicalSection = (e) => {
    const technicalSection = document.getElementById(e.target.innerText);
    const sectionActive = e.target;
    technicalSection.classList.toggle("d-none")
    sectionActive.classList.toggle("btn-selected")
    console.log(e)
  }


  const handleReviewSection = (e) => {
    console.log(`${e.target.innerText}(reviews)`)
    const section = document.getElementById(e.target.innerText + "(review)")
    const sectionActive = e.target;

    console.log(section)
    section.classList.toggle("d-none")
    sectionActive.classList.toggle("review-selected")


  }

  //////////////////////////////////////////////// frames

  const frameBrands = [
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

  const roadFrameSizes =  ["<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL"]
  const dirtMtbFrameSizes =   ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
  const frameMaterials = ["aluminum ", "carbon", "carbon_aluminum_chainstay", "other"]

  //////////////////////////////////////////////// suspensions

  const suspensionTypes = ["no_suspension", "full_suspension", "hardtail"]
  const frontSuspensionTravels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]
  const rearSuspensionTravels = ["80 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]
  const shockSizes = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
  const mtbDirtUrbanFrontSuspensionModels = ["FOX 32", "FOX 34", "FOX 36", "FOX 38", "FOX 40", "ROCKSHOX 30", "ROCKSHOX 35", "ROCKSHOX BLUTO", "ROCKSHOX BOXXER", "ROCKSHOX DOMAIN", "ROCKSHOX JUDY", "ROCKSHOX LYRIK", "ROCKSHOX PARAGON", "ROCKSHOX PIKE", "ROCKSHOX REBA ", "ROCKSHOX RECON", "ROCKSHOX REVELATION", "ROCKSHOX RUDY", "ROCKSHOX SEKTOR", "ROCKSHOX SID", "ROCKSHOX YARI", "ROCKSHOX ZEB", "other"]
  const mtbDirtUrbanRearSuspensionModels = ["FOX DHX", "FOX DHX2 ", "FOX FLOAT DPS", "FOX FLOAT DPX2", "FOX FLOAT X", "FOX FLOAT X2", "ROCKSHOX DELUXE", "ROCKSHOX MONARCH", "ROCKSHOX SIDLUXE", "ROCKSHOX SUPER DELUXE", "other"]

 ///////////////////////////////////////////////// brake

  const brakeTypes = ["v_brake", "hydraulic_disc", "mechanical_disc", "coaster_brake", "caliper" ]
  const discSizes = ["140mm", "160mm", "180mm", "200mm", "203mm", "other" ]
  const roadBrakeModels = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  const mtbDirtUrbanBrakeModels = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SHIMANO ZEE", "SRAM Code", "SRAM DB", "SRAM G2", "SRAM GUIDE", "SRAM Level", "other"]

  //////////////////////////////////////////////// seat post

  const seatPostTypes = ["retractable", "rigid" ]
  const seatPostTravels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm", "other" ]

  /////////////////////////////////////////////// gears

  const frontGears = [0, 1, 2, 3]
  const rearGears = [0, 1, 7, 8, 9, 10, 11, 12]
  const roadFrontDerailleurModels = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "other"]
  const mtbDirtUrbanFrontDerailleurModels = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "other"]
  const roadRearDerailleurModels = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  const mtbDirtUrbanRearDerailleurModels = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SRAM XX1", "other"]

  ///////////////////////////////////////////// rim

  const rimSizes = ["20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "700C", "650B", "Fatbike"]

  /////////////////////////////////////////// conditions
  const bikeConditions = ["new", "used", ];
  const structuralVisualConditions = ["perfect_condition", "minor_surface_scratches", "spalls_in_paint", "painted_frame", "frame_welded_repaired", "frame_cracks_or_fissures_must_be_repaired", "components_welded_repaired", "components_cracks_or_fissures_must_be_repaired"]
  const operatingConditions = ["rears_worn_out_higher_75", "hifters_not_working_properly", "front_suspension_not_working_properly", "rear_suspension_not_working_properly", "suspensions_lock_not_working_properly", "brake_not_working_properly", "retractable_seat_post_not_working_properly", "creaking_when_pedaling", "wheels_bent", "tyres_worn_out_minus_50"]

 ////////////////////////////////////////////////// documentation

 const documentationTypes = ["Nota fiscal", "Documento de importação", "Cupom Fiscal Estrangeiro", "Sem Documento"]

 //////////////////////////////////////////////// batteries

 const batteries = ["320wH", "500Wh", "625Wh", "700Wh", "other"]

 //////////////////////////////////////////////YEARS

  const years = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "other", ];

  /////////////////////////////////////////////////BIKE TYPES

  const bikeTypes = ["e-bike", "normal"]

  /////////////////////////////////////////////////BIKE TYPES

  const withinAccessories = ["no", "yes"]

  //////////////////////////////////////////////ACCESSORIES

  const accessoryOptions = ["Não", "Pedal", "Ciclocomputador", "Lanterna traseira", "Farol", "Bolsa de acessórios", "Suporte de garrafinha", "Outro"]

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
      </ul>

      <div id="first-section" className="card-bike-select mb-5">
        <h4 className="text-center text-success">Informações gerais</h4>
        <label htmlFor="bikeType" className="mt-3 text-start">Tipo da bike: <span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={bikeType}
          onChange={(e) => setBikeType(e.target.value)}
        >
          <option value=""></option>
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
          <option value=""></option>
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
            <option value=""></option>
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
            <option value=""></option>
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
            <option value=""></option>
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
          <option value=""></option>
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
          <option value=""></option>
          {frameMaterials.map((frameMaterial, index)=> {
            return (<option key={index}>{frameMaterial}</option>);
          })}
        </select>
        { errors && errors.bike && errors.bike.frame_material && (
          <p className="text-danger">{errors.bike.frame_material[0]}</p>
        )}

        { frameMaterial === "other"  && (
          <>
            <label htmlFor="year" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
            <input type="text" className="text-input" onChange={(e) => setOtherFrameMaterial(e.target.value)}/>
          </>
        )}

        <label htmlFor="documentationType" className="mt-4">Documentação:<span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={documentationType}
          onChange={(e) => setDocumentationType(e.target.value)}
        >
          <option value=""></option>
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
          <option value=""></option>
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
          <option value=""></option>
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
            <input type="text" className="text-input" onChange={(e) => setOtherYear(e.target.value)}/>
          </>
        )}

        <label htmlFor="model" className="mt-4">modelo:<span className="requested-information ms-1">*</span></label>
        <input type="text" className="text-input"  value={model} onChange={(e) => setModel(e.target.value)}/>
        { errors && errors.bike && errors.bike.model && (
          <p className="text-danger">{errors.bike.model[0]}</p>
        )}

        <div className="d-flex justify-content-between gap-3">
          <div className="w-50">
            <label htmlFor="priceInCentes" className="mt-4">preço:<span className="requested-information ms-1">*</span></label>
            <input type="number" className="text-input" placeholder="Reais e centavos sem virgula" value={priceInCents} onChange={(e) => setPriceInCents(e.target.value)}/>
            { errors && errors.bike && errors.bike.price_in_cents  && (
              <p className="text-danger">{errors.bike.price_in_cents[0]}</p>
            )}
          </div>
          <div className="w-50">
            <label htmlFor="quantity" className="mt-4">quantidade:<span className="requested-information ms-1">*</span></label>
            <input type="number" className="text-input" value={quantity}onChange={(e) => setQuantity(e.target.value)}/>
            { errors && errors.bike && errors.bike.quantity  && (
              <p className="text-danger">{errors.bike.quantity[0]}</p>
            )}
          </div>
        </div>

        <label htmlFor="locality" className="mt-4">cidade:<span className="requested-information ms-1">*</span></label>
        <input type="text" className="text-input"  value={locality}onChange={(e) => setLocality(e.target.value)}/>
        { errors && errors.bike && errors.bike.locality && (
          <p className="text-danger">{errors.bike.locality[0]}</p>
        )}

        <label htmlFor="weight" className="mt-4">peso:(opicional)</label>
        <input type="number" className="text-input" placeholder="Em Kg" value={weight}onChange={(e) => setWeight(e.target.value)}/>

        <div className="text-center">
          <button className="btn-next-step mt-4" type="button" onClick={(e) => handleFirstStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
        </div>
      </div>

                                  {/*/////////////////////////////////////////////////////////2ª SECTION////////////////////////////////////////////////////////////////*/}

      <div id="second-section" className="card-bike-select mb-5 d-none">
        <h4 className="text-center text-success">Informações técnicas</h4>
                                                                        {/*//////////////////TRANSMISSÂO///////////////////////*/}

        {/* BIKE <TRANSMISSION></TRANSMISSION>  fazer render das partials e diminuir código para todas as seções */}
        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Transmissão<i class="fas fa-chevron-down ms-2"></i></button>
        <div id="Transmissão" className="transmission d-none mb-3">
            <label htmlFor="numberOfFrontGears" className="mt-3">Marchas dianteiras:</label>
            <select
              className="select-answer"
              value={numberOfFrontGears}
              onChange={(e) => setNumberOfFrontGears(e.target.value)}
            >
              <option value=""></option>
              {frontGears.map((frontGear, index)=> {
                return (<option key={index}>{frontGear}</option>);
              })}
            </select>

            <label htmlFor="numberOfRearGears" className="mt-4">Marchas traseiras:</label>
            <select
              className="select-answer"
              value={numberOfRearGears}
              onChange={(e) => setNumberOfRearGears(e.target.value)}
            >
              <option value=""></option>
              {rearGears.map((rearGear, index)=> {
                return (<option key={index}>{rearGear}</option>);
              })}
            </select>

            <label htmlFor="front_gear" className="mt-4">Pédivela:</label>
            <input class="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={crankset} onChange={(e) => setCrankset(e.target.value)}/>

            <label htmlFor="front_gear" className="mt-4">Corrente:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={chain} onChange={(e) => setChain(e.target.value)}/>
          {category === "road" && (<>
            <label htmlFor="front_gear" className="mt-4">Câmbio dianteiro:</label>
            <select className="select-answer" aria-label=".form-select-sm example"
              value={frontDerailleurModel}
              onChange={(e) => setFrontDerailleurModel(e.target.value)}
            >
              <option value=""></option>
              {roadFrontDerailleurModels.map((frontDerailleurModel, index)=> {
                return (<option key={index}>{frontDerailleurModel}</option>);
              })}
            </select>
            <br />
            { frontDerailleurModel === "other"  && (
              <>
                <label htmlFor="front_gear" className="mt-4">Qual?</label>
                <input type="text" className="text-input" onChange={(e) => setOtherFrontDerailleurModel(e.target.value)}/>
              </>
            )}

            <label htmlFor="rear_gear" className="mt-4">Câmbio traseiro:</label>
            <select className="select-answer" aria-label=".form-select-sm example"
              value={rearDerailleurModel}
              onChange={(e) => setRearDerailleurModel(e.target.value)}
            >
              <option value=""></option>
              {roadRearDerailleurModels.map((rearDerailleurModel, index)=> {
                return (<option key={index}>{rearDerailleurModel}</option>);
              })}
            </select>
            <br />
            { rearDerailleurModel === "other"  && (
              <>
                <label htmlFor="front_gear" className="mt-4">Qual?</label>
                <input type="text" className="text-input" onChange={(e) => setOtherRearDerailleurModel(e.target.value)}/>
              </>
            )}
          </>)}

          {["mountain_bike", "dirt_street", "urban", "infant"].includes(category) && (<>
            <label htmlFor="front_gear" className="mt-3">Câmbio dianteiro:</label>
            <select className="select-answer" aria-label=".form-select-sm example"
              value={frontDerailleurModel}
              onChange={(e) => setFrontDerailleurModel(e.target.value)}
            >
              <option value=""></option>
              {mtbDirtUrbanFrontDerailleurModels.map((frontDerailleurModels, index)=> {
                return (<option key={index}>{frontDerailleurModels}</option>);
              })}
            </select>

            { frontDerailleurModel === "other"  && (
              <>
                <label htmlFor="front_gear" className="mt-4">Qual?</label>
                <input type="text-input" onChange={(e) => setOtherFrontDerailleurModel(e.target.value)}/>
              </>
            )}

            <label htmlFor="rear_gear" className="mt-4">Câmbio traseiro:</label>
            <select className="select-answer" aria-label=".form-select-sm example"
              value={rearDerailleurModel}
              onChange={(e) => setRearDerailleurModel(e.target.value)}
              >
              <option value=""></option>
              {mtbDirtUrbanRearDerailleurModels.map((rearDerailleurModels, index)=> {
                return (<option key={index}>{rearDerailleurModels}</option>);
              })}
            </select>
            <br />
            { rearDerailleurModel === "other"  && (
              <>
                <label htmlFor="front_gear" className="mt-4">Qual?</label>
                <input type="text-input" onChange={(e) => setOtherRearDerailleurModel(e.target.value)}/>
              </>
            )}
          </>)}
        </div>

                                                                       {/*//////////////////FREIOS///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Freios<i className="fas fa-chevron-down ms-2"></i></button>
        <div id="Freios" className="brake d-none mb-3">
          <label htmlFor="brakeType" className="mt-3">Tipo de freio:</label>
          <select
            className="select-answer" aria-label=".form-select-sm example"
            value={brakeType}
            onChange={(e) => setBrakeType(e.target.value)}
          >
            <option value=""></option>
            {brakeTypes.map((brakeType, index)=> {
              return (<option key={index}>{brakeType}</option>);
            })}
          </select>
          {(brakeType === "hydraulic_disc" || brakeType === "mechanical_disc") && (<>
            <label htmlFor="disc_size" className="mt-4">Tamanho do disco:</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={brakeDiscSize}
              onChange={(e) => setBrakeDiscSize(e.target.value)}
            >
              <option value=""></option>
              {discSizes.map((discSize, index)=> {
                return (<option key={index}>{discSize}</option>);
              })}
            </select>
          </>)}

          {brakeDiscSize === "other" && (<>
            <label htmlFor="other_disc_size" className="mt-4">Qual:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setOtherBrakeDiscSize(e.target.value)}/>
          </>)}

          {category === "road" && (<>
            <label htmlFor="brakeModel" className="mt-4">Marca | Modelo:</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={brakeModel}
              onChange={(e) => setBrakeModel(e.target.value)}
            >
              <option value=""></option>
              {roadBrakeModels.map((roadBrakeModel, index)=> {
                return (<option key={index}>{roadBrakeModel}</option>);
              })}
            </select>
          </>)}

          {(category === "mountain_bike" || category ===  "dirt_street" || category ===  "urban") && (<>
            <label htmlFor="brakeModel" className="mt-4">Marca | Modelo</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={brakeModel}
              onChange={(e) => setBrakeModel(e.target.value)}
            >
              <option value=""></option>
              {roadBrakeModels.map((roadBrakeModel, index)=> {
                return (<option key={index}>{roadBrakeModel}</option>);
              })}
            </select>
          </>)}
          <br />

          {brakeModel === "other" && (<>
            <label htmlFor="front_gear" className="mt-4">Qual:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setOtherBrakeModel(e.target.value)}/>
          </>)}
        </div>

                                                                        {/*//////////////////SUSPENSÂO///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Suspensões<i className="fas fa-chevron-down ms-2"></i></button>
        <div id="Suspensões" className="suspension d-none mb-3">
          <label htmlFor="suspensionType" className="mt-3">Tipo de suspensão:</label>
          <select
            className="select-answer" aria-label=".form-select-sm example"
            value={suspensionType}
            onChange={(e) => setSuspensionType(e.target.value)}
          >
            <option value=""></option>
            {suspensionTypes.map((suspensionType, index)=> {
                return (<option key={index}>{suspensionType}</option>);
              })}
          </select>

          {suspensionType === "full_suspension" && (<>
            <label htmlFor="frontSuspensionTravel" className="mt-4">Suspensão dianteira:</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={frontSuspensionTravel}
              onChange={(e) => setFrontSuspensionTravel(e.target.value)}
            >
              <option value=""></option>
              {frontSuspensionTravels.map((frontSuspensionTravel, index)=> {
                return (<option key={index}>{frontSuspensionTravel}</option>);
              })}
            </select>

            { frontSuspensionTravel === "other"  && (
              <>
                <label htmlFor="year" className="mt-4">Qual?</label>
                <input type="text" className="text-input" onChange={(e) => setOtherFrontSuspensionTravel(e.target.value)}/>
              </>
            )}

            <label htmlFor="rearSuspensionTravel" className="mt-4">Suspensão traseira:</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={rearSuspensionTravel}
              onChange={(e) => setRearSuspensionTravel(e.target.value)}
            >
              <option value=""></option>
              {rearSuspensionTravels.map((rearSuspensionTravel, index)=> {
                return (<option key={index}>{rearSuspensionTravel}</option>);
              })}
            </select>

            { rearSuspensionTravel === "other"  && (
              <>
                <label htmlFor="year" className="mt-4">Qual?</label>
                <input type="text" className="text-input" onChange={(e) => setOtherRearSuspensionTravel(e.target.value)}/>
              </>
            )}
          </>
          )}

          {suspensionType === "hardtail" && (<>
            <label htmlFor="frontSuspensionTravel" className="mt-4">Suspensão dianteira:</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={frontSuspensionTravel}
              onChange={(e) => setFrontSuspensionTravel(e.target.value)}
            >
              <option value=""></option>
              {frontSuspensionTravels.map((rearSuspensionTravel, index)=> {
                return (<option key={index}>{rearSuspensionTravel}</option>);
              })}
            </select>

            { rearSuspensionTravel === "other"  && (
              <>
                <label htmlFor="year" className="mt-4">Qual?</label>
                <input type="text" className="text-input" onChange={(e) => setOtherRearSuspensionTravel(e.target.value)}/>
              </>
            )}
          </>
          )}

          {(category === "mountain_bike" || category === "dirt_street" || category === "urban") && suspensionType === "full_suspension"  &&(
            <>
              <label htmlFor="frontSuspensionModel" className="mt-4">Marca | Modelo (dianteira):</label>
              <select className="select-answer" aria-label=".form-select-sm example"
                value={frontSuspensionModel}
                onChange={(e) => setFrontSuspensionModel(e.target.value)}
              >
                <option value=""></option>
                {mtbDirtUrbanFrontSuspensionModels.map((frontSuspensionModels, index)=> {
                  return (<option key={index}>{frontSuspensionModels}</option>);
                })}
              </select>
              <br />
              { frontSuspensionModel === "other"  && (
                <>
                  <label htmlFor="otherFrontSuspensionModel" className="mt-4">Qual?</label>
                  <input type="text-input" className="text-input" onChange={(e) => setOtherFrontSuspensionModel(e.target.value)}/>
                </>
              )}

              <label htmlFor="RearSuspensionModel" className="mt-4">Marca | Modelo (traseira):</label>
              <select className="select-answer" aria-label=".form-select-sm example"
                value={rearSuspensionModel}
                onChange={(e) => setRearSuspensionModel(e.target.value)}
                >
                <option value=""></option>
                {mtbDirtUrbanRearSuspensionModels.map((rearSuspensionModels, index)=> {
                  return (<option key={index}>{rearSuspensionModels}</option>);
                })}
              </select>
              <br />
              { rearSuspensionModel === "other"  && (
                <>
                  <label htmlFor="otherRearSuspensionModel" className="mt-4">Qual?</label>
                  <input type="text" className="text-input" onChange={(e) => setOtherRearSuspensionModel(e.target.value)}/>
                </>
              )}
            </>
          )}

          {(category === "mountain_bike" || category === "dirt_street" || category === "urban") && suspensionType === "hardtail" &&(
            <>
              <label htmlFor="frontSuspensionModel" className="mt-4">Marca | Modelo (dianteira):</label>
              <select className="select-answer" aria-label=".form-select-sm example"
                value={frontSuspensionModel}
                onChange={(e) => setFrontSuspensionModel(e.target.value)}
              >
                <option value=""></option>
                {mtbDirtUrbanFrontSuspensionModels.map((frontSuspensionModels, index)=> {
                  return (<option key={index}>{frontSuspensionModels}</option>);
                })}
              </select>
              <br />
              { frontSuspensionModel === "other"  && (
                <>
                  <label htmlFor="otherFrontSuspensionModel" className="mt-4">Qual?</label>
                  <input type="text-input" className="text-input" onChange={(e) => setOtherFrontSuspensionModel(e.target.value)}/>
                </>
              )}
            </>
          )}
        </div>

                                                                        {/*//////////////////RODAS///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Rodas<i className="fas fa-chevron-down ms-2"></i></button>
        <div id="Rodas" className="rims d-none mb-3">
          <label htmlFor="bikeCondition" className="mt-4">Tamanho da roda:</label>
          <select
            className="select-answer"
            value={rimSize}
            onChange={(e) => setRimSize(e.target.value)}
          >
            <option value=""></option>
            {rimSizes.map((rimSize, index)=> {
                return (<option key={index}>{rimSize}</option>);
              })}
          </select>

          <label htmlFor="frontRimModel" className="mt-4">Aro dianteiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={frontRimModel} onChange={(e) => setFrontRimModel(e.target.value)}/>

          <label htmlFor="rearRimModel" className="mt-4">Aro traseiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={rearRimModel} onChange={(e) => setRearRimModel(e.target.value)}/>

          <label htmlFor="frontHub" className="mt-4">Cubo dianteiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={frontHub} onChange={(e) => setFrontHub(e.target.value)}/>

          <label htmlFor="rearHub" className="mt-4">Cubo traseiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={rearHub} onChange={(e) => setRearHub(e.target.value)}/>

          <label htmlFor="frontTyre" className="mt-4">Pneu dianteiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={frontTyre} onChange={(e) => setFrontTyre(e.target.value)}/>

          <label htmlFor="rearTyre" className="mt-4">Pneu traseiro:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={rearTyre} onChange={(e) => setRearTyre(e.target.value)}/>
        </div>

                                                                        {/*//////////////////COCKPIT///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Cockpit<i className="fas fa-chevron-down ms-2"></i></button>
        <div id="Cockpit" className="cockpit d-none mb-3">
          <label htmlFor="handlebar" className="mt-3">Guidao:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={handlebar} onChange={(e) => setHandlebar(e.target.value)}/>
          <label htmlFor="stem" className="mt-4">Mesa:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={stem} onChange={(e) => setStem(e.target.value)}/>
        </div>

                                                                        {/*//////////////////CANOTE///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Canote<i className="fas fa-chevron-down ms-2"></i></button>
        <div id="Canote" className="seat-post d-none mb-3">
          <label htmlFor="seatPostType" className="mt-3">Tipo de canote:</label>
          <select
            className="select-answer" aria-label=".form-select-sm example"
            value={seatPostType}
            onChange={(e) => setSeatPostType(e.target.value)}
          >
            <option value=""></option>
            {seatPostTypes.map((seatPostType, index)=> {
                return (<option key={index}>{seatPostType}</option>);
              })}
          </select>

          {seatPostType === "retractable" && (<>
            <label htmlFor="seatPostTravel" className="mt-4">Curso do canote?</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={seatPostTravel}
              onChange={(e) => setSeatPostTravel(e.target.value)}
            >
              <option value=""></option>
              {seatPostTravels.map((seatPostTravel, index)=> {
                return (<option key={index}>{seatPostTravel}</option>);
              })}
            </select>

            { seatPostTravel === "other" && (
              <>
              <label htmlFor="otherSeatPostTravel" className="mt-4">Qual?</label>
              <input className="text-input" type="text" onChange={(e) => setOtherSeatPostTravel(e.target.value)}/>
            </>
            )}
          </>)}

          <label htmlFor="seatPostModel" className="mt-4">Modelo:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example"  value={seatPostModel} onChange={(e) => setSeatPostModel(e.target.value)}/>
        </div>

                                                                        {/*//////////////////BATERIA///////////////////////*/}

        { bikeType === "electric" && (<>
          <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Parte elétrica<i className="fas fa-chevron-down ms-2"></i></button>
          <div id="Parte elétrica" className="rims d-none mb-3">
            <label htmlFor="frameSize" className="mt-3">Capacidade:</label>
            <select
              className="select-answer" aria-label=".form-select-sm example"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
            >
              <option value=""></option>
              {batteries.map((battery, index)=> {
                return (<option key={index}>{battery}</option>);
              })}
            </select>

            { battery === "other" && (<>
              <label htmlFor="otherBattery" className="mt-4">Qual?</label>
              <input type="text"  className="text-input" placeholder="" aria-label=".form-control-sm example" onChange={(e) => setOtherBattery(e.target.value)}/>
            </>)}

            <label htmlFor="motor" className="mt-4">Motor:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={motor} onChange={(e) => setMotor(e.target.value)}/>

            <label htmlFor="mileage" className="mt-4">KM:</label>
            <input className="text-input" type="number" placeholder="" aria-label=".form-control-sm example" value={mileage} onChange={(e) => setMileage(e.target.value)}/>

            <label htmlFor="batteryCyle" className="mt-4">Ciclos da bateria:</label>
            <input className="text-input" type="number" placeholder="" aria-label=".form-control-sm example" value={batteryCycles} onChange={(e) => setBatteryCycles(e.target.value)}/>
          </div>
        </>)}

                                                                        {/*//////////////////Accessories///////////////////////*/}

        <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Acessórios<i className="fas fa-chevron-down ms-2"></i></button>
        <div id="Acessórios" className="accessories d-none mb-3">
          <label htmlFor="" className="mt-3">Acessório:</label>
          <select
            className="select-answer" aria-label=".form-select-sm example"
            value={accessories}
            onChange={(e) => setAccessories(e.target.value)}
          >
            <option value=""></option>
            {accessoryOptions.map((accessorieOption, index)=> {
              return (<option key={index}>{accessorieOption}</option>);
            })}
          </select>

          { accessories === "Outro" && (<>
            <label htmlFor="otherAccessory" className="mt-4">Qual?</label>
            <input type="text"  className="text-input" onChange={(e) => setOtherAccessory(e.target.value)}/>
          </>)}

          { accessories !== "Não" && (<>
            <label htmlFor="accessories-description" className="mt-4">Descrição:</label>
            <input className="text-input" type="text" placeholder="" value={accessoriesDescription} aria-label=".form-control-sm example" onChange={(e) => setAccessoriesDescription(e.target.value)}/>
          </>)}

          <label htmlFor="batteryCyle" className="mt-4">Pedal:</label>
          <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={pedals} onChange={(e) => setPedals(e.target.value)}/>
        </div>
        <div className="text-center">
          <button className="btn-next-step" type="button" onClick={(e) => handleSecondStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
        </div>
      </div>

                        {/* ////////////////////////////////////////////////////////////////////// 3ª SECTION //////////////////////////////////////////////////////////*/}

      <div id="third-section" className="card-bike-select mb-5 d-none">
        <div className="mb-3">
          <h4 className="text-center text-success">Informações adicionais</h4>
          <label for="description" className="mt-3">Descrição:</label>
          <textarea className="text-input-description" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

          {bikeCondition === "used" && (<>
            <label htmlFor="structuralVisualCondition" className="mt-4">Condição estrutural/visual?</label>
            <select
              className="select-answer"
              value={structuralVisualCondition}
              onChange={(e) => setStructuralVisualCondition(e.target.value)}

            >
              <option value=""></option>
              {structuralVisualConditions.map((structuralVisualCondition, index)=> {
                return (<option key={index}>{structuralVisualCondition}</option>);
              })}
            </select>

            <label htmlFor="operatingCondition" className="mt-4">Condição estrutural/visual?</label>
            <select
              className="select-answer"
              value={operatingCondition}
              onChange={(e) => setOperatingCondition(e.target.value)}
            >
              <option value=""></option>
              {operatingConditions.map((operatingCondition, index)=> {
                return (<option key={index}>{operatingCondition}</option>);
              })}
            </select>
          </>)}
        </div>
        <div className="text-center">
          <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleThirdStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
        </div>
      </div>

      <div id="fourth-section" className="card-bike-select mb-5 d-none">
        <h4 className="text-center text-success">Imagens</h4>
        <input id="photo-upload" type="file" className="text-input file-upload" multiple accept="image/png, image/jpg, image/jpeg" onChange={(e) => createBikePhotos(e)}/>
        <p className="text-center my-3">ESCOLHA AS IMAGENS DA SUA BIKE</p>
        <div className="text-center">
          <label htmlFor="photo-upload" className="label-upload my-2"><i class="fas fa-file-upload"></i></label>
        </div>
        {
          photosPreview?.length > 0 ?
          <div  className="d-flex justify-content-center flex-wrap mt-3">
            {
              photosPreview.map((photoPreview, idx) => {
                return  (<><button className="remove-photo mt-2" type="button" onClick={(e) => removePhoto(e)}>
                    <img src={photoPreview} alt="" className="image-preview-form" />
                    <div className="middle">
                      <div className="text">Remover</div>
                    </div>
                  </button></>)
              })
            }
          </div> : null
        }
        <div className="text-center">
          <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleFourthStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
        </div>
      </div>

      <div id="fifth-section" className="card-bike-select mb-5 d-none">
        <h4 className="text-center text-success">Revise as informações</h4>
        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Gerais</button>
        {/* <h5 className="text-success mt-3 text-center">Gerais:</h5> */}
        <div id="Gerais(review)" className=" d-none">
          <div className="d-flex justify-content-between">
            <p><span className="text-success">Tipo:</span> {bikeType}</p>
            <p><span className="text-success">Categoria:</span> {category}</p>
            <p><span className="text-success">Modalidade:</span> {modality}</p>
          </div>

          <div className="d-flex justify-content-between">
            <p><span className="text-success">Ano:</span> {year === "other" ? otherYear : year}</p>
            <p><span className="text-success">Quantidade:</span> {quantity}</p>
            <p><span className="text-success">Peso:</span> {weight}Kg</p>
          </div>

          <div className="d-flex justify-content-between">
            <p><span className="text-success">Modelo:</span> {model}</p>
            <p><span className="text-success">Preço:</span>  {(priceInCents / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}</p>
            <p><span className="text-success">Cidade:</span> {locality}</p>
          </div>
          <p><span className="text-success">Documentação:</span> {documentationType}</p>
          <p><span className="text-success">Condição:</span> {bikeCondition}</p>
          <p><span className="text-success">Condição operacional:</span> {operatingCondition}</p>
          <p><span className="text-success">Condição estrutural/visual:</span> {structuralVisualCondition}</p>
          <p><span className="text-success">Descrição:</span> {description}</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Quadro</button>
        <div id="Quadro(review)" className="d-none">
          <p><span className="text-success">Marca:</span>{frameBrand}</p>
          <p><span className="text-success">Material:</span>{frameMaterial}</p>
          <p><span className="text-success">Tamanho:</span>{frameSize}</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Transmissão</button>
        <div id="Transmissão(review)" className="d-none">
          <p><span className="text-success">Marchas dianteiras:</span> {numberOfFrontGears}</p>
          <p><span className="text-success">Modelo:</span> {frontDerailleurModel === "other" ? otherFrontDerailleurModel : frontDerailleurModel }</p>
          <p><span className="text-success">Marchas traseiras:</span> {numberOfRearGears}</p>
          <p><span className="text-success">Modelo:</span> {rearDerailleurModel === "other" ? otherRearDerailleurModel : rearDerailleurModel }</p>
          <p><span className="text-success">Pedivela:</span> {crankset}</p>
          <p><span className="text-success">Corrente:</span> {chain}</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Freios</button>
        <div id="Freios(review)" className="d-none">
          <p><span className="text-success">Tipo:</span> {brakeType}</p>
          <p><span className="text-success">Tamanho do disco:</span> {brakeDiscSize === "other" ? otherBrakeDiscSize : brakeDiscSize }</p>
          <p><span className="text-success">Modelo:</span> {brakeModel === "other" ? otherBrakeModel : brakeModel }</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Suspensões</button>
        <div id="Suspensões(review)" className="d-none">
          <p><span className="text-success">Tipo:</span> {suspensionType}</p>
          <p><span className="text-success">Curso dianteira:</span> {frontSuspensionTravel}</p>
          <p><span className="text-success">Curso traseira:</span> {rearSuspensionTravel }</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Rodas</button>
        <div id="Rodas(review)" className="d-none">
          <p><span className="text-success">Tamanho:</span> {rimSize}</p>
          <p><span className="text-success">Aro dianteiro:</span> {frontRimModel}</p>
          <p><span className="text-success">Aro traseiro:</span> {rearRimModel }</p>
          <p><span className="text-success">Cudo dianteiro:</span> {frontHub}</p>
          <p><span className="text-success">Cubo traseiro:</span> {rearHub }</p>
          <p><span className="text-success">Pneu dianteiro:</span> {frontTyre}</p>
          <p><span className="text-success">Pneu traseiro:</span> {rearTyre }</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Cockpit</button>
        <div id="Cockpit(review)" className="d-none">
          <p><span className="text-success">Guidão:</span> {handlebar}</p>
          <p><span className="text-success">Mesa:</span> {stem}</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Canote</button>
        <div id="Canote(review)" className="d-none">
          <p><span className="text-success">Tipo:</span> {seatPostType}</p>
          <p><span className="text-success">Curso:</span> {seatPostTravel}</p>
          <p><span className="text-success">Modelo:</span> {seatPostModel }</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Acessórios</button>
        <div id="Acessórios(review)" className="d-none">
          <p><span className="text-success">Acompanha(qual?):</span> {accessories === "other" ? otherAccessory : accessories }</p>
          <p><span className="text-success">Descrição:</span> {accessoriesDescription}</p>
          <p><span className="text-success">Pedais:</span> {pedals }</p>
        </div>

        { bikeType === "electric" && (<>
          <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Parte elétrica</button>
          <div id="Parte elétrica(review)" className="d-none">
            <p><span className="text-success">Capacidade da baterias:</span> {battery === "other" ? otherBattery : battery }</p>
            <p><span className="text-success">Motor:</span> {motor}</p>
            <p><span className="text-success">Km:</span> {mileage} Km</p>
            <p><span className="text-success">Ciclos da bateria:</span> {batteryCycles}</p>
          </div>
        </>)}

        <h4 className="text-success mt-3 text-center">Imagens</h4>
        {
          photosPreview?.length > 0 ?
          <div  className="d-flex gap-2 justify-content-center flex-wrap my-3">
            {
              photosPreview.map((photoPreview, idx) => {
                return <img src={photoPreview} alt="" className="image-review" />
              })
            }
          </div> : <p className="text-center">Nenhuma imagem adicionada</p>
        }

        {!props.bikeId && (<>
          {(priceInCents < 50000) && (<>
            <div className="text-center mt-3 mb-3">
              <h6 className="announce-terms">Seu anúncio não será cobrado</h6>
              {!props.bikeId && (
                <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3">Anunciar</button>
              )}
            </div>
          </>)}

          { (priceInCents >= 50000) && (priceInCents < 250000) && (<>
            <div className="d-flex justify-content-center gap-2">
              <input type="checkbox" onChange={(e) => handleTerms(e)}/>
              <h6 className="announce-terms">Entendo que o anúncio custará R$ 50,00</h6>
            </div>
            <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
            <div className="text-center mt-3 mb-3">
              {!props.bikeId && (
                <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
              )}
            </div>
          </>)}

          {(priceInCents >= 250000) && (priceInCents < 500000) && (<>
            <div className="d-flex justify-content-center gap-2">
              <input type="checkbox" onChange={(e) => handleTerms(e)}/>
              <h6 className="announce-terms">Entendo que o anúncio custará R$ 100,00</h6>
            </div>
            <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
            <div className="text-center mt-3 mb-3">
              {!props.bikeId && (
                <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
              )}
            </div>
          </>)}

          {(priceInCents >= 500000) && (priceInCents <= 1000000) &&(<>
            <div className="d-flex justify-content-center gap-2">
              <input type="checkbox" onChange={(e) => handleTerms(e)}/>
              <h6 className="announce-terms">Entendo que o anúncio custará R$ 150,00</h6>
            </div>
            <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
            <div className="text-center mt-3 mb-3">
              {!props.bikeId && (
                <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
              )}
            </div>
          </>)}

          {(priceInCents > 1000000) && (<>
            <div className="d-flex justify-content-center gap-2">
              <input type="checkbox" onChange={(e) => handleTerms(e)}/>
              <h6 className="announce-terms">Entendo que o anúncio custará R$ 200,00</h6>
            </div>
            <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
            <div className="text-center mt-3 mb-3">
              {!props.bikeId && (
                <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
              )}
            </div>
          </>)}
        </>)}

        <div className="text-center mt-3 mb-3">
          {props.bikeId && (
            <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce">Editar</button>
          )}
        </div>
      </div>
    </div>
  );
}
