import React, { useEffect, useState } from "react";

export function NewProduct(props) {
  const [newProduct, setProduct] = useState([])
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productTypeAttribute, setProductTypeAttribute] = useState([]);
  const [productAttribute, setProductAttribute] = useState([]);


  fetch(
    "/get_types_of_product"
  )
    .then((response) => response.json())
    .then((data) => {
      setProductTypes(data);

    });

    
    // console.log(productTypes)


  // useEffect(async () => {
  //   let url = `/api/v1/products/${productId}`;
  //   const response = await axios.get(url);
  //   setProduct(response.data);
  // },)



  // const categoryField(categories)

  return (
    <div className="text-center">
      <h1>Cheguei</h1>
        <form action="/products">
          <label htmlFor="procuct">O que deseja anunciar?</label>
          <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          >
            {productTypes.map((productType) => {
              return (<option key={productType.name}>{productType.name}</option>)
            })}
          </select>



        </form>
    </div>
  );
}
