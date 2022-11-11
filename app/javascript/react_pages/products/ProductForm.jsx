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
      console.log(categories)
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
    // console.log(attribute.name, attribute.name === "front_suspension_travel", productAttributes["suspension_type"] )
    if (["mountain_bike", "dirt_street"].includes(productCategory) && attribute.name === "frame_size") {
      options = [ "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL" ]
    } else if (productCategory === "road" && attribute.name === "frame_size") {
      options = [ "<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
    } else if (attribute.name === "front_suspension_travel" && ["no_suspension", "hardtail"].includes(productAttributes["suspension_type"])) {
      return
    } else if (attribute.name === "rear_suspension_travel" && ["no_suspension"].includes(productAttributes["suspension_type"])) {
      return
    } else {
      options = attribute.options
    }

    return (
      <div attribute={attribute} key={attribute.id} className="card-questions mb-5">
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
    if (filterProducts === "Acessórios") {
      setProductTypes(allProducts.filter(product => product.name === "car_accessories" || product.name === "bike_accessories" || product.name === "training_accessories" || product.name === "pre_after_pedal_accessories"));
    } else if (filterProducts == "Componentes") {
      setProductTypes(allProducts.filter(product => product.name === "battery" || product.name === "brake" || product.name === "brake_levers" || product.name === "cassete"
        || product.name === "chain" || product.name === "chainring" || product.name === "crankset" || product.name === "fender"
        || product.name === "frame" || product.name === "front_derailleur" || product.name === "front_shifter" || product.name === "front_suspension"
        || product.name === "full_wheel" || product.name === "grips" || product.name === "handlebar" || product.name === "headset"
        || product.name === "hub" || product.name === "pedals" || product.name === "rim" || product.name === "saddle"
        || product.name === "seat_post" || product.name === "spoke" || product.name === "rear_derailleur" || product.name === "rear_shifter"
        || product.name === "rear_suspension" || product.name === "stem" || product.name === "tyre"
      ));

    } else if (filterProducts == "Equipamentos") {
      setProductTypes(allProducts.filter(product => product.name === "helmet" || product.name === "elbow_pad" || product.name === "knee_pad" || product.name === "water_bottle"
        || product.name === "bottle_cage" || product.name === "hydration_backpack" || product.name === "fanny_pack" || product.name === "sneaker"
      ));
    } else if (filterProducts == "Casual") {
      setProductTypes(allProducts.filter(product => product.name === "cap" || product.name === "shirt" || product.name === "shorts" || product.name === "glasses"
      ));
    } else if (filterProducts == "Manutenção") {
      setProductTypes(allProducts.filter(product => product.name === "air_bomb" || product.name === "lubricant" || product.name === "sealant"
      ));
    }  else if (filterProducts == "Vestuário") {
      setProductTypes(allProducts.filter(product => product.name === "bretelle" || product.name === "shorts" || product.name === "inner_shorts" || product.name === "shirt"
        || product.name === "vest" || product.name === "windbreaker" || product.name === "gloves" || product.name === "socks"
        || product.name === "glasses" || product.name === "thermal_clothing"
      ));
    }

    const form = document.getElementById("product-form")
    form.classList.remove("d-none")
  }


  return (
    <div className="w-60 text-center new-product-react py-5">
      <h1 className="text-success">Anuncie aqui</h1>
      <h4 className="">O que deseja anunciar?</h4>

      <div className="d-flex justify-content-between gap-3">
        <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Acessórios <br/><i class="fas fa-charging-station"></i></button>
        <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Componentes <br/> <i class="fas fa-cog"></i></button>
        <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Equipamentos <br/> <i class="fas fa-hard-hat"></i></button>
      </div>
      <div className="d-flex justify-content-between py-3 gap-3">
        <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Casual <br/> <i class="fas fa-glasses"></i></button>
        <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Manutenção <br/> <i class="fas fa-wrench"></i></button>
        <button className="btn-announce-type" onClick={(e) => handleProductType(e)}>Vestuário <br/> <i class="fas fa-tshirt"></i></button>
      </div>



      <form id="product-form" className="d-none">

        <div className="card-questions mb-5">
          <label htmlFor="category" className="mb-3">Qual a categoria do seu produto?</label>
          <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="select-answer"
          >
            {categories.map((category) => {
              return (<option key={category.id} value={category.name} className="answers-options">{category.name}</option>)
            })}
          </select>

          <label htmlFor="modality" className="mb-3">Qual a modalidade do seu produto?</label>
          <select
            value={productModality}
            onChange={(e) => e.preventDefault && setProductModality(e.target.value)}
            className="select-answer"
          >
            {modalities.map((modality, index) => {
              return (<option key={index}>{modality}</option>);
            })}
          </select>

          <label htmlFor="product" className="mb-3">Qual produto deseja anunciar?</label>
          <select
          value={productTypeId}
          onChange={(e) => setProductTypeId(e.target.value)}
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




        {productTypeId && productTypeAttributes && (

          <div>
            {productTypeAttributes.map((attribute, index) => {
              return renderProductTypeAttributeSelect(attribute, index)
            })}

            <div className="card-questions mb-5">
              <div className="d-flex">
                <div className="input-group input-group-sm mb-3 w-50">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Marca</span>
                  </div>
                  <input type="text" className="form-control"  value={productBrand} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductBrand(e.target.value)}/>
                </div>

                <div className="input-group input-group-sm mb-3 w-50">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Nome</span>
                  </div>
                  <input type="text" className="form-control" value={productName} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductName(e.target.value)}/>
                  { errors && errors.product && errors.product.name && (
                    <p className="text-danger">{errors.product.name}</p>
                  )}
                </div>
              </div>

              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Descrição</span>
                </div>
                <input type="text" className="form-control" value={productDescription} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductDescription(e.target.value)}/>
              </div>

              <div className="d-flex">


                <div className="input-group input-group-sm mb-3 w-50">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">R$</span>
                  </div>
                  <input type="number" className="form-control" placeholder="Reais e centavos sem virgula" value={productPrice} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductPrice(e.target.value)}/>
                  { errors && errors.product && errors.product.price_in_cents && (
                    <p className="text-danger">{errors.product.price_in_cents}</p>
                  )}
                </div>

                <div className="input-group input-group-sm mb-3 w-50">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Quantidade</span>
                  </div>
                  <input type="number" className="form-control" value={productQuantity} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductQuantity(e.target.value)}/>
                  { errors && errors.product && errors.product.quantity && (
                    <p className="text-danger">{errors.product.quantity}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {productQuantity && (<>

          <label htmlFor="photos">Adicione as fotos do seu produto:</label>

          <input type="file" className="form-control" aria-label="Username" aria-describedby="basic-addon1" multiple onChange={(e) => createProductPhotos(e)}/>

        </>)}

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
