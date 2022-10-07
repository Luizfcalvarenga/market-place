import React, { useEffect, useState } from "react";

export function Product(props) {
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState()


  let productId = window.location.pathname.split("/").pop();

  useEffect(async () => {
    let url = `/api/v1/products/${productId}`;
    const response = await axios.get(url);
    setProduct(response.data);
  }, [])

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
            <div className="technical-details mt-5">
              <h4 className="text-success">Características Técnicas</h4>

            </div>
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
              <p>Categoria: {product.category.name} </p>
              <p className="">Modalidade: {product.modality}</p>
              <p className="">Marca: {product.brand}</p>
              <p className="">Disponível: {product.quantity}</p>

            </div>

            <button className="btn-chat w-100 mt-3"><i className="fas fa-comments me-2"></i>Conversar com anunciante</button>

            <form action={product.id + "/order_items"} method="post">
              <label htmlFor="">Quantidade</label>
              <input type="number" onChange={(e) => setQuantity(e.target.value)} name="quantity"/>
              <input type="hidden" value={product.id} />
              <input type="hidden" value={product.price_in_cents} name="price_in_cents"/>


              <button type="submit" className="btn-order mt-2"><i className="fas fa-cart-plus me-2"></i>Adicionar</button>
            </form>
            <button className="btn-order w-100  mt-2"><i className="fas fa-cart-plus me-2"></i>Adicionar ao carrinho</button>

          </div>
        </div>
      )
      }
    </div>
  );
}
