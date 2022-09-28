import React, { useEffect, useState } from "react";

export function NewProduct(props) {
  const [newProduct, setProduct] = useState([])
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalities, setModalities] = useState([]);
  const [selectedModality, setSelectedModality] = useState("");
  const [productTypeAttributes, setProductTypeAttributes] = useState([]);
  const [productAttributes, setProductAttributes] = useState([]);


  fetch(
    "/get_types_of_product"
  )
    .then((response) => response.json())
    .then((data) => {
      setProductTypes(data);

    });

  fetch(
    "/get_categories"
  )
    .then((response) => response.json())
    .then((data) => {
      setCategories(data);

    });


  fetch(
    "/get_product_type_attributes"
  )
    .then((response) => response.json())
    .then((data) => {
      setProductTypeAttributes(data);

    });





  const displayModalities = (selectedCategory) => {

    setModalities(categories.find(element => element.name === selectedCategory).modalities)
    setSelectedCategory(e.target.value)
    return (
      <div>
        <label htmlFor="modality">Qual a modalidade do seu produto?</label>
          <select
          value={selectedModality}
          onChange={(e) => setSelectedModality(e.target.value)}
          >
            {modalities.map((modality) => {
              return (<option key={modality.name}>{modality.name}</option>)
            })}
          </select>
      </div>
    )

  }




  const displayQuestions = (e) => {

    setSelectedProduct(e.target)
    console.log(selectedProduct)
    // setProductAttributes(productTypes.find(element => element.name === selectedProduct))
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
        <label htmlFor="procuct">O que deseja anunciar?</label>
        <select
        value={selectedProduct}
        onChange={(e) => displayQuestions(e)}
        >
          {productTypes.map((productType) => {
            return (<option key={productType.name}>{productType.name}</option>)
          })}
        </select>


        <br />

        <label htmlFor="category">Qual a categoria do seu produto?</label>
        <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => {
            return (<option key={category.name}>{category.name}</option>)
          })}
        </select>

        <br />



      </form>
    </div>
  );
}
