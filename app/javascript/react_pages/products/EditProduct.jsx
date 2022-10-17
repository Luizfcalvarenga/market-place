import React, { useEffect, useState } from "react";
import { NewProduct } from "./NewProduct";

export function EditProduct(props) {
  const [product, setProduct] = useState([])
  const [productId, setProductId] = useState("")
  const [productAttributes, setProductAttributes] = useState([])


  // setProductId( window.location.pathname.split("/").filter(Number).pop())

  useEffect(() => {
    setProductId(window.location.pathname.split("/").filter(Number).pop())
  })

  useEffect(async () => {
    if (productId) {
      let url = `/api/v1/products/${productId}`;
      const response = await axios.get(url);
      setProduct(response.data);
      console.log(product)
    }
  }, [productId])

  useEffect(() => {
    if (productId) {
      fetch(`/get_product_attributes?product_id=${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProductAttributes(
          data
        );
        console.log(productAttributes)

      })
    }
  }, [productId]);

  return (
    <div>
      {product && (
        <>
        <h1>edit</h1>
        <p>{JSON.stringify(product)}</p>
        <p>{JSON.stringify(productAttributes)}</p>
        <p>{product.name}</p>
        <p>{product.modality}</p>
        <p>{product.brand}</p>
        <p>{product.description}</p>
        <p>{(product.price_in_cents / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
        </p>
        <p>{product.quantity}</p>
        </>
      )}

      {productAttributes && (
        <>
        {productAttributes.map((product_attribute) => {
          return (
          <>
          <p>{product_attribute.product_type_attribute.prompt}</p>
          <p>{product_attribute.value}</p>
          </>
          )
        })}
        </>
      )}
    </div>
  )
}
