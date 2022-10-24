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
                <h3 className="text-success mb-2">Características Técnicas</h3>
                {product.product_attributes.map((attribute) => {
                  return (
                    <div className="d-inline-flex justify-content-between">
                      <h4 key={attribute.product_type_attribute_id} className="me-2 mb-3 text-black"><strong>{product.product_type_attributes.find(element => element.id === attribute.product_type_attribute_id).prompt}:</strong></h4>
                      <h4 key={attribute.id} className="text-success me-3">{attribute.value}</h4>
                    </div>

                  )
                })}
                <div className="d-inline-flex justify-content-between">
                  <h4 className="me-2 mb-3 text-black"><strong>Categoria:</strong></h4>
                  <h4 className="text-success me-3">{product.category.name}</h4>
                </div>
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
              <p><strong>Produto:</strong> {product.product_type.name} </p>
              <p className=""><strong>Marca:</strong> {product.brand}</p>
              <p className=""><strong>Disponível:</strong> {product.quantity}</p>

            </div>

            <button className="btn-chat w-100 mt-3 mb-2"><i className="fas fa-comments me-2"></i>Conversar com anunciante</button>
          </div>
        </div>
      )
      }
    </div>
  );
}
