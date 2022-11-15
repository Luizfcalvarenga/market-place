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
    const currentProductAttributes = {...productAttributes} // criar um hash com valor atual do estado (copiar o valor)
    currentProductAttributes[attribute.name] = e.target.value
    setProductAttributes(currentProductAttributes)
  }

  const createProductPhotos = (e) => {
    const photos = Object.values(e.target.files)
    setProductPhotos(photos)
  }

  const renderProductTypeAttributeSelect = (attribute, index) => {
    let options = []
    if (["mountain_bike", "dirt_street"].includes(productCategory) && attribute.name === "frame_size") {
      options = [ "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL" ]
    } else if (productCategory === "road" && attribute.name === "frame_size") {
      options = [ "<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
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
        <label htmlFor="product attribute" className="mb-3" key={index}>{attribute.prompt}</label><br />
        <select
        className="select-answer"
        onChange={(e) => createProductAttributes(e, attribute)}
        >
          {options?.map((option, index) => {
            return (<option key={index} value={option}>{option}</option>)
          })}
        </select>
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

  const handleFirstStep = () => {
    const progressOne = document.querySelector(".progress-1")
    if (productTypes) {
      progressOne.classList.add("section-done")
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



  const handleSecondStep = (e) => {
    setProductTypeId(e.target.value)
    const progressTwo = document.getElementById("progress-2")
    const secondSection = document.getElementById("second-section")
    const thirdSection = document.getElementById("third-section")
    if (productTypes) {
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


  return (
    <div className="w-60 text-center new-product-react py-5">
      <h1 className="text-success">Vamos lá...</h1>
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
        <h4 className="text-success mt-3">O que deseja anunciar?</h4>
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
          <label htmlFor="category" className="mb-3">Categoria:</label>
          <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="select-answer"
          >
            {categories.map((category) => {
              return (<option key={category.id} value={category.name} className="answers-options">{category.name}</option>)
            })}
          </select>
          <br />

          <label htmlFor="modality" className="mb-3">Modalidade:</label>
          <select
            value={productModality}
            onChange={(e) => e.preventDefault && setProductModality(e.target.value)}
            className="select-answer"
          >
            {modalities.map((modality, index) => {
              return (<option key={index}>{modality}</option>);
            })}
          </select>
          <br />

          <label htmlFor="product" className="mb-3">Produto:</label>
          <select
          value={productTypeId}
          onChange={(e) => handleSecondStep(e)}

          className="select-answer"
          >
            {productTypes.map((productType) => {
              return (<option key={productType.id} value={productType.id}>{productType.name}</option>)
            })}
          </select>

          {/* {productCategory === "other" && (
            <>
              <label htmlFor="category" className="mx-3">Qual?</label>
              <input type="text" />
            </>
          )} */}
        </div>






        <div>
          { productTypeAttributes.length > 0 && (
            <div id="third-section" className="card-questions d-none mb-5">
              <h4 className="text-center text-success">Informações técnicas</h4>


              {productTypeAttributes.map((attribute, index) => {
                return renderProductTypeAttributeSelect(attribute, index)
              })}


              <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleThirdStep()}><i className="fas fa-angle-double-right"></i></button>

            </div>
          )}

          { productTypeAttributes.length === 0 && (
            <div id="third-section" className="card-questions d-none mb-5">
               <h4 className="text-center text-success">Informações técnicas</h4>

              <h6 className="text-black">não há nada para esse produto, vamos em frente!!!</h6>
              <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleThirdStep()}><i className="fas fa-angle-double-right"></i></button>

            </div>
          )}



          <div id="fourth-section" className="card-questions mb-5 d-none">
            <h4 className="text-center text-success">Informações adicionais</h4>
            <div className="d-flex">
              <div className="input-group input-group-sm mb-3 w-50">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Marca</span>
                </div>
                <input type="text" className="form-control"  value={productBrand ? productBrand : ""} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductBrand(e.target.value)}/>
              </div>

              <div className="input-group input-group-sm mb-3 w-50">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Nome</span>
                </div>
                <input type="text" className="form-control" value={productName ? productName : ""} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductName(e.target.value)}/>
                { errors && errors.product && errors.product.name && (
                  <p className="text-danger">{errors.product.name}</p>
                )}
              </div>
            </div>

            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Descrição</span>
              </div>
              <input type="text" className="form-control" value={productDescription ? productDescription : ""} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductDescription(e.target.value)}/>
            </div>

            <div className="d-flex">
              <div className="input-group input-group-sm mb-3 w-50">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">R$</span>
                </div>
                <input type="number" className="form-control" placeholder="Reais e centavos sem virgula" value={productPrice ? productPrice : ""} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductPrice(e.target.value)}/>
                { errors && errors.product && errors.product.price_in_cents && (
                  <p className="text-danger">{errors.product.price_in_cents}</p>
                )}
              </div>

              <div className="input-group input-group-sm mb-3 w-50">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Quantidade</span>
                </div>
                <input type="number" className="form-control" value={productQuantity ? productQuantity : ""} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductQuantity(e.target.value)}/>
                { errors && errors.product && errors.product.quantity && (
                  <p className="text-danger">{errors.product.quantity}</p>
                )}
              </div>
            </div>
            <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleFourthStep()}><i className="fas fa-angle-double-right"></i></button>
          </div>
        </div>


        {productQuantity && (<>

          <div id="fifth-section" className="card-questions mb-5 mt-3 d-none">

            <h4 className="text-center text-success mb-3">Imagens do produto</h4>
            {/* <label htmlFor="photos">Adicione as fotos do seu produto:</label> */}

            <input type="file" className="form-control" aria-label="Username" aria-describedby="basic-addon1" multiple onChange={(e) => createProductPhotos(e)}/>

            <button className="btn-next-step me-3 mt-3" type="button" onClick={(e) => handleFifthStep()}><i className="fas fa-angle-double-right"></i></button>

          </div>
        </>)}


        <div id="sixth-section" className="card-questions mb-5 mt-3 d-none">

          <h4 className="text-center text-success mb-3">Revise seu produto</h4>
              <p>Categoria: {productCategory}</p>
              <p>Modalidade: {productModality}</p>
              <p>Produto: {productId}</p>
              { productAttributes && (<>

              </>
              )}
              <p>Marca: {productBrand}</p>
              <p>Nome: {productName}</p>
              <p>Descrição: {productDescription}</p>
              <p>Preço: {productPrice}</p>
              <p>Quantidade: {productQuantity}</p>






          <button onClick={(e) => handleSubmit(e)} className="btn btn-outline mb-5 mt-3">Anunciar</button>

        </div>
        {productPhotos &&  (<>

          <div className="card-questions my-3">
            <label htmlFor="product" className="mb-3">Qual tipo de anúncio quer usar para seu produto?</label>
            <select
            type="radio"
            value={productServiceId}
            onChange={(e) => setProductServiceId(e.target.value)}
            className="select-answer"
            >
              {services.map((service) => {
                return (<option key={service.id} value={service.id}>{service.name} | {(service.price_in_cents / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}</option>)
              })}
            </select>
          </div>
        </>)}

        {productServiceId && (<>

          <button onClick={(e) => handleSubmit(e)} className="btn btn-outline mb-5 mt-3">Anunciar</button>

        </>)}

      </form>
    </div>
  );
}
