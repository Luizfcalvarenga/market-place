import React, { useEffect, useState } from "react";

export function ProductForm(props) {
  const [productId, setProductId] = useState([]);
  const [user, setUser] = useState([]);
  const [services, setServices] = useState([]);
  const [productServiceId, setProductServiceId] = useState("");
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
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(null);
  const [productQuantity, setProductQuantity ] = useState(null);
  const [productPhotos, setProductPhotos ] = useState(null);
  const [photosPreview, setPhotosPreview] = useState([]);
  const [photoFile, setPhotoFile] = useState({
    index: null,
  });

  const [errors, setErrors] = useState({
    product: {},
    product_attributes: {},
  });



  useEffect(() => {
    fetch(`/get_information_for_new_product`)
     .then((response) => response.json())
     .then((data) => {
      setAllProducts(data.types_of_product)
      setCategories(data.categories)
      setUser(data.user.id)
      setServices(data.services)
     })
    if (props.productId) {
      fetchProduct();
      setProductId(props.productId)

    }
  }, []);

  useEffect(() => {
    if (productCategory) {
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
    console.log(e.target.innerText)
    const section = document.getElementById(e.target.innerText)
    console.log(section)
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
      setProductDescription(response.data.product.description);
      setProductPrice(response.data.product.price_in_cents);
      setProductQuantity(response.data.product.quantity);
      if (response.data.product_attributes) {
        setProductAttributes(
          response.data.product_attributes
        );
      }
    }
  }

  const createProductAttributes = (e, attribute) => {
    const div = document.getElementById(attribute.name);
    // const otherAnswer = document.getElementById("other-answer");

    const currentProductAttributes = {...productAttributes} // criar um hash com valor atual do estado (copiar o valor)
    if (e.target.value ===  "other") {
      console.log('outro')
      console.log(div)
      div.insertAdjacentHTML('beforeend',
      `<div> <label class="mt-4">Qual?</label><input  id="other-answer" type="text" class="text-input"/></div>`
      )

      document.getElementById("other-answer").on('change', changeAttribute(e, attribute))

    } else {

      currentProductAttributes[attribute.name] = e.target.value
      setProductAttributes(currentProductAttributes)
    }

    // DARUM JEITO DE PEGAR A RESPOSTA CASO SEJA OUTRA
  }

    // <label htmlFor="year" className="mt-4">Qual?<span className="requested-information ms-1">*</span></label>
    // <input type="text" className="text-input" onChange={(e) => setOtherYear(e.target.value)}/>


  const changeAttribute = (e, attribute) => {
    console.log(e)
    console.log(attribute)
    console.log(productAttributes)



    productAttributes[attribute.name] = e.target.value
  }

  const renderProductTypeAttributeSelect = (attribute, index) => {
    // VERIFICAR RETORNO DO ESCOLHA DE TIPO DE SUSPENSÃO PARA COMPONENTO QUADROAPARENTEMENTE PRA QUADRO E HARDTAIL NÃO PERGUNTA CURSO DE NENHUMA SUSPANSÃO(CONFERIR)
    let options = []
    if (["mountain_bike", "dirt_street"].includes(productCategory) && attribute.name === "frame_size") {
      options = [ "", "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL" ]
    } else if (productCategory === "road" && attribute.name === "frame_size") {
      options = [ "", "<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
    } else if (attribute.name === "suspension_type" && ["road"].includes(productCategory)) {
      return
     } else if (attribute.name === "rear_suspension_travel" && ["no_suspension", "hardtail"].includes(productAttributes["suspension_type"])) {
      return
    } else if (attribute.name === "shock_size" && ["no_suspension", "hardtail"].includes(productAttributes["suspension_type"])) {
      return
    } else if (attribute.name === "disc_size" && ["v_brake", "coaster_brake", "caliper"].includes(productAttributes["brake_type"])) {
      return
    } else if (attribute.name === "seat_post_travel" && ["rigid"].includes(productAttributes["brake_type"])) {
      return
    } else if (attribute.name === "handlebar_size" && ["road", "dirt_street", "urban", "infant"].includes(productCategory)) {
      return
    } else {
      options = attribute.options
    }

    return (
      <div attribute={attribute} key={attribute.id} className="">
        <div id={attribute.name}>
          <label htmlFor="product attribute" className="mt-4" key={index}>{attribute.prompt}</label><br />
          <select
          className="select-answer"
          onChange={(e) => createProductAttributes(e, attribute)}
          >
            {options?.map((option, index) => {
              return (<option key={index} value={option}>{option}</option>)
            })}
          </select>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dataObject = new FormData();
    dataObject.append( "product[user_id]", user );
    dataObject.append( "product[category_id]", categoryId );
    dataObject.append( "product[modality]", productModality );
    dataObject.append( "product[product_type_id]", productTypeId );
    dataObject.append( "product[brand]", productBrand );
    dataObject.append( "product[name]", productName );
    dataObject.append( "product[description]", productDescription );
    dataObject.append( "product[price_in_cents]", productPrice );
    dataObject.append( "product[quantity]", productQuantity );
    productPhotos.map((photo) => {
      dataObject.append( "product[photos][]", photo );
    })
    for (const [key, value] of Object.entries(productAttributes)) {
      console.log(`${key}: ${value}`);
      dataObject.append( `product[productAttributes][${key}]`, value );
    }

    const product = {
      user_id: user,
      category_id: categoryId,
      modality: productModality,
      product_type_id: productTypeId,
      brand: productBrand,
      name: productName,
      description: productDescription,
      price_in_cents: productPrice,
      quantity: productQuantity,
      photos: productPhotos,
      productAttributes,
      service: productServiceId

    }

    const url = props.productId
    ? `/api/v1/products/${props.productId}`
    : "/api/v1/products";
    const method = props.productId ? 'patch' : 'post';

    const response = await axios[method](url, dataObject);
    if (response.data.success) {
      window.location = response.data.redirect_url;
    } else {
      setErrors(response.data.errors);
      alert(
        "Erro ao criar a produto: " + JSON.stringify(response.data.errors)
      );
    }
  }

  const handleProductType = (e) => {
    console.log(e.target.innerHTML);
    let filterProducts = e.target.innerHTML;
    if (filterProducts.includes("Acessórios")) {
      setProductTypes(allProducts.filter(product => product.name === "car_accessories" || product.name === "bike_accessories" || product.name === "training_accessories" || product.name === "pre_after_pedal_accessories"));
    } else if (filterProducts.includes("Componentes")) {
      setProductTypes(allProducts.filter(product => product.name === "battery" || product.name === "brake" || product.name === "brake_levers" || product.name === "cassete"
        || product.name === "chain" || product.name === "chainring" || product.name === "crankset" || product.name === "fender"
        || product.name === "frame" || product.name === "front_derailleur" || product.name === "front_shifter" || product.name === "front_suspension"
        || product.name === "full_wheel" || product.name === "grips" || product.name === "handlebar" || product.name === "headset"
        || product.name === "hub" || product.name === "pedals" || product.name === "rim" || product.name === "saddle"
        || product.name === "seat_post" || product.name === "spoke" || product.name === "rear_derailleur" || product.name === "rear_shifter"
        || product.name === "rear_suspension" || product.name === "stem" || product.name === "tyre"
      ));

    } else if (filterProducts.includes("Equipamentos")) {
      setProductTypes(allProducts.filter(product => product.name === "helmet" || product.name === "elbow_pad" || product.name === "knee_pad" || product.name === "water_bottle"
        || product.name === "bottle_cage" || product.name === "hydration_backpack" || product.name === "fanny_pack" || product.name === "sneaker"
      ));
    } else if (filterProducts.includes("Casual")) {
      setProductTypes(allProducts.filter(product => product.name === "cap" || product.name === "shirt" || product.name === "shorts" || product.name === "glasses"
      ));
    } else if (filterProducts.includes("Manutenção")) {
      setProductTypes(allProducts.filter(product => product.name === "air_bomb" || product.name === "lubricant" || product.name === "sealant"
      ));
    }  else if (filterProducts.includes("Vestuário")) {
      setProductTypes(allProducts.filter(product => product.name === "bretelle" || product.name === "shorts" || product.name === "inner_shorts" || product.name === "shirt"
        || product.name === "vest" || product.name === "windbreaker" || product.name === "gloves" || product.name === "socks"
        || product.name === "glasses" || product.name === "thermal_clothing"
      ));
    }

    const firstSection = document.getElementById("first-section")
    const secondSection = document.getElementById("second-section")
    firstSection.classList.add("d-none")
    secondSection.classList.remove("d-none")

    handleFirstStep()
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

  const handleFirstStep = () => {
    const progressOne = document.querySelector(".progress-1")
    if (productTypes) {
      progressOne.classList.add("section-done")
    }
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
        <h4 className="text-success  text-center mt-3">O que deseja anunciar?</h4>
        <div className="d-flex justify-content-between gap-3">
          <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Acessórios <br/><i className="fas fa-charging-station"></i> </button>
          <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Componentes <br/> <i className="fas fa-cog"></i></button>
          <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Equipamentos <br/> <i className="fas fa-hard-hat"></i></button>
        </div>
        <div className="d-flex justify-content-between py-3 gap-3">
          <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Casual <br/> <i className="fas fa-glasses"></i></button>
          <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Manutenção <br/> <i className="fas fa-wrench"></i></button>
          <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Vestuário <br/> <i className="fas fa-tshirt"></i></button>
        </div>
      </div>


      <form id="product-form" className="">

        <div id="second-section" className="card-questions d-none mb-5 mt-3">
          <h4 className="text-center text-success">Informações gerais</h4>

          <label htmlFor="category" className="mt-3">Categoria:</label>
          <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="select-answer"
          >
            {categories.map((category) => {
              return (<option key={category.id} value={category.name} className="answers-options">{category.name}</option>)
            })}
          </select>

          { (productCategory === "mountain_bike" || productCategory === "dirt_street" || productCategory === "road") && (<>

            <label htmlFor="modality" className="mt-4 text-start">Modalidade:<span className="requested-information ms-1">*</span></label>
            <select
              value={productModality}
              onChange={(e) => e.preventDefault && setProductModality(e.target.value)}
              className="select-answer"
            >
              {modalities.map((modality, index) => {
                return (<option key={index}>{modality}</option>);
              })}
            </select>
          </>)}

          <label htmlFor="product" className="mt-4">Produto:</label>
          <select
          value={productTypeId}
          onChange={(e) => setProductTypeId(e.target.value)}
          className="select-answer"
          >
            {productTypes.map((productType) => {
              return (<option key={productType.id} value={productType.id}>{productType.name}</option>)
            })}
          </select>
          <div className="text-center">
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
              <div className="text-center">
                <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleThirdStep()}><span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span></button>
              </div>
            </div>
          )}

          { productTypeAttributes.length === 0 && (
            <div id="third-section" className="card-questions d-none mb-5 text-center">
              <h4 className="text-center text-success">Informações técnicas</h4>

              <p className="mt-5">não há nada para esse produto, vamos em frente!!!</p>



              <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleThirdStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>

            </div>
          )}



          <div id="fourth-section" className="card-questions mb-5 d-none">
            <h4 className="text-center text-success">Informações adicionais</h4>

            <label htmlFor="productbrand" className="mt-3">Marca:</label>
            <input type="text" className="text-input"  value={productBrand ? productBrand : ""} onChange={(e) => setProductBrand(e.target.value)}/>

            <label htmlFor="productName" className="mt-4">Nome:</label>
            <input type="text" className="text-input" value={productName ? productName : ""} onChange={(e) => setProductName(e.target.value)}/>
            { errors && errors.product && errors.product.name && (
              <p className="text-danger">{errors.product.name}</p>
            )}


            <label htmlFor="productDescription" className="mt-4">Descrição:</label>
            <input type="text" className="text-input" value={productDescription ? productDescription : ""} onChange={(e) => setProductDescription(e.target.value)}/>


            <label htmlFor="productPrice" className="mt-4">Preço:</label>
            <input type="number" className="text-input" placeholder="Reais e centavos sem virgula" value={productPrice ? productPrice : ""} onChange={(e) => setProductPrice(e.target.value)}/>
            { errors && errors.product && errors.product.price_in_cents && (
              <p className="text-danger">{errors.product.price_in_cents}</p>
            )}


            <label htmlFor="productQuantity" className="mt-4">Quantidade:</label>
            <input type="number" className="text-input" value={productQuantity ? productQuantity : ""} onChange={(e) => setProductQuantity(e.target.value)}/>
            { errors && errors.product && errors.product.quantity && (
              <p className="text-danger">{errors.product.quantity}</p>
            )}

            <div className="text-center">
              <button className="btn-next-step mt-3" type="button" onClick={(e) => handleFourthStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
            </div>
          </div>
        </div>

        <div id="fifth-section" className="card-questions mb-5 mt-3 d-none">
          <h4 className="text-center text-success">Imagens</h4>
          <input id="photo-upload" type="file" className="text-input file-upload" multiple accept="image/png, image/jpg, image/jpeg" onChange={(e) => createProductPhotos(e)}/>
          <p className="text-center my-3">ESCOLHA AS IMAGENS DO SEU PRODUTO</p>
          <div className="text-center">
            <label htmlFor="photo-upload" className="label-upload my-2"><i class="fas fa-file-upload"></i></label>
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
          <div className="text-center">
            <button className="btn-next-step mt-3" type="button" onClick={(e) => handleFifthStep()}> <span className="mb-1">próximo  <i className="fas fa-angle-double-right mt-1"></i></span> </button>
          </div>
        </div>



        <div id="sixth-section" className="card-questions mb-5 mt-3 d-none">

          <h4 className="text-center text-success">Revise as informações</h4>
          {/* <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-review-product my-3 w-100 p-2">Gerais</button> */}
          <h4 className="text-success mt-3 text-center">Gerais</h4>
          <div id="Gerais" className="">

            <p><span className="text-success">Produto:</span> {productTypeId ? productTypes.find((e) => e.id === Number(productTypeId)).name : ""}</p>
            <p><span className="text-success">Categoria:</span> {productCategory}</p>
            <p><span className="text-success">Modalidade:</span> {productModality}</p>
            <p><span className="text-success">Quantidade:</span> {productQuantity}</p>
            <p><span className="text-success">Preço:</span>  {(productPrice / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}</p>
            <p><span className="text-success">Marca:</span> {productBrand}</p>
            <p><span className="text-success">Nome:</span> {productName}</p>
          </div>


          {Object.keys(productAttributes).length != 0 && (
            <>
              <button type="button" onClick={(e) => handleReviewSection(e)} className="btn-review-product my-3 w-100 p-2">Atributos</button>
              <div id="Atributos" className="d-none">

                {Object.keys(productAttributes).map((key, index) => {
                  return (
                    <div key={index}>
                      <p >
                        <span className="text-success">
                          {key}:
                        </span>
                        {productAttributes[key]}
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
          <div className="text-center">
            <button onClick={(e) => handleSubmit(e)} className="btn-new-announce mt-5">Anunciar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
