import React, { useEffect, useState } from "react";
import EquipamentImage from "../../../assets/images/helmet.png";
import AccessorieImage from "../../../assets/images/accessories.png";
import ComponentImage from "../../../assets/images/frame.png";
import CasualImage from "../../../assets/images/cap.png";
import ClotheImage from "../../../assets/images/tshirt.png";
import MaintenanceImage from "../../../assets/images/tools.png";
import IntlCurrencyInput from "react-intl-currency-input"




export function Products(props) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const [products, setProducts] = useState([])
  const [productTypes, setProductTypes] = useState([])
  const [productTypeAttributes, setProductTypeAttributes] = useState([])
  const [attributesForProduct, setAttributesForProduct] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  // const [productTypeFilter, setProductTypeFilter] = useState(params.product_type_id || "");
  const [productTypeFilter, setProductTypeFilter] = useState("");

  const [conditionFilter, setConditionFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [modalityFilter, setModalityFilter] = useState("");
  const [productAttributesFilter, setProductAttributesFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [minYearFilter, setMinYearFilter] = useState("");
  const [maxYearFilter, setMaxYearFilter] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [mapedCitiesForState, setMapedCitiesForState] = useState([]);
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [accessories, setAccessories] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [components, setComponents] = useState([]);
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
  const [onlyAccessories, setOnlyAccessories] = useState("");
  const [onlyClothes, setOnlyClothes] = useState("");
  const [onlyComponents, setOnlyComponents] = useState("");



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

  useEffect(() => {
    fetch(`/get_information_for_new_product`)
     .then((response) => response.json())
     .then((data) => {
      setStates(data.states)
      setCities(data.cities)

     })

  }, []);


  useEffect(() => {
    if (productTypes) {
      setAccessories(productTypes.filter(element => element.id >= 40 && element.id <= 47));
      setComponents(productTypes.filter(element => element.id >= 1 && element.id <= 39));
      setClothes(productTypes.filter(element => element.id >= 48 && element.id <= 66));
    }

  }, []);

  useEffect(async () => {
    let url = "/api/v1/products?";
    if (categoryFilter) url = url + `&category=${categoryFilter}`
    if (modalityFilter) url = url + `&modality=${modalityFilter}`
    if (nameFilter) url = url + `&name=${nameFilter}`

    if (productTypeFilter) url = url + `&product_type_id=${productTypeFilter}`
    if (conditionFilter) url = url + `&condition=${conditionFilter}`
    if (minPriceFilter) url = url + `&min_price=${(minPriceFilter * 100)}`
    if (maxPriceFilter) url = url + `&max_price=${(maxPriceFilter * 100)}`

    if (productAttributesFilter) url = url + `&product_attribute_value=${productAttributesFilter}`
    if (brandFilter) url = url + `&brand=${brandFilter}`
    if (modelFilter) url = url + `&model=${modelFilter}`
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



    const response = await axios.get(url);
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
    setAccessories(response.data.product_types.filter(element => element.id >= 40 && element.id <= 47));
    setComponents(response.data.product_types.filter(element => element.id >= 1 && element.id <= 39));
    setClothes(response.data.product_types.filter(element => element.id >= 48 && element.id <= 66));


  }, [categoryFilter, modalityFilter, productTypeFilter, conditionFilter, minPriceFilter, maxPriceFilter, productAttributesFilter, brandFilter, modelFilter, stateFilter, cityFilter,
    minYearFilter, maxYearFilter, filteredLink, nameFilter, clothesProducts, productTypeOptionsToFilter, categoryOptionsToFilter, modalityOptionsToFilter, clotheSizeOptionsToFilter, onlyClothes, onlyComponents, onlyAccessories, componentsAttributesOptionsToFilter])


  const handleProductAtributes = (e) => {
    // e.target.classList.toggle("active")
    // if (e.target.classList.contains("active")) {
    //   setProductTypeFilter(e.target.value)
    //   e.target.classList.add("selected-tag")
    // } else {
    //   setProductTypeFilter("")
    //   e.target.classList.remove("selected-tag")
    // }
    console.log(e.target.value)
    const currentOptionsToFilter = [...productTypeOptionsToFilter]
    const currentAttributeOptionsToFilter = [...attributeOptionsToFilter]

    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.innerHTML)) {
      setProductTypeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.innerHTML));
      setAttributeOptionsToFilter(currentAttributeOptionsToFilter.filter(element => element != e.target.value));
      console.log(currentOptionsToFilter)
      console.log(currentAttributeOptionsToFilter)

      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.innerHTML)
      currentAttributeOptionsToFilter.push(productTypeAttributes.filter(attribute => attribute.product_type_id === Number(e.target.value)))
      setProductTypeOptionsToFilter(currentOptionsToFilter)
      setAttributeOptionsToFilter(currentAttributeOptionsToFilter)
      console.log(currentOptionsToFilter)
      console.log(currentAttributeOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const renderProductAttributeSelect = (attribute, index) => {
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

  const renderOptionsToFilterAttributes = (attributes, index) => {
    console.log(attributes)
    attributes?.map((attribute, index) => {
      let options = []
      if (["mountain_bike", "dirt_street"].includes(categoryFilter) && attribute.name === "frame_size") {
        options = ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "S1", "S2", "S3", "S4", "S5", "S6", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
      } else if (categoryFilter === "road" && attribute.name === "frame_size") {
        options = [ "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL" ]
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
          {options?.map((option, index) => {
            if (Array.isArray(option)) {
              return (
                <button type="button" value={option[0]} className="filter-tag" onClick={(e) => handleMultipleFiltersComponentsAttributes(e)}>{option[1]}</button>
              )
            } else {
              return (
                <button type="button" value={option} className="filter-tag" onClick={(e) => handleMultipleFiltersComponentsAttributes(e)}>{option}</button>
              )
            }

          })}

        </div>
      )

    })
  }

  const hendleAccessoriesFiltes = (e) => {
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

  const hendleComponentsFiltes = (e) => {
    // setAccessoriesProducts(Array.from({length: 39}, (_, i) => i + 1))
    console.log(e)
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

  const hendleClothesFiltes = (e) => {
    console.log(e)
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
    console.log(e.target.value)
    const currentOptionsToFilter = [...clotheSizeOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.innerHTML)) {
      setClotheSizeOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.innerHTML));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.innerHTML)
      setClotheSizeOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFiltersComponentsAttributes = (e) => {
    console.log(e.target.value)
    const currentOptionsToFilter = [...componentsAttributesOptionsToFilter]
    const tagFilter = e.target
    if (currentOptionsToFilter.includes(e.target.innerHTML)) {
      setComponentsAttributesOptionsToFilter(currentOptionsToFilter.filter(element => element != e.target.innerHTML));
      console.log(currentOptionsToFilter)
      tagFilter.classList.remove("selected-tag")
    } else {
      currentOptionsToFilter.push(e.target.innerHTML)
      setComponentsAttributesOptionsToFilter(currentOptionsToFilter)
      console.log(currentOptionsToFilter)
      tagFilter.classList.add("selected-tag")
    }
  }

  const handleMultipleFilters = (e) => {
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
    console.log(e)
    console.log(e.target.id)
    const dataObject = new FormData();
    dataObject.append( "like[likeble_id]", e.target.id );
    dataObject.append( "like[likeble_type]", "Product" );
    console.log(e.target.id)
    axios.post('/likes', dataObject)

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

  const handleLocality = (e) => {
    console.log(e)
    console.log(e.target.value)
    setStateFilter(e.target.value)
    let stateId = states.find(state => state.name === e.target.value).id
    console.log(stateId)
    setMapedCitiesForState(cities.filter(element => element.state_id === stateId))
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
          <p className="">Filtrar</p>
          <div className="">
          <div className="condition-filter">
              <h6 className=" mt-3">condição</h6>
              <div className="d-flex justify-content-between">
                <button type="button" value="new" className="filter-tag" onClick={(e) => handleConditionFilter(e)}>Novo</button>
                <button type="button" value="used" className="filter-tag" onClick={(e) => handleConditionFilter(e)}>Usado</button>
              </div>
            </div>
            {/* <div className="condition-filter">
              <h5 className="mt-3">condição</h5>
              <div className="d-flex justify-content-between">
                <label htmlFor="new" className="me-2">
                  <input
                    type="checkbox"
                    value="new"
                    name="condition"
                    onChange={(e) => handleConditionFilter(e)}
                  />  Novo
                </label>

                <label htmlFor="used" className=" me-2">
                  <input
                    type="checkbox"
                    value="used"
                    name="condition"
                    onChange={(e) => handleConditionFilter(e)}
                  />  Usado
                </label>
              </div>
            </div> */}
            <h6 className=" mt-3">Produtos</h6>
            <div className="d-flex justify-content-between">
              <button type="button" value="" className="filter-tag" onClick={(e) => hendleAccessoriesFiltes(e)}>Acessórios</button>
              <button type="button" value="" className="filter-tag" onClick={(e) => hendleComponentsFiltes(e)}>Componentes</button>
              <button type="button" value="" className="filter-tag" onClick={(e) => hendleClothesFiltes(e)}>Vestuário</button>
            </div>

            <div id="products-accessories" className="d-flex flex-wrap justify-content-between gap-1 mt-3 d-none">
              {accessories.map((accessory, index) => {
                return (<button type="button" key={index} value={accessory.id} className="filter-tag" onClick={(e) => handleProductAtributes(e)}>{accessory.prompt}</button>
                )
              })}
            </div>

            <div id="products-components" className="d-flex flex-wrap justify-content-between gap-1 mt-3 d-none">
              {components.map((component, index) => {
                return (<button type="button" key={index} value={component.id} className="filter-tag" onClick={(e) => handleProductAtributes(e)}>{component.prompt}</button>
                )
              })}
            </div>

            <div id="products-clothes" className="d-flex flex-wrap justify-content-between mt-3 gap-1 d-none">
              {clothes.map((clothe, index) => {
                return (<button type="button" key={index} value={clothe.id} className="filter-tag" onClick={(e) => handleProductAtributes(e)}>{clothe.prompt}</button>
                )
              })}
            </div>



            {/* <h5 className=" mt-3">Produto</h5>
            <select
              value={productTypeFilter}
              onChange={(e) => handleProductAtributes(e)}
              className="select-answer"
            >
              <option value=""></option>
              {productTypes.map((productType, index) => {
                return (<option key={index} value={productType.id}>{productType.prompt}</option>)
              })}
            </select> */}


            <h6 className=" mt-3">categoria</h6>
            <div className="multiple-filters d-flex gap-3 flex-wrap justify-content-center">
              <button type="button" value="mountain_bike" className="filter-tag" onClick={(e) => handleMultipleFilters(e)}>Mountain Bike</button>
              <button type="button" value="dirt_street" className="filter-tag"  onClick={(e) => handleMultipleFilters(e)}>Dirt</button>
              <button type="button" value="road" className="filter-tag"  onClick={(e) => handleMultipleFilters(e)}>Road</button>
              <button type="button" value="infant" className="filter-tag"  onClick={(e) => handleMultipleFilters(e)}>Infantil</button>
              <button type="button" value="urban" className="filter-tag"  onClick={(e) => handleMultipleFilters(e)}>Urbana</button>
            </div>
            {/* <h5 className=" mt-3">categoria</h5>
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
            </select> */}

            {categoryOptionsToFilter.includes("mountain_bike") && (<>
              {/* <h5 className="mt-3">Modalidade</h5>
               */}
              <button type="button" value="mtb-modalities" className="filter-tag" onClick={(e) => handleModalityFilter(e)}>Modalidade</button>

               <div id="mtb-modalities" className="d-flex flex-wrap justify-content-between mt-3 d-none">
                <button type="button" value="downhill" className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>Downhill</button>
                <button type="button" value="enduro" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Enduro</button>
                <button type="button" value="gravel" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Gravel</button>
                <button type="button" value="speed" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Speed</button>
                <button type="button" value="trail" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Trail</button>
                <button type="button" value="xc_cross_country" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>XC Cross Country</button>
               </div>

              {/* <select
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
              </select> */}
            </>)}

            {categoryOptionsToFilter.includes("dirt_street") && (<>
              {/* <h5 className="mt-3">Modalidade</h5> */}
              <button type="button" value="dirt-modalities" className="filter-tag" onClick={(e) => handleModalityFilter(e)}>Modalidade</button>

              <div id="dirt-modalities" className="d-flex flex-wrap justify-content-between mt-3 d-none">
                <button type="button" value="street_bmx" className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>Street BMX</button>
                <button type="button" value="race_bmx" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Race BMX</button>
                <button type="button" value="big_wheel_bmx" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Big Wheel BMX</button>
                <button type="button" value="dirt_jump" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Dirt Jump</button>
              </div>


              {/* <select
                value={modalityFilter}
                onChange={(e) => setModalityFilter(e.target.value)}
                className="select-answer"

              >
                <option value=""></option>
                <option value="street_bmx">Street BMX</option>
                <option value="race_bmx">Race BMX</option>
                <option value="big_wheel_bmx">Big Wheel BMX</option>
                <option value="dirt_jump">Dirt Jump</option>
              </select> */}
            </>)}

            {categoryOptionsToFilter.includes("road") &&(<>
              {/* <h5 className="mt-3">Modalidade</h5> */}
              <button type="button" value="road-modalities" className="filter-tag" onClick={(e) => handleModalityFilter(e)}>Modalidade</button>

              <div id="road-modalities" className="d-flex flex-wrap justify-content-between mt-3 d-none">
                <button type="button" value="speed_performance" className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>Speed Performance</button>
                <button type="button" value="triathlon" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Triathon</button>
                <button type="button" value="ciclocross" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Ciclocross</button>
                <button type="button" value="cicloviagem" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Cicloviagem</button>
                <button type="button" value="gravel" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Gravel</button>
              </div>


              {/* <select
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
              </select> */}
            </>)}

            {(categoryOptionsToFilter.length <= 0 || categoryOptionsToFilter.includes("urban", "infant")) && (<>
              {/* <h5 className=" mt-3">Modalidade</h5> */}
              <button type="button" value="all-modalities" className="filter-tag" onClick={(e) => handleModalityFilter(e)}>Modalidade</button>

              <div id="all-modalities" className="d-flex flex-wrap justify-content-between mt-3 d-none">

                <button type="button" value="downhill" className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>Downhill</button>
                <button type="button" value="enduro" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Enduro</button>
                <button type="button" value="gravel" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Gravel</button>
                <button type="button" value="speed" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Speed</button>
                <button type="button" value="trail" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Trail</button>
                <button type="button" value="xc_cross_country" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>XC Cross Country</button>
                <button type="button" value="street_bmx" className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>Street BMX</button>
                <button type="button" value="race_bmx" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Race BMX</button>
                <button type="button" value="big_wheel_bmx" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Big Wheel BMX</button>
                <button type="button" value="dirt_jump" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Dirt Jump</button>
                <button type="button" value="speed_performance" className="filter-tag" onClick={(e) => handleMultipleFiltersModality(e)}>Speed Performance</button>
                <button type="button" value="triathlon" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Triathlon</button>
                <button type="button" value="ciclocross" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Ciclocross</button>
                <button type="button" value="cicloviagem" className="filter-tag"  onClick={(e) => handleMultipleFiltersModality(e)}>Cicloviagme</button>
              </div>




              {/* <select
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
              </select> */}
            </>)}

            <div id="clothes-sizes-filter" className="d-none">
              <h6 className=" mt-3">tamanhos</h6>
              <div className="multiple-filters d-flex gap-3 flex-wrap justify-content-center">
                <button type="button" value="mountain_bike" className="filter-tag" onClick={(e) => handleMultipleFiltersClotheSizes(e)}>PP</button>
                <button type="button" value="dirt_street" className="filter-tag"  onClick={(e) => handleMultipleFiltersClotheSizes(e)}>P</button>
                <button type="button" value="road" className="filter-tag"  onClick={(e) => handleMultipleFiltersClotheSizes(e)}>M</button>
                <button type="button" value="infant" className="filter-tag"  onClick={(e) => handleMultipleFiltersClotheSizes(e)}>G</button>
                <button type="button" value="urban" className="filter-tag"  onClick={(e) => handleMultipleFiltersClotheSizes(e)}>GG</button>
                <button type="button" value="urban" className="filter-tag"  onClick={(e) => handleMultipleFiltersClotheSizes(e)}>XGG</button>
              </div>
            </div>


            <div className="name-filter">
              <h5 className="mt-3">Nome</h5>
              <input type="text" className="text-input" onChange={(e) => setNameFilter(e.target.value)}/>
            </div>

            <div className="brand-filter">
              <h5 className=" mt-3">Marca</h5>
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
              <h5 className=" mt-3">Modelo</h5>
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
                <h5 className="mt-3">preço</h5>
                <div className="d-flex justify-content-between">
                  {BrlCurrencyComponent()}
                  {/* <input type="number" className="text-input" placeholder="DE"  onChange={(e) => setMinPriceFilter(e.target.value * 100)}/> */}
                  {/* <input type="number" className="text-input" placeholder="ATÉ" onChange={(e) => setMaxPriceFilter(e.target.value * 100)}/> */}
                </div>
              </div>
            </div>

            <div className="year-filter">
            <div className="">
                <h5 className="mt-3">ano</h5>
                <div className="d-flex justify-content-between">
                  <input type="number" className="text-input" placeholder="DE" onChange={(e) => setMinYearFilter(e.target.value)}/>
                  <input type="number" className="text-input" placeholder="ATÉ" onChange={(e) => setMaxYearFilter(e.target.value)}/>
                </div>
              </div>
            </div>


            {attributeOptionsToFilter && (<>
              <h5 className="mt-3">Atributos</h5>
                {attributeOptionsToFilter.map((attributes, index) => {
                  return renderOptionsToFilterAttributes(attributes, index)
                })}
            </>)}

{/*
            {productTypeFilter.length > 1 && (<>
              <h5 className="mt-3">Atributos</h5>
                {attributesForProduct.map((attribute, index) => {
                  return renderProductAttributeSelect(attribute, index)
                })}
            </>)}

            {productTypeFilter.length === 1 && (<>
              <h5 className="mt-3">Atributos</h5>
                {attributesForProduct.map((attribute, index) => {
                  return renderProductAttributeSelect(attribute, index)
                })}
            </>)} */}
          </div>
        </div>
        <div className="col-12 col-md-9 d-flex flex-wrap">
          {products.map((product, idx) => {
            return (
              <div className="w-25  my-2" product={product} key={product.id} id="mobile">
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
                          <p>{product.product_type.prompt}</p>
                          <p className="mt-2">{product.city.name} - {product.state.acronym}</p>
                        </div>
                        <div className="infos">
                          { ["air_bomb", "bottle_cage", "eletronics", "oil_lubricant", "stand", "tools", "car_protector", "training_roller", "bike_rack"].includes(product.product_type.name) &&(
                              <><img src={AccessorieImage} alt="" className="icon-card-index ms-1"/><br /></>
                            )}
                          { ["battery", "brake", "brake_levers", "cassete", "chain", "chainring", "crankset", "fender", "frame", "front_derailleur", "front_shifter", "front_suspension", "full_wheel", "grips", "handlebar", "headset", "hub", "pedals", "rim", "saddle", "seat_post", "spoke", "rear_derailleur", "rear_shifter", "rear_suspension", "stem", "tyre", "adapters", "blocking", "bearing", "brake_pad", "central_movement", "chain_guide", "relation_kit_complete_group", "hanger", "power_meter", "sheave", "tube", "front_fork", "brake_disc"].includes(product.product_type.name) &&(
                              <><img src={ComponentImage} alt="" className="icon-card-index ms-1"/><br /></>
                            )}
                          { ["bretelle", "coat", "pants", "shorts", "inner_shorts", "shirt", "vest", "windbreaker", "thermal_clothing", "helmet", "elbow_pad", "knee_pad", "water_bottle", "hydration_backpack", "fanny_pack", "sneaker"].includes(product.product_type.name) &&(
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
