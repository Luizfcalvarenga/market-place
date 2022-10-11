import React, { useEffect, useState } from "react";

export function NewProduct(props) {
  // const [newProduct, setNewProduct] = useState({});
  const [user, setUser] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  // const [productTypeId, setProductTypeId] = useState();
  const [selectedProductTypeId, setSelectedProductTypeId] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalities, setModalities] = useState([]);
  const [selectedModality, setSelectedModality] = useState("");
  const [productTypeAttributes, setProductTypeAttributes] = useState([]);
  const [productAttribute, setProductAttribute] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(null);
  const [productQuantity, setProductQuantity ] = useState(null);

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
      })
    }
  }, [selectedProductTypeId]);


  const createProductAttributes = (e, attribute) => {

    // const nextAttribute = [
    //   // Items before the insertion point:
    //   // ...productAttributes.slice(0, insertAttr),
    //   // New item:
    //   {
    //     product_id: null,
    //     product_type_attribute_id: attribute.id,
    //     value: e.target.value
    //   }
    //   // Items after the insertion point:
    //   // ...productAttributes.slice(insertAttr)
    // ];
    // setProductAttribute(nextAttribute);

    setProductAttribute({
      product_id: null,
      product_type_attribute_id: attribute.id,
      value: e.target.value

    });


    productAttributes.push(productAttribute)




    // setProductAttribute('');

    // useEffect(() => {

    //   setProductAttribute(e.target.value)

    // }, [productAttributes]);
    // const answers = []
    // let answer = e.targets
    // answers.push(answer)
    // if (e.target.value.hasChanged) {
    //   let answer = e.target.value

    //   answers.push(answer)
    // }

    // productTypeAttributes.map((attr, index) => {



    //   let answer =  {
    //     product_id: null,
    //     product_type_attribute_id: attr.id,
    //     value: e.target.value
    //   }

    //   answers.push(answer)



    // })



    console.log(productAttributes)
    // console.log(answers)
    // axios.post('', {
    //   product_id: productTypeId,
    //   product_type_attribute_id: attribute.id,
    //   value: e.target.value,
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

  }

  const handleSubmit = () => {

    const product = {
      user_id: user,
      category_id: categoryId,
      modality: selectedModality,
      product_type_id: selectedProductTypeId,
      brand: productBrand,
      name: productName,
      description: productDescription,
      price_in_cents: productPrice,
      quantity: productQuantity

    }

    console.log(product)

    axios.post('/api/v1/products', {
      product
    })
    .then(function (response) {
      console.log(response);
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
            {productTypeAttributes.map((attribute) => {
              return (
                <><div attribute={attribute} key={attribute.id} className="card-questions mb-5">

                  <label htmlFor="product attribute" className="mb-3" key={attribute.id}>{attribute.prompt}</label><br />
                  <select
                  className="select-answer"
                  onChange={(e) => createProductAttributes(e, attribute)}
                  >
                    {attribute.options?.map((option) => {
                      return (<option value={option}>{option}</option>)
                    })}
                  </select>
                </div></>
              )
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

          <button onClick={() => handleSubmit()} className="btn btn-outline mb-5">Anunciar</button>

        </>)}

      </form>
    </div>
  );
}
