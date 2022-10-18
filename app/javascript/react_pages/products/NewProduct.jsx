import React, { useEffect, useState } from "react";

export function NewProduct(props) {
  const [user, setUser] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductTypeId, setSelectedProductTypeId] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalities, setModalities] = useState([]);
  const [selectedModality, setSelectedModality] = useState("");
  const [productTypeAttributes, setProductTypeAttributes] = useState([]);
  const [productAttributes, setProductAttributes] = useState({});
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(null);
  const [productQuantity, setProductQuantity ] = useState(null);
  const [productPhotos, setProductPhotos ] = useState([]);



  useEffect(() => {
    fetch(`/get_information_for_new_product`)
     .then((response) => response.json())
     .then((data) => {
      setProductTypes(data.types_of_product)
      setCategories(data.categories)
      setUser(data.user.id)
     })
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setModalities(categories.find(element => element.name === selectedCategory).modalities)
      setCategoryId(categories.find(element => element.name === selectedCategory).id);
    }
  });


  useEffect(() => {
    if(selectedProductTypeId) {
      fetch(`/get_attributes_for_product?product_type_id=${selectedProductTypeId}`)
      .then((response) => response.json())
      .then((data) => {
        setProductTypeAttributes(
          data
        );
        setProductAttributes(
          {}
        );
      })
    }
  }, [selectedProductTypeId]);


  const createProductAttributes = (e, attribute) => {
    const currentProductAttributes = {...productAttributes} // criar um hash com valor atual do estado (copiar o valor)
    currentProductAttributes[attribute.name] = e.target.value
    setProductAttributes(currentProductAttributes)
  }

  const createProductPhotos = (e) => {
    // const currentProductPhotos = {...productPhotos} // criar um hash com valor atual do estado (copiar o valor)
    // currentProductPhotos[name] = e.target.files.name
    // currentProductPhotos[type] = e.target.files.type
    const arrayOfObjects = Object.values(e.target.files)
    console.log(arrayOfObjects)
    const arrayOfArray = arrayOfObjects.map(object => Object.values(object))
    // const arrayOfArray = Object.values(arrayOfObjects)
    // setProductPhotos(Object.values(e.target.files))
    console.log(arrayOfArray)
    // setProductPhotos(Object.keys(e.target.files).map(key => e.target.files[key]))

    console.log(productPhotos)
  }

  const renderProductTypeAttributeSelect = (attribute, index) => {
    let options = []
    console.log(attribute.name, attribute.name === "front_suspension_travel", productAttributes["suspension_type"] )
    if (["mountain_bike", "dirt_street"].includes(selectedCategory) && attribute.name === "frame_size") {
      options = [ "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL" ]
    } else if (selectedCategory === "road" && attribute.name === "frame_size") {
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

  const handleSubmit = (e) => {
    e.preventDefault()

    const product = {
      user_id: user,
      category_id: categoryId,
      modality: selectedModality,
      product_type_id: selectedProductTypeId,
      brand: productBrand,
      name: productName,
      description: productDescription,
      price_in_cents: productPrice,
      quantity: productQuantity,
      photos: productPhotos,
      productAttributes

    }

    axios.post('/api/v1/products', {
      product
    })
    .then(function (response) {
      console.log(response.id);
      if (response.success) {
        window.location = response.redirect_url
      }
    })
    .catch(function (error) {
      console.log(error);
    });


  }


  return (
    <div className="w-60 text-center new-product-react py-5">
      <h1 className="text-success">Anuncie aqui</h1>
      <form>
        <div className="card-questions mb-5">
          <label htmlFor="category" className="mb-3">Qual a categoria do seu produto?</label>
          <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select-answer"
          >
            {categories.map((category) => {
              return (<option key={category.id} value={category.name} className="answers-options">{category.name}</option>)
            })}
          </select>
          {selectedCategory === "other" && (
            <>
              <label htmlFor="category" className="mx-3">Qual?</label>
              <input type="text" />
            </>
          )}
        </div>

        {selectedCategory  && selectedCategory != "other" && (
          <div className="card-questions mb-5">
            <label htmlFor="modality" className="mb-3">Qual a modalidade do seu produto?</label>
            <select
              value={selectedModality}
              onChange={(e) => e.preventDefault && setSelectedModality(e.target.value)}
              className="select-answer"
            >
              {modalities.map((modality, index) => {
                return (<option key={index}>{modality}</option>);
              })}
            </select>
          </div>
        )}

        {selectedModality && (
          <div className="card-questions mb-5">
            <label htmlFor="product" className="mb-3">Qual produto deseja anunciar?</label>
            <select
            value={selectedProductTypeId}
            onChange={(e) => setSelectedProductTypeId(e.target.value)}
            className="select-answer"
            >
              {productTypes.map((productType) => {
                return (<option key={productType.id} value={productType.id}>{productType.name}</option>)
              })}
            </select>
          </div>
        )}


        {selectedProductTypeId && productTypeAttributes && (

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
                  <input type="text" className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductBrand(e.target.value)}/>
                </div>

                <div className="input-group input-group-sm mb-3 w-50">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Nome</span>
                  </div>
                  <input type="text" className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductName(e.target.value)}/>
                </div>
              </div>

              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Descrição</span>
                </div>
                <input type="text" className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductDescription(e.target.value)}/>
              </div>

              <div className="d-flex">
                <div className="input-group input-group-sm mb-3 w-50">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">RS</span>
                  </div>
                  <input type="number" min="0.00" max="10000.00" step="0.01" className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductPrice(e.target.value)}/>
                </div>

                <div className="input-group input-group-sm mb-3 w-50">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Quantidade</span>
                  </div>
                  <input type="number" className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductQuantity(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>
        )}

        {productQuantity && (<>

          <label htmlFor="photos">Adicione as fotos do seu produto:</label>

          <input type="file" className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1" multiple onChange={(e) => createProductPhotos(e)}/>

        </>)}

        {productPhotos &&  (<>

          <button onClick={(e) => handleSubmit(e)} className="btn btn-outline mb-5">Anunciar</button>

        </>)}

      </form>
    </div>
  );
}
