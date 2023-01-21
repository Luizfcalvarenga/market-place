import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import AccessorieImage from "../../../assets/images/accessories.png";
import ComponentImage from "../../../assets/images/frame.png";
import ClotheImage from "../../../assets/images/tshirt.png";
import IntlCurrencyInput from "react-intl-currency-input"

export function ProductForm(props) {
  const [productId, setProductId] = useState([]);

  const [user, setUser] = useState([]);
  const [services, setServices] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productTypeId, setProductTypeId] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [productCategory, setProductCategory] = useState("");
  const [modalities, setModalities] = useState([]);
  const [productModality, setProductModality] = useState("");
  const [productTypeAttributes, setProductTypeAttributes] = useState([]);
  const [productAttributes, setProductAttributes] = useState({});
  const [productAttributesDisplay, setProductAttributesDisplay] = useState({});
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [otherProductBrand, setOtherProductBrand] = useState("");
  const [productModel, setProductModel] = useState("");
  const [otherProductModel, setOtherProductModel] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(null);
  const [productQuantity, setProductQuantity ] = useState(null);
  const [productCity, setProductCity ] = useState(null);
  const [productState, setProductState ] = useState(null);
  const [productYear, setProductYear ] = useState(null);
  const [productDocumentationType, setProductDocumentationType] = useState("");
  const [productCondition, setProductCondition] = useState("");
  const [otherProductYear, setOtherProductYear ] = useState(null);
  const [productPhotos, setProductPhotos ] = useState(null);
  const [photosPreview, setPhotosPreview] = useState([]);
  const [mapedCitiesForState, setMapedCitiesForState] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [discountCoupon, setDiscountCoupon] = useState("");


  const [photoFile, setPhotoFile] = useState({
    index: null,
  });

  const [errors, setErrors] = useState({
    product: {},
    product_attributes: {},
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
      setProductPrice(value)
    };

    return(
      <IntlCurrencyInput currency="BRL" config={currencyConfig}
          className="text-input" value={productPrice}   onChange={handleChange} />
    );
  }

  useEffect(() => {
    fetch(`/get_information_for_new_product`)
     .then((response) => response.json())
     .then((data) => {
      setAllProducts(data.types_of_product)
      setCategories(data.categories)
      setUser(data.user.id)
      setStates(data.states)
      setCities(data.cities)

     })
    if (props.productId) {
      fetchProduct();
      setProductId(props.productId);
      setModalities(["downhill", "enduro", "gravel", "speed", "trail", "xc_cross_country", "speed_performance", "triathlon", "ciclocross", "cicloviagem", "street_bmx", "race_bmx", "big_wheel_bmx", "dirt_jump"]);
    }
  }, []);


  useEffect(() => {
    if (productCategory && !props.productId) {
      setModalities(categories.find(element => element.name === productCategory).modalities)
      setCategoryId(categories.find(element => element.name === productCategory).id);
    }
  });

  useEffect(() => {
    if (productCategory === "urban") {
      setProductModality(modalities[0])
    } else if (productCategory === "infant") {
      setProductModality(modalities[0])
    }
  });

  useEffect(() => {
    if(productTypeId) {
      fetch(`/get_attributes_for_product?product_type_id=${productTypeId}`)
      .then((response) => response.json())
      .then((data) => {
        setProductTypeAttributes(
          data
        );
        if (!props.productId) {
          setProductAttributes(
            {}
          );
        }
      })
    }
  }, [productTypeId]);



  useEffect(() => {
    if (!productPhotos) {
        setPhotosPreview(undefined)
        return
    }
    const photoFile = []
    const objectUrls = []
    for (let i = 0; i < productPhotos.length; i++) {
      const photoName = productPhotos[i].name
      const file = productPhotos[i];
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
  }, [productPhotos])

  const createProductPhotos = (e) => {
    const photos = Object.values(e.target.files)
    setProductPhotos(photos)
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
      setProductPhotos(removeObjectWithId(productPhotos, photoToRemove))
    } else if (e.nativeEvent.path[2].childNodes[0].src) {
      const newPhotosPreview = photosPreview.filter(element => element !== e.nativeEvent.path[1].childNodes[0].src)
      setPhotosPreview(newPhotosPreview);
      const photoToRemove = photoFile.find(element => element.url === e.nativeEvent.path[1].childNodes[0].src).name
      setProductPhotos(removeObjectWithId(productPhotos, photoToRemove))
    }
  }

  const handleReviewSection = (e) => {
    const section = document.getElementById(e.target.innerText)
    section.classList.toggle("d-none")
  }


  async function fetchProduct() {
    const response = await axios.get(
      `/api/v1/products/${props.productId}/edit`
    );
    alert(JSON.stringify(response.data))
    if (response.data) {
      setProductCategory(response.data.category);
      setUser(response.data.product.user_id);
      setProductTypeId(response.data.product.product_type_id);
      setCategoryId(response.data.product.category_id);
      setProductModality(response.data.product.modality);
      setProductBrand(response.data.product.brand);
      setProductName(response.data.product.name);
      setProductModel(response.data.product.model);
      setProductDescription(response.data.product.description);
      setProductPrice(response.data.product.price_in_cents);
      setProductQuantity(response.data.product.quantity);
      setProductCity(response.data.product.city_id);
      setProductState(response.data.product.state_id);
      setProductYear(response.data.product.year);
      setProductDocumentationType(response.data.product.documentation_type);
      setProductCondition(response.data.product.condition);


      if (response.data.product_attributes) {
        setProductAttributes(
          response.data.product_attributes
        );
      }
    }
  }

  const createProductAttributes = (e, attribute) => {
    const div = document.getElementById(attribute.name);
    const otherAnswer = document.getElementById("other-answer");
    const currentProductAttributes = {...productAttributes} // criar um hash com valor atual do estado (copiar o valor)
    const currentProductAttributesDisplay = {...productAttributesDisplay} // criar um hash com valor atual do estado (copiar o valor)

    if (e.target.value ===  "other") {
      div?.classList.toggle('d-none')
      // parece pegar as outras respostas, conferir novamente se escolher outra coisa antes do other não troca depois!!!!!
    } else {
      currentProductAttributes[attribute.name] = e.target.value
      setProductAttributes(currentProductAttributes)
      currentProductAttributesDisplay[attribute.prompt] = e.target.selectedOptions[0].innerText
      setProductAttributesDisplay(currentProductAttributesDisplay)
    }

    if (attribute.name === "frame_brand") {
      setProductBrand(e.target.value)
    }
    if ((attribute.name === "brake_model" || attribute.name === "model") && e.target.value !== "other") {
      setProductModel(e.target.value)
    }

  }

  const changeAttribute = (e, attribute) => {
    productAttributes[attribute.name] = e.target.value
    setProductAttributes(productAttributes)
    productAttributesDisplay[attribute.prompt] = e.target.value
    setProductAttributesDisplay(productAttributesDisplay)
    if (attribute.name === "brake_model" || attribute.name === "model") {
      setProductModel(e.target.value)
    }
  }

  const renderProductTypeAttributeSelect = (attribute, index) => {
    // VERIFICAR RETORNO DO ESCOLHA DE TIPO DE SUSPENSÃO PARA COMPONENTO QUADROAPARENTEMENTE PRA QUADRO E HARDTAIL NÃO PERGUNTA CURSO DE NENHUMA SUSPANSÃO(CONFERIR)
    let options = []
    if (["mountain_bike", "dirt_street", "urban", "infant"].includes(productCategory) && attribute.name === "frame_size") {
      options = [ "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "S1", "S2", "S3", "S4", "S5", "S6", "XXS", "XS", "S", "M", "L", "XL", "XXL", "other" ]
    } else if (productCategory === "road" && attribute.name === "frame_size") {
      options = ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL", "other" ]
    } else if (attribute.name === "suspension_type" && ["road"].includes(productCategory)) {
      return
     } else if (attribute.name === "rear_suspension_travel" && ["road"].includes(productCategory)) {
      return
     } else if (attribute.name === "shock_size" && ["road"].includes(productCategory)) {
      return
     } else if (attribute.name === "rear_suspension_travel" && ["no_suspension", "hardtail", ""].includes(productAttributes["suspension_type"])) {
      return
    } else if (attribute.name === "shock_size" && ["no_suspension", "hardtail", ""].includes(productAttributes["suspension_type"])) {
      return
    } else if (attribute.name === "disc_size" && ["v_brake", "coaster_brake", "caliper", ""].includes(productAttributes["brake_type"])) {
      return
    } else if (attribute.name === "seat_post_travel" && ["rigid", ""].includes(productAttributes["brake_type"])) {
      return
    } else if (attribute.name === "handlebar_size" && ["road", "dirt_street", "urban", "infant", ""].includes(productCategory)) {
      return
    } else if (attribute.name === "documentation_type") {
      return
    } else if (attribute.name === "condition") {
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
    } else if (attribute.name === "seat_post_type") {
      options = [ ["retractable", "Retrátil"], ["rigid", "Rigido" ]]
    } else {
      options = attribute.options
    }

    return (
      <div attribute={attribute} key={attribute.id} className="">
        <div id="">
          <label htmlFor="product attribute" className="mt-4" key={index}>{attribute.prompt}<span className="requested-information ms-1">*</span></label><br />
          <select
          className="select-answer"
          onChange={(e) => createProductAttributes(e, attribute)}
          >
            <option value=""></option>
            {options?.map((option, index) => {
              if (Array.isArray(option)) {
                return (
                  <option key={index} value={option[0]}>{option[1]}</option>
                )
              } else if (option === "other") {
                return (
                  <option key={index}  value={option}>{translateWord(option)}</option>
                )
              }
              else {
                return (
                  <option key={index} value={option}>{option}</option>
                )
              }
            })}
          </select>

          <div id={attribute.name} className="d-none">
            <label htmlFor="productbrand" className="mt-3">Qual:</label>
            <input type="text" className="text-input" onChange={(e) => changeAttribute(e, attribute)}/>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.target.classList.add("d-none")
    const spinner = document.getElementById("spinner")
    spinner.classList.remove("d-none")

    const dataObject = new FormData();
    dataObject.append( "product[user_id]", user );
    dataObject.append( "product[category_id]", categoryId );
    dataObject.append( "product[modality]", productModality );
    dataObject.append( "product[product_type_id]", productTypeId );
    dataObject.append( "product[name]", productName );
    dataObject.append( "product[description]", productDescription );
    dataObject.append( "product[price_in_cents]", (productPrice * 100) );
    dataObject.append( "product[quantity]", productQuantity );
    dataObject.append( "product[city_id]", productCity );
    dataObject.append( "product[state_id]", productState );
    dataObject.append( "product[documentation_type]", productDocumentationType );
    dataObject.append( "product[condition]", productCondition );

    if (productModel === "Outro") {
      dataObject.append( "product[model]", otherProductModel );
    } else {
      dataObject.append( "product[model]", productModel );
    }

    if (productBrand === "Outra") {
      dataObject.append( "product[brand]", otherProductBrand );
    } else {
      dataObject.append( "product[brand]", productBrand );
    }

    if (productYear === "other") {
      dataObject.append( "product[year]", otherProductYear );
    } else {
      dataObject.append( "product[year]", productYear );
    }

    if (productPhotos) {
      productPhotos.map((photo) => {
        dataObject.append( "product[photos][]", photo );
      })
    }
    for (const [key, value] of Object.entries(productAttributes)) {
      console.log(`${key}: ${value}`);
      dataObject.append( `product[productAttributes][${key}]`, value );
    }

    if (discountCoupon) {
      dataObject.append( "advertisement[discount_coupon]", discountCoupon );

    }

    const url = props.productId
    ? `/api/v1/products/${props.productId}`
    : "/api/v1/products";
    const method = props.productId ? 'patch' : 'post';

    const response = await axios[method](url, dataObject);
    if (response.data.success) {
      window.location = response.data.redirect_url;
      swal("OHH YEAHH", "Anúncio criado com sucesso!!!", "success");
    } else {
      setErrors(response.data.errors);
      swal("OPS, Algo deu errado!", "Revise suas informaçoes", "error");
      e.target.classList.remove("d-none")
      document.getElementById("spinner").classList.add("d-none")
    }
  }

  const handleProductType = (e) => {
    console.log(e)
    if (e.target.localName === "img") {
      let filter = e.target.alt;
      console.log(filter)
      if (filter === "acessories") {
        setProductTypes(allProducts.filter(element => element.id >= 40 && element.id <= 47));
      } else if (filter === "components") {
        setProductTypes(allProducts.filter(element => element.id >= 1 && element.id <= 39));
      }  else if (filter === "clothes") {
        setProductTypes(allProducts.filter(element => element.id >= 48 && element.id <= 66));
      }

    } else {
      let filter = e.target.id;
      console.log(filter)
      if (filter === "acessories") {
        setProductTypes(allProducts.filter(element => element.id >= 40 && element.id <= 47));
      } else if (filter === "components") {
        setProductTypes(allProducts.filter(element => element.id >= 1 && element.id <= 46));
      }  else if (filter === "clothes") {
        setProductTypes(allProducts.filter(element => element.id >= 48 && element.id <= 66));
      }

    }
    const firstSection = document.getElementById("first-section")
    const secondSection = document.getElementById("second-section")
    firstSection.classList.add("d-none")
    secondSection.classList.remove("d-none")
    handleFirstStep()
  }

  const handleLocality = (e) => {
    console.log(e)
    console.log(e.target.value)
    setProductState(e.target.value)
    setMapedCitiesForState(cities.filter(element => element.state_id === Number(e.target.value)))
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

      progressOne.classList.remove("section-done")
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

  const handleBackToFirst = (e) => {
    const progressOne = document.getElementById("progress-1")
    const progressTwo = document.getElementById("progress-2")
    const secondSection = document.getElementById("second-section")
    const firstSection = document.getElementById("first-section")
    progressOne.classList.remove("section-done")
    progressTwo.classList.remove("section-done")
    secondSection.classList.add("d-none")
    firstSection.classList.remove("d-none")
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

  const handleFirstStep = () => {
    const progressOne = document.querySelector(".progress-1")
    if (productTypes) {
      progressOne.classList.add("section-done")
    }
  }

  const handleSecondStep = (e) => {
    const progressTwo = document.getElementById("progress-2")
    const progressThird = document.getElementById("progress-3")

    const secondSection = document.getElementById("second-section")
    const thirdSection = document.getElementById("third-section")
    const fourthSection = document.getElementById("fourth-section")


    if (productTypeAttributes.length === 0) {
      progressTwo.classList.add("section-done")
      progressThird.classList.add("section-done")

      secondSection.classList.add("d-none")
      fourthSection.classList.remove("d-none")
    } else {

      progressTwo.classList.add("section-done")
      secondSection.classList.add("d-none")
      thirdSection.classList.remove("d-none")
    }
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

  const handleTerms = (e) => {
    console.log(e.target)
    const btnAnnounce = document.getElementById("new-announce")
    btnAnnounce.classList.toggle("disable-btn-form")
  }

  const translateWord = (word) => {
    const languageMap = {
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

      "retractle" : "Retrátil",
      "rigid" : "Rigido",

      "new": "Novo",
      "used": "Usado",

      "receipt": "Nota Fiscal",
      "import_document": "Documento de Importação",
      "foreign_tax_coupon": "Cupom Fiscal Estrangeiro",
      "no_documentation": "Sem Documento",
      "foreign_tax_coupon_and_import_document": "Cupom Fiscal Estrangeiro + Documento de Importação"
    };

    return languageMap[word]
  }


  //////////////////////////////////////////////////////////////////////////////////
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
  ].sort()


  const componentBrands = ["100%",
    "Absolute",
    "Abus",
    "Algoo",
    "Alligator",
    "Altmayer",
    "Arbok",
    "ASW Racing",
    "Atrio",
    "Avva Extreme",
    "Barbedo",
    "Bell",
    "Birzman",
    "Blackburn",
    "Bontrager",
    "Caloi",
    "Camelbak",
    "Catrelli",
    "Catlike",
    "Ceramicspeed",
    "Continental",
    "Cannondale",
    "CrankBrothers",
    "Curtlo",
    "Elite",
    "Dt Swiss",
    "DSI Tyres",
    "Dvorak",
    "DMT",
    "ERT Ctcle Sport",
    "Evoc",
    "Finish line",
    "Fi'zi:k",
    "Free Force",
    "FDS",
    "Fulcrim",
    "Furbo",
    "Gios BR",
    "Giro",
    "Giyo",
    "GT Bicycles",
    "Garmin",
    "Fox",
    "Flr",
    "Gantech Gancheiras",
    "GU",
    "GTA",
    "HB",
    "Ictus",
    "Kenda",
    "High One",
    "Hupi",
    "Kask",
    "KMC",
    "Leatt",
    "Look",
    "Maxxis",
    "Mavic",
    "Marciomay",
    "Michelin",
    "Nomad",
    "Oggi",
    "Muc-Off",
    "Morgan Blue",
    "Northwave",
    "Oakley",
    "Most",
    "Polar",
    "Pirelli",
    "Pinarello",
    "Orbea",
    "ParkToolRefactor",
    "Reynolfds",
    "Probiotica",
    "Rock Shox",
    "Promax",
    "Prologo",
    "Scoot Sentec",
    "Shimano",
    "Schwalbe",
    "Saris",
    "Serfas",
    "Sidi",
    "Smoove",
    "Sram Sunrace",
    "Sunshine",
    "Specialized",
    "Stan's Notures",
    "Supacaz",
    "Syncros",
    "Topeak",
    "Token",
    "TSW",
    "Vision",
    "Vittori",
    "Thule",
    "Tacx",
    "Uno",
    "Vzan",
    "Wellgo",
    "Woom",
    "Xplova",
    "Zipp",
    "Zoom Precision Components",
    "Zéfal",
    "Wahoo"].sort()

  const years = ["", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "other" ];
  const productsIdsWithSpecificModels = ["5", "18", "34", "20", "36"]

  const roadBrakeModels = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "Outro"]
  const dirtMtbBrakeModels = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SHIMANO XT", "SHIMANO XTR", "SHIMANO ZEE", "SRAM Code", "SRAM DB", "SRAM G2", "SRAM GUIDE", "SRAM Level", "Outro"]

  const roadFrontDerailleurModels = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "Outro"]
  const dirtMtbFrontDerailleurModels = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO TOURNEY", "SRAM XT", "SRAM XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "Outro"]

  const roadRearDerailleurModels = ["SHIMANO 105", "SHIMANO CLARIS", "SHIMANO DURA-ACE", "SHIMANO SORA", "SHIMANO TIAGRA", "SHIMANO TOURNEY", "SHIMANO ULTEGRA", "SRAM Apex", "SRAM Force", "SRAM GRX", "SRAM RED", "SRAM Rival", "SRAM S-Series", "other"]
  const dirtMtbRearDerailleurModels = ["SHIMANO SLX", "SHIMANO ACERA", "SHIMANO ALIVIO", "SHIMANO ALTUS", "SHIMANO DEORE", "SHIMANO SAINT", "SHIMANO TOURNEY", "SRAM XT", "SRAM XTR", "SRAM EX1", "SRAM GX", "SRAM NX", "SRAM SX", "SRAM X01", "SRAM XX1", "other"]


  const dirtMtbFrontSuspensionModels = ["FOX 32", "FOX 34", "FOX 36", "FOX 38", "FOX 40", "FOX 30", "FOX 35", "ROCKSHOX BLUTO", "ROCKSHOX BOXXER", "ROCKSHOX DOMAIN", "ROCKSHOX JUDY", "ROCKSHOX LYRIK", "ROCKSHOX PARAGON", "ROCKSHOX PIKE", "ROCKSHOX REBA ", "ROCKSHOX RECON", "ROCKSHOX REVELATION", "ROCKSHOX RUDY", "ROCKSHOX SEKTOR", "ROCKSHOX SID", "ROCKSHOX YARI", "ROCKSHOX ZEB", "Outro"]
  const dirtMtbRearSuspensionModels = ["FOX DHX", "FOX DHX2 ", "FOX FLOAT DPS", "FOX FLOAT DPX2", "FOX FLOAT X", "FOX FLOAT X2", "ROCKSHOX DELUXE", "ROCKSHOX MONARCH", "ROCKSHOX SIDLUXE", "ROCKSHOX SUPER DELUXE", "ROCKSHOX VIVID", "Outro"]

  return (
    <div className="w-60 new-product-react py-5">
      <h1 className="text-success  text-center">Vamos lá...</h1>
      <ul className="list-group list-group-horizontal-sm progress-bar pb-3">
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

      <div id="first-section">
        <h4 className="text-gray  text-center mt-4">O que deseja anunciar?</h4>
        <div className="d-flex justify-content-between gap-3 btns-components mt-3">
          <button id="acessories" className="btn-announce-type" onClick={(e) => handleProductType(e)}>Acessórios<br/><img src={AccessorieImage} alt="acessories" className="icon-card-form mt-1"/></button>
          <button id="components" className="btn-announce-type" onClick={(e) => handleProductType(e)}>Componentes<br/><img src={ComponentImage} alt="components" className="icon-card-form"/></button>
          <button id="clothes" className="btn-announce-type" onClick={(e) => handleProductType(e)}>Vestuário<br/><img src={ClotheImage} alt="clothes" className="icon-card-form"/></button>
        </div>

      </div>


      <form id="product-form" className="">
        <div id="second-section" className="card-questions d-none mb-5 mt-3">
          <h4 className="text-center text-success">Informações gerais</h4>


          <label htmlFor="category" className="mt-3 text-start">Categoria:<span className="requested-information ms-1">*</span></label>
          <select
          value={productCategory}
          onChange={(e) =>  setProductCategory(e.target.value) }
          className="select-answer"
          >
            <option value=""></option>
            <option value="mountain_bike">Mountain Bike</option>
            <option value="dirt_street">Dirt</option>
            <option value="road">Road</option>
            <option value="infant">Infantil</option>
            <option value="urban">Urbano</option>
          </select>
          { errors && errors.product && errors.product.category && (
            <p className="text-danger">{errors.product.category[0]}</p>
          )}

          {productCategory === "mountain_bike" && (<>
            <label htmlFor="modality" className="mt-4 text-start">Modalidade:<span className="requested-information ms-1">*</span></label>
            <select
              value={productModality}
              onChange={(e) => e.preventDefault && setProductModality(e.target.value)}
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

          {productCategory === "dirt_street" && (<>
            <label htmlFor="modality" className="mt-4 text-start">Modalidade:<span className="requested-information ms-1">*</span></label>
            <select
              value={productModality}
              onChange={(e) => e.preventDefault && setProductModality(e.target.value)}
              className="select-answer"
            >
              <option value=""></option>
              <option value="street_bmx">Street BMX</option>
              <option value="race_bmx">Race BMX</option>
              <option value="big_wheel_bmx">Big Wheel BMX</option>
              <option value="dirt_jump">Dirt Jump</option>
            </select>
          </>)}

          {productCategory === "road" && (<>
            <label htmlFor="modality" className="mt-4 text-start">Modalidade:<span className="requested-information ms-1">*</span></label>
            <select
              value={productModality}
              onChange={(e) => e.preventDefault && setProductModality(e.target.value)}
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


          <label htmlFor="product" className="mt-4">Produto:<span className="requested-information ms-1">*</span></label>
          <select
          value={productTypeId}
          onChange={(e) => setProductTypeId(e.target.value)}
          className="select-answer"
          >
            <option value=""></option>
            {productTypes.sort(function (a, b) {
                if (a.prompt < b.prompt) {
                  return -1;
                }
                if (a.prompt > b.prompt) {
                  return 1;
                }
                return 0;
              }).map((productType) => {
              return (<option key={productType.id} value={productType.id}>{productType.prompt}</option>)
            })}
          </select>
          { errors && errors.product && errors.product.product_type && (
            <p className="text-danger">{errors.product.product_type}</p>
          )}

          <label htmlFor="productModel" className="mt-4">Nome:<span className="requested-information ms-1">*</span></label>
          <input type="text" className="text-input" value={productName ? productName : ""} onChange={(e) => setProductName(e.target.value)}/>
          { errors && errors.product && errors.product.name && (
              <p className="text-danger">{errors.product.name}</p>
          )}

          {(productTypeId === "17") && (<>
            <label htmlFor="productbrand" className="mt-3">Marca:<span className="requested-information ms-1">*</span></label>
            <select
            value={productBrand ? productBrand : ""}
            onChange={(e) => setProductBrand(e.target.value)}
            className="select-answer"
            >
              <option value=""></option>
              {frameBrands.map((frameBrand, index) => {
                return (
                  <option key={index} value={frameBrand}>{frameBrand}</option>
                )
              })}
              <option value="Outra">Outra</option>
            </select>
            { errors && errors.product && errors.product.brand && (
              <p className="text-danger">{errors.product.brand}</p>
            )}

            { productBrand === "Outra"  && (
                <>
                  <label htmlFor="otherProductBrand" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                  <input type="text" className="text-input" onChange={(e) => setOtherProductBrand(e.target.value)}/>
                  { errors && errors.product && errors.product.brand && (
                    <p className="text-danger">{errors.product.brand}</p>
                  )}
                </>
              )}
          </>)}

          {(productTypeId === "5") && (<>
            <label htmlFor="productbrand" className="mt-3">Marca:<span className="requested-information ms-1">*</span></label>
            <select
            value={productBrand ? productBrand : ""}
            onChange={(e) => setProductBrand(e.target.value)}
            className="select-answer"
            >
              <option value=""></option>
              <option value="Hope">Hope</option>
              <option value="Magura">Magura</option>
              <option value="Shimano">Shimano</option>
              <option value="Sram">Sram</option>
              <option value="TRP">TRP</option>
              <option value="Outra">Outra</option>

            </select>
            { errors && errors.product && errors.product.brand && (
              <p className="text-danger">{errors.product.brand}</p>
            )}

            { productBrand === "Outra"  && (
                <>
                  <label htmlFor="otherProductBrand" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                  <input type="text" className="text-input" onChange={(e) => setOtherProductBrand(e.target.value)}/>
                  { errors && errors.product && errors.product.brand && (
                    <p className="text-danger">{errors.product.brand}</p>
                  )}
                </>
              )}
          </>)}

          {(productTypeId === "14" || productTypeId === "18" || productTypeId === "19" || productTypeId === "34" || productTypeId === "35"  ) && (<>
            <label htmlFor="productbrand" className="mt-3">Marca:<span className="requested-information ms-1">*</span></label>
            <select
            value={productBrand ? productBrand : ""}
            onChange={(e) => setProductBrand(e.target.value)}
            className="select-answer"
            >
              <option value=""></option>
              <option value="Microshift">Microshift</option>
              <option value="Shimano">Shimano</option>
              <option value="Sram">Sram</option>
              <option value="Outra">Outra</option>
            </select>
            { errors && errors.product && errors.product.brand && (
              <p className="text-danger">{errors.product.brand}</p>
            )}

            { productBrand === "Outra"  && (
                <>
                  <label htmlFor="otherProductBrand" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                  <input type="text" className="text-input" onChange={(e) => setOtherProductBrand(e.target.value)}/>
                  { errors && errors.product && errors.product.brand && (
                    <p className="text-danger">{errors.product.brand}</p>
                  )}
                </>
              )}
          </>)}

          {(productTypeId === "20" || productTypeId === "36" ) && (<>
            <label htmlFor="productbrand" className="mt-3">Marca:<span className="requested-information ms-1">*</span></label>
            <select
            value={productBrand ? productBrand : ""}
            onChange={(e) => setProductBrand(e.target.value)}
            className="select-answer"
            >
              <option value=""></option>
              <option value="Fox">Fox</option>
              <option value="Manitou">Manitou</option>
              <option value="Marzocchi">Marzocchi</option>
              <option value="Ohlins">Ohlins</option>
              <option value="Rockshock">Rockshock</option>
              <option value="Outra">Outra</option>

            </select>
            { errors && errors.product && errors.product.brand && (
              <p className="text-danger">{errors.product.brand}</p>
            )}

            { productBrand === "Outra"  && (
                <>
                  <label htmlFor="otherProductBrand" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                  <input type="text" className="text-input" onChange={(e) => setOtherProductBrand(e.target.value)}/>
                  { errors && errors.product && errors.product.brand && (
                    <p className="text-danger">{errors.product.brand}</p>
                  )}
                </>
              )}
          </>)}

          {!(productTypeId === "5" || productTypeId === "14" || productTypeId === "18" || productTypeId === "19" || productTypeId === "34" || productTypeId === "35" || productTypeId === "17" || productTypeId === "20" || productTypeId === "36" ) && (<>
            <label htmlFor="productbrand" className="mt-3">Marca:<span className="requested-information ms-1">*</span></label>
            <select
            value={productBrand ? productBrand : ""}
            onChange={(e) => setProductBrand(e.target.value)}
            className="select-answer"
            >
              <option value=""></option>
              {componentBrands.map((componentBrand, index) => {
                return (<>
                  <option key={index} value={componentBrand}>{componentBrand}</option>
                </>)
              })}
              <option value="Outra">Outra</option>
            </select>
            { errors && errors.product && errors.product.brand && (
              <p className="text-danger">{errors.product.brand}</p>
            )}

            { productBrand === "Outra"  && (
                <>
                  <label htmlFor="otherProductBrand" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                  <input type="text" className="text-input" onChange={(e) => setOtherProductBrand(e.target.value)}/>
                  { errors && errors.product && errors.product.brand && (
                    <p className="text-danger">{errors.product.brand}</p>
                  )}
                </>
              )}
          </>)}

          <div className="brake-models">
            {(productTypeId === "5" && productCategory === "road" ) && (<>
              <label htmlFor="productmodel" className="mt-3">Modelo:<span className="requested-information ms-1">*</span></label>
              <select
              value={productModel ? productModel : ""}
              onChange={(e) => setProductModel(e.target.value)}
              className="select-answer"
              >
                <option value=""></option>
                {roadBrakeModels.map((roadBrakeModel, index) => {
                  return (<option key={index} value={roadBrakeModel}>{roadBrakeModel}</option>)
                })}
              </select>
              { errors && errors.product && errors.product.model && (
                <p className="text-danger">{errors.product.model}</p>
              )}
              { productModel === "Outro"  && (
                  <>
                    <label htmlFor="otherProductModel" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                    <input type="text" className="text-input" onChange={(e) => setOtherProductModel(e.target.value)}/>
                    { errors && errors.product && errors.product.model && (
                      <p className="text-danger">{errors.product.model}</p>
                    )}
                  </>
                )}
            </>)}

            {(productTypeId === "5") && (productCategory === "dirt_street" || productCategory === "mountain_bike" || productCategory === "urban" ) && (<>
              <label htmlFor="productmodel" className="mt-3">Modelo:<span className="requested-information ms-1">*</span></label>
              <select
              value={productModel ? productModel : ""}
              onChange={(e) => setProductModel(e.target.value)}
              className="select-answer"
              >
                <option value=""></option>
                {dirtMtbBrakeModels.map((dirtMtbBrakeModel, index) => {
                  return (<option key={index} value={dirtMtbBrakeModel}>{dirtMtbBrakeModel}</option>)
                })}
              </select>
              { errors && errors.product && errors.product.model && (
                <p className="text-danger">{errors.product.model}</p>
              )}
              { productModel === "Outro"  && (
                  <>
                    <label htmlFor="otherProductModel" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                    <input type="text" className="text-input" onChange={(e) => setOtherProductModel(e.target.value)}/>
                    { errors && errors.product && errors.product.model && (
                      <p className="text-danger">{errors.product.model}</p>
                    )}
                  </>
                )}
            </>)}
          </div>

          <div className="front-derailleur-models">
            {(productTypeId === "18" && productCategory === "road" ) && (<>
              <label htmlFor="productmodel" className="mt-3">Modelo:<span className="requested-information ms-1">*</span></label>
              <select
              value={productModel ? productModel : ""}
              onChange={(e) => setProductModel(e.target.value)}
              className="select-answer"
              >
                <option value=""></option>
                {roadFrontDerailleurModels.map((roadFrontDerailleurModel, index) => {
                  return (<option key={index} value={roadFrontDerailleurModel}>{roadFrontDerailleurModel}</option>)
                })}
              </select>
              { errors && errors.product && errors.product.model && (
                <p className="text-danger">{errors.product.model}</p>
              )}
              { productModel === "Outro"  && (
                  <>
                    <label htmlFor="otherProductModel" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                    <input type="text" className="text-input" onChange={(e) => setOtherProductModel(e.target.value)}/>
                    { errors && errors.product && errors.product.model && (
                      <p className="text-danger">{errors.product.model}</p>
                    )}
                  </>
                )}
            </>)}

            {(productTypeId === "18") && (productCategory === "dirt_street" || productCategory === "mountain_bike" || productCategory === "urban" ) && (<>
              <label htmlFor="productmodel" className="mt-3">Modelo:<span className="requested-information ms-1">*</span></label>
              <select
              value={productModel ? productModel : ""}
              onChange={(e) => setProductModel(e.target.value)}
              className="select-answer"
              >
                <option value=""></option>
                {dirtMtbFrontDerailleurModels.map((dirtMtbFrontDerailleurModel, index) => {
                  return (<option key={index} value={dirtMtbFrontDerailleurModel}>{dirtMtbFrontDerailleurModel}</option>)
                })}
              </select>
              { errors && errors.product && errors.product.model && (
                <p className="text-danger">{errors.product.model}</p>
              )}
              { productModel === "Outro"  && (
                  <>
                    <label htmlFor="otherProductModel" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                    <input type="text" className="text-input" onChange={(e) => setOtherProductModel(e.target.value)}/>
                    { errors && errors.product && errors.product.model && (
                      <p className="text-danger">{errors.product.model}</p>
                    )}
                  </>
                )}
            </>)}
          </div>

          <div className="rear-derailleur-models">
            {(productTypeId === "34" && productCategory === "road" ) && (<>
              <label htmlFor="productmodel" className="mt-3">Modelo:<span className="requested-information ms-1">*</span></label>
              <select
              value={productModel ? productModel : ""}
              onChange={(e) => setProductModel(e.target.value)}
              className="select-answer"
              >
                <option value=""></option>
                {roadRearDerailleurModels.map((roadRearDerailleurModel, index) => {
                  return (<option key={index} value={roadRearDerailleurModel}>{roadRearDerailleurModel}</option>)
                })}
              </select>
              { errors && errors.product && errors.product.model && (
                <p className="text-danger">{errors.product.model}</p>
              )}
              { productModel === "Outro"  && (
                  <>
                    <label htmlFor="otherProductModel" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                    <input type="text" className="text-input" onChange={(e) => setOtherProductModel(e.target.value)}/>
                    { errors && errors.product && errors.product.model && (
                      <p className="text-danger">{errors.product.model}</p>
                    )}
                  </>
                )}
            </>)}

            {(productTypeId === "34") && (productCategory === "dirt_street" || productCategory === "mountain_bike" || productCategory === "urban" ) && (<>
              <label htmlFor="productmodel" className="mt-3">Modelo:<span className="requested-information ms-1">*</span></label>
              <select
              value={productModel ? productModel : ""}
              onChange={(e) => setProductModel(e.target.value)}
              className="select-answer"
              >
                <option value=""></option>
                {dirtMtbRearDerailleurModels.map((dirtMtbRearDerailleurModel, index) => {
                  return (<option key={index} value={dirtMtbRearDerailleurModel}>{dirtMtbRearDerailleurModel}</option>)
                })}
              </select>
              { errors && errors.product && errors.product.model && (
                <p className="text-danger">{errors.product.model}</p>
              )}
              { productModel === "Outro"  && (
                  <>
                    <label htmlFor="otherProductModel" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                    <input type="text" className="text-input" onChange={(e) => setOtherProductModel(e.target.value)}/>
                    { errors && errors.product && errors.product.model && (
                      <p className="text-danger">{errors.product.model}</p>
                    )}
                  </>
                )}
            </>)}
          </div>

          <div className="front-suspension-model">
            {(productTypeId === "20") && (productCategory === "dirt_street" || productCategory === "mountain_bike" || productCategory === "urban" ) && (<>
              <label htmlFor="productmodel" className="mt-3">Modelo:<span className="requested-information ms-1">*</span></label>
              <select
              value={productModel ? productModel : ""}
              onChange={(e) => setProductModel(e.target.value)}
              className="select-answer"
              >
                <option value=""></option>
                {dirtMtbFrontSuspensionModels.map((dirtMtbFrontSuspensionModel, index) => {
                  return (<option key={index} value={dirtMtbFrontSuspensionModel}>{dirtMtbFrontSuspensionModel}</option>)
                })}
              </select>
              { errors && errors.product && errors.product.model && (
                <p className="text-danger">{errors.product.model}</p>
              )}
              { productModel === "Outro"  && (
                  <>
                    <label htmlFor="otherProductModel" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                    <input type="text" className="text-input" onChange={(e) => setOtherProductModel(e.target.value)}/>
                    { errors && errors.product && errors.product.model && (
                      <p className="text-danger">{errors.product.model}</p>
                    )}
                  </>
                )}
            </>)}
          </div>

          <div className="rear-suspension-model">
            {(productTypeId === "36") && (productCategory === "dirt_street" || productCategory === "mountain_bike" || productCategory === "urban" ) && (<>
              <label htmlFor="productmodel" className="mt-3">Modelo:<span className="requested-information ms-1">*</span></label>
              <select
              value={productModel ? productModel : ""}
              onChange={(e) => setProductModel(e.target.value)}
              className="select-answer"
              >
                <option value=""></option>
                {dirtMtbRearSuspensionModels.map((dirtMtbRearSuspensionModel, index) => {
                  return (<option key={index} value={dirtMtbRearSuspensionModel}>{dirtMtbRearSuspensionModel}</option>)
                })}
              </select>
              { errors && errors.product && errors.product.model && (
                <p className="text-danger">{errors.product.model}</p>
              )}
              { productModel === "Outro"  && (
                  <>
                    <label htmlFor="otherProductModel" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                    <input type="text" className="text-input" onChange={(e) => setOtherProductModel(e.target.value)}/>
                    { errors && errors.product && errors.product.model && (
                      <p className="text-danger">{errors.product.model}</p>
                    )}
                  </>
                )}
            </>)}
          </div>

          {(productTypeId === "36" || productTypeId === "20" ) && (productCategory === "road" ) && (<>

            <label htmlFor="productModel" className="mt-4">Modelo:<span className="requested-information ms-1">*</span></label>
            <input type="text" className="text-input" value={productModel ? productModel : ""} onChange={(e) => setProductModel(e.target.value)}/>
            { errors && errors.product && errors.product.model && (
              <p className="text-danger">{errors.product.model}</p>
            )}
          </>)}


          {productsIdsWithSpecificModels.includes(productTypeId) && (productCategory === "infant" || productCategory === "" ) && (<>

            <label htmlFor="productModel" className="mt-4">Modelo:<span className="requested-information ms-1">*</span></label>
            <input type="text" className="text-input" value={productModel ? productModel : ""} onChange={(e) => setProductModel(e.target.value)}/>
            { errors && errors.product && errors.product.model && (
              <p className="text-danger">{errors.product.model}</p>
            )}
          </>)}


          {!productsIdsWithSpecificModels.includes(productTypeId) && (<>

            <label htmlFor="productModel" className="mt-4">Modelo:<span className="requested-information ms-1">*</span></label>
            <input type="text" className="text-input" value={productModel ? productModel : ""} onChange={(e) => setProductModel(e.target.value)}/>
            { errors && errors.product && errors.product.model && (
              <p className="text-danger">{errors.product.model}</p>
            )}
          </>)}


          <div className="d-flex justify-content-center">
            <button className="btn-back-step me-3 mt-3" type="button" onClick={(e) => handleBackToFirst(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
            <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleSecondStep(e)}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
          </div>
        </div>

        <div>
          { productTypeAttributes.length > 0 && (
            <div id="third-section" className="card-questions d-none mb-5">
              <h4 className="text-center text-success">Informações técnicas</h4>
              {productTypeAttributes.map((attribute, index) => {
                return renderProductTypeAttributeSelect(attribute, index)
              })}
              <div className="d-flex justify-content-center">
                <button className="btn-back-step me-3 mt-3" type="button" onClick={(e) => handleBackToSecond(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
                <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleThirdStep()}><span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span></button>
              </div>
            </div>
          )}

          { productTypeAttributes.length === 0 && (
            <div id="third-section" className="card-questions d-none mb-5 text-center">
              <h4 className="text-center text-success">Informações técnicas</h4>
              <p className="mt-5">não há nada para esse produto, vamos em frente!!!</p>
              <div className="d-flex justify-content-center">
                <button className="btn-back-step me-3 mt-3" type="button" onClick={(e) => handleBackToSecond(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
                <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleThirdStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
              </div>
            </div>
          )}



          <div id="fourth-section" className="card-questions mb-5 d-none">
            <h4 className="text-center text-success">Informações adicionais</h4>

            <div className="row">
              <div className="col-md-3">
                <label htmlFor="productLocality" className="mt-3">Estado:<span className="requested-information ms-1">*</span></label>
                <select
                  className="select-answer"
                  value={productState}
                  onChange={(e) => handleLocality(e)}
                >
                  <option value=""></option>
                  {states.map((state, index)=> {
                    return (<option key={index} value={state.id}>{state.acronym}</option>);
                  })}
                </select>
              </div>

              <div className="col-md-9">
                <label htmlFor="productLocality" className="mt-3">cidade:<span className="requested-information ms-1">*</span></label>
                {productState && (<>
                  <select
                    className="select-answer"
                    value={productCity}
                    onChange={(e) => setProductCity(e.target.value)}
                  >
                    <option value=""></option>
                    {mapedCitiesForState.map((city, index)=> {
                      return (<option key={index} value={city.id}>{city.name}</option>);
                    })}
                  </select>
                </>)}

                {!productState && (<>
                  <select
                    className="select-answer"
                    value={productCity}
                    onChange={(e) => setProductCity(e.target.value)}
                  >
                    <option value=""></option>
                    {cities.map((city, index)=> {
                      return (<option key={index} value={city.id}>{city.name}</option>);
                    })}
                  </select>
                </>)}
              </div>
            </div>

            <label htmlFor="documentationType" className="mt-4">Documentação:<span className="requested-information ms-1">*</span></label>
            <select
              className="select-answer"
              value={productDocumentationType}
              onChange={(e) => setProductDocumentationType(e.target.value)}
            >
              <option value=""></option>
              <option value="receipt">Nota Fiscal</option>
              <option value="import_document">Documento de Importação</option>
              <option value="foreign_tax_coupon">Cupom Fiscal Estrangeiro</option>
              <option value="foreign_tax_coupon_and_import_document">Cupom Fiscal Estrangeiro + Documento de Importação</option>
              <option value="no_documentation">Sem Documento</option>
            </select>

            <label htmlFor="bikeCondition" className="mt-4">Condição:<span className="requested-information ms-1">*</span></label>
            <select
              className="select-answer"
              value={productCondition}
              onChange={(e) => setProductCondition(e.target.value)}
            >
              <option value=""></option>
              <option value="new">Novo</option>
              <option value="used">Usado</option>
            </select>
            <label htmlFor="Year" className="mt-4">Ano:<span className="requested-information ms-1">*</span></label>
            <select
              className="select-answer"
              value={productYear}
              onChange={(e) => setProductYear(e.target.value)}
            >
              {years.map((year, index)=> {
                return (<option key={index}>{year}</option>);
              })}
            </select>
            { errors && errors.product && errors.product.year && (
              <p className="text-danger">{errors.product.year[0]}</p>
            )}
            { productYear === "other"  && (
              <>
                <label htmlFor="otherProductYear" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
                <input type="text" className="text-input" onChange={(e) => setOtherProductYear(e.target.value)}/>
                { errors && errors.product && errors.product.year && (
                  <p className="text-danger">{errors.product.year}</p>
                )}
              </>
            )}


            <div className="d-flex  justify-content-between gap-3">
              <div className="w-50">
                <label htmlFor="productPrice" className="mt-4 w-100">Preço:<span className="requested-information ms-1">*</span></label> <br />
                {BrlCurrencyComponent()}
                { errors && errors.product && errors.product.price_in_cents && (
                  <p className="text-danger">{errors.product.price_in_cents}</p>
                )}
              </div>

              <div className="w-50">
                <label htmlFor="productQuantity" className="mt-4 w-100">Quantidade:<span className="requested-information ms-1">*</span></label> <br />
                <input type="number" className="text-input" value={productQuantity ? productQuantity : ""} onChange={(e) => setProductQuantity(e.target.value)}/>
                { errors && errors.product && errors.product.quantity && (
                  <p className="text-danger">{errors.product.quantity}</p>
                )}
              </div>
            </div>

            <label htmlFor="productDescription" className="mt-4">Descrição:</label>
            <textarea className="text-input-description"  id="exampleFormControlTextarea1" rows="3" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>

            <div className="d-flex justify-content-center">
              <button className="btn-back-step me-3 mt-3" type="button" onClick={(e) => handleBackToThird(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
              <button className="btn-next-step mt-3" type="button" onClick={(e) => handleFourthStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
            </div>
          </div>
        </div>

        <div id="fifth-section" className="card-questions mb-5 mt-3 d-none">
          <h4 className="text-center text-success">Imagens</h4>
          <input id="photo-upload" type="file" className="text-input file-upload" multiple accept="image/png, image/jpg, image/jpeg" onChange={(e) => createProductPhotos(e)}/>
          <p className="text-center my-3">ESCOLHA AS IMAGENS DO SEU PRODUTO</p>
          <div className="text-center">
            <label htmlFor="photo-upload" className="label-upload my-2"><i className="fas fa-file-upload"></i></label>
          </div>
          {
            photosPreview?.length > 0 ?
            <div  className="d-flex justify-content-center flex-wrap mt-3">
              {
                photosPreview.map((photoPreview, idx) => {
                  return  (<><button className="remove-photo mt-2" type="button" onClick={(e) => removePhoto(e)}>
                      <img src={photoPreview} alt="" className="image-preview-form mt-1" />
                      <div className="middle">
                        <div className="text">Remover</div>
                      </div>
                    </button></>)
                })
              }
            </div> : null
          }
          <div className="d-flex justify-content-center">
            <button className="btn-back-step me-3 mt-3" type="button" onClick={(e) => handleBackToFourth(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
            <button className="btn-next-step mt-3" type="button" onClick={(e) => handleFifthStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
          </div>
        </div>



        <div id="sixth-section" className="card-questions mb-5 mt-3 d-none">
          <h4 className="text-center text-success">Revise as informações</h4>
          <h4 className="text-success mt-3 text-center">Gerais</h4>
          <div id="Gerais" className="">
            <p><span className="text-success">Categoria:</span> {translateWord(productCategory)}</p>
            <p><span className="text-success">Modalidade:</span> {translateWord(productModality)}</p>
            <p><span className="text-success">Quantidade:</span> {productQuantity}</p>
            {productCity && productState (<>
              <p><span className="text-success">Local: </span>{cities.find((element) => element.id === Number(productCity)).name} - {states.find((element) => element.id === Number(productState)).acronym}</p>
            </>)}
            <p><span className="text-success">Documento:</span> {translateWord(productDocumentationType)}</p>
            <p><span className="text-success">Condição:</span> {translateWord(productCondition)}</p>

            <p><span className="text-success">Preço:</span>  {productPrice?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}</p>
            {productYear === "other" && (

              <p><span className="text-success">Ano:</span> {otherProductYear}</p>
            )}
            {productYear !== "other" && (

              <p><span className="text-success">Ano:</span> {productYear}</p>
            )}

            {productBrand === "Outra" && (

              <p><span className="text-success">Marca:</span> {otherProductBrand}</p>
            )}
            {productBrand !== "Outra" && (

              <p><span className="text-success">Marca:</span> {productBrand}</p>
            )}
            <p><span className="text-success">Modelo:</span> {productModel}</p>
            <p><span className="text-success">Descrição:</span> {productDescription}</p>

          </div>


          {Object.keys(productAttributesDisplay).length != 0 && (
            <>
              <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-review-product my-3 w-100 p-2">Atributos</button>
              <div id="Atributos" className="d-none">
                {Object.keys(productAttributesDisplay).map((key, index) => {
                  return (
                    <div key={index}>
                      <p >
                        <span className="text-success me-1">
                          {key}:
                        </span>
                        {productAttributesDisplay[key]}
                      </p>

                    </div>
                  );
                })}
              </div>
            </>
          )}

          <h4 className="text-success mt-3 text-center">Imagens</h4>
          {
            photosPreview?.length > 0 ?
            <div  className="d-flex gap-2 justify-content-center flex-wrap mt-3">
              {
                photosPreview.map((photoPreview, idx) => {
                  return <img src={photoPreview} alt="" className="image-review" />
                })
              }
            </div> : <p className="text-center">Nenhuma imagem adicionada</p>
          }



          {!props.productId && (<>
            {((productPrice * 100) <= 100000) && (<>
              <div className="text-center mt-3 mb-3">
                <h6 className="announce-terms">Seu anúncio não será cobrado</h6>
                {!props.productId && (<>
                  <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3">Anunciar</button>
                  <div id="spinner" className="spinner-border text-success d-none mt-3" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </>)}
              </div>
            </>)}

            { ((productPrice * 100) > 100000) && ((productPrice * 100) <= 500000) && (<>
              <div className="d-flex justify-content-center gap-2">
                <input type="checkbox" onChange={(e) => handleTerms(e)}/>
                <h6 className="announce-terms">Entendo que o anúncio custará R$ 39,00</h6>
              </div>
              <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
              <div className="d-flex mt-3">
                <label htmlFor="discountCoupon" className="w-70 mt-1">Cupom de desconto:</label>
                <input type="text" className="text-input" onChange={(e) => setDiscountCoupon(e.target.value)}/> <br />
                { errors && errors.coupon && (
                  <p className="text-danger">{errors.coupon}</p>
                )}
              </div>
              <div className="text-center mt-3 mb-3">
                {!props.productId && (<>
                  <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3 disable-btn-form">Anunciar</button>
                  <div id="spinner" className="spinner-border text-success d-none mt-3" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </>)}
              </div>
            </>)}

            {((productPrice * 100) > 500000) && ((productPrice * 100) <= 1000000) && (<>
              <div className="d-flex justify-content-center gap-2">
                <input type="checkbox" onChange={(e) => handleTerms(e)}/>
                <h6 className="announce-terms">Entendo que o anúncio custará R$ 59,00</h6>
              </div>
              <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
              <div className="d-flex mt-3">
                <label htmlFor="discountCoupon" className="w-70 mt-1">Cupom de desconto:</label>
                <input type="text" className="text-input" onChange={(e) => setDiscountCoupon(e.target.value)}/> <br />
                { errors && errors.coupon && (
                  <p className="text-danger">{errors.coupon}</p>
                )}
              </div>
              <div className="text-center mt-3 mb-3">
                {!props.productId && (<>
                  <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3 disable-btn-form">Anunciar</button>
                  <div id="spinner" className="spinner-border text-success d-none  mt-3" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </>)}
              </div>
            </>)}

            {((productPrice * 100) > 1000000) && ((productPrice * 100) <= 2000000) &&(<>
              <div className="d-flex justify-content-center gap-2">
                <input type="checkbox" onChange={(e) => handleTerms(e)}/>
                <h6 className="announce-terms">Entendo que o anúncio custará R$ 89,00</h6>
              </div>
              <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
              <div className="d-flex mt-3">
                <label htmlFor="discountCoupon" className="w-70 mt-1">Cupom de desconto:</label>
                <input type="text" className="text-input" onChange={(e) => setDiscountCoupon(e.target.value)}/> <br />
                { errors && errors.coupon && (
                  <p className="text-danger">{errors.coupon}</p>
                )}
              </div>
              <div className="text-center mt-3 mb-3">
                {!props.productId && (<>
                  <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
                  <div id="spinner" className="spinner-border text-success d-none mt-3" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </>)}
              </div>
            </>)}

            {((productPrice * 100) > 2000000) && ((productPrice * 100) <= 3000000) &&(<>
              <div className="d-flex justify-content-center gap-2">
                <input type="checkbox" onChange={(e) => handleTerms(e)}/>
                <h6 className="announce-terms">Entendo que o anúncio custará R$ 129,00</h6>
              </div>
              <div className="d-flex mt-3">
                <label htmlFor="discountCoupon" className="w-70 mt-1">Cupom de desconto:</label>
                <input type="text" className="text-input" onChange={(e) => setDiscountCoupon(e.target.value)}/> <br />
                { errors && errors.coupon && (
                  <p className="text-danger">{errors.coupon}</p>
                )}
              </div>
              <div className="text-center mt-3 mb-3">
                {!props.productId && (<>
                  <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
                  <div id="spinner" className="spinner-border text-success d-none mt-3" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </>)}
              </div>
            </>)}

            {((productPrice * 100) > 3000000) && (<>
              <div className="d-flex justify-content-center gap-2">
                <input type="checkbox" onChange={(e) => handleTerms(e)}/>
                <h6 className="announce-terms">Entendo que o anúncio custará R$ 159,00</h6>
              </div>
              <p className="text-center payment-methods">Pagamento no PIX, boleto ou cartão de crédito.</p>
              <div className="d-flex mt-3">
                <label htmlFor="discountCoupon" className="w-70 mt-1">Cupom de desconto:</label>
                <input type="text" className="text-input" onChange={(e) => setDiscountCoupon(e.target.value)}/> <br />
                { errors && errors.coupon && (
                  <p className="text-danger">{errors.coupon}</p>
                )}
              </div>
              <div className="text-center mt-3 mb-3">
                {!props.productId && (<>
                  <button id="new-announce" onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3  disable-btn-form">Anunciar</button>
                  <div id="spinner" className="spinner-border text-success d-none mt-3" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </>)}
              </div>
            </>)}
          </>)}

          <div className="text-center">
            {props.productId && (<>
              <button onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-3">Editar</button>
              <div id="spinner" className="spinner-border text-success d-none" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </>)}
          </div>

          <div className="text-center">
            <button className="btn-back-step mt-3" type="button" onClick={(e) => handleBackToFifth(e)}> <span className="mb-1">  <i className="fas fa-angle-double-left mt-1"></i> anterior </span> </button>
          </div>
        </div>
      </form>
    </div>
  );
}
