import React, { useEffect, useState } from "react";


export function EditProduct(props) {
  const [product, setProduct] = useState([])


  // useEffect(async () => {
  //   let url = "/api/v1/products?";
  //   if (categoryFilter) url = url + `&category=${categoryFilter}`
  //   if (modalityFilter) url = url + `&modality=${modalityFilter}`
  //   if (sortBy) url = url + `&sort_by=${sortBy}`

  //   const response = await axios.get(url);
  //   setProducts(response.data.products);
  // }, [categoryFilter, modalityFilter, sortBy])



  return (
    <h1>edit</h1>
  )
}
