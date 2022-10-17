import React, { useEffect, useState } from "react";

export function Product(props) {
  const [product, setProduct] = useState()
  // const [productId, setProductId] = useState()


  const [quantity, setQuantity] = useState()
  // const [productAttributes, setProductAttributes] = useState([])

  // useEffect(() => {
  //   setProductId(window.location.pathname.split("/").pop())
  // })




  let productId = window.location.pathname.split("/").pop();

  useEffect(async () => {
    let url = `/api/v1/products/${productId}`;
    const response = await axios.get(url);
    setProduct(response.data);

    // setProductAttributes(response.data.product_attributes)
    console.log(product)
    // console.log(productAttributes)

  }, [])

  // useEffect(async () => {
  //   let url = `/api/v1/products/${productId}`;
  //   const response = await axios.get(url);
  //   setProduct(response.data);

  // }, [])



  const handleSubmit = (product) => {

    const orderItem = {

      product_id: productId,
      price_in_cents: product.price_in_cents,
      quantity: productQuantity

    }

    console.log(orderItem)


  }

  return (

    <div className="product-show" product={product} key={product} >
      {product && (
        <div className="row row-cols-1">
          <div className="other-infos  col-12 col-md-8">
            <div id="carouselExampleControls" className="carousel slide product-photos" data-bs-ride="carousel">
              <div className="carousel-inner">
                <i className="fas fa-heart card-favorite"></i>
                <div className="carousel-item active">
                  <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-show" alt="" />
                </div>
                <div className="carousel-item">
                  <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-show" alt="" />
                </div>
                <div className="carousel-item">
                  <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-show" alt="" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            {product.product_attributes && (


              <div className="technical-details mt-5">
                <h4 className="text-success">Características Técnicas</h4>
                {product.product_attributes.map(attribute => {
                  return (
                    <>
                      <p key={attribute.product_type_attribute_id}>{attribute.product_type_attribute}</p>

                      <p key={attribute.id}>{attribute.value}</p>
                    </>
                  )
                })}


              </div>
            )}

          </div>

          <div className="col-12 col-md-4 card-product">
            <div className="d-flex justify-content-between">
              <h3 className="card-title mt-3"> {product.name}</h3>
              <i className="far fa-heart mt-4"></i>
            </div>
            <h4 className="card-title mt-1">{product.description}</h4>
            <div className="card-content">
              <h4 className="text-success mt-1">
                {(product.price_in_cents / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h4>
              <p>Produto: {product.product_type.name} </p>
              <p>Categoria: {product.category.name} </p>
              <p className="">Marca: {product.brand}</p>
              <p className="">Disponível: {product.quantity}</p>

            </div>

            <button className="btn-chat w-100 mt-3 mb-2"><i className="fas fa-comments me-2"></i>Conversar com anunciante</button>

            <form action={product.id + "/order_items"} method="post" className="d-flex">
              <div className="div">

                <label htmlFor="" className="me-2">Quantidade</label>
                <input type="number" onChange={(e) => setQuantity(e.target.value)} name="quantity" className="w-40 quantity-input"/>
              </div>
              <input type="hidden" value={Number(product.id)} />
              <input type="hidden" value={Number(product.price_in_cents * quantity )} name="price_in_cents"/>


              <button type="submit" className="btn-order mt-2 w-100"><i className="fas fa-cart-plus me-2"></i>Adicionar</button>
            </form>
            <div>


              {quantity && (

               <p className="mt-3">Subtotal: {((product.price_in_cents * quantity) /100 ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>


              )}




            </div>

          </div>
        </div>
      )
      }
    </div>
  );
}
