import React, { useEffect, useState } from "react";

export function NewProduct(props) {
  const [newProduct, setProduct] = useState([])
  const [productTypes, setProductTypes] = useState([]);
  const [productId, setProductId] = useState();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalities, setModalities] = useState([]);
  const [selectedModality, setSelectedModality] = useState("");
  const [productTypeAttributes, setProductTypeAttributes] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);


  const needQuestion = (selectedProduct) => {

    ["frame", "brake", "rim", "suspension", "shock", "derailleur", "seat_post"].includes(selectedProduct)

  }

  useEffect(() => {
    fetch(`/get_information_for_new_product`)
     .then((response) => response.json())
     .then((data) => {
      setProductTypes(data.types_of_product)
      setCategories(data.categories)
     })
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setModalities(categories.find(element => element.name === selectedCategory).modalities)
      // console.log(categories.find(element => element.name === selectedCategory).modalities)
      // console.log(modalities)
    }
  });





  useEffect(() => {

    fetch(`/get_attributes_for_product?` +
    new URLSearchParams({
      product_type: productId,
    })
    )
    .then((response) => response.json())
    .then((data) => {


      setProductTypeAttributes([
        ...data,
        {
          product_type_id: data.product_type_id,
          name: data.name,
          prompt: data.prompt,
          kind: data.kind,
          options: data.options,
        },
      ]);
    })
  });




  useEffect(() => {

    if (selectedProduct) {
      setProductId(productTypes.find(element => element.name === selectedProduct).id)
    }
  })






  function displayQuestions(e) {

    console.log(productTypeAttributes);
    // const id = productTypes.find(element => element.name === selectedProduct)
    // console.log(setSelectedProduct)
    // const id = productTypes.find(element => element.name === selectedProduct).id
    // setProductAttributes(productTypeAttributes.filter(element => element.product_type_id === id))
    // console.log(productAttributes)
    // setProductAttributes(productTypesAttribute.find(element => element.name === selectedProduct))
    // console.log(selectedProduct)
    // return (
    //   productAttributes.map((attribute) => {
    //     <div>
    //       <label htmlFor="attribute1">{attribute.prompt}?</label>
    //       <select
    //       >
    //         {attribute.options.map((option) => {
    //           return (<option key={option}>{option}</option>)
    //         })}
    //       </select>
    //     </div>
    //   })
    // )
  }


  // useEffect(async () => {
  //   let url = `/api/v1/products/${productId}`;
  //   const response = await axios.get(url);
  //   setProduct(response.data);
  // },)



  // const categoryField(categories)

  return (
    <div className="">
      <h1>Cheguei</h1>
      <form action="/products">

        <label htmlFor="category">Qual a categoria do seu produto?</label>
        <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value) }
        >
          {categories.map((category) => {
            return (<option key={category.id}>{category.name}</option>)
          })}
        </select>

        <br />

        {selectedCategory === "other" && (
          <>
            <label htmlFor="category">Qual?</label>
            <input type="text" />
          </>
        )}

        <br />

        {selectedCategory && selectedCategory != "other" && (
          <><label htmlFor="modality">Qual a modalidade do seu produto?</label><select
              value={selectedModality}
              onChange={(e) => e.preventDefault && setSelectedModality(e.target.value)}
            >
              {modalities.map((modality, index) => {
                return (<option key={index}>{modality}</option>);
              })}
            </select></>
        )}

        <br />
        {selectedModality && (
          <><label htmlFor="product">O que deseja anunciar?</label>
          <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          >
            {productTypes.map((productType) => {
              return (<option key={productType.id}>{productType.name}</option>)
            })}
          </select></>
        )}

        <br />
        {selectedProduct && productTypeAttributes && (

          <div>
            {productTypeAttributes.map((attribute) => {
              return (
                <><div attribute={attribute} key={attribute.id}>

                  <label htmlFor="product attribute" key={attribute.id}>{attribute.prompt}</label><br />
                  <select
                  onChange={(e) => setProductAttributes(e.target.value)}
                  value={productAttributes}
                  >
                    {attribute.options?.map((option, index) => {
                      return (<option key={index} value={option}>{option}</option>)
                    })}
                  </select>
                </div></>
              )
            })}
          </div>
        )}

        <br />

        {selectedProduct && productTypeAttributes && (

          <div>
            {productTypeAttributes.map((attribute) => {
              return (
                <><div attribute={attribute} key={attribute.id}>

                  <label htmlFor="product attribute" key={attribute.id}>{attribute.prompt}</label><br />
                  <select
                  onChange={(e) => setProductAttributes(e.target.value)}
                  value={productAttributes}
                  >
                    {attribute.options?.map((option, index) => {
                      return (<option key={index} value={option}>{option}</option>)
                    })}
                  </select>
                </div></>
              )
            })}
          </div>
        )}





      </form>
    </div>
  );
}
