import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import IntlCurrencyInput from "react-intl-currency-input"

export function BikeForm(props) {
  const [bikeId, setBikeId] = useState([]);
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState("");
  const [modalities, setModalities] = useState([]);
  const [modality, setModality] = useState("");
  const [bikeType, setBikeType] = useState("");
  const [priceInCents, setPriceInCents] = useState("");
  const [quantity, setQuantity ] = useState("");
  const [city, setCity ] = useState("");
  const [state, setState ] = useState("");
  const [cityId, setCityId ] = useState("");
  const [stateId, setStateId ] = useState("");
  const [frameBrand, setFrameBrand] = useState("");
  const [otherFrameBrand, setOtherFrameBrand] = useState("");
  const [frameSize, setFrameSize] = useState("");
  const [otherFrameSize, setOtherFrameSize] = useState("");
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
  const [forkMaterial, setForkMaterial] = useState("");
  const [otherForkMaterial, setOtherForkMaterial] = useState("");
  const [cranksetMaterial, setCranksetMaterial] = useState("");
  const [otherCranksetMaterial, setOtherCranksetMaterial] = useState("");
  const [handlebarMaterial, setHandlebarMaterial] = useState("");
  const [otherHandlebarMaterial, setOtherHandlebarMaterial] = useState("");
  const [wheelMaterial, setWheelMaterial] = useState("");
  const [otherWheelMaterial, setOtherWheelMaterial] = useState("");
  const [seatPostMaterial, setSeatPostMaterial] = useState("");
  const [otherSeatPostMaterial, setOtherSeatPostMaterial] = useState("");
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
  const [bikeCondition, setBikeCondition] = useState("");
  const [bikeConditionStatus, setBikeConditionStatus] = useState("");
  const [bikeConditionDescription, setBikeConditionDescription] = useState("");
  const [documentationType, setDocumentationType] = useState("");
  const [description, setDescription] = useState("");
  const [handlebar, setHandlebar] = useState("");
  const [stem, setStem] = useState("");
  const [crankset, setCrankset] = useState("");
  const [chain, setChain] = useState("");
  const [accessories, setAccessories] = useState([]);
  const [accessoriesDescription, setAccessoriesDescription] = useState("");
  const [otherAccessory, setOtherAccessory] = useState("");
  const [pedals, setPedals] = useState("");
  const [mileage, setMileage] = useState("");
  const [batteryCycles, setBatteryCycles] = useState("");
  const [photosPreview, setPhotosPreview] = useState([]);
  const [battery, setBattery] = useState("");
  const [otherBattery, setOtherBattery] = useState("");
  const [discountCoupon, setDiscountCoupon] = useState("");
  const [mapedCitiesForState, setMapedCitiesForState] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [photos, setPhotos ] = useState(null);
  const [photosEdit, setPhotosEdit ] = useState([]);

  const [photoFiles, setPhotoFiles] = useState({
    index: null,
  });
  const [errors, setErrors] = useState({
    bike: {},
    coupon: ""
  });

  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

  const BrlCurrencyComponent = () => {
    const handleChange = (event, value, maskedValue) => {
      event.preventDefault();
      setPriceInCents(value)
    };
    return(
      <IntlCurrencyInput currency="BRL" config={currencyConfig}
        className="text-input" value={priceInCents}   onChange={handleChange}
      />
    );
  }

  //save reference for dragItem and dragOverItem
	const dragItem = React.useRef(null)
	const dragOverItem = React.useRef(null)

	//const handle drag sorting
	const handleSort = () => {
		//duplicate items
		let _photoFiles = [...photoFiles]


		//remove and save the dragged item content
		const draggedItemContent = _photoFiles.splice(dragItem.current, 1)[0]


		//switch the position
		_photoFiles.splice(dragOverItem.current, 0, draggedItemContent)


		//reset the position ref
		dragItem.current = null
		dragOverItem.current = null

		//update the actual array
		setPhotoFiles(_photoFiles)
		// setPhotos(_photos)
    let order = photoFiles.map((photo) => { return photo.name })
    console.log(order)
    // let orderedArray = mapOrder(photos, order, 'name');

    // console.log(_photos)
	}


  function mapOrder (array, order, key) {

    array.sort( function (a, b) {
      var A = a[key], B = b[key];

      if (order.indexOf(A) > order.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }

    });

    return array;
  };



  useEffect(() => {
    fetch(`/get_information_for_new_bike`)
     .then((response) => response.json())
     .then((data) => {
      setCategories(data.categories)
      if (data.user) {
        setUser(data.user.id)
        setStates(data.states)
        setCities(data.cities)
      }
     })
    if (props.bikeId) {
      fetchBike();
      setBikeId(props.bikeId);
      setModalities(["downhill", "enduro", "gravel", "speed", "trail", "xc_cross_country", "speed_performance", "triathlon", "ciclocross", "cicloviagem", "street_bmx", "race_bmx", "big_wheel_bmx", "dirt_jump"]);
      //jeito por enquanto pra setar modalidades, todas de uma vez

    }
  }, []);

  useEffect(() => {
    if (category && !props.bikeId) {
      setModalities(categories.find(element => element.name === category).modalities)
      setCategoryId(categories.find(element => element.name === category).id);
    }
  });

  useEffect(() => {
    if (category === "urban") {
      setModality("urban")
    } else if (category === "infant") {
      setModality("infant")
    }
  });



  useEffect(() => {
    if (!photos) {
        setPhotosPreview(undefined)
        return
    }
    const photoFiles = []
    const objectUrls = []
    for (let i = 0; i < photos.length; i++) {
      const photoName = photos[i].name
      const file = photos[i];
      const fileURL = URL.createObjectURL(file)
      let nameURL = {
        name: photoName,
        url: fileURL
      }
      photoFiles.push(nameURL)
      objectUrls.push(fileURL);
    }
    setPhotosPreview(objectUrls)
    setPhotoFiles(photoFiles)
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
    const newPhotosPreview = photosPreview.filter(element => element !== e.target.id)
    setPhotosPreview(newPhotosPreview);
    const photoToRemove = photoFile.find(element => element.url === e.target.id).name
    setPhotos(removeObjectWithId(photos, photoToRemove))
  }

  async function fetchBike() {
    const response = await axios.get(
      `/api/v1/bikes/${props.bikeId}/edit`
    );
    if (response.data) {
      setUser(response.data.bike.user_id);
      setCategory(response.data.category);
      setState(response.data.state);
      setCity(response.data.city);
      setCategoryId(response.data.bike.category_id);
      setModality(response.data.bike.modality);
      setBikeType(response.data.bike.bike_type);
      setPriceInCents(response.data.bike.price_in_cents / 100);
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
      setStateId(response.data.bike.state_id);
      setCityId(response.data.bike.city_id);
      setBikeCondition(response.data.bike.bike_condition);
      setBikeConditionStatus(response.data.bike.bike_condition_status);
      setBikeConditionDescription(response.data.bike.bike_condition_description);
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
      setCrankset(response.data.bike.crankset);
      setChain(response.data.bike.chain);
      setMileage(response.data.bike.mileage);
      setBatteryCycles(response.data.bike.battery_cycles);
      setPedals(response.data.bike.pedals);
      setPhotosEdit(response.data.photos);
      setMapedCitiesForState(response.data.maped_cities)

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.target.classList.add("d-none")
    const spinner = document.getElementById("spinner")
    spinner.classList.remove("d-none")

    const dataObject = new FormData();
    dataObject.append( "bike[user_id]", user );
    dataObject.append( "bike[category_id]", categoryId );
    dataObject.append( "bike[modality]", modality );
    dataObject.append( "bike[bike_type]", bikeType );
    dataObject.append( "bike[price_in_cents]", (priceInCents * 100) );
    dataObject.append( "bike[quantity]", quantity );
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
    dataObject.append( "bike[state_id]", stateId );
    dataObject.append( "bike[city_id]", cityId );
    dataObject.append( "bike[bike_condition]", bikeCondition );
    dataObject.append( "bike[bike_condition_status]", bikeConditionStatus );
    dataObject.append( "bike[bike_condition_description]", bikeConditionDescription );
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

    if (frameBrand === "other") {
      dataObject.append( "bike[frame_brand]", otherFrameBrand );
    } else {
      dataObject.append( "bike[frame_brand]", frameBrand );
    }

    if (frameSize === "other") {
      dataObject.append( "bike[frame_size]", otherFrameSize );
    } else {
      dataObject.append( "bike[frame_size]", frameSize );
    }


    if (frameMaterial === "other") {
      dataObject.append( "bike[frame_material]", otherFrameMaterial );
    } else {
      dataObject.append( "bike[frame_material]", frameMaterial );
    }

    if (forkMaterial === "other") {
      dataObject.append( "bike[fork_material]", otherForkMaterial );
    } else {
      dataObject.append( "bike[fork_material]", forkMaterial );
    }

    if (cranksetMaterial === "other") {
      dataObject.append( "bike[crankset_material]", otherCranksetMaterial );
    } else {
      dataObject.append( "bike[crankset_material]", cranksetMaterial );
    }

    if (handlebarMaterial === "other") {
      dataObject.append( "bike[handlebar_material]", otherHandlebarMaterial );
    } else {
      dataObject.append( "bike[handlebar_material]", handlebarMaterial );
    }

    if (wheelMaterial === "other") {
      dataObject.append( "bike[wheel_material]", otherWheelMaterial );
    } else {
      dataObject.append( "bike[wheel_material]", wheelMaterial );
    }

    if (seatPostMaterial === "other") {
      dataObject.append( "bike[seat_post_material]", otherSeatPostMaterial );
    } else {
      dataObject.append( "bike[seat_post_material]", seatPostMaterial );
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

    dataObject.append( "advertisement[discount_coupon]", discountCoupon );

    const url = props.bikeId
    ? `/api/v1/bikes/${props.bikeId}`
    : "/api/v1/bikes";
    const method = props.bikeId ? 'patch' : 'post';

    const response = await axios[method](url, dataObject);
    if (response.data.success) {
      if (props.bikeId) {
        window.location = response.data.redirect_url;
        swal("OHH YEAHH", "Anúncio editado com sucesso!!!", "success");
      } else {
        window.location = response.data.redirect_url;
        swal("OHH YEAHH", "Anúncio criado com sucesso!!!", "success");
      }
    } else {
      swal("OPS, Algo deu errado!", "Revise suas informaçoes", "error");
      setErrors(response.data.errors);
      e.target.classList.remove("d-none")
      document.getElementById("spinner").classList.add("d-none")
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
      window.location = 'https://nuflowshop.herokuapp.com/products/new'

    } else if (e.target.innerHTML === "2") {
      secondSection.classList.remove("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.add("d-none")
      sixthSection.classList.add("d-none")

      progressTwo.classList.remove("section-done")
      progressThree.classList.remove("section-done")
      progressFour.classList.remove("section-done")
      progressFive.classList.remove("section-done")
      progressSix.classList.remove("section-done")

    } else if (e.target.innerHTML === "3") {
      secondSection.classList.add("d-none")
      thirdSection.classList.remove("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.add("d-none")
      sixthSection.classList.add("d-none")

      progressTwo.classList.add("section-done")
      progressThree.classList.remove("section-done")
      progressFour.classList.remove("section-done")
      progressFive.classList.remove("section-done")
      progressSix.classList.remove("section-done")

    } else if (e.target.innerHTML === "4") {
      secondSection.classList.add("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.remove("d-none")
      fifthSection.classList.add("d-none")
      sixthSection.classList.add("d-none")

      progressTwo.classList.add("section-done")
      progressThree.classList.add("section-done")
      progressFour.classList.remove("section-done")
      progressFive.classList.remove("section-done")
      progressSix.classList.remove("section-done")

    } else if (e.target.innerHTML === "5") {
      secondSection.classList.add("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.remove("d-none")
      sixthSection.classList.add("d-none")

      progressTwo.classList.add("section-done")
      progressThree.classList.add("section-done")
      progressFour.classList.add("section-done")
      progressFive.classList.remove("section-done")
      progressSix.classList.remove("section-done")

    } else if (e.target.innerHTML === "6") {
      secondSection.classList.add("d-none")
      thirdSection.classList.add("d-none")
      fourthSection.classList.add("d-none")
      fifthSection.classList.add("d-none")
      sixthSection.classList.remove("d-none")

      progressTwo.classList.add("section-done")
      progressThree.classList.add("section-done")
      progressFour.classList.add("section-done")
      progressFive.classList.add("section-done")
      progressSix.classList.remove("section-done")
    }
  }

  const handleBackToSecond = (e) => {
    const progressTwo = document.getElementById("progress-2")
    const progressThree = document.getElementById("progress-3")
    const secondSection = document.getElementById("second-section")
    const thirdSection = document.getElementById("third-section")
    progressTwo.classList.remove("section-done")
    secondSection.classList.remove("d-none")
    progressThree.classList.remove("section-done")
    thirdSection.classList.add("d-none")
  }

  const handleBackToThird = () => {
    const progressThird = document.getElementById("progress-3")
    const progressFourth = document.getElementById("progress-4")
    const thirdSection = document.getElementById("third-section")
    const fourthSection = document.getElementById("fourth-section")
    progressThird.classList.remove("section-done")
    progressFourth.classList.remove("section-done")
    thirdSection.classList.remove("d-none")
    fourthSection.classList.add("d-none")
  }

  const handleBackToFourth = () => {
    const progressFifth = document.getElementById("progress-5")
    const progressFourth = document.getElementById("progress-4")
    const fourthSection = document.getElementById("fourth-section")
    const fifthSection = document.getElementById("fifth-section")
    progressFourth.classList.remove("section-done")
    progressFifth.classList.remove("section-done")
    fourthSection.classList.remove("d-none")
    fifthSection.classList.add("d-none")
  }

  const handleBackToFifth = () => {
    const progressFifth = document.getElementById("progress-5")
    const progressSixth = document.getElementById("progress-6")
    const fifthSection = document.getElementById("fifth-section")
    const sixthSection = document.getElementById("sixth-section")
    progressFifth.classList.remove("section-done")
    progressSixth.classList.remove("section-done")
    fifthSection.classList.remove("d-none")
    sixthSection.classList.add("d-none")
  }


  const handleSecondStep = (e) => {
    const progressTwo = document.getElementById("progress-2")
    const secondSection = document.getElementById("second-section")
    const thirdSection = document.getElementById("third-section")
    progressTwo.classList.add("section-done")
    secondSection.classList.add("d-none")
    thirdSection.classList.remove("d-none")
  }

  const handleThirdStep = () => {
    const progressThird = document.getElementById("progress-3")
    const thirdSection = document.getElementById("third-section")
    const fourthSection = document.getElementById("fourth-section")
    progressThird.classList.add("section-done")
    thirdSection.classList.add("d-none")
    fourthSection.classList.remove("d-none")
  }

  const handleFourthStep = () => {
    const progressFourth = document.getElementById("progress-4")
    const fourthSection = document.getElementById("fourth-section")
    const fifthSection = document.getElementById("fifth-section")
    progressFourth.classList.add("section-done")
    fourthSection.classList.add("d-none")
    fifthSection.classList.remove("d-none")
  }

  const handleFifthStep = () => {
    const progressFifth = document.getElementById("progress-5")
    const fifthSection = document.getElementById("fifth-section")
    const sixthSection = document.getElementById("sixth-section")
    progressFifth.classList.add("section-done")
    fifthSection.classList.add("d-none")
    sixthSection.classList.remove("d-none")
  }


  const handleTechnicalSection = (e) => {
    const technicalSection = document.getElementById(e.target.innerText);
    const sectionActive = e.target;
    technicalSection.classList.toggle("d-none")
    sectionActive.classList.toggle("btn-selected")
  }


  const handleReviewSection = (e) => {
    const section = document.getElementById(e.target.innerText + "(review)")
    const sectionActive = e.target;
    section.classList.toggle("d-none")
    sectionActive.classList.toggle("review-selected")
  }

  const handleNoAccessoriesToSelect = (e) => {
    e.target.classList.toggle("active")
    if (e.target.classList.contains("active")) {
      e.target.classList.add("selected-tag")
      setAccessories(["Não"])
      document.getElementById("include-accessory").classList.remove("selected-tag")
      document.getElementById("accessories-options").classList.add("d-none")
      const tags = document.querySelectorAll("#accessory-option")
      tags.forEach(element => element.classList.remove("selected-tag"))
    } else {
      e.target.classList.remove("selected-tag")
      setAccessories([])
    }
  }

  const handleAccessoriesToSelect = (e) => {
    e.target.classList.toggle("active")
    if (e.target.classList.contains("active")) {
      document.getElementById("accessories-options").classList.remove("d-none")
      e.target.classList.add("selected-tag")
      document.getElementById("no-accessory").classList.remove("selected-tag")
      setAccessories([])
    } else {
      document.getElementById("accessories-options").classList.add("d-none")
      e.target.classList.remove("selected-tag")
    }
  }

  const includeAccessory = (e) => {
    const currentAccessories = [...accessories]
    const tagFilter = e.target
    if (currentAccessories.includes(e.target.value)) {
      setAccessories(currentAccessories.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentAccessories.push(e.target.value)
      setAccessories(currentAccessories)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleLocality = (e) => {
    if (e.target.id === "state-input") {
      setStateId(e.target.value)
      setState(states.find(element => element.id === Number(e.target.value)).acronym)
      setMapedCitiesForState(cities.filter(element => element.state_id === Number(e.target.value)))
    } else {
      setCityId(e.target.value)
      setCity(cities.find(element => element.id === Number(e.target.value)).name)
    }
  }

  const handleSwitchSection = (e) => {
    const principalInfos = document.getElementById("principal-infos")
    const additionalInfos = document.getElementById("additional-infos")
    const principal = document.getElementById("principal")
    const additional = document.getElementById("additional")

    if (e.target.checked === true) {
      additionalInfos.classList.remove("d-none")
      principalInfos.classList.add("d-none")
      additional.classList.add("text-success")
      principal.classList.remove("text-success")
    } else {
      additionalInfos.classList.add("d-none")
      principalInfos.classList.remove("d-none")
      additional.classList.remove("text-success")
      principal.classList.add("text-success")
    }
  }

  const handleBikeConditionStatus = (e) => {
    setBikeConditionStatus(e.target.value)
    if (e.target.value === "bad") {
      document.getElementById("label-bad").classList.add("text-danger")
      document.getElementById("label-reasonable").classList.remove("text-warning")
      document.getElementById("label-good").classList.remove("text-primary")
      document.getElementById("label-excellent").classList.remove("text-success")
    } else if (e.target.value === "reasonable") {
      document.getElementById("label-bad").classList.remove("text-danger")
      document.getElementById("label-reasonable").classList.add("text-warning")
      document.getElementById("label-good").classList.remove("text-primary")
      document.getElementById("label-excellent").classList.remove("text-success")
    } else if (e.target.value === "good") {
      document.getElementById("label-bad").classList.remove("text-danger")
      document.getElementById("label-reasonable").classList.remove("text-warning")
      document.getElementById("label-good").classList.add("text-primary")
      document.getElementById("label-excellent").classList.remove("text-success")
    }else if (e.target.value === "excellent") {
      document.getElementById("label-bad").classList.remove("text-danger")
      document.getElementById("label-reasonable").classList.remove("text-warning")
      document.getElementById("label-good").classList.remove("text-primary")
      document.getElementById("label-excellent").classList.add("text-success")
    }
  }

  const handleBackToForm = (e) => {
    window.location = 'https://nuflowshop.herokuapp.com/products/new'
  }

  const handleTerms = (e) => {
    const btnAnnounce = document.getElementById("new-announce")
    btnAnnounce.classList.toggle("disable-btn-form")
  }

  const handlePermitNextStep = () => {
    if (!category || !modality || !bikeType || !priceInCents || !model || !frameMaterial || !documentationType || !quantity || !frameBrand || !frameSize || !year || !city || !state) {
      return (
        <button className="btn-next-step mt-4 pe-none" type="button" onClick={(e) => handleSecondStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
      )
    } else if (category && modality && bikeType && priceInCents && bikeCondition && model && frameMaterial && documentationType && quantity && frameBrand && frameSize && year && city && state) {
      return (
        <button className="btn-next-step mt-4" type="button" onClick={(e) => handleSecondStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
      )
    }
  }


  //////////////////////////////////////////////// frames

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
    "Dahon",
    "Yeti",
    "Outra"
  ].sort()

  const roadFrameSizes =  ["<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL", "other"]
  const dirtMtbFrameSizes =   ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "S1", "S2", "S3", "S4", "S5", "S6", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL", "other" ]

  //////////////////////////////////////////////// suspensions

  const frontSuspensionTravels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]
  const rearSuspensionTravels = ["80 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm", "other"]
  const shockSizes = ["165x38", "170x35", "184x44", "184x48", "190x37.5", "190x42.5", "190x44", "190x45.0", "190x51", "190x63", "197x48", "200x50", "200x51", "200x57", "200x70", "205x50", "205x53", "205x57.5", "205x60", "205x65", "210x50", "210x52.5", "210x55", "215.9x57.1", "216x57", "216x63", "216x64", "222x57", "222x70", "225x70", "225x75", "229x76", "230x57.5", "230x60", "230x65", "235x32.5", "240x75", "240x76", "241x76", "250x70", "250x75m", "257x51", "267x89", "48x197", "other" ]
  const mtbDirtUrbanFrontSuspensionModels = ["FOX 32", "FOX 34", "FOX 36", "FOX 38", "FOX 40", "ROCKSHOX 30", "ROCKSHOX 35", "ROCKSHOX BLUTO", "ROCKSHOX BOXXER", "ROCKSHOX DOMAIN", "ROCKSHOX JUDY", "ROCKSHOX LYRIK", "ROCKSHOX PARAGON", "ROCKSHOX PIKE", "ROCKSHOX REBA ", "ROCKSHOX RECON", "ROCKSHOX REVELATION", "ROCKSHOX RUDY", "ROCKSHOX SEKTOR", "ROCKSHOX SID", "ROCKSHOX YARI", "ROCKSHOX ZEB", "other"]
  const mtbDirtUrbanRearSuspensionModels = ["FOX DHX", "FOX DHX2 ", "FOX FLOAT DPS", "FOX FLOAT DPX2", "FOX FLOAT X", "FOX FLOAT X2", "ROCKSHOX DELUXE", "ROCKSHOX MONARCH", "ROCKSHOX SIDLUXE", "ROCKSHOX SUPER DELUXE", "other"]

 ///////////////////////////////////////////////// brake

  const discSizes = ["140mm", "160mm", "180mm", "200mm", "203mm", "other" ]
  const roadBrakeModels = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  const mtbDirtUrbanBrakeModels = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SHIMANO ZEE", "SRAM Code", "SRAM DB", "SRAM G2", "SRAM GUIDE", "SRAM Level", "other"]

  //////////////////////////////////////////////// seat post

  const seatPostTravels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm", "other" ]

  /////////////////////////////////////////////// gears

  const frontGears = [0, 1, 2, 3]
  const rearGears = [0, 1, 7, 8, 9, 10, 11, 12]
  const roadFrontDerailleurModels = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "other"]
  const mtbDirtUrbanFrontDerailleurModels = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "other"]
  const roadRearDerailleurModels = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  const mtbDirtUrbanRearDerailleurModels = ["SHIMANO  SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SRAM XX1", "other"]

  ///////////////////////////////////////////// rim

  const rimSizes = ["16''", "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "650B", "700C", "Fatbike"]

 //////////////////////////////////////////////// batteries

 const batteries = ["320wH", "500Wh", "625Wh", "700Wh", "other"]

 //////////////////////////////////////////////YEARS

  const years = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "other", ];


  //////////////////////////////////////////////ACCESSORIES
 const accessoryOptions = ["Não", "Pedal", "Ciclocomputador", "Lanterna Traseira", "Farol", , "Bolsa de Acessórios", "Suporte de garrafinha", "Bateria extra"]

  const translateWord = (word) => {
    const languageMap = {
      "bike": "Bike",
      "e-bike": "E-Bike",

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

      "new": "Novo",
      "used": "Usado",

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

  return (
    <div className="w-60 new-bike-react py-5">
      <h1 className="text-success pb-3 text-center">Vamos lá...</h1>
      <ul className="list-group list-group-horizontal-sm progress-bar pb-5">
        <li id="progress-1" className="progress progress-1 section-done"><button className="btn-progress" onClick={(e) => handleShowSection(e)}>1</button></li>
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

      <div id="second-section" className="card-bike-select mb-5">
        <h4 className="text-center text-success">Informações gerais</h4>
        <label htmlFor="bikeType" className="mt-3 text-start">Tipo da bike: <span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={bikeType}
          onChange={(e) => setBikeType(e.target.value)}
        >
          <option value=""></option>
          <option value="bike">Bike</option>
          <option value="e-bike">E-Bike</option>
        </select>
        { errors && errors.bike && errors.bike.bike_type && (
          <p className="text-danger">{errors.bike.bike_type[0]}</p>
        )}

        { bikeType === "e-bike" && (<>
          <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Parte elétrica<i className="fas fa-chevron-down ms-2"></i></button>
          <div id="Parte elétrica" className="rims d-none mb-3">
            <div className="d-flex">
              <div className="w-40 me-3">
                <label htmlFor="frameSize" className="mt-3">Capacidade:</label>
                <select
                  className="select-answer" aria-label=".form-select-sm example"
                  value={battery}
                  onChange={(e) => setBattery(e.target.value)}
                >
                  <option value=""></option>
                  {batteries.map((battery, index)=> {
                    if (battery === "other") {
                      return (<option key={index} value="other">Outra</option>);
                    } else {
                      return (<option key={index}>{battery}</option>);
                    }

                  })}
                </select>

                { battery === "other" && (<>
                  <label htmlFor="otherBattery" className="">Qual?</label>
                  <input type="text"  className="text-input" placeholder="" value={otherBattery} aria-label=".form-control-sm example" onChange={(e) => setOtherBattery(e.target.value)}/>
                </>)}
              </div>
              <div className="">
                <label htmlFor="batteryCyle" className="mt-3">Ciclos da bateria:</label>
                <input className="text-input" type="number" placeholder="" aria-label=".form-control-sm example" value={batteryCycles} onChange={(e) => setBatteryCycles(e.target.value)}/>
              </div>
            </div>
            <div className="">
              <label htmlFor="mileage" className="mt-4">KM:</label>
              <input className="text-input" type="number" placeholder="" aria-label=".form-control-sm example" value={mileage} onChange={(e) => setMileage(e.target.value)}/>
            </div>
          </div>
        </>)}

        <label htmlFor="category" className="mt-4 text-start">Categoria:<span className="requested-information ms-1">*</span></label>
        <select
        value={category}
        onChange={(e) =>  setCategory(e.target.value) }
        className="select-answer"
        >
          <option value=""></option>
          <option value="mountain_bike">Mountain Bike</option>
          <option value="dirt_street">Dirt</option>
          <option value="road">Road</option>
          <option value="infant">Infantil</option>
          <option value="urban">Urbano</option>
        </select>
        { errors && errors.bike && errors.bike.category && (
          <p className="text-danger">{errors.bike.category[1]}</p>
        )}



        {category === "mountain_bike" && (<>

          <label htmlFor="modality" className="mt-4 text-start">Modalidade:<span className="requested-information ms-1">*</span></label>
          <select
            value={modality}
            onChange={(e) => e.preventDefault && setModality(e.target.value)}
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


        {category === "dirt_street" && (<>
          <label htmlFor="modality" className="mt-4 text-start">Modalidade:<span className="requested-information ms-1">*</span></label>
          <select
            value={modality}
            onChange={(e) => e.preventDefault && setModality(e.target.value)}
            className="select-answer"
          >
            <option value=""></option>
            <option value="street_bmx">Street BMX</option>
            <option value="race_bmx">Race BMX</option>
            <option value="big_wheel_bmx">Big Wheel BMX</option>
            <option value="dirt_jump">Dirt Jump</option>
          </select>
        </>)}

        {category === "road" && (<>
          <label htmlFor="modality" className="mt-4 text-start">Modalidade:<span className="requested-information ms-1">*</span></label>
          <select
            value={modality}
            onChange={(e) => e.preventDefault && setModality(e.target.value)}
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

        <label htmlFor="frameBrand" className="mt-4 text-start">Marca:<span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={frameBrand}
          onChange={(e) => setFrameBrand(e.target.value)}
        >
          <option value=""></option>
          {frameBrands.map((frameBrand, index) => {
            return (<option key={index}>{frameBrand}</option>);
          })}
          <option value="other">Outra</option>
        </select>

        { errors && errors.bike && errors.bike.frame_brand && (
          <p className="text-danger">{errors.bike.frame_brand[0]}</p>
        )}

        { frameBrand === "other"  && (
          <>
            <label htmlFor="otherFrameMaterial" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
            <input type="text" className="text-input" value={otherFrameBrand} onChange={(e) => setOtherFrameBrand(e.target.value)}/>
          </>
        )}

        <label htmlFor="model" className="mt-4">Modelo:<span className="requested-information ms-1">*</span></label>
        <input type="text" className="text-input"  value={model} onChange={(e) => setModel(e.target.value)}/>
        { errors && errors.bike && errors.bike.model && (
          <p className="text-danger">{errors.bike.model[0]}</p>
        )}

        {category === "road" && (<>
          <label htmlFor="frameSize" className="mt-4">tamanho do quadro:<span className="requested-information ms-1">*</span></label>
          <select
            className="select-answer"
            value={frameSize}
            onChange={(e) => setFrameSize(e.target.value)}
          >
            <option value=""></option>
            {roadFrameSizes.map((frameSize, index)=> {
              if (frameSize === "other") {
                return (<option key={index} value="other">Outro</option>);
              } else {
                return (<option key={index}>{frameSize}</option>);
              }
              // return (<option key={index}>{frameSize}</option>);
            })}
          </select>
          { errors && errors.bike && errors.bike.frame_size && (
            <p className="text-danger">{errors.bike.frame_size[0]}</p>
          )}

          { frameSize === "other"  && (
            <>
              <label htmlFor="otherFrameMaterial" className="mt-4">Qual<span className="requested-information ms-1">*</span></label>
              <input type="text" className="text-input" value={otherFrameSize} onChange={(e) => setOtherFrameSize(e.target.value)}/>
            </>
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
              if (frameSize === "other") {
                return (<option key={index} value="other">Outro</option>);
              } else {
                return (<option key={index}>{frameSize}</option>);
              }
            })}
          </select>
          { errors && errors.bike && errors.bike.frame_size && (
            <p className="text-danger">{errors.bike.frame_size[0]}</p>
          )}

          { frameSize === "other"  && (
            <>
              <label htmlFor="otherFrameMaterial" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
              <input type="text" className="text-input" value={otherFrameSize} onChange={(e) => setOtherFrameSize(e.target.value)}/>
            </>
          )}
        </>)}

        <label htmlFor="frameMaterial" className="mt-4">Material do quadro:<span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={frameMaterial}
          onChange={(e) => setFrameMaterial(e.target.value)}
        >
          <option value=""></option>
          <option value="carbon">Carbono</option>
          <option value="aluminum">Aluminio</option>
          <option value="carbon_aluminum_chainstay">Carbono/Aumínio (Chainstay)</option>
          <option value="other">Outro</option>

        </select>
        { errors && errors.bike && errors.bike.frame_material && (
          <p className="text-danger">{errors.bike.frame_material[0]}</p>
        )}

        { frameMaterial === "other"  && (
          <>
            <label htmlFor="otherFrameMaterial" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
            <input type="text" className="text-input" value={otherFrameMaterial} onChange={(e) => setOtherFrameMaterial(e.target.value)}/>
          </>
        )}

        <label htmlFor="documentationType" className="mt-4">Documentação:<span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={documentationType}
          onChange={(e) => setDocumentationType(e.target.value)}
        >
          <option value=""></option>
          <option value="receipt">Nota Fiscal</option>
          <option value="import_document">Documento de Importação</option>
          <option value="foreign_tax_coupon">Cupom Fiscal Estrangeiro</option>
          <option value="foreign_tax_coupon_and_import_document">Cupom Fiscal Estrangeiro + Documento de Importação</option>
          <option value="no_documentation">Sem Documento</option>
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
          <option value="new">Nova</option>
          <option value="used">Usada</option>
        </select>
        { errors && errors.bike && errors.bike.bike_condition && (
          <p className="text-danger">{errors.bike.bike_condition[0]}</p>
        )}

        <label htmlFor="Year" className="mt-4">Ano:<span className="requested-information ms-1">*</span></label>
        <select
          className="select-answer"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value=""></option>
          {years.map((year, index)=> {
            if (year === "other") {
              return (<option key={index} value="other">Outro</option>);
            } else {
              return (<option key={index} >{year}</option>);
            }
          })}
        </select>
        { errors && errors.bike && errors.bike.year && (
          <p className="text-danger">{errors.bike.year[0]}</p>
        )}

        { year === "other"  && (
          <>
            <label htmlFor="otherYear" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
            <input type="text" className="text-input" value={otherYear} onChange={(e) => setOtherYear(e.target.value)}/>
          </>
        )}



        <div className="d-flex justify-content-between gap-3">
          <div className="w-50">
            <label htmlFor="priceInCentes" className="mt-4">Preço:<span className="requested-information ms-1">*</span></label>
            {BrlCurrencyComponent()}
            {/* <input type="number" className="text-input" placeholder="Reais e centavos sem virgula" value={priceInCents} onChange={(e) => setPriceInCents(e.target.value)}/> */}
            { errors && errors.bike && errors.bike.price_in_cents  && (
              <p className="text-danger">{errors.bike.price_in_cents[0]}</p>
            )}
          </div>
          <div className="w-50">
            <label htmlFor="quantity" className="mt-4">quantidade:<span className="requested-information ms-1">*</span></label>
            <input type="number" className="text-input" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            { errors && errors.bike && errors.bike.quantity  && (
              <p className="text-danger">{errors.bike.quantity[0]}</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <label htmlFor="productLocality" className="mt-3">Estado:<span className="requested-information ms-1">*</span></label>
            <select
              className="select-answer"
              id="state-input"
              value={stateId}
              onChange={(e) => handleLocality(e)}
            >
              <option value=""></option>
              {states.map((state, index)=> {
                return (<option id="state-input" key={index} value={state.id}>{state.acronym}</option>);
              })}
            </select>
            { errors && errors.bike && errors.bike.state_id && (
              <p className="text-danger">{errors.bike.state_id[0]}</p>
            )}
          </div>

          <div className="col-md-9">
            <label htmlFor="Locality" className="mt-3">cidade:<span className="requested-information ms-1">*</span></label>
            {stateId && (<>
              <select
                className="select-answer"
                id="city-input"
                value={cityId}
                onChange={(e) => handleLocality(e)}
              >
                <option value=""></option>
                {mapedCitiesForState.map((city, index)=> {
                  return (<option id="city-input" key={index} value={city.id}>{city.name}</option>);
                })}
              </select>
              { errors && errors.bike && errors.bike.city_id && (
                <p className="text-danger">{errors.bike.city_id[0]}</p>
              )}
            </>)}

            {!stateId && (<>
              <select
                className="select-answer"
                id="city-input"
                value={cityId}
                onChange={(e) => handleLocality(e)}
              >
                <option value=""></option>
                {cities.map((city, index)=> {
                  return (<option id="city-input" key={index} value={city.id}>{city.name}</option>);
                })}
              </select>
              { errors && errors.bike && errors.bike.city_id && (
                <p className="text-danger">{errors.bike.city_id[0]}</p>
              )}
            </>)}
          </div>
        </div>

        <label htmlFor="weight" className="mt-4">peso:(opicional)</label>
        <input type="number" className="text-input" placeholder="Em Kg" value={weight} onChange={(e) => setWeight(e.target.value)}/>

        <div className="text-center">
          <button className="btn-back-step me-3 mt-3" type="button" onClick={(e) => handleBackToForm(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
          {handlePermitNextStep()}
        </div>
      </div>

                                  {/*/////////////////////////////////////////////////////////2ª SECTION////////////////////////////////////////////////////////////////*/}

      <div id="third-section" className="card-bike-select mb-5 d-none">
        <h4 className="text-center text-success">Informações técnicas</h4>
        <div className="d-flex justify-content-center">
          <p id="principal" className="me-2 text-success" >PRINCIPAIS</p>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e) => handleSwitchSection(e)}/>
          </div>
          <p id="additional" className="" >ADICIONAIS</p>
        </div>
                                                                        {/*//////////////////TRANSMISSÂO///////////////////////*/}

        {/* BIKE <TRANSMISSION></TRANSMISSION>  fazer render das partials e diminuir código para todas as seções */}
        <div id="principal-infos" className="principal-infos">
          <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Câmbio<i className="fas fa-chevron-down ms-2"></i></button>
          <div id="Câmbio" className="transmission d-none mb-3">
              <label htmlFor="numberOfFrontGears" className="mt-3">Número de coroas (dianteira):</label>
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

              <label htmlFor="numberOfRearGears" className="mt-4">Número de valocidades (traseira):</label>
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


            {category === "road" && (<>
              <label htmlFor="front_gear" className="mt-4">Câmbio dianteiro:</label>
              <select className="select-answer" aria-label=".form-select-sm example"
                value={frontDerailleurModel}
                onChange={(e) => setFrontDerailleurModel(e.target.value)}
              >
                <option value=""></option>
                {roadFrontDerailleurModels.map((frontDerailleurModel, index)=> {
                  if (frontDerailleurModel === "other") {
                    return (<option key={index} value="other">Outro</option>);

                  } else {

                    return (<option key={index}>{frontDerailleurModel}</option>);

                  }
                })}
              </select>
              <br />
              { frontDerailleurModel === "other"  && (
                <>
                  <label htmlFor="otherFrontDerailleurModel" className="mt-4">Qual?</label>
                  <input type="text" className="text-input" value={otherFrontDerailleurModel} onChange={(e) => setOtherFrontDerailleurModel(e.target.value)}/>
                </>
              )}

              <label htmlFor="rear_gear" className="mt-4">Câmbio traseiro:</label>
              <select className="select-answer" aria-label=".form-select-sm example"
                value={rearDerailleurModel}
                onChange={(e) => setRearDerailleurModel(e.target.value)}
              >
                <option value=""></option>
                {roadRearDerailleurModels.map((rearDerailleurModel, index)=> {
                  if (rearDerailleurModel === "other") {
                    return (<option key={index} value="other">Outro</option>);
                  } else {
                    return (<option key={index}>{rearDerailleurModel}</option>);
                  }
                })}
              </select>
              <br />
              { rearDerailleurModel === "other"  && (
                <>
                  <label htmlFor="front_gear" className="mt-4">Qual?</label>
                  <input type="text" className="text-input" value={otherRearDerailleurModel} onChange={(e) => setOtherRearDerailleurModel(e.target.value)}/>
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
                  if (frontDerailleurModels === "other") {
                    return (<option key={index} value="other">Outro</option>);
                  } else {
                    return (<option key={index}>{frontDerailleurModels}</option>);
                  }
                })}
              </select>

              { frontDerailleurModel === "other"  && (
                <>
                  <label htmlFor="front_gear" className="mt-4">Qual?</label>
                  <input type="text" className="text-input" value={otherFrontDerailleurModel} onChange={(e) => setOtherFrontDerailleurModel(e.target.value)}/>
                </>
              )}

              <label htmlFor="rear_gear" className="mt-4">Câmbio traseiro:</label>
              <select className="select-answer" aria-label=".form-select-sm example"
                value={rearDerailleurModel}
                onChange={(e) => setRearDerailleurModel(e.target.value)}
                >
                <option value=""></option>
                {mtbDirtUrbanRearDerailleurModels.map((rearDerailleurModels, index)=> {
                  if (rearDerailleurModels === "other") {
                    return (<option key={index} value="other">Outro</option>);
                  } else {
                    return (<option key={index}>{rearDerailleurModels}</option>);
                  }
                })}
              </select>
              <br />
              { rearDerailleurModel === "other"  && (
                <>
                  <label htmlFor="front_gear" className="mt-4">Qual?</label>
                  <input type="text"  className="text-input" value={otherRearDerailleurModel} onChange={(e) => setOtherRearDerailleurModel(e.target.value)}/>
                </>
              )}
            </>)}


            <label htmlFor="frameMaterial" className="mt-4">Material do pedivela:</label>
            <select
              className="select-answer"
              value={cranksetMaterial}
              onChange={(e) => setCranksetMaterial(e.target.value)}
            >
              <option value=""></option>
              <option value="carbon">Carbono</option>
              <option value="aluminum">Aluminio</option>
              <option value="carbon_aluminum_chainstay">Carbono/Aumínio (Chainstay)</option>
              <option value="other">Outro</option>

            </select>
            { cranksetMaterial === "other"  && (
              <>
                <label htmlFor="otherCranksetMaterial" className="mt-4">Qual?</label>
                <input type="text" className="text-input" value={otherCranksetMaterial} onChange={(e) => setOtherCranksetMaterial(e.target.value)}/>
              </>
            )}


            <label htmlFor="front_gear" className="mt-4">Pedivela:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={crankset} onChange={(e) => setCrankset(e.target.value)}/>

            <label htmlFor="front_gear" className="mt-4">Corrente:</label>
            <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={chain} onChange={(e) => setChain(e.target.value)}/>
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
              <option value="v_brake">V-Brake (frenagem no aro)</option>
              <option value="hydraulic_disc">À Disco - Hidráulico</option>
              <option value="mechanical_disc">À Disco - Mecânico</option>
              <option value="coaster_brake">Contra pedal</option>
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
                  if (discSize === "other") {
                    return (<option key={index} value="other">Outro</option>);
                  } else {
                    return (<option key={index}>{discSize}</option>);
                  }
                })}
              </select>
            </>)}

            {brakeDiscSize === "other" && (<>
              <label htmlFor="other_disc_size" className="mt-4">Qual:</label>
              <input className="text-input" type="text" value={otherBrakeDiscSize} placeholder="" aria-label=".form-control-sm example" onChange={(e) => setOtherBrakeDiscSize(e.target.value)}/>
            </>)}

            {category === "road" && (<>
              <label htmlFor="brakeModel" className="mt-4">Marca e modelo do freio:</label>
              <select
                className="select-answer" aria-label=".form-select-sm example"
                value={brakeModel}
                onChange={(e) => setBrakeModel(e.target.value)}
              >
                <option value=""></option>
                {roadBrakeModels.map((roadBrakeModel, index)=> {
                  if (roadBrakeModel === "other") {
                    return (<option key={index} value="other">Outro</option>);
                  } else {
                    return (<option key={index}>{roadBrakeModel}</option>);
                  }
                })}
              </select>
            </>)}

            {(category === "mountain_bike" || category ===  "dirt_street" || category ===  "urban" || category ===  "infant") && (<>
              <label htmlFor="brakeModel" className="mt-4">Marca e modelo do freio</label>
              <select
                className="select-answer" aria-label=".form-select-sm example"
                value={brakeModel}
                onChange={(e) => setBrakeModel(e.target.value)}
              >
                <option value=""></option>
                {mtbDirtUrbanBrakeModels.map((mtbDirtUrbanBrakeModel, index)=> {
                  if (mtbDirtUrbanBrakeModel === "other") {
                    return (<option key={index} value="other">Outro</option>);
                  } else {
                    return (<option key={index}>{mtbDirtUrbanBrakeModel}</option>);
                  }
                })}
              </select>
            </>)}
            <br />

            {brakeModel === "other" && (<>
              <label htmlFor="front_gear" className="mt-4">Qual:</label>
              <input className="text-input" type="text" value={otherBrakeModel} placeholder="" aria-label=".form-control-sm example" onChange={(e) => setOtherBrakeModel(e.target.value)}/>
            </>)}
          </div>

                                                                          {/*//////////////////SUSPENSÂO///////////////////////*/}

          {category === "road" && (<>
            <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Garfo<i className="fas fa-chevron-down ms-2"></i></button>

            <div id="Garfo" className="fork d-none mb-3">
              <label htmlFor="frameMaterial" className="mt-4">Material do garfo:</label>
              <select
                className="select-answer"
                value={forkMaterial}
                onChange={(e) => setForkMaterial(e.target.value)}
              >
                <option value=""></option>
                <option value="carbon">Carbono</option>
                <option value="aluminum">Aluminio</option>
                <option value="carbon_aluminum_chainstay">Carbono/Aumínio (Chainstay)</option>
                <option value="other">Outro</option>

              </select>
              { forkMaterial === "other"  && (
                <>
                  <label htmlFor="otherForkMaterial" className="mt-4">Qual?</label>
                  <input type="text" className="text-input" value={otherForkMaterial} onChange={(e) => setOtherForkMaterial(e.target.value)}/>
                </>
              )}
            </div>
            </>
          )}

          {!(category === "road") && (<>

            <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Suspensões<i className="fas fa-chevron-down ms-2"></i></button>
            <div id="Suspensões" className="suspension d-none mb-3">
              <label htmlFor="suspensionType" className="mt-3">Tipo de suspensão:</label>
              <select
                className="select-answer" aria-label=".form-select-sm example"
                value={suspensionType}
                onChange={(e) => setSuspensionType(e.target.value)}
              >
                <option value=""></option>
                <option value="no_suspension">Sem Suspensão</option>
                <option value="full_suspension">Full Suspension</option>
                <option value="hardtail">Hardtail(Apenas Dinteira)</option>
              </select>

              {suspensionType === "full_suspension" && (<>
                <label htmlFor="frontSuspensionTravel" className="mt-4">Curso da suspensão dianteira:</label>
                <select
                  className="select-answer" aria-label=".form-select-sm example"
                  value={frontSuspensionTravel}
                  onChange={(e) => setFrontSuspensionTravel(e.target.value)}
                >
                  <option value=""></option>
                  {frontSuspensionTravels.map((frontSuspensionTravel, index)=> {
                    if (frontSuspensionTravel === "other") {
                      return (<option key={index} value="other">Outro</option>);
                    } else {
                      return (<option key={index}>{frontSuspensionTravel}</option>);
                    }
                  })}
                </select>

                { frontSuspensionTravel === "other"  && (
                  <>
                    <label htmlFor="year" className="mt-4">Qual?</label>
                    <input type="text" className="text-input" value={otherFrontSuspensionTravel} onChange={(e) => setOtherFrontSuspensionTravel(e.target.value)}/>
                  </>
                )}

                <label htmlFor="frontSuspensionModel" className="mt-4">Suspensão dianteira:</label>
                <select className="select-answer" aria-label=".form-select-sm example"
                  value={frontSuspensionModel}
                  onChange={(e) => setFrontSuspensionModel(e.target.value)}
                >
                <option value=""></option>
                {mtbDirtUrbanFrontSuspensionModels.map((frontSuspensionModels, index)=> {
                  if (frontSuspensionModels === "other") {
                    return (<option key={index} value="other">Outro</option>);
                  } else {
                    return (<option key={index}>{frontSuspensionModels}</option>);
                  }
                })}
                </select>
                <br />

                { frontSuspensionModel === "other"  && (
                  <>
                    <label htmlFor="otherFrontSuspensionModel" className="mt-4">Qual?</label>
                    <input type="text-input" className="text-input" value={otherFrontSuspensionModel} onChange={(e) => setOtherFrontSuspensionModel(e.target.value)}/>
                  </>
                )}

                <label htmlFor="rearSuspensionTravel" className="mt-4">Curso da suspensão traseira:</label>
                <select
                  className="select-answer" aria-label=".form-select-sm example"
                  value={rearSuspensionTravel}
                  onChange={(e) => setRearSuspensionTravel(e.target.value)}
                >
                  <option value=""></option>
                  {rearSuspensionTravels.map((rearSuspensionTravel, index)=> {
                    if (rearSuspensionTravel === "other") {
                      return (<option key={index} value="other">Outro</option>);
                    } else {
                      return (<option key={index}>{rearSuspensionTravel}</option>);
                    }
                  })}
                </select>

                { rearSuspensionTravel === "other"  && (
                  <>
                    <label htmlFor="year" className="mt-4">Qual?</label>
                    <input type="text" className="text-input" value={otherRearSuspensionTravel} onChange={(e) => setOtherRearSuspensionTravel(e.target.value)}/>
                  </>
                )}

                <label htmlFor="RearSuspensionModel" className="mt-4">Suspensão traseira:</label>
                <select className="select-answer" aria-label=".form-select-sm example"
                  value={rearSuspensionModel}
                  onChange={(e) => setRearSuspensionModel(e.target.value)}
                  >
                  <option value=""></option>
                  {mtbDirtUrbanRearSuspensionModels.map((rearSuspensionModels, index)=> {
                    if (rearSuspensionModels === "other") {
                      return (<option key={index} value="other">Outro</option>);
                    } else {
                      return (<option key={index}>{rearSuspensionModels}</option>);
                    }
                  })}
                </select>
                <br />
                { rearSuspensionModel === "other"  && (
                  <>
                    <label htmlFor="otherRearSuspensionModel" className="mt-4">Qual?</label>
                    <input type="text" className="text-input" value={otherRearSuspensionModel} onChange={(e) => setOtherRearSuspensionModel(e.target.value)}/>
                  </>
                )}
              </>
              )}

              {suspensionType === "hardtail" && (<>
                <label htmlFor="frontSuspensionTravel" className="mt-4">Curso da suspensão dianteira:</label>
                <select
                  className="select-answer" aria-label=".form-select-sm example"
                  value={frontSuspensionTravel}
                  onChange={(e) => setFrontSuspensionTravel(e.target.value)}
                >
                  <option value=""></option>
                  {frontSuspensionTravels.map((rearSuspensionTravel, index)=> {
                    if (rearSuspensionTravel === "other") {
                      return (<option key={index} value="other">Outro</option>);
                    } else {
                      return (<option key={index}>{rearSuspensionTravel}</option>);
                    }
                  })}
                </select>

                { rearSuspensionTravel === "other"  && (
                  <>
                    <label htmlFor="year" className="mt-4">Qual?</label>
                    <input type="text" className="text-input" value={otherRearSuspensionTravel} onChange={(e) => setOtherFrontSuspensionTravel(e.target.value)}/>
                  </>
                )}

                <label htmlFor="frontSuspensionModel" className="mt-4">Suspensão dianteira:</label>
                <select className="select-answer" aria-label=".form-select-sm example"
                  value={frontSuspensionModel}
                  onChange={(e) => setFrontSuspensionModel(e.target.value)}
                >
                  <option value=""></option>
                  {mtbDirtUrbanFrontSuspensionModels.map((frontSuspensionModels, index)=> {
                    if (frontSuspensionModels === "other") {
                      return (<option key={index} value="other">Outro</option>);
                    } else {
                      return (<option key={index}>{frontSuspensionModels}</option>);
                    }
                  })}
                </select>
                <br />
                { frontSuspensionModel === "other"  && (
                  <>
                    <label htmlFor="otherFrontSuspensionModel" className="mt-4">Qual?</label>
                    <input type="text-input" className="text-input" value={otherFrontSuspensionModel} onChange={(e) => setOtherFrontSuspensionModel(e.target.value)}/>
                  </>
                )}
              </>
              )}
            </div>
          </>)}
          <div className="d-flex justify-content-center">
            <button className="btn-back-step" type="button" onClick={(e) => handleBackToSecond(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
            <button className="btn-next-step" type="button" onClick={(e) => handleThirdStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
          </div>
        </div>

                                                                        {/*//////////////////RODAS///////////////////////*/}
        <div id="additional-infos" className="additional-infos d-none">
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


            <label htmlFor="frameMaterial" className="mt-4">Material da roda:</label>
            <select
              className="select-answer"
              value={wheelMaterial}
              onChange={(e) => setWheelMaterial(e.target.value)}
            >
              <option value=""></option>
              <option value="carbon">Carbono</option>
              <option value="aluminum">Aluminio</option>
              <option value="carbon_aluminum_chainstay">Carbono/Aumínio (Chainstay)</option>
              <option value="other">Outro</option>

            </select>
            { wheelMaterial === "other"  && (
              <>
                <label htmlFor="otherWheelMaterial" className="mt-4">Qual?</label>
                <input type="text" className="text-input" value={otherWheelMaterial} onChange={(e) => setOtherWheelMaterial(e.target.value)}/>
              </>
            )}


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
              <label htmlFor="frameMaterial" className="mt-4">Material da guidão:</label>
              <select
                className="select-answer"
                value={handlebarMaterial}
                onChange={(e) => setHandlebarMaterial(e.target.value)}
              >
                <option value=""></option>
                <option value="carbon">Carbono</option>
                <option value="aluminum">Aluminio</option>
                <option value="carbon_aluminum_chainstay">Carbono/Aumínio (Chainstay)</option>
                <option value="other">Outro</option>

              </select>
              { handlebarMaterial === "other"  && (
                <>
                  <label htmlFor="otherhandlebarMaterial" className="mt-4">Qual?</label>
                  <input type="text" className="text-input" value={otherHandlebarMaterial} onChange={(e) => setOtherHandlebarMaterial(e.target.value)}/>
                </>
              )}
              <label htmlFor="handlebar" className="mt-3">Guidão:</label>
              <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={handlebar} onChange={(e) => setHandlebar(e.target.value)}/>
              <label htmlFor="stem" className="mt-4">Mesa/Avanço:</label>
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
                <option value="retractable">Retrátil</option>
                <option value="rigid">Rigido</option>
              </select>

              {seatPostType === "rigid" && (
                <>
                <label htmlFor="frameMaterial" className="mt-4">Material da canote:</label>
                <select
                  className="select-answer"
                  value={seatPostMaterial}
                  onChange={(e) => setSeatPostMaterial(e.target.value)}
                >
                  <option value=""></option>
                  <option value="carbon">Carbono</option>
                  <option value="aluminum">Aluminio</option>
                  <option value="carbon_aluminum_chainstay">Carbono/Aumínio (Chainstay)</option>
                  <option value="other">Outro</option>

                </select>
                { seatPostMaterial === "other"  && (
                  <>
                    <label htmlFor="otherSeatPostMaterial" className="mt-4">Qual?</label>
                    <input type="text" className="text-input" value={otherSeatPostMaterial} onChange={(e) => setOtherSeatPostMaterial(e.target.value)}/>
                  </>
                )}
                </>
              )}

              {seatPostType === "retractable" && (<>
                <label htmlFor="seatPostTravel" className="mt-4">Curso do canote:</label>
                <select
                  className="select-answer" aria-label=".form-select-sm example"
                  value={seatPostTravel}
                  onChange={(e) => setSeatPostTravel(e.target.value)}
                >
                  <option value=""></option>
                  {seatPostTravels.map((seatPostTravel, index)=> {
                    if (seatPostTravel === "other") {
                      return (<option key={index} value="other">Outro</option>);
                    } else {
                      return (<option key={index}>{seatPostTravel}</option>);
                    }
                  })}
                </select>

                { seatPostTravel === "other" && (
                  <>
                  <label htmlFor="otherSeatPostTravel" className="mt-4">Qual?</label>
                  <input className="text-input" type="text" value={otherSeatPostTravel} onChange={(e) => setOtherSeatPostTravel(e.target.value)}/>
                </>
                )}
              </>)}

              <label htmlFor="seatPostModel" className="mt-4">Marca e modelo do canote:</label>
              <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example"  value={seatPostModel} onChange={(e) => setSeatPostModel(e.target.value)}/>
            </div>

                                                                            {/*//////////////////BATERIA///////////////////////*/}


                                                                            {/*//////////////////Accessories///////////////////////*/}

            <button type="button" className="btn-technicality my-3 w-100 p-2" onClick={(e) => handleTechnicalSection(e)}>Acessórios<i className="fas fa-chevron-down ms-2"></i></button>
            <div id="Acessórios" className="accessories d-none mb-3">
              <label htmlFor="" className="mt-3 me-3">Acessório:</label>
              <button type="button" id="no-accessory" value="Não" className="filter-tag mx-2" onClick={(e) => handleNoAccessoriesToSelect(e)}>Não</button>
              <button type="button" id="include-accessory" value="Sim" className="filter-tag mx-2" onClick={(e) => handleAccessoriesToSelect(e)}>Sim</button>
              <div id="accessories-options" className="accessories-options d-flex gap-3 flex-wrap justify-content-center d-none mt-3">
                <button type="button" id="accessory-option" value="Pedal" className="filter-tag"  onClick={(e) => includeAccessory(e)}>Pedal</button>
                <button type="button" id="accessory-option" value="Ciclocomputador" className="filter-tag"  onClick={(e) => includeAccessory(e)}>Ciclocomputador</button>
                <button type="button" id="accessory-option" value="Lanterna Traseira" className="filter-tag"  onClick={(e) => includeAccessory(e)}>Lanterna Traseira</button>
                <button type="button" id="accessory-option" value="Farol" className="filter-tag"  onClick={(e) => includeAccessory(e)}>Farol</button>
                <button type="button" id="accessory-option" value="Bolsa de Acessórios" className="filter-tag"  onClick={(e) => includeAccessory(e)}>Bolsa de Acessórios</button>
                <button type="button" id="accessory-option" value="Suporte de Garrafinha" className="filter-tag"  onClick={(e) => includeAccessory(e)}>Suporte de Garrafinha</button>
                <button type="button" id="accessory-option" value="Bateria Extra" className="filter-tag"  onClick={(e) => includeAccessory(e)}>Bateria Extra</button>
              </div>
              {(accessories.includes("Pedal") || accessories.includes("Ciclocomputador") || accessories.includes("Lanterna Traseira") || accessories.includes("Farol") || accessories.includes("Bolsa de Acessórios") || accessories.includes("Suporte de Garrafinha") || accessories.includes("Bateria Extra") )&& (<>
                <label htmlFor="accessories-description" className="mt-4">Descrição:</label>
                <input className="text-input" type="text" placeholder="" value={accessoriesDescription} aria-label=".form-control-sm example" onChange={(e) => setAccessoriesDescription(e.target.value)}/>
              </>)}
              {accessories.includes("Pedal") && (<>
                <label htmlFor="batteryCyle" className="mt-4">Pedal:</label>
                <input className="text-input" type="text" placeholder="" aria-label=".form-control-sm example" value={pedals} onChange={(e) => setPedals(e.target.value)}/>
              </>)}
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn-back-step" type="button" onClick={(e) => handleBackToSecond(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
              <button className="btn-next-step" type="button" onClick={(e) => handleThirdStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
            </div>
        </div>
      </div>


                        {/* ////////////////////////////////////////////////////////////////////// 3ª SECTION //////////////////////////////////////////////////////////*/}

      <div id="fourth-section" className="card-bike-select mb-5 d-none">
        <div className="mb-3">
          <h4 className="text-center text-success">Informações adicionais</h4>
          <label htmlFor="description" className="mt-3">Descrição:</label>
          <textarea className="text-input-description" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>


          {bikeCondition === "used" && (<>
            <label htmlFor="bikeConditionStatus" className="mt-4">Qual estado da sua bike:</label>
            <div className="mb-5 mt-3">
              <div id="debt-amount-slider">
                <input type="radio" name="debt-amount" id="1" value="bad" required onClick={(e) => handleBikeConditionStatus(e)}/>
                <label id="label-bad" htmlFor="1" data-debt-amount="Ruim"></label>
                <input type="radio" name="debt-amount" id="2" value="reasonable" required onClick={(e) => handleBikeConditionStatus(e)}/>
                <label id="label-reasonable" htmlFor="2" data-debt-amount="Razoável"></label>
                <input type="radio" name="debt-amount" id="3" value="good" required onClick={(e) => handleBikeConditionStatus(e)}/>
                <label id="label-good" htmlFor="3" data-debt-amount="Bom"></label>
                <input type="radio" name="debt-amount" id="4" value="excellent" required onClick={(e) => handleBikeConditionStatus(e)}/>
                <label id="label-excellent" htmlFor="4" data-debt-amount="Ótimo"></label>
                <div id="debt-amount-pos"></div>
              </div>
            </div>
            {bikeConditionStatus === "bad" && (
              <div className="bad-text my-3">
                Funcinamento interrompido, requer reparo operacional ou estrutural!
              </div>
            )}

            {bikeConditionStatus === "reasonable" && (
              <div className="reasonable-text  my-3">
                Funcinamento comprometido, requer reparo operacional ou estrutural!
              </div>

            )}

            {bikeConditionStatus === "good" && (
              <div className="good-text  my-3">
                Bom funcionamento, algum ou outro reparo visual!
              </div>
            )}

            {bikeConditionStatus === "excellent" && (
              <div className="excellent-text  my-3">
                Condição perfeita, não apresenta nenhuma observação!
              </div>

            )}

            {(bikeConditionStatus === "bad" || bikeConditionStatus === "reasonable") && (<>
              <label htmlFor="description" className="mt-2">Descreva:</label>
              <textarea className="text-input-description" id="exampleFormControlTextarea1" rows="3" value={bikeConditionDescription} onChange={(e) => setBikeConditionDescription(e.target.value)}></textarea>
            </>)}
          </>)}
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn-back-step me-3 mt-3" type="button" onClick={(e) => handleBackToThird(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
          <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleFourthStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
        </div>
      </div>

      <div id="fifth-section" className="card-bike-select mb-5 d-none">
        <h4 className="text-center text-success">Imagens</h4>
        <input id="photo-upload" type="file" className="text-input file-upload" multiple accept="image/png, image/jpg, image/jpeg" onChange={(e) => createBikePhotos(e)}/>
        <p className="text-center my-3">ESCOLHA AS IMAGENS DA SUA BIKE</p>
        <div className="text-center">
          <label htmlFor="photo-upload" className="label-upload my-2"><i className="fas fa-file-upload"></i></label>
        </div>
        {/* {
          photosPreview?.length > 0 ?
          <div  className="d-flex justify-content-center flex-wrap mt-3">
            {
              photosPreview.map((photoPreview, idx) => {
                return  (<><button className="remove-photo mt-2" type="button" onClick={(e) => removePhoto(e)}>
                    <img src={photoPreview} key={idx} alt="" className="image-preview-form" />
                    <div id={photoPreview} className="middle">
                      <div id={photoPreview} className="text">Remover</div>
                    </div>
                  </button></>)
              })
            }
          </div> : null
        } */}

        {photoFiles?.length > 0 && (<>
          <p className="text-center fs-15">Você pode clicar e arrastar as imagens para reordenala-las</p>
          <div className="d-flex justify-content-center flex-wrap mt-3 gap-2">
            {photoFiles.map((photo, idx) => {
                return  (<>
                  <div>
                    <div
                      key={idx}
                      className=""
                      draggable
                      onDragStart={(e) => (dragItem.current = idx)}
                      onDragEnter={(e) => (dragOverItem.current = idx)}
                      onDragEnd={handleSort}
                      onDragOver={(e) => e.preventDefault()}>
                      <img src={photo.url} key={idx} alt="" className="image-preview-form" />
                    </div>
                    <button className="remove-photo" type="button" onClick={(e) => removePhoto(e)}>
                      <div id={photo.url} className="middle">
                        <div id={photo.url} className="text">Remover</div>
                      </div>
                    </button>
                  </div>
                </>)
              })}
          </div>
        </>)}


        <div className="d-flex justify-content-center">
          <button className="btn-back-step me-3 mt-3" type="button" onClick={(e) => handleBackToFourth(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
          <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleFifthStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
        </div>
      </div>

      <div id="sixth-section" className="card-bike-select mb-5 d-none">
        <h4 className="text-center text-success">Revise as informações</h4>
        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Gerais</button>
        <div id="Gerais(review)" className=" d-none">
          <div className="d-flex">
            <p><span className="text-success">Tipo:</span> {translateWord(bikeType)}</p>
            { errors && errors.bike && errors.bike.bike_type && (
              <p className="text-danger ms-2">{errors.bike.bike_type[0]}</p>
            )}
          </div>
          <div className="d-flex">
            <p><span className="text-success">Categoria:</span> {translateWord(category)}</p>
            { errors && errors.bike && errors.bike.category && (
              <p className="text-danger ms-2">{errors.bike.category[1]}</p>
            )}
          </div>
          <div className="d-flex">
            <p><span className="text-success">Modalidade:</span> {translateWord(modality)}</p>
            { errors && errors.bike && errors.bike.modality && (
              <p className="text-danger ms-2">{errors.bike.modality[0]}</p>
            )}
          </div>
          <div className="d-flex">
            <p><span className="text-success">Ano:</span> {year === "other" ? otherYear : year}</p>
            { errors && errors.bike && errors.bike.year && (
              <p className="text-danger ms-2">{errors.bike.year[0]}</p>
            )}
          </div>
          <div className="d-flex">
            <p><span className="text-success">Local:</span> {city} - {state}</p>
            { errors && errors.bike && errors.bike.city_id && (
              <p className="text-danger ms-2">{errors.bike.city_id[0]}</p>
            )}
          </div>
          <div className="d-flex">
            <p><span className="text-success">Modelo:</span> {model}</p>
            { errors && errors.bike && errors.bike.model && (
              <p className="text-danger ms-2">{errors.bike.model[0]}</p>
              )}
          </div>
          <div className="d-flex">
            <p><span className="text-success">Preço:</span> {priceInCents?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}</p>
            { errors && errors.bike && errors.bike.price_in_cents && (
              <p className="text-danger ms-2">{errors.bike.price_in_cents[0]}</p>
              )}
          </div>
          <div className="d-flex">
            <p><span className="text-success">Quantidade:</span> {quantity}</p>
            { errors && errors.bike && errors.bike.quantity && (
              <p className="text-danger ms-2">{errors.bike.quantity[0]}</p>
            )}
          </div>
          <div className="d-flex">
            <p><span className="text-success">Documentação:</span> {translateWord(documentationType)}</p>
            { errors && errors.bike && errors.bike.documentation_type && (
              <p className="text-danger ms-2">{errors.bike.documentation_type[0]}</p>
            )}
          </div>
          <div className="d-flex">
            <p><span className="text-success">Condição:</span> {translateWord(bikeCondition)}</p>
            { errors && errors.bike && errors.bike.bike_condition && (
              <p className="text-danger ms-2">{errors.bike.bike_condition[0]}</p>
            )}
          </div>
          <p><span className="text-success">Peso:</span> {weight}Kg</p>
          <p><span className="text-success">Estado da Bike:</span> {translateWord(bikeConditionStatus)}</p>
          {bikeConditionDescription && (
          <p><span className="text-success">Descrição da Condição:</span> {bikeConditionDescription}</p>
          )}
          <p><span className="text-success">Descrição:</span> {description}</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Quadro</button>
        <div id="Quadro(review)" className="d-none">
          <div className="d-flex">
            <p><span className="text-success">Marca:</span> {frameBrand === "other" ? otherFrameBrand : frameBrand}</p>
            { errors && errors.bike && errors.bike.frame_brand && (
              <p className="text-danger ms-2">{errors.bike.frame_brand[0]}</p>
            )}
          </div>
          <div className="d-flex">
            <p><span className="text-success">Material:</span> {frameMaterial === "other" ? otherFrameMaterial : translateWord(frameMaterial) }</p>
            { errors && errors.bike && errors.bike.frame_material && (
              <p className="text-danger ms-2">{errors.bike.frame_material[0]}</p>
            )}
          </div>
          <div className="d-flex">
            <p><span className="text-success">Tamanho:</span> {frameSize === "other" ? otherFrameSize : frameSize}</p>
            { errors && errors.bike && errors.bike.frame_size && (
              <p className="text-danger ms-2">{errors.bike.frame_size[0]}</p>
            )}
          </div>

        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Transmissão</button>
        <div id="Transmissão(review)" className="d-none">
          <p><span className="text-success">Marchas dianteiras:</span> {numberOfFrontGears}</p>
          <p><span className="text-success">Modelo:</span> {frontDerailleurModel === "other" ? otherFrontDerailleurModel : frontDerailleurModel }</p>
          <p><span className="text-success">Marchas traseiras:</span> {numberOfRearGears}</p>
          <p><span className="text-success">Modelo:</span> {rearDerailleurModel === "other" ? otherRearDerailleurModel : rearDerailleurModel }</p>
          <p><span className="text-success">Pedivela:</span> {crankset}</p>
          <p><span className="text-success">Material do Pedivela:</span> {cranksetMaterial === "other" ? otherCranksetMaterial : translateWord(cranksetMaterial) } </p>

          <p><span className="text-success">Corrente:</span> {chain}</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Freios</button>
        <div id="Freios(review)" className="d-none">
          <p><span className="text-success">Tipo:</span> {translateWord(brakeType)}</p>
          <p><span className="text-success">Tamanho do disco:</span> {brakeDiscSize === "other" ? otherBrakeDiscSize : brakeDiscSize }</p>
          <p><span className="text-success">Modelo:</span> {brakeModel === "other" ? otherBrakeModel : brakeModel }</p>
        </div>

        {category !== "road" && (
          <>
            <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Suspensões</button>
            <div id="Suspensões(review)" className="d-none">
              <p><span className="text-success">Tipo:</span> {translateWord(suspensionType)}</p>
              <p><span className="text-success">Curso dianteira:</span> {frontSuspensionTravel === "other" ? otherFrontSuspensionTravel : frontSuspensionTravel}</p>
              <p><span className="text-success">Modelo dianteira:</span> {frontSuspensionModel === "other" ? otherFrontSuspensionModel : frontSuspensionModel}</p>
              <p><span className="text-success">Curso traseira:</span> {rearSuspensionTravel === "other" ? otherRearSuspensionTravel : rearSuspensionTravel }</p>
              <p><span className="text-success">Modelo traseira:</span> {rearSuspensionModel === "other" ? otherRearSuspensionModel : rearSuspensionModel }</p>
            </div>
          </>
        )}

        {category === "road" && (
          <>
            <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Garfo</button>
            <div id="Garfo(review)" className="d-none">
              <p><span className="text-success">Material:</span> {forkMaterial === "other" ? otherForkMaterial : translateWord(forkMaterial) }</p>
            </div>
          </>
        )}


        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Rodas</button>
        <div id="Rodas(review)" className="d-none">
          <p><span className="text-success">Tamanho:</span> {rimSize}</p>
          <p><span className="text-success">Material da Roda:</span> {wheelMaterial === "other" ? otherWheelMaterial : translateWord(wheelMaterial) }</p>
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
          <p><span className="text-success">Material do Guidão:</span> {handlebarMaterial === "other" ? otherHandlebarMaterial : translateWord(handlebarMaterial) }</p>
          <p><span className="text-success">Mesa:</span> {stem}</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Canote</button>
        <div id="Canote(review)" className="d-none">
          <p><span className="text-success">Tipo:</span> {translateWord(seatPostType)}</p>
          {seatPostTravel && (<>
            <p><span className="text-success">Curso:</span> {seatPostTravel === "other" ? otherSeatPostTravel : seatPostTravel }</p>
          </>)}
          {seatPostMaterial && (<>
            <p><span className="text-success">Material:</span> {seatPostMaterial === "other" ? otherSeatPostMaterial : translateWord(seatPostMaterial) }</p>
          </>)}
          <p><span className="text-success">Modelo:</span> {seatPostModel }</p>
        </div>

        <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Acessórios</button>
        <div id="Acessórios(review)" className="d-none">
          {accessories.includes("Não") && (
            <p><span className="text-success">Acompanha?:</span >Não</p>
          )}
          {!accessories.includes("Não") && (<>
            {accessories.map((accessory) => {
              return(
                <p><span className="text-success">Acessório:</span> {accessory}</p>
              )
            })}
            {accessories.includes("Pedal") && (<>
              <p><span className="text-success">Pedais:</span> {pedals}</p>
            </>)}
            <p><span className="text-success">Descrição:</span> {accessoriesDescription}</p>
          </>)}


        </div>

        { bikeType === "e-bike" && (<>
          <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-technicality my-3 w-100 p-2">Parte elétrica</button>
          <div id="Parte elétrica(review)" className="d-none">
            <p><span className="text-success">Capacidade da baterias:</span> {battery === "other" ? otherBattery : battery }</p>
            <p><span className="text-success">Km:</span> {mileage} Km</p>
            <p><span className="text-success">Ciclos da bateria:</span> {batteryCycles}</p>
          </div>
        </>)}

        <h4 className="text-success mt-3 text-center">Imagens</h4>
        {
          photoFiles?.length > 0 && (

            <div  className="d-flex gap-2 justify-content-center flex-wrap my-3">
              {
                photoFiles.map((photo, idx) => {
                  return <img src={photo.url} key={idx} alt="" className="image-review" />
                })
              }
            </div>
          )
        }

        <div  className="d-flex gap-2 justify-content-center flex-wrap my-3">
          {(props.bikeId && typeof(photosPreview) === "undefined") && (
            photosEdit.map((photo, idx) => {
              return <img src={photo} key={idx} alt="" className="image-review" />
            })
          )}
        </div>
        {(photosEdit?.length === 0 && typeof(photosPreview) === "undefined") && (
          <p className="text-center">Nenhuma foto adicionada!!</p>
        )}



        {!props.bikeId && (<>
          {((priceInCents * 100) <= 100000) && (<>
            <div className="text-center mt-3 mb-3">
              <h6 className="announce-terms">Seu anúncio não será cobrado</h6>
              {!props.bikeId && (<>
                <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3">Anunciar</button>

                <div id="spinner" className="spinner-border text-success d-none mt-3" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </>)}
            </div>
          </>)}

          { ((priceInCents * 100) > 100000) && ((priceInCents * 100) <= 500000) && (<>
            <h6 className="announce-terms text-center">Valor do anúncio: R$ 39,00</h6>
            <div className="d-flex justify-content-center gap-2">
              <input type="checkbox" onChange={(e) => handleTerms(e)}/>
              <h6 className="announce-terms">Aceito os termos e condições de uso.</h6>
            </div>
            <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
            <div className="d-flex mt-3">
              <label htmlFor="discountCoupon" className="w-70 mt-1">Cupom de desconto:</label>
              <input type="text" className="text-input" onChange={(e) => setDiscountCoupon(e.target.value)}/>
              { errors && errors.coupon && (
                <p className="text-danger">{errors.coupon}</p>
              )}
            </div>
            <div className="text-center mt-3 mb-3">
              {!props.bikeId && (<>
                <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
                <div id="spinner" className="spinner-border text-success d-none mt-3" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </>)}
            </div>
          </>)}

          {((priceInCents * 100) > 500000) && ((priceInCents * 100) <= 1000000) && (<>
            <h6 className="announce-terms text-center">Valor do anúncio: R$ 59,00</h6>
            <div className="d-flex justify-content-center gap-2">
              <input type="checkbox" onChange={(e) => handleTerms(e)}/>
              <h6 className="announce-terms">Aceito os termos e condições de uso.</h6>
            </div>
            <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
            <div className="d-flex mt-3">
              <label htmlFor="discountCoupon" className="w-70 mt-1">Cupom de desconto:</label>
              <input type="text" className="text-input" onChange={(e) => setDiscountCoupon(e.target.value)}/>
              { errors && errors.coupon && (
                <p className="text-danger">{errors.coupon}</p>
              )}
            </div>
            <div className="text-center mt-3 mb-3">
              {!props.bikeId && (<>
                <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
                <div id="spinner" className="spinner-border text-success d-none mt-3" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </>)}
            </div>
          </>)}

          {((priceInCents * 100) > 1000000) && ((priceInCents * 100) <= 2000000) &&(<>
            <h6 className="announce-terms text-center">Valor do anúncio: R$ 89,00</h6>
            <div className="d-flex justify-content-center gap-2">
              <input type="checkbox" onChange={(e) => handleTerms(e)}/>
              <h6 className="announce-terms">Aceito os termos e condições de uso.</h6>
            </div>
            <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
            <div className="d-flex mt-3">
              <label htmlFor="discountCoupon" className="w-70 mt-1">Cupom de desconto:</label>
              <input type="text" className="text-input" onChange={(e) => setDiscountCoupon(e.target.value)}/>
              { errors && errors.coupon && (
                <p className="text-danger">{errors.coupon}</p>
              )}
            </div>
            <div className="text-center mt-3 mb-3">
            {!props.bikeId && (<>
                <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
                <div id="spinner" className="spinner-border text-success d-none mt-3" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </>)}
            </div>
          </>)}

          {((priceInCents * 100) > 2000000) && ((priceInCents * 100) <= 3000000) &&(<>
            <h6 className="announce-terms text-center">Valor do anúncio: R$ 129,00</h6>
            <div className="d-flex justify-content-center gap-2">
              <input type="checkbox" onChange={(e) => handleTerms(e)}/>
              <h6 className="announce-terms">Aceito os termos e condições de uso.</h6>
            </div>
            <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
            <div className="d-flex mt-3">
              <label htmlFor="discountCoupon" className="w-70 mt-1">Cupom de desconto:</label>
              <input type="text" className="text-input" onChange={(e) => setDiscountCoupon(e.target.value)}/>
              { errors && errors.coupon && (
                <p className="text-danger">{errors.coupon}</p>
              )}
            </div>
            <div className="text-center mt-3 mb-3">
            {!props.bikeId && (<>
                <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
                <div id="spinner" className="spinner-border text-success d-none mt-3" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </>)}
            </div>
          </>)}

          {((priceInCents * 100) > 3000000) && (<>
            <h6 className="announce-terms text-center">Valor do anúncio: R$ 159,00</h6>
            <div className="d-flex justify-content-center gap-2">
              <input type="checkbox" onChange={(e) => handleTerms(e)}/>
              <h6 className="announce-terms">Aceito os termos e condições de uso.</h6>
            </div>
            <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
            <div className="d-flex mt-3">
              <label htmlFor="discountCoupon" className="w-70 mt-1">Cupom de desconto:</label>
              <input type="text" className="text-input" onChange={(e) => setDiscountCoupon(e.target.value)}/>
              { errors && errors.coupon && (
                <p className="text-danger">{errors.coupon}</p>
              )}
            </div>
            <div className="text-center mt-3 mb-3">
              {!props.bikeId && (<>
                <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
                <div id="spinner" className="spinner-border text-success d-none mt-3" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </>)}
            </div>
          </>)}
        </>)}

        <div className="text-center mt-3 mb-3">
          {props.bikeId && (<>
            <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce">Editar</button>
            <div id="spinner" className="spinner-border text-success d-none" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </>)}
        </div>

        <div className="text-center">
          <button className="btn-back-step me-3 mt-3" type="button" onClick={(e) => handleBackToFifth(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
        </div>
      </div>
    </div>
  );
}
