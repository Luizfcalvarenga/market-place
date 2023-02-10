import React, { useEffect, useState } from "react";
import NormalBikeImage from "../../../assets/images/normal-bike.png";
import EBikeImage from "../../../assets/images/e-bike.png";
import IntlCurrencyInput from "react-intl-currency-input"
import VerifiedImage from "../../../assets/images/badge.png";


export function Bikes(props) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const [bikes, setBikes] = useState([])
  const [conditionFilter, setConditionFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [modalityFilter, setModalityFilter] = useState("");
  const [minYearFilter, setMinYearFilter] = useState("");
  const [maxYearFilter, setMaxYearFilter] = useState("");
  const [bikeTypeFilter, setBikeTypeFilter] = useState(params.bike_type || "");
  const [batteryCyclesFilter, setBatteryCyclesFilter] = useState("");
  const [mileageFilter, setMileageFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [mapedCitiesForState, setMapedCitiesForState] = useState([]);
  const [filteredLinkCategory, setFilteredLinkCategory] = useState("");
  const [categoryOptionsToFilter, setCategoryOptionsToFilter] = useState([params.categories] || []);
  const [modalityOptionsToFilter, setModalityOptionsToFilter] = useState([]);
  const [frameSizeOptionsToFilter, setFrameSizeOptionsToFilter] = useState([]);
  const [frameMaterialOptionsToFilter, setFrameMaterialOptionsToFilter] = useState([]);
  const [verifiedBikeFilter, setVerifiedBikeFilter] = useState([params.verified] || "");
  const [filteredLinkBikeType, setFilteredLinkBikeType] = useState("");
  const [presentCategories, setPresentCategories] = useState([]);

  const [presentRoadModalities, setPresentRoadModalities] = useState([]);
  const [presentMtbModalities, setPresentMtbModalities] = useState([]);
  const [presentDirtModalities, setPresentDirtModalities] = useState([]);

  const [presentModels, setPresentModels] = useState([]);
  const [modelOptionsToFilter, setModelOptionsToFilter] = useState([]);


  const [presentFrameBrands, setPresentFrameBrands] = useState([]);
  const [frameBrandOptionsToFilter, setFrameBrandOptionsToFilter] = useState([]);
  const [presentRoadFrameSizes, setPresentRoadFrameSizes] = useState([]);
  const [presentDirtMtbFrameSizes, setPresentDirtMtbFrameSizes] = useState([]);
  const [presentFrameSizes, setPresentFrameSizes] = useState([]);
  const [presentFrameMaterials, setPresentFrameMaterials] = useState([]);

  const [presentSuspensionTypes, setPresentSuspensionTypes] = useState([]);
  const [suspensionTypeOptionsToFilter, setSuspensionTypeOptionsToFilter] = useState([]);
  const [presentFrontSuspensionTravels, setPresentFrontSuspensionTravels] = useState([]);
  const [frontSuspensionTravelOptionsToFilter, setFrontSuspensionTravelOptionsToFilter] = useState([]);
  const [presentRearSuspensionTravels, setPresentRearSuspensionTravels] = useState([]);
  const [rearSuspensionTravelOptionsToFilter, setRearSuspensionTravelOptionsToFilter] = useState([]);
  const [presentFrontSuspensionModels, setPresentFrontSuspensionModels] = useState([]);
  const [presentRoadForkMaterials, setPresentRoadForkMaterials] = useState([]);
  const [presentMtbDirtFrontSuspensionModels, setPresentMtbDirtFrontSuspensionModels] = useState([]);
  const [frontSuspensionModelOptionsToFilter, setFrontSuspensionModelOptionsToFilter] = useState([]);
  const [presentRearSuspensionModels, setPresentRearSuspensionModels] = useState([]);
  const [presentMtbDirtRearSuspensionModels, setPresentMtbDirtRearSuspensionModels] = useState([]);
  const [rearSuspensionModelOptionsToFilter, setRearSuspensionModelOptionsToFilter] = useState([]);

  const [presentNumberOfFrontGears, setPresentNumberOfFrontGears] = useState([]);
  const [presentNumberOfRearGears, setPresentNumberOfRearGears] = useState([]);
  const [numberOfFrontGearsOptionsToFilter, setNumberOfFrontGearsOptionsToFilter] = useState([]);
  const [numberOfRearGearsOptionsToFilter, setNumberOfRearGearsOptionsToFilter] = useState([]);
  const [presentMtbDirtFrontDerailleurModels, setPresentMtbDirtFrontDerailleurModels] = useState([]);
  const [presentMtbDirtRearDerailleurModels, setPresentMtbDirtRearDerailleurModels] = useState([]);
  const [presentRoadFrontDerailleurModels, setPresentRoadFrontDerailleurModels] = useState([]);
  const [presentRoadRearDerailleurModels, setPresentRoadRearDerailleurModels] = useState([]);
  const [rearDerailleurModelOptionsToFilter, setRearDerailleurModelOptionsToFilter] = useState([]);
  const [frontDerailleurModelOptionsToFilter, setFrontDerailleurModelOptionsToFilter] = useState([]);
  const [presentCranksets, setPresentCranksets] = useState([]);
  const [cranksetOptionsToFilter, setCranksetOptionsToFilter] = useState([]);
  const [presentChains, setPresentChains] = useState([]);
  const [chainOptionsToFilter, setChainOptionsToFilter] = useState([]);

  const [presentBrakeTypes, setPresentBrakeTypes] = useState([]);
  const [brakeTypeOptionsToFilter, setBrakeTypeOptionsToFilter] = useState([]);
  const [presentBrakeDiscSizes, setPresentBrakeDiscSizes] = useState([]);
  const [brakeDiscSizeOptionsToFilter, setBrakeDiscSizeOptionsToFilter] = useState([]);
  const [presentRoadBrakeModels, setPresentRoadBrakeModels] = useState([]);
  const [presentMtbDirtBrakeModels, setPresentMtbDirtBrakeModels] = useState([]);
  const [brakeModelOptionsToFilter, setBrakeModelOptionsToFilter] = useState([]);

  const [presentRimSizes, setPresentRimSizes] = useState([]);
  const [rimSizeOptionsToFilter, setRimSizeOptionsToFilter] = useState([]);
  const [presentWheelMaterials, setPresentWheelMaterials] = useState([]);
  const [wheelMaterialOptionsToFilter, setWheelMaterialOptionsToFilter] = useState([]);
  const [presentRimModels, setPresentRimModels] = useState([]);
  const [rimModelOptionsToFilter, setRimModelOptionsToFilter] = useState([]);
  const [presentHubModels, setPresentHubModels] = useState([]);
  const [hubModelOptionsToFilter, setHubModelOptionsToFilter] = useState([]);
  const [presentTyreModels, setPresentTyreModels] = useState([]);
  const [tyreModelOptionsToFilter, setTyreModelOptionsToFilter] = useState([]);

  const [presentSeatPostTypes, setPresentSeatPostTypes] = useState([]);
  const [seatPostTypeOptionsToFilter, setSeatPostTypeOptionsToFilter] = useState([]);
  const [presentSeatPostMaterials, setPresentSeatPostMaterials] = useState([]);
  const [seatPostMaterialOptionsToFilter, setSeatPostMaterialOptionsToFilter] = useState([]);
  const [presentSeatPostTravels, setPresentSeatPostTravels] = useState([]);
  const [seatPostTravelOptionsToFilter, setSeatPostTravelOptionsToFilter] = useState([]);
  const [presentSeatPostModels, setPresentSeatPostModels] = useState([]);
  const [seatPostModelOptionsToFilter, setSeatPostModelOptionsToFilter] = useState([]);

  const [presentHandlebarModels, setPresentHandlebarModels] = useState([]);
  const [handlebarModelOptionsToFilter, setHandlebarModelOptionsToFilter] = useState([]);
  const [presentHandlebarMaterials, setPresentHandlebarMaterials] = useState([]);
  const [handlebarMaterialOptionsToFilter, setHandlebarMaterialOptionsToFilter] = useState([]);
  const [presentStemModels, setPresentStemModels] = useState([]);
  const [stemModelOptionsToFilter, setStemModelOptionsToFilter] = useState([]);

  const [presentBatteries, setPresentBatteries] = useState([]);
  const [batteryOptionsToFilter, setBatteryOptionsToFilter] = useState([]);

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
    const handleMinPriceFIlter = (event, value, maskedValue) => {
      // console.log(value)
      event.preventDefault();
      setMinPriceFilter(value)
    };
    const handlemaxPriceFIlter = (event, value, maskedValue) => {
      // console.log(value)
      event.preventDefault();
      setMaxPriceFilter(value)
    };

    return(
      <>
        <IntlCurrencyInput currency="BRL" config={currencyConfig}
          className="text-input" value={minPriceFilter}   onChange={handleMinPriceFIlter} />
        <IntlCurrencyInput currency="BRL" config={currencyConfig}
          className="text-input" value={maxPriceFilter}   onChange={handlemaxPriceFIlter} />
      </>
    );
  }


  useEffect(async () => {
    let url = "/api/v1/bikes?";

    if (conditionFilter) url = url + `&condition=${conditionFilter}`
    if (minPriceFilter) url = url + `&min_price=${minPriceFilter * 100}`
    if (maxPriceFilter) url = url + `&max_price=${maxPriceFilter * 100}`
    if (minYearFilter) url = url + `&min_year=${minYearFilter}`
    if (maxYearFilter) url = url + `&max_year=${maxYearFilter}`
    if (bikeTypeFilter) url = url + `&bike_type=${bikeTypeFilter}`
    if (batteryCyclesFilter) url = url + `&battery_cycles=${batteryCyclesFilter}`
    if (mileageFilter) url = url + `&mileage=${mileageFilter}`
    if (stateFilter) url = url + `&state=${stateFilter}`
    if (cityFilter) url = url + `&city=${cityFilter}`

    if (filteredLinkCategory) url = url + `&category=${filteredLinkCategory}`
    if (filteredLinkBikeType) url = url + `&bike_type=${filteredLinkBikeType}`
    if (categoryOptionsToFilter) url = url + `&categories=${categoryOptionsToFilter}`

    if (modalityOptionsToFilter) url = url + `&modalities=${modalityOptionsToFilter}`

    if (modelOptionsToFilter) url = url + `&models=${modelOptionsToFilter}`

    if (frameSizeOptionsToFilter) url = url + `&frame_sizes=${frameSizeOptionsToFilter}`
    if (frameMaterialOptionsToFilter) url = url + `&frame_materials=${frameMaterialOptionsToFilter}`
    if (frameBrandOptionsToFilter) url = url + `&frame_brands=${frameBrandOptionsToFilter}`

    if (suspensionTypeOptionsToFilter) url = url + `&suspension_types=${suspensionTypeOptionsToFilter}`
    if (frontSuspensionTravelOptionsToFilter) url = url + `&front_suspension_travels=${frontSuspensionTravelOptionsToFilter}`
    if (rearSuspensionTravelOptionsToFilter) url = url + `&rear_suspension_travels=${rearSuspensionTravelOptionsToFilter}`
    if (frontSuspensionModelOptionsToFilter) url = url + `&front_suspension_models=${frontSuspensionModelOptionsToFilter}`
    if (rearSuspensionModelOptionsToFilter) url = url + `&rear_suspension_models=${rearSuspensionModelOptionsToFilter}`

    if (numberOfFrontGearsOptionsToFilter) url = url + `&number_of_front_gears=${numberOfFrontGearsOptionsToFilter}`
    if (numberOfRearGearsOptionsToFilter) url = url + `&number_of_rear_gears=${numberOfRearGearsOptionsToFilter}`
    if (frontDerailleurModelOptionsToFilter) url = url + `&front_derailleur_models=${frontDerailleurModelOptionsToFilter}`
    if (rearDerailleurModelOptionsToFilter) url = url + `&rear_derailleur_models=${rearDerailleurModelOptionsToFilter}`
    if (cranksetOptionsToFilter) url = url + `&cranksets=${cranksetOptionsToFilter}`
    if (chainOptionsToFilter) url = url + `&chains=${chainOptionsToFilter}`

    if (brakeTypeOptionsToFilter) url = url + `&brake_types=${brakeTypeOptionsToFilter}`
    if (brakeDiscSizeOptionsToFilter) url = url + `&brake_disc_sizes=${brakeDiscSizeOptionsToFilter}`
    if (brakeModelOptionsToFilter) url = url + `&brake_models=${brakeModelOptionsToFilter}`

    if (rimSizeOptionsToFilter) url = url + `&rim_sizes=${rimSizeOptionsToFilter}`
    if (wheelMaterialOptionsToFilter) url = url + `&wheel_materials=${wheelMaterialOptionsToFilter}`
    if (rimModelOptionsToFilter) url = url + `&rim_models=${rimModelOptionsToFilter}`
    if (hubModelOptionsToFilter) url = url + `&hub_models=${hubModelOptionsToFilter}`
    if (tyreModelOptionsToFilter) url = url + `&tyre_models=${tyreModelOptionsToFilter}`

    if (seatPostTypeOptionsToFilter) url = url + `&seat_post_types=${seatPostTypeOptionsToFilter}`
    if (seatPostMaterialOptionsToFilter) url = url + `&seat_post_materials=${seatPostMaterialOptionsToFilter}`
    if (seatPostTravelOptionsToFilter) url = url + `&seat_post_travels=${seatPostTravelOptionsToFilter}`
    if (seatPostModelOptionsToFilter) url = url + `&seat_post_models=${seatPostModelOptionsToFilter}`

    if (handlebarMaterialOptionsToFilter) url = url + `&handlebar_materials=${handlebarMaterialOptionsToFilter}`
    if (handlebarModelOptionsToFilter) url = url + `&handlebar_models=${handlebarModelOptionsToFilter}`
    if (stemModelOptionsToFilter) url = url + `&stem_models=${stemModelOptionsToFilter}`
    if (batteryOptionsToFilter) url = url + `&batteries=${batteryOptionsToFilter}`
    if (verifiedBikeFilter) url = url + `&verified=${verifiedBikeFilter}`
    const response = await axios.get(url);
    setBikes(response.data.bikes);

  }, [modalityFilter, conditionFilter, minPriceFilter, maxPriceFilter, minYearFilter, maxYearFilter, bikeTypeFilter, batteryCyclesFilter, mileageFilter, cityFilter, stateFilter,
  filteredLinkCategory, filteredLinkBikeType, categoryOptionsToFilter, modalityOptionsToFilter, modelOptionsToFilter, frameSizeOptionsToFilter, frameMaterialOptionsToFilter, verifiedBikeFilter,
  frameBrandOptionsToFilter, suspensionTypeOptionsToFilter, frontSuspensionTravelOptionsToFilter, rearSuspensionTravelOptionsToFilter, frontSuspensionModelOptionsToFilter,rearSuspensionModelOptionsToFilter,
  numberOfFrontGearsOptionsToFilter, numberOfRearGearsOptionsToFilter, frontDerailleurModelOptionsToFilter, rearDerailleurModelOptionsToFilter, cranksetOptionsToFilter, chainOptionsToFilter,
  brakeTypeOptionsToFilter, brakeDiscSizeOptionsToFilter, brakeModelOptionsToFilter, rimSizeOptionsToFilter, wheelMaterialOptionsToFilter, rimModelOptionsToFilter, hubModelOptionsToFilter, tyreModelOptionsToFilter,
  seatPostTypeOptionsToFilter, seatPostMaterialOptionsToFilter, seatPostTravelOptionsToFilter, seatPostModelOptionsToFilter, handlebarMaterialOptionsToFilter, handlebarModelOptionsToFilter, stemModelOptionsToFilter,
  batteryOptionsToFilter])

  useEffect(() => {
    fetch(`/get_bike_attributes_that_are_present_for_filter`)
     .then((response) => response.json())
     .then((data) => {
      console.log(data)
      setPresentCategories(data.categories)

      setPresentRoadModalities(data.road_modalities)
      setPresentMtbModalities(data.mtb_modalities)
      setPresentDirtModalities(data.dirt_modalities)
      setPresentModels(data.models)

                    // QUADRO
      setPresentFrameBrands(data.frame_brands.sort())
      setPresentRoadFrameSizes(data.road_frame_sizes)
      setPresentDirtMtbFrameSizes(data.mtb_dirt_infant_urban_frame_sizes)
      setPresentFrameSizes(data.all_frame_sizes)
      setPresentFrameMaterials(data.frame_materials)
                // SUSPENSÃO
      setPresentSuspensionTypes(data.suspension_types)
      setPresentFrontSuspensionTravels(data.front_suspension_travels)
      setPresentFrontSuspensionModels(data.front_suspension_models)
      setPresentRoadForkMaterials(data.road_fork_materials)
      setPresentMtbDirtFrontSuspensionModels(data.mtb_dirt_front_suspension_models)
      setPresentRearSuspensionTravels(data.rear_suspension_travels)
      setPresentRearSuspensionModels(data.rear_suspension_models)
      setPresentMtbDirtRearSuspensionModels(data.mtb_dirt_rear_suspension_models)
      // CÃMBIO
      setPresentNumberOfFrontGears(data.number_of_front_gears)
      setPresentNumberOfRearGears(data.number_of_rear_gears)
      setPresentMtbDirtFrontDerailleurModels(data.mtb_dirt_front_derailleur_models)
      setPresentMtbDirtRearDerailleurModels(data.mtb_dirt_rear_derailleur_models)
      setPresentRoadFrontDerailleurModels(data.road_front_derailleur_models)
      setPresentRoadRearDerailleurModels(data.road_rear_derailleur_models)
      setPresentCranksets(data.cranksets)
      setPresentChains(data.chains)
      // FREIO
      setPresentBrakeTypes(data.brake_types)
      setPresentBrakeDiscSizes(data.brake_disc_sizes)
      setPresentMtbDirtBrakeModels(data.mtb_dirt_brake_models)
      setPresentRoadBrakeModels(data.road_brake_models)
      // RODAS
      setPresentRimSizes(data.rim_sizes)
      setPresentRimModels(data.rim_models)
      setPresentWheelMaterials(data.wheel_materials)
      setPresentHubModels(data.hub_models)
      setPresentTyreModels(data.tyre_models)
      // CANOTE
      setPresentSeatPostTypes(data.seat_post_types)
      setPresentSeatPostTravels(data.seat_post_travels)
      setPresentSeatPostMaterials(data.seat_post_materials)
      setPresentSeatPostModels(data.seat_post_models)
      // COCKPIT
      setPresentHandlebarMaterials(data.handlebar_materials)
      setPresentHandlebarModels(data.handlebar_models)
      setPresentStemModels(data.stem_models)
      // BATERIA
      setPresentBatteries(data.batteries)


     })

  }, []);

  useEffect(() => {
    fetch(`/get_information_for_new_bike`)
     .then((response) => response.json())
     .then((data) => {
      setStates(data.states)
      setCities(data.cities)
     })

  }, []);

  const handleFilter = (e) => {
    const sectionFilter = document.getElementById(e.target.innerText);
    const sectionActive = e.target;
    console.log(sectionFilter);
    sectionFilter.classList.toggle("d-none")
    sectionActive.classList.toggle("selected")
  }

  const handleBikeTypeFilter = (e) => {
    const tagFilter = e.target
    tagFilter.classList.toggle("selected-tag")
    if (e.target.classList.contains("selected-tag")) {
      setBikeTypeFilter(e.target.value)
    } else {
      setBikeTypeFilter("")
    }
  }

  const handleConditionFilter = (e) => {
    const tagFilter = e.target
    tagFilter.classList.toggle("selected-tag")
    if (e.target.classList.contains("selected-tag")) {
      setConditionFilter(e.target.value)
    } else {
      setConditionFilter("")
    }
  }

  const handleLike = (e) => {
    e.preventDefault()
    const dataObject = new FormData();
    dataObject.append( "like[likeble_id]", e.target.id );
    dataObject.append( "like[likeble_type]", "Bike" );
    axios.post('/likes',dataObject)

    .then(function (response) {
      console.log(response);
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

  const handleLocality = (e) => {
    console.log(e)
    console.log(e.target.value)
    setStateFilter(e.target.value)
    let stateId = states.find(state => state.name === e.target.value).id
    console.log(stateId)
    setMapedCitiesForState(cities.filter(element => element.state_id === stateId))
  }

  const handleMultipleFiltersCategory = (e) => {
    // console.log(e)
    const currentOptionsToFilter = [...categoryOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setCategoryOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setCategoryOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersModality = (e) => {
    const currentOptionsToFilter = [...modalityOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setModalityOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setModalityOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleModalityFilter = (e) => {
    console.log(e)
    e.target.classList.toggle("active")
    if (e.target.classList.contains("active")) {
      document.getElementById(e.target.value).classList.remove("d-none")
      e.target.classList.add("selected-tag")
    } else {
      document.getElementById(e.target.value).classList.add("d-none")
      e.target.classList.remove("selected-tag")
    }
  }

  const handleMultipleFiltersModel = (e) => {
    const currentOptionsToFilter = [...modelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrameBrand = (e) => {
    const currentOptionsToFilter = [...frameBrandOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrameBrandOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrameBrandOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrameSize = (e) => {
    const currentOptionsToFilter = [...frameSizeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrameSizeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrameSizeOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrameMaterial = (e) => {
    const currentOptionsToFilter = [...frameMaterialOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrameMaterialOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrameMaterialOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersSuspensionType = (e) => {
    const currentOptionsToFilter = [...suspensionTypeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setSuspensionTypeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setSuspensionTypeOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrontSuspensionTravel = (e) => {
    const currentOptionsToFilter = [...frontSuspensionTravelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrontSuspensionTravelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrontSuspensionTravelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersRearSuspensionTravel = (e) => {
    const currentOptionsToFilter = [...rearSuspensionTravelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setRearSuspensionTravelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setRearSuspensionTravelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrontSuspensionModel = (e) => {
    const currentOptionsToFilter = [...frontSuspensionModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrontSuspensionModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrontSuspensionModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersRearSuspensionModel = (e) => {
    const currentOptionsToFilter = [...rearSuspensionModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setRearSuspensionModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setRearSuspensionModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersNumberOfFrontGears = (e) => {
    const currentOptionsToFilter = [...numberOfFrontGearsOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setNumberOfFrontGearsOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setNumberOfFrontGearsOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersNumberOfRearGears = (e) => {
    const currentOptionsToFilter = [...numberOfRearGearsOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setNumberOfRearGearsOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setNumberOfRearGearsOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrontDerailleurModels = (e) => {
    const currentOptionsToFilter = [...frontDerailleurModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrontDerailleurModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrontDerailleurModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersRearDerailleurModels = (e) => {
    const currentOptionsToFilter = [...rearDerailleurModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setRearDerailleurModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setRearDerailleurModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersCrankset = (e) => {
    const currentOptionsToFilter = [...cranksetOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setCranksetOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setCranksetOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersChain = (e) => {
    const currentOptionsToFilter = [...chainOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setChainOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setChainOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersBrakeType = (e) => {
    const currentOptionsToFilter = [...brakeTypeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setBrakeTypeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setBrakeTypeOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersBrakeDiscSize = (e) => {
    const currentOptionsToFilter = [...brakeDiscSizeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setBrakeDiscSizeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setBrakeDiscSizeOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersBrakeModel = (e) => {
    const currentOptionsToFilter = [...brakeModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setBrakeModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setBrakeModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersRimSize = (e) => {
    const currentOptionsToFilter = [...rimSizeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setRimSizeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setRimSizeOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersRimModel = (e) => {
    const currentOptionsToFilter = [...rimModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setRimModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setRimModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersWheelMaterial = (e) => {
    const currentOptionsToFilter = [...wheelMaterialOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setWheelMaterialOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setWheelMaterialOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersHubModel = (e) => {
    const currentOptionsToFilter = [...hubModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setHubModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setHubModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersTyreModel = (e) => {
    const currentOptionsToFilter = [...tyreModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setTyreModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setTyreModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersSeatPostType = (e) => {
    const currentOptionsToFilter = [...seatPostTypeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setSeatPostTypeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setSeatPostTypeOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersSeatPostMaterial = (e) => {
    const currentOptionsToFilter = [...seatPostMaterialOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setSeatPostMaterialOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setSeatPostMaterialOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersSeatPostTravel = (e) => {
    const currentOptionsToFilter = [...seatPostTravelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setSeatPostTravelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setSeatPostTravelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersSeatPostModel = (e) => {
    const currentOptionsToFilter = [...seatPostModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setSeatPostModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setSeatPostModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersHandlebarMaterial = (e) => {
    const currentOptionsToFilter = [...handlebarMaterialOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setHandlebarMaterialOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setHandlebarMaterialOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersHandlebarModel = (e) => {
    const currentOptionsToFilter = [...handlebarModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setHandlebarModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setHandlebarModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersStemModel = (e) => {
    const currentOptionsToFilter = [...stemModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setStemModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setStemModelOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersBattery = (e) => {
    const currentOptionsToFilter = [...batteryOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setBatteryOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setBatteryOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleToggleFilerMobile = (e) => {
    document.getElementById("filters").classList.toggle("d-none")
    e.target.classList.toggle("selected-filter")
  }

  return (
    <div className="p-5 br-8 index-container">
      <h2 className="text-center text-success">Bikes</h2>
      <button type="button" className={`filter-link ${ window.screen.width > 768 ? "d-none" : ""}`} onClick={((e) => handleToggleFilerMobile(e))}><i className="fas fa-filter"></i>Filtrar</button>
      <div className={`mt-3 index-content ${ window.screen.width < 768 ? "d-block" : "d-flex"}`}>
        <div id="filters" className={`filters my-1 ${ window.screen.width < 768 ? "d-none w-100" : " w-25"}`}>
          <p className="">Filtrar</p>
          <div className="">
            <div className="condition-filter">
              <h5 className=" mt-3">tipo</h5>
              <div className="d-flex justify-content-between">
                <button type="button" value="e-bike" className="filter-tag" onClick={(e) => handleBikeTypeFilter(e)}>E-Bike</button>
                <button type="button" value="bike" className="filter-tag" onClick={(e) => handleBikeTypeFilter(e)}>Bike</button>
              </div>
            </div>

            <div className="condition-filter">
              <h6 className=" mt-3">condição</h6>
              <div className="d-flex justify-content-between">
                <button type="button" value="new" className="filter-tag" onClick={(e) => handleConditionFilter(e)}>Nova</button>
                <button type="button" value="used" className="filter-tag" onClick={(e) => handleConditionFilter(e)}>Usada</button>
              </div>
            </div>

            <button type="button" value="mtb-modalities" className="filter-link" onClick={(e) => handleFilter(e)}>Categoria</button>
            <div id="Categoria" className="multiple-filters d-flex gap-3 flex-wrap justify-content-center d-none">
              {presentCategories.map((category, index) => {
                return (
                  <button type="button" key={index} value={category.name} className="filter-tag" onClick={(e) => handleMultipleFiltersCategory(e)}>{translateWord(category.name)}</button>
                )
              })}
            </div>

            {categoryOptionsToFilter.includes("mountain_bike") && (<>
              <button type="button" value="mtb-modalities" className="filter-link" onClick={(e) => handleFilter(e)}>Modalidades MTB</button>
               <div id="Modalidades MTB" className="d-flex flex-wrap justify-content-between mt-3 d-none">
                {presentMtbModalities.map((presentMtbModality, index) => {
                    return (
                      <button type="button" key={index} value={presentMtbModality} className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>{translateWord(presentMtbModality)}</button>
                    )
                  })}
               </div>
            </>)}

            {categoryOptionsToFilter.includes("dirt_street") && (<>
              <button type="button" value="dirt-modalities" className="filter-link" onClick={(e) => handleFilter(e)}>Modalidades Dirt</button>
              <div id="Modalidades Dirt" className="d-flex flex-wrap justify-content-between mt-3 d-none">
                {presentDirtModalities.map((presentDirtModality, index) => {
                  return (
                    <button type="button" key={index} value={presentDirtModality} className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>{translateWord(presentDirtModality)}</button>
                  )
                })}
              </div>
            </>)}

            {categoryOptionsToFilter.includes("road") &&(<>
              <button type="button" value="road-modalities" className="filter-tag" onClick={(e) => handleFilter(e)}>Modalidades Road</button>
              <div id="Modalidades Road" className="d-flex flex-wrap justify-content-between mt-3 d-none">
                {presentRoadModalities.map((presentRoadModality, index) => {
                  return (
                    <button type="button" key={index} value={presentRoadModality} className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>{translateWord(presentRoadModality)}</button>
                  )
                })}
              </div>
            </>)}

            <button type="button" value="frame_brands" className="filter-link" onClick={(e) => handleFilter(e)}>Marca</button>
            <div id="Marca" className="d-flex flex-wrap justify-content-between mt-3 d-none">
              {presentFrameBrands.map((presentFrameBrand, index) => {
                return (

                  <button type="button" key={index} value={presentFrameBrand} className="filter-tag" onClick={(e) => handleMultipleFiltersFrameBrand(e)}>{presentFrameBrand}</button>
                )
              })}
            </div>

            <div className="model-filter">
              {presentModels.length > 0 && (<>
                <h5 className=" mt-3">modelo  </h5>
                {presentModels.map((presentModel, index)=> {
                  return (
                    <button type="button" key={index} value={presentModel} className="filter-tag"  onClick={(e) => handleMultipleFiltersModel(e)}>{presentModel}</button>
                  );
                })}
              </>)}
            </div>

            <div className="locality-filter">
              <h5 className=" mt-3">Estado</h5>
              <select
                className="select-answer"
                value={stateFilter}
                onChange={(e) => handleLocality(e)}
              >
                <option value=""></option>
                {states.map((state, index)=> {
                  return (<option key={index} value={state.name}>{state.acronym}</option>);
                })}
              </select>
              <h5 className=" mt-3">Cidade</h5>
              {stateFilter && (<>
                <select
                  className="select-answer"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                >
                  <option value=""></option>
                  {mapedCitiesForState.map((city, index)=> {
                    return (<option key={index} value={city.name}>{city.name}</option>);
                  })}
                </select>
              </>)}

              {!stateFilter && (<>
                <select
                  className="select-answer"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                >
                  <option value=""></option>
                  {cities.map((city, index)=> {
                    return (<option key={index} value={city.name}>{city.name}</option>);
                  })}
                </select>
              </>)}
            </div>

            <div className="price-filter">
              <div className="">
                <h5 className=" mt-3">preço</h5>
                <div className="d-flex justify-content-between">
                  {BrlCurrencyComponent()}
                </div>
              </div>
            </div>

            <div className="year-filter mb-3">
              <h5 className=" mt-3">ano</h5>
              <div className="d-flex justify-content-between">
                <input type="number" className="text-input" placeholder="DE" onChange={(e) => setMinYearFilter(e.target.value)}/>
                <input type="number" className="text-input" placeholder="ATÉ" onChange={(e) => setMaxYearFilter(e.target.value)}/>
              </div>
            </div>

            <h5 className=" ">Componentes</h5>
            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Quadro</button>
            <div id="Quadro" className="frame-filter d-none">
              {categoryOptionsToFilter.length <= 1 && (<>
                {presentFrameSizes.length > 0 && (<>
                  <h5 className=" mt-3">tamanho</h5>
                  {presentFrameSizes.map((presentFrameSize, index)=> {
                    return (
                      <button type="button" key={index} value={presentFrameSize} className="filter-tag"  onClick={(e) => handleMultipleFiltersFrameSize(e)}>{presentFrameSize}</button>
                    );
                  })}
                </>)}
              </>)}

              {categoryOptionsToFilter.includes("road") && (<>
                <h5 className=" mt-3">tamanho</h5>
                {presentRoadFrameSizes.map((presentRoadFrameSize, index)=> {
                  return (
                    <button type="button" key={index} value={presentRoadFrameSize} className="filter-tag"  onClick={(e) => handleMultipleFiltersFrameSize(e)}>{presentRoadFrameSize}</button>
                  );
                })}
              </>)}

              {(categoryOptionsToFilter.includes("dirt_street") || categoryOptionsToFilter.includes("mountain_bike") || categoryOptionsToFilter.includes("infant") || categoryOptionsToFilter.includes("urban")) && (<>
                <h5 className=" mt-3">tamanho</h5>
                  {presentDirtMtbFrameSizes.map((presentDirtMtbFrameSize, index)=> {
                  return (
                    <button type="button" key={index} value={presentDirtMtbFrameSize} className="filter-tag"  onClick={(e) => handleMultipleFiltersFrameSize(e)}>{presentDirtMtbFrameSize}</button>
                  );
                })}
              </>)}

              <h5 className=" mt-3">material</h5>
              <div id="frame_materials" className="d-flex flex-wrap justify-content-between mt-3">
                {presentFrameMaterials.map((presentFrameMaterial, index) => {
                  return (
                    <button type="button" key={index} value={presentFrameMaterial} className="filter-tag" onClick={(e) => handleMultipleFiltersFrameMaterial(e)}>{translateWord(presentFrameMaterial) || presentFrameMaterial }</button>
                  )
                })}
              </div>
            </div>

            {categoryOptionsToFilter.includes("road") && (<>
              <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Garfo</button>
              <div id="Garfo" className="fork-filter d-none">
                {presentRoadForkMaterials.length > 0 && (<>
                  <h5 className=" mt-3">material</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentRoadForkMaterials.map((presentRoadForkMaterial, index) => {
                      return (
                        <button type="button" key={index} value={presentRoadForkMaterial} className="filter-tag" onClick={(e) => handleMultipleFiltersSuspensionType(e)}>{translateWord(presentRoadForkMaterial)}</button>
                      )
                    })}
                  </div>
                </>)}
              </div>
            </>)}

            {!categoryOptionsToFilter.includes("road") && (<>
              <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Suspensão</button>
              <div id="Suspensão" className="suspension-filter d-none">
                {presentSuspensionTypes.length > 0 && (<>
                  <h5 className=" mt-3">tipo</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentSuspensionTypes.map((presentSuspensionType, index) => {
                      return (
                        <button type="button" key={index} value={presentSuspensionType} className="filter-tag" onClick={(e) => handleMultipleFiltersSuspensionType(e)}>{translateWord(presentSuspensionType)}</button>
                      )
                    })}
                  </div>
                </>)}
                {(presentFrontSuspensionTravels && !suspensionTypeOptionsToFilter.includes("no_suspension")) &&(<>
                  <h5 className=" mt-3">dianteira</h5>
                  <div id="front_suspension_travel" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentFrontSuspensionTravels.map((presentFrontSuspensionTravel, index) => {
                      return (
                        <button type="button" key={index} value={presentFrontSuspensionTravel} className="filter-tag" onClick={(e) => handleMultipleFiltersFrontSuspensionTravel(e)}>{presentFrontSuspensionTravel}</button>
                      )
                    })}
                  </div>
                </>)}

                {(presentMtbDirtFrontSuspensionModels.length > 0 && !suspensionTypeOptionsToFilter.includes("no_suspension")) && (<>
                  <h5 className=" mt-3">Marca</h5>
                  <div id="frame_materials" className="d-flex flex-wrap justify-content-between mt-1">
                    {presentMtbDirtFrontSuspensionModels.map((presentMtbDirtFrontSuspensionModel, index) => {
                      return (
                        <button type="button" key={index} value={presentMtbDirtFrontSuspensionModel} className="filter-tag" onClick={(e) => handleMultipleFiltersFrontSuspensionModel(e)}>{presentMtbDirtFrontSuspensionModel}</button>
                      )
                    })}
                  </div>
                </>)}
                {categoryOptionsToFilter.length < 1 && (<>
                    <h5 className=" mt-3">Marca</h5>
                    <div id="frame_materials" className="d-flex flex-wrap justify-content-between mt-1">
                      {presentFrontSuspensionModels.map((presentFrontSuspensionModel, index) => {
                        return (
                          <button type="button" key={index} value={presentFrontSuspensionModel} className="filter-tag" onClick={(e) => handleMultipleFiltersFrontSuspensionModel(e)}>{presentFrontSuspensionModel}</button>
                        )
                      })}
                    </div>
                  </>)}

                {(!suspensionTypeOptionsToFilter.includes("hardtail") && !suspensionTypeOptionsToFilter.includes("no_suspension"))&& (<>
                  {presentRearSuspensionTravels && (<>
                    <h5 className=" mt-3">traseira</h5>
                    <div id="Rear_suspension_travel" className="d-flex flex-wrap justify-content-between mt-1">
                      {presentRearSuspensionTravels.map((presentRearSuspensionTravel, index) => {
                        return (
                          <button type="button" key={index} value={presentRearSuspensionTravel} className="filter-tag" onClick={(e) => handleMultipleFiltersRearSuspensionTravel(e)}>{presentRearSuspensionTravel}</button>
                        )
                      })}
                    </div>
                  </>)}
                  {presentMtbDirtRearSuspensionModels.length > 0 && (<>
                    <h5 className=" mt-3">Marca</h5>
                    <div id="frame_materials" className="d-flex flex-wrap justify-content-between mt-1">
                      {presentMtbDirtRearSuspensionModels.map((presentMtbDirtRearSuspensionModel, index) => {
                        return (
                          <button type="button" key={index} value={presentMtbDirtRearSuspensionModel} className="filter-tag" onClick={(e) => handleMultipleFiltersRearSuspensionModel(e)}>{presentMtbDirtRearSuspensionModel}</button>
                        )
                      })}
                    </div>
                  </>)}
                  {categoryOptionsToFilter.length < 1 && (<>
                    <h5 className=" mt-3">Marca</h5>
                    <div id="frame_materials" className="d-flex flex-wrap justify-content-between mt-1">
                      {presentRearSuspensionModels.map((presentRearSuspensionModel, index) => {
                        return (
                          <button type="button" key={index} value={presentRearSuspensionModel} className="filter-tag" onClick={(e) => handleMultipleFiltersRearSuspensionModel(e)}>{presentRearSuspensionModel}</button>
                        )
                      })}
                    </div>
                  </>)}
                </>)}
              </div>
            </>)}

            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Câmbio</button>
            <div id="Câmbio" className="suspension-filter d-none">
              <h5 className="mt-3">dianteira</h5>
              {presentNumberOfFrontGears.length > 0 && (<>
                <h5 className=" mt-3">n ºmarchas</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentNumberOfFrontGears.map((presentNumberOfFrontGear, index) => {
                    return (
                      <button type="button" key={index} value={presentNumberOfFrontGear} className="filter-tag" onClick={(e) => handleMultipleFiltersNumberOfFrontGears(e)}>{presentNumberOfFrontGear}</button>
                    )
                  })}
                </div>
              </>)}
              {categoryOptionsToFilter.includes("road") && (<>
                {presentRoadFrontDerailleurModels.length > 0 && (<>
                  <h5 className=" mt-3">Marca</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentRoadFrontDerailleurModels.map((presentRoadFrontDerailleurModel, index) => {
                      return (
                        <button type="button" key={index} value={presentRoadFrontDerailleurModel} className="filter-tag" onClick={(e) => handleMultipleFiltersFrontDerailleurModels(e)}>{presentRoadFrontDerailleurModel}</button>
                      )
                    })}
                  </div>
                </>)}
              </>)}

              {!categoryOptionsToFilter.includes("road") && (<>
                {presentMtbDirtFrontDerailleurModels.length > 0 && (<>
                  <h5 className=" mt-3">marca</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentMtbDirtFrontDerailleurModels.map((presentMtbDirtFrontDerailleurModel, index) => {
                      return (
                        <button type="button" key={index} value={presentMtbDirtFrontDerailleurModel} className="filter-tag" onClick={(e) => handleMultipleFiltersFrontDerailleurModels(e)}>{presentMtbDirtFrontDerailleurModel}</button>
                      )
                    })}
                  </div>
                </>)}
              </>)}

              <h5 className="mt-3">traseira</h5>
              {presentNumberOfRearGears.length > 0 && (<>
                <h5 className=" mt-3">n ºmarchas</h5>

                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentNumberOfRearGears.map((presentNumberOfRearGear, index) => {
                    return (
                      <button type="button" key={index} value={presentNumberOfRearGear} className="filter-tag" onClick={(e) => handleMultipleFiltersNumberOfRearGears(e)}>{presentNumberOfRearGear}</button>
                    )
                  })}
                </div>
              </>)}

              {categoryOptionsToFilter.includes("road") && (<>
                {presentRoadRearDerailleurModels.length > 0 && (<>
                  <h5 className=" mt-3">marca</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentRoadRearDerailleurModels.map((presentRoadRearDerailleurModel, index) => {
                      return (
                        <button type="button" key={index} value={presentRoadRearDerailleurModel} className="filter-tag" onClick={(e) => handleMultipleFiltersRearDerailleurModels(e)}>{presentRoadRearDerailleurModel}</button>
                      )
                    })}
                  </div>
                </>)}
              </>)}

              {!categoryOptionsToFilter.includes("road") && (<>
                {presentMtbDirtRearDerailleurModels.length > 0 && (<>
                  <h5 className=" mt-3">marca</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentMtbDirtRearDerailleurModels.map((presentMtbDirtRearDerailleurModel, index) => {
                      return (
                        <button type="button" key={index} value={presentMtbDirtRearDerailleurModel} className="filter-tag" onClick={(e) => handleMultipleFiltersRearDerailleurModels(e)}>{presentMtbDirtRearDerailleurModel}</button>
                      )
                    })}
                  </div>
                </>)}
              </>)}

              {presentCranksets.length > 0 && (<>
                <h5 className=" mt-3">pedivela</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentCranksets.map((presentCrankset, index) => {
                    return (
                      <button type="button" key={index} value={presentCrankset} className="filter-tag" onClick={(e) => handleMultipleFiltersCrankset(e)}>{presentCrankset}</button>
                    )
                  })}
                </div>
              </>)}

              {presentChains.length > 0 && (<>
                <h5 className=" mt-3">corrente</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentChains.map((presentChain, index) => {
                    return (
                      <button type="button" key={index} value={presentChain} className="filter-tag" onClick={(e) => handleMultipleFiltersChain(e)}>{presentChain}</button>
                    )
                  })}
                </div>
              </>)}
            </div>

            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Freios</button>
            <div id="Freios" className="suspension-filter d-none">
              {presentBrakeTypes.length > 0 && (<>
                <h5 className=" mt-3">tipo</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentBrakeTypes.map((presentBrakeType, index) => {
                    return (
                      <button type="button" key={index} value={presentBrakeType} className="filter-tag" onClick={(e) => handleMultipleFiltersBrakeType(e)}>{translateWord(presentBrakeType)}</button>
                    )
                  })}
                </div>
              </>)}
              {(brakeTypeOptionsToFilter.includes("hydraulic_disc") || brakeTypeOptionsToFilter.includes("mechanical_disc")) && (<>
                {presentBrakeDiscSizes.length > 0 && (<>
                  <h5 className=" mt-3">Disco</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentBrakeDiscSizes.map((presentBrakeDiscSize, index) => {
                      return (
                        <button type="button" key={index} value={presentBrakeDiscSize} className="filter-tag" onClick={(e) => handleMultipleFiltersBrakeDiscSize(e)}>{presentBrakeDiscSize}</button>
                      )
                    })}
                  </div>
                </>)}
              </>)}

              {categoryOptionsToFilter.includes("road") && (<>
                {presentRoadBrakeModels.length > 0 && (<>
                  <h5 className=" mt-3">Marca</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentRoadBrakeModels.map((presentRoadBrakeModel, index) => {
                      return (
                        <button type="button" key={index} value={presentRoadBrakeModel} className="filter-tag" onClick={(e) => handleMultipleFiltersBrakeModel(e)}>{presentRoadBrakeModel}</button>
                      )
                    })}
                  </div>
                </>)}
              </>)}

              {!categoryOptionsToFilter.includes("road") && (<>
                {presentMtbDirtBrakeModels.length > 0 && (<>
                  <h5 className=" mt-3">marca</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentMtbDirtBrakeModels.map((presentMtbDirtBrakeModel, index) => {
                      return (
                        <button type="button" key={index} value={presentMtbDirtBrakeModel} className="filter-tag" onClick={(e) => handleMultipleFiltersBrakeModel(e)}>{presentMtbDirtBrakeModel}</button>
                      )
                    })}
                  </div>
                </>)}
              </>)}
            </div>

            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Rodas</button>
            <div id="Rodas" className="suspension-filter d-none">
              {presentRimSizes.length > 0 && (<>
                <h5 className=" mt-3">tamanho da roda</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentRimSizes.map((presentRimSize, index) => {
                    return (
                      <button type="button" key={index} value={presentRimSize} className="filter-tag" onClick={(e) => handleMultipleFiltersRimSize(e)}>{presentRimSize}</button>
                    )
                  })}
                </div>
              </>)}

              {presentWheelMaterials.length > 0 && (<>
                <h5 className=" mt-3">material da roda</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentWheelMaterials.map((presentWheelMaterial, index) => {
                    return (
                      <button type="button" key={index} value={presentWheelMaterial} className="filter-tag" onClick={(e) => handleMultipleFiltersWheelMaterial(e)}>{translateWord(presentWheelMaterial) || presentWheelMaterial}</button>
                    )
                  })}
                </div>
              </>)}

              {presentRimModels.length > 0 && (<>
                <h5 className=" mt-3">Aro</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentRimModels.map((presentRimModel, index) => {
                    return (
                      <button type="button" key={index} value={presentRimModel} className="filter-tag" onClick={(e) => handleMultipleFiltersRimModel(e)}>{translateWord(presentRimModel)}</button>
                    )
                  })}
                </div>
              </>)}

              {presentHubModels.length > 0 && (<>
                <h5 className=" mt-3">Aro</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentHubModels.map((presentHubModel, index) => {
                    return (
                      <button type="button" key={index} value={presentHubModel} className="filter-tag" onClick={(e) => handleMultipleFiltersHubModel(e)}>{translateWord(presentHubModel)}</button>
                    )
                  })}
                </div>
              </>)}

              {presentTyreModels.length > 0 && (<>
                <h5 className=" mt-3">Aro</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentTyreModels.map((presentTyreModel, index) => {
                    return (
                      <button type="button" key={index} value={presentTyreModel} className="filter-tag" onClick={(e) => handleMultipleFiltersTyreModel(e)}>{translateWord(presentTyreModel)}</button>
                    )
                  })}
                </div>
              </>)}
            </div>

            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Canote</button>
            <div id="Canote" className="suspension-filter d-none">
              {presentSeatPostTypes.length > 0 && (<>
                <h5 className=" mt-3">tipo</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentSeatPostTypes.map((presentSeatPostType, index) => {
                    return (
                      <button type="button" key={index} value={presentSeatPostType} className="filter-tag" onClick={(e) => handleMultipleFiltersSeatPostType(e)}>{translateWord(presentSeatPostType)}</button>
                    )
                  })}
                </div>
              </>)}

              {seatPostTypeOptionsToFilter.includes("retractable") && (<>
                {presentSeatPostTravels.length > 0 && (<>
                  <h5 className=" mt-3">tamanho</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentSeatPostTravels.map((presentSeatPostTravel, index) => {
                      return (
                        <button type="button" key={index} value={presentSeatPostTravel} className="filter-tag" onClick={(e) => handleMultipleFiltersSeatPostTravel(e)}>{presentSeatPostTravel}</button>
                      )
                    })}
                  </div>
                </>)}
              </>)}

              {seatPostTypeOptionsToFilter.includes("rigid") && (<>
                {presentSeatPostMaterials.length > 0 && (<>
                  <h5 className=" mt-3">material</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentSeatPostMaterials.map((presentSeatPostMaterial, index) => {
                      return (
                        <button type="button" key={index} value={presentSeatPostMaterial} className="filter-tag" onClick={(e) => handleMultipleFiltersSeatPostMaterial(e)}>{translateWord(presentSeatPostMaterial) || presentSeatPostMaterial}</button>
                      )
                    })}
                  </div>
                </>)}
              </>)}

              {presentSeatPostModels.length > 0 && (<>
                  <h5 className=" mt-3">marca</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentSeatPostModels.map((presentSeatPostModel, index) => {
                      return (
                        <button type="button" key={index} value={presentSeatPostModel} className="filter-tag" onClick={(e) => handleMultipleFiltersSeatPostModel(e)}>{presentSeatPostModel}</button>
                      )
                    })}
                  </div>
              </>)}
            </div>

            <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Cockpit</button>
            <div id="Cockpit" className="cockpit-filter d-none">

              {presentHandlebarMaterials.length > 0 && (<>
                <h5 className=" mt-3">material guidão</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentHandlebarMaterials.map((presenthandlebarMaterial, index) => {
                    return (
                      <button type="button" key={index} value={presenthandlebarMaterial} className="filter-tag" onClick={(e) => handleMultipleFiltersHandlebarMaterial(e)}>{translateWord(presenthandlebarMaterial) || presenthandlebarMaterial }</button>
                    )
                  })}
                </div>
              </>)}

              {presentHandlebarModels.length > 0 && (<>
                <h5 className=" mt-3">guidão</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentHandlebarModels.map((presentHandlebarModel, index) => {
                    return (
                      <button type="button" key={index} value={presentHandlebarModel} className="filter-tag" onClick={(e) => handleMultipleFiltersHandlebarModel(e)}>{presentHandlebarModel}</button>
                    )
                  })}
                </div>
              </>)}

              {presentStemModels.length > 0 && (<>
                <h5 className=" mt-3">mesa</h5>
                <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                  {presentStemModels.map((presentStemModel, index) => {
                    return (
                      <button type="button" key={index} value={presentStemModel} className="filter-tag" onClick={(e) => handleMultipleFiltersStemModel(e)}>{presentStemModel}</button>
                    )
                  })}
                </div>
              </>)}
              {/* <div className="hub-filter">
                <h5 className=" mt-3">Mesa</h5>
                <input type="text" className="text-input" onChange={(e) => setStemFilter(e.target.value)}/>
              </div>

              <div className="handlebar-filter">
                <h5 className=" mt-3">Guidão</h5>
                <input type="text" className="text-input" onChange={(e) => setHandlebarFilter(e.target.value)}/>
              </div> */}
            </div>

            {bikeTypeFilter === "e-bike" && (<>
              <button type="button" className="btn-filter mt-3" onClick={(e) => handleFilter(e)}>Parte Elétrica</button>
              <div id="Parte Elétrica">
                {presentBatteries.length > 0 && (<>
                  <h5 className=" mt-3">mesa</h5>
                  <div id="suspension-type" className="d-flex flex-wrap justify-content-between mt-3">
                    {presentBatteries.map((presentBattery, index) => {
                      return (
                        <button type="button" key={index} value={presentBattery} className="filter-tag" onClick={(e) => handleMultipleFiltersBattery(e)}>{presentBattery}</button>
                      )
                    })}
                  </div>
                </>)}

                <div className="d-flex justify-content-between">
                  <h5 className=" mt-3">Ciclos bateria</h5>
                  {batteryCyclesFilter && (<>
                    <h5 className=" mt-3">
                    {batteryCyclesFilter}
                  </h5>
                  </>)}
                </div>
                <input type="range" className="form-range" min="0" max="50" id="customRange1" step="1" onChange={(e) => setBatteryCyclesFilter(e.target.value)} />
                <div className="d-flex justify-content-between">
                  <h6 className=" price-filter-text"><small>0</small></h6>
                  <h6 className=" price-filter-text"><small>50</small></h6>
                </div>

                <div className="d-flex justify-content-between">
                  <h5 className=" mt-3">Km</h5>
                  {mileageFilter && (<>
                    <h5 className=" mt-3">
                    {mileageFilter} Km
                  </h5>
                  </>)}
                </div>
                <input type="range" className="form-range" min="0" max="200" id="customRange1" step="1" onChange={(e) => setMileageFilter(e.target.value)} />
                <div className="d-flex justify-content-between">
                  <h6 className=" price-filter-text"><small>0</small></h6>
                  <h6 className=" price-filter-text"><small>200Km</small></h6>
                </div>
              </div>
             </>
            )}
          </div>
        </div>

        <div className={`${window.screen.width < 768? 'w-100' : 'w-75'} d-flex flex-wrap`}>
          {bikes && bikes.map((bike, idx) => {
            return (
              <div className={`${window.screen.width < 768? 'w-100' : 'w-25'} my-2`} bike={bike} key={bike.id} id="mobile">
                <a href={"bikes/" + bike.id} className="remove-link" target="_blank">
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
                      {bike.verified && (
                        <img src={VerifiedImage} alt="" width="20" height="20" className="mt-1"/>
                      )}
                    </div>
                    <h4 className="text-center mt-1">
                      {(bike.price_in_cents / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h4>
                    <hr className="index-line"/>
                    <div className="card-content mt-2">
                      <div className="d-flex justify-content-around mb-2">
                        <div className="infos">
                          <p>{translateWord(bike.bike_type)}</p>
                          <p>{bike.city.name} - {bike.state.acronym}</p>
                        </div>
                        <div className="infos">
                          {bike.bike_type === "bike" &&(<>
                            <img src={NormalBikeImage} alt="" className="icon-card-index ms-1"/> <br />
                          </>
                          )}
                          {bike.bike_type === "e-bike" &&(<>
                            <img src={EBikeImage} alt="" className="icon-card-index ms-1"/> <br />
                          </>
                          )}
                          <button type="button" onClick={(e) => handleLike(e)} className="like-btn" id={bike.id}><i id={bike.id} className="far fa-heart"></i></button>
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
