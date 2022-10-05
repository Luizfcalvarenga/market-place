import React, { useEffect, useState } from "react";

export function Product(props) {
  const [product, setProduct] = useState()

  let productId = window.location.pathname.split("/").pop();

  useEffect(async () => {
    let url = `/api/v1/products/${productId}`;
    const response = await axios.get(url);
    setProduct(response.data);
  }, [])

  return (

    <div className="" product={product} key={product} >
      {product && (
        <div className="card-product">
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <i className="fas fa-heart card-favorite"></i>
              <div className="carousel-item active">
                <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-index" alt="" />
              </div>
              <div className="carousel-item">
                <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-index" alt="" />
              </div>
              <div className="carousel-item">
                <img src="https://www.bikemagazine.com.br/wp-content/uploads/2020/12/valeo-ebike.jpg" className="d-block w-100 img-card-index" alt="" />
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
          <h4 className="card-title text-center mt-3">{product.modality}</h4>
            <h4 className="text-center mt-1">R$ {product.price_in_cents}</h4>
            <hr/>
            <div className="card-content mt-2">
              <p className="text-center mt-1"> {product.brand} | {product.name}</p>
              <div className="d-flex justify-content-around">
                <p>produto: {product.category.name}</p>
                {/* <p>{JSON.stringify(product.category)}</p> */}
                <p>catega: </p>
            </div>
          </div>
        </div>
      )
      }
    </div>
  );
}
