import React, { useEffect, useState } from "react";
import NormalBikeImage from "../../../assets/images/normal-bike.png";
import EBikeImage from "../../../assets/images/e-bike.png";
import IntlCurrencyInput from "react-intl-currency-input"
import VerifiedImage from "../../../assets/images/badge.png";


export function Bikes(props) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // let buttonEvent = window.matchMedia("(hover: hover)").matches ? 'mousedown' : 'touchstart';
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
  const [openFilters, setOpenFilters] = useState([]);


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
      event.preventDefault();
      setMinPriceFilter(value)
    };
    const handlemaxPriceFIlter = (event, value, maskedValue) => {
      event.preventDefault();
      setMaxPriceFilter(value)
    };
    return(
      <>
        <div>
          <p className="m-0">DE</p>
          <IntlCurrencyInput currency="BRL" config={currencyConfig}
            className="text-input" value={minPriceFilter}   onChange={handleMinPriceFIlter} />
        </div>
        <div>
          <p className="m-0">ATÉ</p>
          <IntlCurrencyInput currency="BRL" config={currencyConfig}
            className="text-input" value={maxPriceFilter}   onChange={handlemaxPriceFIlter} />
        </div>
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
    // if (certifiedFilter) url = url + `&certified=${certifiedFilter}`

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

  const handleFilterSection = (filterName) => {
    const currentOpenFilters = [...openFilters]
    var index = currentOpenFilters.indexOf(filterName);
    if (index === -1) {
        currentOpenFilters.push(filterName);
    } else {
        currentOpenFilters.splice(index, 1);
    }
    setOpenFilters(currentOpenFilters)
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
    setStateFilter(e.target.value)
    let stateId = states.find(state => state.name === e.target.value).id
    setMapedCitiesForState(cities.filter(element => element.state_id === stateId))
  }

  const handleVerifiedFilter = (e) => {
    console.log(e.target)
    if (verifiedBikeFilter === "true" ) {
      setVerifiedBikeFilter("");
      document.getElementById("verified-bike").classList.remove("text-success")
    } else {
      setVerifiedBikeFilter(e.target.value);
      document.getElementById("verified-bike").classList.add("text-success")
    }
  }

  const handleMultipleFiltersCategory = (e) => {
    const currentOptionsToFilter = [...categoryOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setCategoryOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setCategoryOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersModality = (e) => {
    const currentOptionsToFilter = [...modalityOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setModalityOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setModalityOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersModel = (e) => {
    const currentOptionsToFilter = [...modelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrameBrand = (e) => {
    const currentOptionsToFilter = [...frameBrandOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrameBrandOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrameBrandOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrameSize = (e) => {
    const currentOptionsToFilter = [...frameSizeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrameSizeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrameSizeOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrameMaterial = (e) => {
    const currentOptionsToFilter = [...frameMaterialOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrameMaterialOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrameMaterialOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersSuspensionType = (e) => {
    const currentOptionsToFilter = [...suspensionTypeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setSuspensionTypeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setSuspensionTypeOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrontSuspensionTravel = (e) => {
    const currentOptionsToFilter = [...frontSuspensionTravelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrontSuspensionTravelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrontSuspensionTravelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersRearSuspensionTravel = (e) => {
    const currentOptionsToFilter = [...rearSuspensionTravelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setRearSuspensionTravelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setRearSuspensionTravelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrontSuspensionModel = (e) => {
    const currentOptionsToFilter = [...frontSuspensionModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrontSuspensionModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrontSuspensionModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersRearSuspensionModel = (e) => {
    const currentOptionsToFilter = [...rearSuspensionModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setRearSuspensionModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setRearSuspensionModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersNumberOfFrontGears = (e) => {
    const currentOptionsToFilter = [...numberOfFrontGearsOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setNumberOfFrontGearsOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setNumberOfFrontGearsOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersNumberOfRearGears = (e) => {
    const currentOptionsToFilter = [...numberOfRearGearsOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setNumberOfRearGearsOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
    } else {
      currentOptionsToFilter.push(e.target.value)
      setNumberOfRearGearsOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersFrontDerailleurModels = (e) => {
    const currentOptionsToFilter = [...frontDerailleurModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setFrontDerailleurModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setFrontDerailleurModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersRearDerailleurModels = (e) => {
    const currentOptionsToFilter = [...rearDerailleurModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setRearDerailleurModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setRearDerailleurModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersCrankset = (e) => {
    const currentOptionsToFilter = [...cranksetOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setCranksetOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setCranksetOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersChain = (e) => {
    const currentOptionsToFilter = [...chainOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setChainOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setChainOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersBrakeType = (e) => {
    const currentOptionsToFilter = [...brakeTypeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setBrakeTypeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setBrakeTypeOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersBrakeDiscSize = (e) => {
    const currentOptionsToFilter = [...brakeDiscSizeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setBrakeDiscSizeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setBrakeDiscSizeOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersBrakeModel = (e) => {
    const currentOptionsToFilter = [...brakeModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setBrakeModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setBrakeModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersRimSize = (e) => {
    const currentOptionsToFilter = [...rimSizeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setRimSizeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setRimSizeOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersRimModel = (e) => {
    const currentOptionsToFilter = [...rimModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setRimModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setRimModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersWheelMaterial = (e) => {
    const currentOptionsToFilter = [...wheelMaterialOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setWheelMaterialOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setWheelMaterialOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersHubModel = (e) => {
    const currentOptionsToFilter = [...hubModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setHubModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setHubModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersTyreModel = (e) => {
    const currentOptionsToFilter = [...tyreModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setTyreModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setTyreModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersSeatPostType = (e) => {
    const currentOptionsToFilter = [...seatPostTypeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setSeatPostTypeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setSeatPostTypeOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersSeatPostMaterial = (e) => {
    const currentOptionsToFilter = [...seatPostMaterialOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setSeatPostMaterialOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setSeatPostMaterialOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersSeatPostTravel = (e) => {
    const currentOptionsToFilter = [...seatPostTravelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setSeatPostTravelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setSeatPostTravelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersSeatPostModel = (e) => {
    const currentOptionsToFilter = [...seatPostModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setSeatPostModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setSeatPostModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersHandlebarMaterial = (e) => {
    const currentOptionsToFilter = [...handlebarMaterialOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setHandlebarMaterialOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setHandlebarMaterialOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersHandlebarModel = (e) => {
    const currentOptionsToFilter = [...handlebarModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setHandlebarModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setHandlebarModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersStemModel = (e) => {
    const currentOptionsToFilter = [...stemModelOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setStemModelOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setStemModelOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersBattery = (e) => {
    const currentOptionsToFilter = [...batteryOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setBatteryOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setBatteryOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleToggleFilterMobile = (e) => {
    document.getElementById("filters").classList.toggle("d-none")
    e.target.classList.toggle("selected-filter")
  }


  return (
    <div className="p-5 br-8 index-container">
      <h2 className="text-center text-success">Bikes</h2>
      <button type="button" className={`filter-link ms-3 ${ window.screen.width > 768 ? "d-none" : ""}`} onClick={((e) => handleToggleFilterMobile(e))}><i className="fas fa-filter me-1"></i>Filtrar</button>
      <div className={`mt-3 index-content ${ window.screen.width < 768 ? "d-block" : "d-flex"}`}>
        <div id="filters" className={`filters mt-1 mb-1 ${ window.screen.width < 768 ? "d-none w-100" : " w-25"}`}>
          <div className="d-flex justify-content-between">
            <p className="">Filtrar</p>
            <div className="d-flex justify-content-center">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" value="true" id="flexSwitchCheckDefault" onChange={(e) => handleVerifiedFilter(e)}/>
              </div>
              <p id="verified-bike" className="" >Certificadas</p>
            </div>
          </div>

          <div className="">
            <div className="border-bottom mt-3">
              <button type="button" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Local")} >
                Local
                <i id="section-arrow" className="fas fa-chevron-down"></i>
              </button>

              {
                openFilters.includes("Local") && (
                  <div id="Local" className="locality-filter mb-3">
                    <h5 className="">Estado</h5>
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
                )
              }
            </div>

            {presentCategories.length > 1 && (
              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Categoria")}>
                  Categoria
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Categoria") && (
                    <div id="Categoria" className="multiple-filters d-flex gap-1 flex-wrap justify-content-between mb-3">
                      {presentCategories.map((category, index) => {
                        return (
                          <button type="button" key={index} value={category.name} className="filter-tag" onClick={(e) => handleMultipleFiltersCategory(e)}>{translateWord(category.name)}</button>
                        )
                      })}
                    </div>
                  )
                }
              </div>
            )}

            {(presentMtbModalities.length > 0 || presentRoadModalities.length > 0 || presentDirtModalities.length > 0)&& (
              <div className="border-bottom mt-3">

                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Modalidade")}>
                  Modalidade
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Modalidade") && (
                    <div id="Modalidade" className="multiple-filters d-flex gap-1 flex-wrap justify-content-between mb-3">
                      {presentMtbModalities.map((presentMtbModality, index) => {
                        return (
                          <button type="button" key={index} value={presentMtbModality} className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>{translateWord(presentMtbModality)}</button>
                        )
                      })}
                      {presentDirtModalities.map((presentDirtModality, index) => {
                        return (
                          <button type="button" key={index} value={presentDirtModality} className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>{translateWord(presentDirtModality)}</button>
                        )
                      })}
                      {presentRoadModalities.map((presentRoadModality, index) => {
                        return (
                          <button type="button" key={index} value={presentRoadModality} className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>{translateWord(presentRoadModality)}</button>
                        )
                      })}
                    </div>
                  )
                }
              </div>
            )}

            <div className="border-bottom mt-3">
              <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Tipo")}>
                Tipo
                <i id="section-arrow" className="fas fa-chevron-down"></i>
              </button>
              {
                openFilters.includes("Tipo") && (
                  <div id="Tipo" className="d-flex justify-content-between mb-3">
                    <button type="button" value="e-bike" className="filter-tag fs-15" onClick={(e) => handleBikeTypeFilter(e)}><img src={EBikeImage} alt="" className="icon-filter-bike me-1"/> E-Bike</button>
                    <button type="button" value="bike" className="filter-tag fs-15" onClick={(e) => handleBikeTypeFilter(e)}><img src={NormalBikeImage} alt="" className="icon-filter-bike me-1"/> Bike</button>
                  </div>
                )
              }
            </div>

            <div className="border-bottom mt-3">
              <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Condição")}>
                Condição
                <i id="section-arrow" className="fas fa-chevron-down"></i>
              </button>
              {
                openFilters.includes("Condição") && (
                  <div id="Condição" className="d-flex justify-content-between mb-3">
                    <button type="button" value="new" className="filter-tag" onClick={(e) => handleConditionFilter(e)}>Nova</button>
                    <button type="button" value="used" className="filter-tag" onClick={(e) => handleConditionFilter(e)}>Usada</button>
                  </div>
                )
              }
            </div>

            {presentFrameBrands.length > 0 && (
              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Marca")}>
                  Marca
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Marca") && (
                    <div id="Marca" className="d-flex flex-wrap justify-content-between gap-1 mb-3">
                      {presentFrameBrands.map((presentFrameBrand, index) => {
                        return (
                          <button type="button" key={index} value={presentFrameBrand} className="filter-tag" onClick={(e) => handleMultipleFiltersFrameBrand(e)}>{presentFrameBrand}</button>
                        )
                      })}
                    </div>
                  )
                }
              </div>
            )}

            {presentModels.length > 0 && (
              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Modelo")}>
                  Modelo
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Modelo") && (
                    <div id="Modelo" className="multiple-filters d-flex gap-1 flex-wrap mb-3 justify-content-between">
                      {presentModels.map((presentModel, index)=> {
                        return (
                          <button type="button" key={index} value={presentModel} className="filter-tag"  onClick={(e) => handleMultipleFiltersModel(e)}>{presentModel}</button>
                        );
                      })}
                    </div>
                  )
                }
              </div>
            )}

            <div className="border-bottom mt-3">
              <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Preço")}>
                Preço
                <i id="section-arrow" className="fas fa-chevron-down"></i>
              </button>
              {
                openFilters.includes("Preço") && (
                  <div id="Preço" className="d-flex justify-content-between gap-2 mb-3">
                    {BrlCurrencyComponent()}
                  </div>
                )
              }
            </div>

            <div className="border-bottom mt-3">
              <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Ano")}>
                Ano
                <i id="section-arrow" className="fas fa-chevron-down"></i>
              </button>
              {
                openFilters.includes("Ano") && (
                  <div id="Ano" className="d-flex justify-content-between gap-2 mb-3">
                    <input type="number" className="text-input" placeholder="DE" onChange={(e) => setMinYearFilter(e.target.value)}/>
                    <input type="number" className="text-input" placeholder="ATÉ" onChange={(e) => setMaxYearFilter(e.target.value)}/>
                  </div>
                )
              }
            </div>

            {(presentFrameSizes.length > 0 || presentRoadFrameSizes.length > 0 || presentFrameMaterials.length > 0 || presentDirtMtbFrameSizes.length > 0)&& (

              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Quadro")}>
                  Quadro
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Quadro") && (
                    <div id="Quadro" className="mb-3">
                      <div>
                        {categoryOptionsToFilter.length <= 1 && (<>
                          {presentFrameSizes.length > 0 && (<>
                            <h5 className="mb-2">tamanho</h5>
                            <div className="d-flex gap-3 flex-wrap justify-content-center">
                              {presentFrameSizes.map((presentFrameSize, index)=> {
                                return (
                                  <button type="button" key={index} value={presentFrameSize} className="filter-tag"  onClick={(e) => handleMultipleFiltersFrameSize(e)}>{presentFrameSize}</button>
                                );
                              })}
                            </div>
                          </>)}
                        </>)}
                      </div>

                      {categoryOptionsToFilter.includes("road") && (<>
                        <h5 className="mb-2">tamanho</h5>
                        <div className="d-flex gap-1 flex-wrap justify-content-center">

                          {presentRoadFrameSizes.map((presentRoadFrameSize, index)=> {
                            return (
                              <button type="button" key={index} value={presentRoadFrameSize} className="filter-tag"  onClick={(e) => handleMultipleFiltersFrameSize(e)}>{presentRoadFrameSize}</button>
                            );
                          })}
                        </div>
                      </>)}

                      {(categoryOptionsToFilter.includes("dirt_street") || categoryOptionsToFilter.includes("mountain_bike") || categoryOptionsToFilter.includes("infant") || categoryOptionsToFilter.includes("urban")) && (<>
                        <h5 className="mb-2">tamanho</h5>
                        <div className="d-flex gap-1 flex-wrap justify-content-center">
                          {presentDirtMtbFrameSizes.map((presentDirtMtbFrameSize, index)=> {
                            return (
                              <button type="button" key={index} value={presentDirtMtbFrameSize} className="filter-tag"  onClick={(e) => handleMultipleFiltersFrameSize(e)}>{presentDirtMtbFrameSize}</button>
                            );
                          })}
                        </div>
                      </>)}

                      <div>
                        <h5 className="my-2">material</h5>
                        <div id="frame_materials" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentFrameMaterials.map((presentFrameMaterial, index) => {
                            return (
                              <button type="button" key={index} value={presentFrameMaterial} className="filter-tag" onClick={(e) => handleMultipleFiltersFrameMaterial(e)}>{translateWord(presentFrameMaterial) || presentFrameMaterial }</button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            )}

            {presentRoadForkMaterials.length > 0 && (<>
              {categoryOptionsToFilter.includes("road") && (<>
                <div className="border-bottom mt-3">
                  <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Garfo")}>
                    Garfo
                    <i id="section-arrow" className="fas fa-chevron-down"></i>
                  </button>
                  {
                    openFilters.includes("Garfo") && (
                      <div id="Garfo" className="d-flex justify-content-between gap-2 mb-3">
                        <h5 className="mb-2">material</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentRoadForkMaterials.map((presentRoadForkMaterial, index) => {
                            return (
                              <button type="button" key={index} value={presentRoadForkMaterial} className="filter-tag" onClick={(e) => handleMultipleFiltersSuspensionType(e)}>{translateWord(presentRoadForkMaterial)}</button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                </div>
              </>)}
            </>)}

            {!categoryOptionsToFilter.includes("road") && (<>
              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={(e) => handleFilterSection("Suspensão")}>
                  Suspensão
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Suspensão") && (
                    <div id="Suspensão" className="mb-3">
                      {presentSuspensionTypes.length > 0 && (<>
                        <h5 className="mb-2">tipo</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentSuspensionTypes.map((presentSuspensionType, index) => {
                            return (
                              <button type="button" key={index} value={presentSuspensionType} className="filter-tag" onClick={(e) => handleMultipleFiltersSuspensionType(e)}>{translateWord(presentSuspensionType)}</button>
                            )
                          })}
                        </div>
                      </>)}
                      {(presentFrontSuspensionTravels && !suspensionTypeOptionsToFilter.includes("no_suspension")) &&(<>
                        <h5 className="my-2">dianteira</h5>
                        <div id="front_suspension_travel" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentFrontSuspensionTravels.map((presentFrontSuspensionTravel, index) => {
                            return (
                              <button type="button" key={index} value={presentFrontSuspensionTravel} className="filter-tag" onClick={(e) => handleMultipleFiltersFrontSuspensionTravel(e)}>{presentFrontSuspensionTravel}</button>
                            )
                          })}
                        </div>
                      </>)}

                      {(presentMtbDirtFrontSuspensionModels.length > 0 && !suspensionTypeOptionsToFilter.includes("no_suspension")) && (<>
                        <h5 className="my-2">Marca</h5>
                        <div id="frame_materials" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentMtbDirtFrontSuspensionModels.map((presentMtbDirtFrontSuspensionModel, index) => {
                            return (
                              <button type="button" key={index} value={presentMtbDirtFrontSuspensionModel} className="filter-tag" onClick={(e) => handleMultipleFiltersFrontSuspensionModel(e)}>{presentMtbDirtFrontSuspensionModel}</button>
                            )
                          })}
                        </div>
                      </>)}
                      {categoryOptionsToFilter.length < 1 && (<>
                        <h5 className="my-2">Marca</h5>
                        <div id="frame_materials" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentFrontSuspensionModels.map((presentFrontSuspensionModel, index) => {
                            return (
                              <button type="button" key={index} value={presentFrontSuspensionModel} className="filter-tag" onClick={(e) => handleMultipleFiltersFrontSuspensionModel(e)}>{presentFrontSuspensionModel}</button>
                            )
                          })}
                        </div>
                      </>)}

                      {(!suspensionTypeOptionsToFilter.includes("hardtail") && !suspensionTypeOptionsToFilter.includes("no_suspension"))&& (<>
                        {presentRearSuspensionTravels && (<>
                          <h5 className="my-2">traseira</h5>
                          <div id="Rear_suspension_travel" className="d-flex flex-wrap justify-content-between gap-1">
                            {presentRearSuspensionTravels.map((presentRearSuspensionTravel, index) => {
                              return (
                                <button type="button" key={index} value={presentRearSuspensionTravel} className="filter-tag" onClick={(e) => handleMultipleFiltersRearSuspensionTravel(e)}>{presentRearSuspensionTravel}</button>
                              )
                            })}
                          </div>
                        </>)}
                        {presentMtbDirtRearSuspensionModels.length > 0 && (<>
                          <h5 className="my-2">Marca</h5>
                          <div id="frame_materials" className="d-flex flex-wrap justify-content-between gap-1">
                            {presentMtbDirtRearSuspensionModels.map((presentMtbDirtRearSuspensionModel, index) => {
                              return (
                                <button type="button" key={index} value={presentMtbDirtRearSuspensionModel} className="filter-tag" onClick={(e) => handleMultipleFiltersRearSuspensionModel(e)}>{presentMtbDirtRearSuspensionModel}</button>
                              )
                            })}
                          </div>
                        </>)}
                        {categoryOptionsToFilter.length < 1 && (<>
                          <h5 className="my-2">Marca</h5>
                          <div id="frame_materials" className="d-flex flex-wrap justify-content-between gap-1">
                            {presentRearSuspensionModels.map((presentRearSuspensionModel, index) => {
                              return (
                                <button type="button" key={index} value={presentRearSuspensionModel} className="filter-tag" onClick={(e) => handleMultipleFiltersRearSuspensionModel(e)}>{presentRearSuspensionModel}</button>
                              )
                            })}
                          </div>
                        </>)}
                      </>)}
                    </div>
                  )
                }
              </div>
            </>)}

            {(presentNumberOfFrontGears.length > 0 || presentNumberOfRearGears.length > 0 || presentRoadFrontDerailleurModels.length > 0 || presentMtbDirtFrontDerailleurModels.length > 0
              || presentRoadRearDerailleurModels.length > 0 || presentMtbDirtRearDerailleurModels.length > 0 || presentChains.length > 0 || presentCranksets.length > 0)&& (
              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Transmissão")}>
                  Transmissão
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Transmissão") && (
                    <div id="Transmissão" className="mb-3">
                      {presentNumberOfFrontGears.length > 0 && (<>
                        <h5 className="mb-2">nº coroas (dianteiro)</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentNumberOfFrontGears.map((presentNumberOfFrontGear, index) => {
                            return (
                              <button type="button" key={index} value={presentNumberOfFrontGear} className="filter-tag" onClick={(e) => handleMultipleFiltersNumberOfFrontGears(e)}>{presentNumberOfFrontGear}</button>
                            )
                          })}
                        </div>
                      </>)}
                      {categoryOptionsToFilter.includes("road") && (<>
                        {presentRoadFrontDerailleurModels.length > 0 && (<>
                          <h5 className="my-2">Marca (dianteiro)</h5>
                          <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
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
                          <h5 className="my-2">marca</h5>
                          <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                            {presentMtbDirtFrontDerailleurModels.map((presentMtbDirtFrontDerailleurModel, index) => {
                              return (
                                <button type="button" key={index} value={presentMtbDirtFrontDerailleurModel} className="filter-tag" onClick={(e) => handleMultipleFiltersFrontDerailleurModels(e)}>{presentMtbDirtFrontDerailleurModel}</button>
                              )
                            })}
                          </div>
                        </>)}
                      </>)}

                      {presentNumberOfRearGears.length > 0 && (<>
                        <h5 className="mt-2">nº velocidades (traseiro)</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentNumberOfRearGears.map((presentNumberOfRearGear, index) => {
                            return (
                              <button type="button" key={index} value={presentNumberOfRearGear} className="filter-tag" onClick={(e) => handleMultipleFiltersNumberOfRearGears(e)}>{presentNumberOfRearGear}</button>
                            )
                          })}
                        </div>
                      </>)}

                      {categoryOptionsToFilter.includes("road") && (<>
                        {presentRoadRearDerailleurModels.length > 0 && (<>
                          <h5 className="my-2">marca(traseiro)</h5>
                          <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
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
                          <h5 className="my-2">marca(traseiro)</h5>
                          <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                            {presentMtbDirtRearDerailleurModels.map((presentMtbDirtRearDerailleurModel, index) => {
                              return (
                                <button type="button" key={index} value={presentMtbDirtRearDerailleurModel} className="filter-tag" onClick={(e) => handleMultipleFiltersRearDerailleurModels(e)}>{presentMtbDirtRearDerailleurModel}</button>
                              )
                            })}
                          </div>
                        </>)}
                      </>)}
                      <hr />
                      {presentCranksets.length > 0 && (<>
                        <h5 className="my-2">pedivela</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentCranksets.map((presentCrankset, index) => {
                            return (
                              <button type="button" key={index} value={presentCrankset} className="filter-tag" onClick={(e) => handleMultipleFiltersCrankset(e)}>{presentCrankset}</button>
                            )
                          })}
                        </div>
                      </>)}

                      {presentChains.length > 0 && (<>
                        <h5 className="my-2">corrente</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentChains.map((presentChain, index) => {
                            return (
                              <button type="button" key={index} value={presentChain} className="filter-tag" onClick={(e) => handleMultipleFiltersChain(e)}>{presentChain}</button>
                            )
                          })}
                        </div>
                      </>)}
                    </div>
                  )
                }
              </div>
            )}

            {(presentBrakeTypes.length > 0 || presentBrakeDiscSizes.length > 0 || presentRoadBrakeModels.length > 0 || presentMtbDirtBrakeModels.length > 0) && (
              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Freio")}>
                  Freio
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Freio") && (
                    <div id="Freio" className="mb-3">
                      {presentBrakeTypes.length > 0 && (<>
                        <h5 className="mb-2">tipo</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentBrakeTypes.map((presentBrakeType, index) => {
                            return (
                              <button type="button" key={index} value={presentBrakeType} className="filter-tag" onClick={(e) => handleMultipleFiltersBrakeType(e)}>{translateWord(presentBrakeType)}</button>
                            )
                          })}
                        </div>
                      </>)}
                      {(brakeTypeOptionsToFilter.includes("hydraulic_disc") || brakeTypeOptionsToFilter.includes("mechanical_disc")) && (<>
                        {presentBrakeDiscSizes.length > 0 && (<>
                          <h5 className="my-2">Disco</h5>
                          <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
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
                          <h5 className="my-2">Marca</h5>
                          <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
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
                          <h5 className="my-2">marca</h5>
                          <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                            {presentMtbDirtBrakeModels.map((presentMtbDirtBrakeModel, index) => {
                              return (
                                <button type="button" key={index} value={presentMtbDirtBrakeModel} className="filter-tag" onClick={(e) => handleMultipleFiltersBrakeModel(e)}>{presentMtbDirtBrakeModel}</button>
                              )
                            })}
                          </div>
                        </>)}
                      </>)}
                    </div>
                  )
                }
              </div>
            )}

            {(presentRimSizes.length > 0 || presentWheelMaterials.length > 0 || presentRimModels.length > 0) && (
              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Rodas")}>
                  Rodas
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Rodas") && (
                    <div id="Rodas" className="mb-3">
                      {presentRimSizes.length > 0 && (<>
                        <h5 className="mb-2">tamanho da roda</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentRimSizes.map((presentRimSize, index) => {
                            return (
                              <button type="button" key={index} value={presentRimSize} className="filter-tag" onClick={(e) => handleMultipleFiltersRimSize(e)}>{presentRimSize}</button>
                            )
                          })}
                        </div>
                      </>)}

                      {presentWheelMaterials.length > 0 && (<>
                        <h5 className="my-2">material da roda</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentWheelMaterials.map((presentWheelMaterial, index) => {
                            return (
                              <button type="button" key={index} value={presentWheelMaterial} className="filter-tag" onClick={(e) => handleMultipleFiltersWheelMaterial(e)}>{translateWord(presentWheelMaterial) || presentWheelMaterial}</button>
                            )
                          })}
                        </div>
                      </>)}

                      {presentRimModels.length > 0 && (<>
                        <h5 className="my-2">Aro</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentRimModels.map((presentRimModel, index) => {
                            return (
                              <button type="button" key={index} value={presentRimModel} className="filter-tag" onClick={(e) => handleMultipleFiltersRimModel(e)}>{presentRimModel}</button>
                            )
                          })}
                        </div>
                      </>)}

                      {presentHubModels.length > 0 && (<>
                        <h5 className="my-2">Cubo</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentHubModels.map((presentHubModel, index) => {
                            return (
                              <button type="button" key={index} value={presentHubModel} className="filter-tag" onClick={(e) => handleMultipleFiltersHubModel(e)}>{presentHubModel}</button>
                            )
                          })}
                        </div>
                      </>)}

                      {presentTyreModels.length > 0 && (<>
                        <h5 className="my-2">Pneu</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentTyreModels.map((presentTyreModel, index) => {
                            return (
                              <button type="button" key={index} value={presentTyreModel} className="filter-tag" onClick={(e) => handleMultipleFiltersTyreModel(e)}>{presentTyreModel}</button>
                            )
                          })}
                        </div>
                      </>)}
                    </div>
                  )
                }
              </div>
            )}

            {(presentSeatPostTypes.length > 0 || presentSeatPostTravels.length > 0 || presentSeatPostMaterials.length > 0) && (
              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Canote")}>
                  Canote
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Canote") && (
                    <div id="Canote" className="mb-3">
                      {presentSeatPostTypes.length > 0 && (<>
                        <h5 className="mb-2">tipo</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentSeatPostTypes.map((presentSeatPostType, index) => {
                            return (
                              <button type="button" key={index} value={presentSeatPostType} className="filter-tag" onClick={(e) => handleMultipleFiltersSeatPostType(e)}>{translateWord(presentSeatPostType)}</button>
                            )
                          })}
                        </div>
                      </>)}

                      {seatPostTypeOptionsToFilter.includes("retractable") && (<>
                        {presentSeatPostTravels.length > 0 && (<>
                          <h5 className="my-2">tamanho</h5>
                          <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
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
                          <h5 className="my-2">material</h5>
                          <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                            {presentSeatPostMaterials.map((presentSeatPostMaterial, index) => {
                              return (
                                <button type="button" key={index} value={presentSeatPostMaterial} className="filter-tag" onClick={(e) => handleMultipleFiltersSeatPostMaterial(e)}>{translateWord(presentSeatPostMaterial) || presentSeatPostMaterial}</button>
                              )
                            })}
                          </div>
                        </>)}
                      </>)}

                      {presentSeatPostModels.length > 0 && (<>
                          <h5 className="my-2">marca</h5>
                          <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                            {presentSeatPostModels.map((presentSeatPostModel, index) => {
                              return (
                                <button type="button" key={index} value={presentSeatPostModel} className="filter-tag" onClick={(e) => handleMultipleFiltersSeatPostModel(e)}>{presentSeatPostModel}</button>
                              )
                            })}
                          </div>
                      </>)}
                    </div>
                  )
                }
              </div>
            )}

            {(presentHandlebarMaterials.length > 0 || presentHandlebarModels.length > 0 || presentStemModels.length > 0) && (

              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Cockpit")}>
                  Cockpit
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Cockpit") && (
                    <div id="Cockpit" className="mb-3">
                      {presentHandlebarMaterials.length > 0 && (<>
                        <h5 className="my-2">material guidão</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentHandlebarMaterials.map((presenthandlebarMaterial, index) => {
                            return (
                              <button type="button" key={index} value={presenthandlebarMaterial} className="filter-tag" onClick={(e) => handleMultipleFiltersHandlebarMaterial(e)}>{translateWord(presenthandlebarMaterial) || presenthandlebarMaterial }</button>
                            )
                          })}
                        </div>
                      </>)}

                      {presentHandlebarModels.length > 0 && (<>
                        <h5 className="my-2">guidão</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentHandlebarModels.map((presentHandlebarModel, index) => {
                            return (
                              <button type="button" key={index} value={presentHandlebarModel} className="filter-tag" onClick={(e) => handleMultipleFiltersHandlebarModel(e)}>{presentHandlebarModel}</button>
                            )
                          })}
                        </div>
                      </>)}

                      {presentStemModels.length > 0 && (<>
                        <h5 className="my-2">mesa</h5>
                        <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                          {presentStemModels.map((presentStemModel, index) => {
                            return (
                              <button type="button" key={index} value={presentStemModel} className="filter-tag" onClick={(e) => handleMultipleFiltersStemModel(e)}>{presentStemModel}</button>
                            )
                          })}
                        </div>
                      </>)}
                    </div>
                  )
                }
              </div>
            )}

            {presentBatteries.length > 0  && (<>
              {bikeTypeFilter === "e-bike" && (<>
                <div className="border-bottom mt-3">
                  <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Parte Elétrica")}>
                    Parte Elétrica
                    <i id="section-arrow" className="fas fa-chevron-down"></i>
                  </button>
                  {
                    openFilters.includes("Parte Elétrica") && (
                      <div id="Parte Elétrica" className="mb-3">
                        {presentBatteries.length > 0 && (<>
                          <h5 className="my-2">Capacidade da bateria</h5>
                          <div id="suspension-type" className="d-flex flex-wrap justify-content-between gap-1">
                            {presentBatteries.map((presentBattery, index) => {
                              return (
                                <button type="button" key={index} value={presentBattery} className="filter-tag" onClick={(e) => handleMultipleFiltersBattery(e)}>{presentBattery}</button>
                              )
                            })}
                          </div>
                        </>)}

                        <div className="d-flex justify-content-between">
                          <h5 className="my-2">Ciclos bateria</h5>
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
                          <h5 className="my">Km</h5>
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
                    )
                  }
                </div>
              </>
              )}
            </>)}
          </div>
        </div>

        <div className={`${window.screen.width < 768? 'w-100 gap-3' : 'w-75'} d-flex flex-wrap`}>
          {bikes.length === 0 && (
            <h3 className="mx-auto text-success">Ops! Não encontramos uma bike para sua busca. Tente com outras categorias e critérios</h3>
          )}
          {bikes && bikes.map((bike, idx) => {
            return (
              <div className={`${window.screen.width < 768? 'w-100' : 'w-25'}`} bike={bike} key={bike.id} id="mobile">
                <a href={"bikes/" + bike.id + "?bike=" + bike.frame_brand + bike.model} className="" target="_blank">
                  <div className="cards-bikes">
                    {
                      bike.verified &&
                      (
                        <div className="verified-icon"></div>
                      )
                    }
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
                    <h4 className="card-title text-center gap-2 mt-2">{bike.frame_brand}  {bike.model}</h4>
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
