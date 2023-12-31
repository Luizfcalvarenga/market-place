import React, { useEffect, useState } from "react";
import AccessorieImage from "../../../assets/images/accessories.png";
import ComponentImage from "../../../assets/images/frame.png";
import ClotheImage from "../../../assets/images/tshirt.png";
import IntlCurrencyInput from "react-intl-currency-input"




export function Products(props) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const [products, setProducts] = useState([])
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true)
  const [productTypes, setProductTypes] = useState([])
  const [productTypeAttributes, setProductTypeAttributes] = useState([])
  const [attributesForProduct, setAttributesForProduct] = useState([]);
  const [productTypeFilter, setProductTypeFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [productAttributesFilter, setProductAttributesFilter] = useState("");
  const [minYearFilter, setMinYearFilter] = useState("");
  const [maxYearFilter, setMaxYearFilter] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [mapedCitiesForState, setMapedCitiesForState] = useState([]);
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);
  const [clothesProducts, setClothesProducts] = useState([]);
  const [componentsProducts, setComponentsProducts] = useState([]);
  const [productTypeOptionsToFilter, setProductTypeOptionsToFilter] = useState([params.product_types] || []);
  const [categoryOptionsToFilter, setCategoryOptionsToFilter] = useState([]);
  const [modalityOptionsToFilter, setModalityOptionsToFilter] = useState([]);
  const [attributeOptionsToFilter, setAttributeOptionsToFilter] = useState([]);
  const [clotheSizeOptionsToFilter, setClotheSizeOptionsToFilter] = useState([]);
  const [componentsAttributesOptionsToFilter, setComponentsAttributesOptionsToFilter] = useState([]);
  const [filteredLink, setFilteredLink] = useState("");
  const [verifiedProductFilter, setVerifiedProductFilter] = useState([params.verified] || "");

  const [onlyAccessories, setOnlyAccessories] = useState(params.products_accessories || "");
  const [onlyClothes, setOnlyClothes] = useState(params.products_clothes || "");
  const [onlyComponents, setOnlyComponents] = useState(params.products_components || "");

  const [presentAccessories, setPresentAccessories] = useState([]);
  const [presentClothes, setPresentClothes] = useState([]);
  const [presentComponents, setPresentComponents] = useState([]);
  const [presentCategories, setPresentCategories] = useState([]);

  const [presentRoadModalities, setPresentRoadModalities] = useState([]);
  const [presentMtbModalities, setPresentMtbModalities] = useState([]);
  const [presentDirtModalities, setPresentDirtModalities] = useState([]);

  const [presentModels, setPresentModels] = useState([]);
  const [modelOptionsToFilter, setModelOptionsToFilter] = useState([]);

  const [presentBrands, setPresentBrands] = useState([]);
  const [brandOptionsToFilter, setBrandOptionsToFilter] = useState([]);

  const [presentProductAttributes, setPresentProductAttributes] = useState([]);
  const [allProductAttributes, setAllProductAttributes] = useState([]);
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

  useEffect(() => {
    fetch(`/get_information_for_new_product`)
     .then((response) => response.json())
     .then((data) => {
      setStates(data.states)
      setCities(data.cities)
     })
  }, []);


  useEffect(async () => {
    let url = "/api/v1/products?";

    if (nameFilter) url = url + `&name=${nameFilter}`
    if (productTypeFilter) url = url + `&product_type_id=${productTypeFilter}`
    if (conditionFilter) url = url + `&condition=${conditionFilter}`
    if (minPriceFilter) url = url + `&min_price=${(minPriceFilter * 100)}`
    if (maxPriceFilter) url = url + `&max_price=${(maxPriceFilter * 100)}`
    if (productAttributesFilter) url = url + `&product_attribute_value=${productAttributesFilter}`
    if (stateFilter) url = url + `&state=${stateFilter}`
    if (cityFilter) url = url + `&city=${cityFilter}`
    if (minYearFilter) url = url + `&min_year=${minYearFilter}`
    if (maxYearFilter) url = url + `&max_year=${maxYearFilter}`
    if (filteredLink) url = url + `&product_type_id=${filteredLink}`
    if (clothesProducts) url = url + `&product_clothes=${clothesProducts}`
    if (productTypeOptionsToFilter) url = url + `&product_types=${productTypeOptionsToFilter}`
    if (categoryOptionsToFilter) url = url + `&categories=${categoryOptionsToFilter}`
    if (modalityOptionsToFilter) url = url + `&modalities=${modalityOptionsToFilter}`
    if (clotheSizeOptionsToFilter) url = url + `&clothe_sizes=${clotheSizeOptionsToFilter}`
    if (onlyAccessories) url = url + `&products_accessories=${onlyAccessories}`
    if (onlyComponents) url = url + `&products_components=${onlyComponents}`
    if (onlyClothes) url = url + `&products_clothes=${onlyClothes}`
    if (componentsAttributesOptionsToFilter) url = url + `&components_attributes_values=${componentsAttributesOptionsToFilter}`
    if (verifiedProductFilter) url = url + `&verified=${verifiedProductFilter}`

    if (modelOptionsToFilter) url = url + `&models=${modelOptionsToFilter}`
    if (brandOptionsToFilter) url = url + `&brands=${brandOptionsToFilter}`

    const response = await axios.get(url);
    if (response.data.products.length === 0) {
      setShow(true)
    }
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
    setProducts(response.data.products);
    setLoading(false)
    if (onlyComponents) {
      document.getElementById("products-components").classList.remove("d-none")
    } else if (onlyAccessories && presentAccessories.lenght > 1) {
      document.getElementById("products-accessories").classList.remove("d-none")
      document.getElementById("btn-accessories").classList.add("selected-tag")


    } else if (onlyClothes) {
      document.getElementById("products-clothes").classList.remove("d-none")

    }

  }, [productTypeFilter, conditionFilter, minPriceFilter, maxPriceFilter, productAttributesFilter, stateFilter, cityFilter,
    minYearFilter, maxYearFilter, filteredLink, nameFilter, clothesProducts, productTypeOptionsToFilter, categoryOptionsToFilter, modalityOptionsToFilter, clotheSizeOptionsToFilter,
    onlyClothes, onlyComponents, onlyAccessories, componentsAttributesOptionsToFilter, verifiedProductFilter, modelOptionsToFilter, brandOptionsToFilter ])


    useEffect(() => {
      fetch(`/get_product_attributes_that_are_present_for_filter`)
       .then((response) => response.json())
       .then((data) => {
        setPresentAccessories(data.products_accessory)
        setPresentComponents(data.products_component)
        setPresentClothes(data.products_clothe)
        setPresentCategories(data.categories)
        setPresentRoadModalities(data.road_modalities)
        setPresentMtbModalities(data.mtb_modalities)
        setPresentDirtModalities(data.dirt_modalities)
        setPresentModels(data.models)
        setPresentBrands(data.brands)
        setPresentProductAttributes(data.product_attributes)
        setAllProductAttributes(data.product_attributes_all)


       })

    }, []);

  const handleProductAtributes = (e) => {
    const currentOptionsToFilter = [...productTypeOptionsToFilter]
    const currentAttributeOptionsToFilter = [...attributeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.innerHTML)) {
      setProductTypeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.innerHTML));
      setAttributeOptionsToFilter(currentAttributeOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.innerHTML)
      currentAttributeOptionsToFilter.push(productTypeAttributes.filter(attribute => attribute.product_type_id === Number(e.target.value)))
      setProductTypeOptionsToFilter(currentOptionsToFilter)
      setAttributeOptionsToFilter(currentAttributeOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

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


  const renderOptionsToFilterAttributes = (attributeOptionsToFilter) => {
    let options = []
    // let options_present = []
    let allOptions = []
    let ObjectOfAttributes = {}
    attributeOptionsToFilter.map((attribute, index) => {
      attribute.map((question, index) => {

        if (question.name === "disc_include") {
          return
        } else if (question.kind === "text" ) {
          return
        } else if (allProductAttributes.find(e => e.product_type_attribute_id === question.id)) {
          allOptions = allProductAttributes.filter(e => e.product_type_attribute_id === question.id).map(a => a.value);
          options = [...new Set(allOptions)]
        } else {
          options = []
        }
        ObjectOfAttributes[question.prompt] = options
      })
    })
    return (<>
      {Object.keys(ObjectOfAttributes).length != 0 && (<>
        <h3 className="filter-link">Mais</h3>
        {Object.keys(ObjectOfAttributes).map((key, index) => {
          return (<>
            {(ObjectOfAttributes[key].length > 0) &&(<>
              <h5 className="text-gray my-2 mb=1">{key}</h5>
              <div className="d-flex flex-wrap justify-content-between gap-1">
                {ObjectOfAttributes[key].map((option, index) => {
                  if (Array.isArray(option) && presentProductAttributes.includes(option[0])) {
                    return (
                      <button type="button" key={index} value={option[0]} className="filter-tag" onClick={(e) => handleMultipleFiltersComponentsAttributes(e)}>{option[1]}</button>
                    )
                  } else if ( presentProductAttributes.includes(option)) {
                    return (
                      <button type="button" key={index} value={option} className="filter-tag" onClick={(e) => handleMultipleFiltersComponentsAttributes(e)}>{translateWord(option)? translateWord(option) : option}</button>
                    )
                  }
                })}
              </div>
            </>)}
          </>)

        })}
      </>)}
    </>)
  }

  const handleMultipleFiltersComponentsAttributes = (e) => {
    const currentOptionsToFilter = [...componentsAttributesOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setComponentsAttributesOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setComponentsAttributesOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const hendleAccessoriesFilters = (e) => {
    e.target.classList.toggle("active")
    if (e.target.classList.contains("active")) {
      document.getElementById("products-accessories").classList.remove("d-none")
      e.target.classList.add("selected-tag")
      setOnlyAccessories("products_accessories")
    } else {
      document.getElementById("products-accessories").classList.add("d-none")
      e.target.classList.remove("selected-tag")
      setOnlyAccessories("")
    }
  }

  const hendleComponentsFilters = (e) => {
    e.target.classList.toggle("active")
    if (e.target.classList.contains("active")) {
      document.getElementById("products-components").classList.remove("d-none")
      e.target.classList.add("selected-tag")
      setOnlyComponents("products_components")
    } else {
      document.getElementById("products-components").classList.add("d-none")
      e.target.classList.remove("selected-tag")
      setOnlyComponents("")
    }
  }

  const hendleClothesFilters = (e) => {
    e.target.classList.toggle("active")
    if (e.target.classList.contains("active")) {
      document.getElementById("products-clothes").classList.remove("d-none")
      document.getElementById("clothes-sizes-filter").classList.remove("d-none")
      e.target.classList.add("selected-tag")
      setOnlyClothes("products_clothes")
    } else {
      document.getElementById("products-clothes").classList.add("d-none")
      document.getElementById("clothes-sizes-filter").classList.add("d-none")
      e.target.classList.remove("selected-tag")
      setOnlyClothes("")
    }
  }

  const handleMultipleFiltersClotheSizes = (e) => {
    const currentOptionsToFilter = [...clotheSizeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.innerHTML)) {
      setClotheSizeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.innerHTML));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.innerHTML)
      setClotheSizeOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
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

  const handleVerifiedFilter = (e) => {
    console.log(e.target)
    if (verifiedProductFilter === "true" ) {
      setVerifiedProductFilter("");
      document.getElementById("verified-product").classList.remove("text-success")

    } else {
      setVerifiedProductFilter(e.target.value);
      document.getElementById("verified-product").classList.add("text-success")
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

  const handleMultipleFiltersBrand = (e) => {
    const currentOptionsToFilter = [...brandOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.value)) {
      setBrandOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.value));
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.value)
      setBrandOptionsToFilter(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
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

  const handleLocality = (e) => {
    setStateFilter(e.target.value)
    let stateId = states.find(state => state.name === e.target.value).id
    setMapedCitiesForState(cities.filter(element => element.state_id === stateId))
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
      "front_and_rear": "Dianteira e Traseira",
      "front": "Dianteira",
      "rear": "Traseira",


    };
    return languageMap[word]
  }


  const handleToggleFilerMobile = (e) => {
    document.getElementById("filters").classList.toggle("d-none")
    e.target.classList.toggle("selected-filter")
  }

  return (
    <div className="p-5 br-8 index-container">
      <h2 className={`text-center text-success ${window.screen.width > 768 ? "" : "display-1"}`} style={{ marginLeft: window.screen.width > 768 ? "24vw" : "" }}>Produtos</h2>
      <button type="button" className={`filter-link ms-3 ${ window.screen.width > 768 ? "d-none" : ""}`} onClick={((e) => handleToggleFilerMobile(e))}><i className="fas fa-filter me-1"></i>Filtrar</button>

      <div className="d-flex mt-3 index-content">
        <div id="filters" className={`filters mt-1 ${ window.screen.width < 768 ? "d-none w-100 mb-1" : "w-25"}`}>
          <div className="d-flex justify-content-between">
            <p className="">Filtrar</p>
            <div className="d-flex justify-content-center">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" value="true" id="flexSwitchCheckDefault" onChange={(e) => handleVerifiedFilter(e)}/>
              </div>
              <p id="verified-product" className="" >Certificados</p>
            </div>
          </div>
          <div className="">
            <div className="border-bottom mt-3">
              <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Local")}>
                Local
                <i id="section-arrow" className="fas fa-chevron-down"></i>
              </button>
              {
                openFilters.includes("Local") && (
                  <div id="Local" className="mb-3">
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
                )
              }
            </div>


            <div className="border-bottom mt-3">
              <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Categoria de Produto")}>
                Categoria de Produto
                <i id="section-arrow" className="fas fa-chevron-down"></i>
              </button>
              {
                openFilters.includes("Categoria de Produto") && (
                  <div id="Categoria de Produto" className=" mb-3">
                    <div className="d-flex flex-wrap justify-content-between gap-1 mb-3">
                      {presentAccessories.length > 0 && (
                        <button id="btn-accessories" type="button" value="" className="filter-tag" onClick={(e) => hendleAccessoriesFilters(e)}>Acessórios</button>
                      )}
                      {presentComponents.length > 0 && (
                        <button id="btn-components" type="button" value="" className="filter-tag" onClick={(e) => hendleComponentsFilters(e)}>Componentes</button>
                      )}
                      {presentClothes.length > 0 && (
                        <button id="btn-clothes" type="button" value="" className="filter-tag" onClick={(e) => hendleClothesFilters(e)}>Vestuário</button>
                      )}
                    </div>
                    <hr className="index-line"/>
                    <div className="d-flex flex-wrap justify-content-between gap-1 mb-3">
                      <div id="products-accessories" className="d-flex flex-wrap justify-content-between gap-1 d-none">
                        {presentAccessories.map((presentAccessory, index) => {
                          return (<button type="button" key={index} value={presentAccessory.id} className="filter-tag" onClick={(e) => handleProductAtributes(e)}>{presentAccessory.prompt}</button>
                          )
                        })}
                      </div>
                      <div id="products-components" className="d-flex flex-wrap justify-content-between gap-1 d-none">
                        {presentComponents.map((presentComponent, index) => {
                          return (<button type="button" key={index} value={presentComponent.id} className="filter-tag" onClick={(e) => handleProductAtributes(e)}>{presentComponent.prompt}</button>
                          )
                        })}
                      </div>
                      <div id="products-clothes" className="d-flex flex-wrap justify-content-between gap-1 d-none">
                        {presentClothes.map((presentClothe, index) => {
                          return (<button type="button" key={index} value={presentClothe.id} className="filter-tag" onClick={(e) => handleProductAtributes(e)}>{presentClothe.prompt}</button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              }
            </div>

            <div id="clothes-sizes-filter" className="border-bottom mt-3 d-none">
              <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Tamanhos(vestuário)")}>
                Tamanhos(vestuário)
                <i id="section-arrow" className="fas fa-chevron-down"></i>
              </button>
              {
                openFilters.includes("Tamanhos(vestuário)") && (
                  <div id="Tamanhos(vestuário)" className="d-flex flex-wrap justify-content-between gap-2 d-none mb-3">
                    <button type="button" value="mountain_bike" className="filter-tag" onClick={(e) => handleMultipleFiltersClotheSizes(e)}>PP</button>
                    <button type="button" value="dirt_street" className="filter-tag"  onClick={(e) => handleMultipleFiltersClotheSizes(e)}>P</button>
                    <button type="button" value="road" className="filter-tag"  onClick={(e) => handleMultipleFiltersClotheSizes(e)}>M</button>
                    <button type="button" value="infant" className="filter-tag"  onClick={(e) => handleMultipleFiltersClotheSizes(e)}>G</button>
                    <button type="button" value="urban" className="filter-tag"  onClick={(e) => handleMultipleFiltersClotheSizes(e)}>GG</button>
                    <button type="button" value="urban" className="filter-tag"  onClick={(e) => handleMultipleFiltersClotheSizes(e)}>XGG</button>
                  </div>
                )
              }
            </div>

            {presentCategories.length > 0 && (
              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Categoria")}>
                  Categoria
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Categoria") && (
                    <div id="Categoria" className="d-flex flex-wrap justify-content-between gap-2 mb-3">
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

            {(presentMtbModalities.length > 0 || presentRoadModalities.length > 0 || presentDirtModalities.length > 0) && (
              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Modalidade")}>
                  Modalidade
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Modalidade") && (
                    <div id="Modalidade" className="d-flex flex-wrap justify-content-between gap-2 mb-3">
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
              <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Condição")}>
                Condição
                <i id="section-arrow" className="fas fa-chevron-down"></i>
              </button>
              {
                  openFilters.includes("Condição") && (
                    <div id="Condição" className="d-flex justify-content-between gap-2 mb-3">
                      <button type="button" value="new" className="filter-tag" onClick={(e) => handleConditionFilter(e)}>Novo</button>
                      <button type="button" value="used" className="filter-tag" onClick={(e) => handleConditionFilter(e)}>Usado</button>
                    </div>
                  )
                }
            </div>

            {presentBrands.length > 0 && (
              <div className="border-bottom mt-3">
                <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Marca")}>
                  Marca
                  <i id="section-arrow" className="fas fa-chevron-down"></i>
                </button>
                {
                  openFilters.includes("Marca") && (
                    <div id="Marca" className="d-flex flex-wrap justify-content-between gap-2 mb-3">
                      {presentBrands.map((brand, index) => {
                        return (
                          <button type="button" key={index} value={brand} className="filter-tag" onClick={(e) => handleMultipleFiltersBrand(e)}>{brand}</button>
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
                    <div id="Modelo" className="d-flex flex-wrap justify-content-between gap-2 mb-3">
                      {presentModels.map((model, index) => {
                        return (
                          <button type="button" key={index} value={model} className="filter-tag" onClick={(e) => handleMultipleFiltersModel(e)}>{model}</button>
                        )
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
                    <div id="Preço" className="d-flex justify-content-between gap-1 mb-3">
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
                    <div id="Ano" className="d-flex justify-content-between gap-1 mb-3">
                      <input type="number" className="text-input" placeholder="DE" onChange={(e) => setMinYearFilter(e.target.value)}/>
                      <input type="number" className="text-input" placeholder="ATÉ" onChange={(e) => setMaxYearFilter(e.target.value)}/>
                    </div>
                  )
                }
            </div>

            <div className="border-bottom mt-3">
              <button type="button" value="mtb-modalities" className="filter-link w-100 mb-3 d-flex justify-content-between" onClick={() => handleFilterSection("Nome")}>
                Nome
                <i id="section-arrow" className="fas fa-chevron-down"></i>
              </button>
              {
                openFilters.includes("Nome") && (
                  <div id="Nome" className="mb-3">
                    <input type="text" className="text-input" onChange={(e) => setNameFilter(e.target.value)}/>
                  </div>
                )
              }
            </div>

            {attributeOptionsToFilter && (<>
              <div className="mt-3">
                <div id="Atributos" className="mb-3  border-botom">
                  {renderOptionsToFilterAttributes(attributeOptionsToFilter)}
                </div>
              </div>
            </>)}
          </div>
        </div>
        <div className={`${window.screen.width < 768? 'w-100' : 'w-75'} d-flex flex-wrap nuflow-parent`}>
          {
            loading && <section className="nuflow-loader" style={{marginLeft: window.screen.width > 768 ? "12vw" : ""}}></section>
          }
          {(products.length === 0 && show) && (
            <h3 className="mx-auto text-gray no-item-text">Ops! Não encontramos um produto para sua busca. Tente com outras categorias e critérios</h3>
          )}
          {products.map((product, idx) => {
            return (
              <div className={`${window.screen.width < 768? 'w-100' : 'w-25'} mb-3`} product={product} key={product.id} id="mobile">
                <a href={`products/${product.id}?product=${product.brand? product.brand.replace(/[-\s]+/g, "-").trim()+"-": ""}${product.model.replace(/[-\s]+/g, "-").trim()}`} className="view-product" id={`view-product-${product.id.toString()}`} target="_blank">
                  <div className="cards-products">
                    {
                      product.verified &&
                      (
                        <div className="verified-icon"></div>
                      )
                    }
                    {product.photos.length > 1 ? (
                      <div id={"carouselExampleControls" + product.id.toString()} className="carousel slide" data-bs-interval="false">
                        <div className="carousel-inner">
                          {product.photos.map((photo, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                              <img src={photo} className="d-block w-100 img-card-index" alt="" />
                            </div>
                          ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleControls" + product.id.toString()} data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={"#carouselExampleControls" + product.id.toString()} data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                    ) : (
                      <div>
                        {product.photos.length === 1 && (
                          <img src={product.photos[0]} className="d-block w-100 img-card-index" alt="" />
                        )}
                        {product.photos.length === 0 && (
                          <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-index" alt="" />
                        )}
                      </div>
                    )}
                    <h4 className="card-title text-center  gap-2 mt-1">{product.brand} {product.model}</h4>
                    <h4 className="text-center mt-1">
                      {(product.price_in_cents / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h4>
                    <hr className="index-line"/>
                    <div className="card-content mt-2">
                      <div className="d-flex justify-content-around mb-2">
                        <div className="infos">
                          <p className="fs-18">{product.product_type.prompt}</p>
                          <p className="mt-2 fs-18">{product.city.name} - {product.state.acronym}</p>
                        </div>
                        <div className="infos">
                          { ["air_bomb", "bottle_cage", "eletronics", "oil_lubricant", "stand", "tools", "car_protectors", "training_roller", "bike_rack", "water_bottle"].includes(product.product_type.name) &&(
                              <><img src={AccessorieImage} alt="" className="icon-card-index ms-1"/><br /></>
                            )}
                          { ["battery", "brake", "brake_levers", "cassete", "chain", "chainring", "crankset", "fender", "frame", "front_derailleur", "front_shifter", "front_suspension", "full_wheel", "grips", "handlebar", "headset", "hub", "pedals", "rim", "saddle", "seat_post", "spoke", "rear_derailleur", "rear_shifter", "rear_suspension", "stem", "tyre", "adapters", "blocking", "bearing", "brake_pad", "central_movement", "chain_guide", "relation_kit_complete_group", "hanger", "power_meter", "sheave", "tube", "front_fork", "brake_disc"].includes(product.product_type.name) &&(
                              <><img src={ComponentImage} alt="" className="icon-card-index ms-1"/><br /></>
                            )}
                          { ["bretelle", "coat", "pants", "shorts", "inner_shorts", "shirt", "vest", "windbreaker", "thermal_clothing", "helmet", "elbow_pad", "knee_pad", "hydration_backpack", "fanny_pack", "sneaker", "socks", "gloves", "cap", "glasses"].includes(product.product_type.name) &&(
                              <><img src={ClotheImage} alt="" className="icon-card-index ms-1"/><br /></>
                            )}
                          <button type="button" onClick={(e) => handleLike(e)} className="like-btn mt-2" id={product.id}><i id={product.id} className="far fa-heart"></i></button>
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
