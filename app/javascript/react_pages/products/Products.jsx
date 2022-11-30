import React, { useEffect, useState } from "react";


export function Products(props) {
  const [products, setProducts] = useState([])
  const [categoryFilter, setCategoryFilter] = useState("");
  const [modalityFilter, setModalityFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(async () => {
    let url = "/api/v1/products?";
    if (categoryFilter) url = url + `&category=${categoryFilter}`
    if (modalityFilter) url = url + `&modality=${modalityFilter}`
    if (sortBy) url = url + `&sort_by=${sortBy}`

    const response = await axios.get(url);
    setProducts(response.data.products);
  }, [categoryFilter, modalityFilter, sortBy])



  return (
    <div className="p-5 br-8">

      <h2 className="text-center">Produtos</h2>
      <div className="row row-cols-1 mt-5">
        <div className="filters col-12 col-md-3">
          <p className="text-success">Filtrar</p>
          <div className="">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value=""></option>
              <option value="price_ascending">Prc Asc</option>
              <option value="price_descending">Prc Desc</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value=""></option>
              <option value="mountain_bike">Mountain Bike</option>
              <option value="dirt_street">Dirt</option>
              <option value="road">Road</option>
            </select>

            <select
              value={modalityFilter}
              onChange={(e) => setModalityFilter(e.target.value)}
            >

              <option value=""></option>
              <option value="mountain_bike">Mountain Bike</option>
              <option value="dirt_street">Dirt</option>
              <option value="road">Road</option>
            </select>

            <input
              type="number"
              value={modalityFilter}
              onChange={(e) => setModalityFilter(e.target.value)}
            />
          </div>
        </div>
        {products.map((product, idx) => {
          return (
            <div className="col-12 col-md-3 flex-wrap" product={product} key={product.id}>
              <a href={"products/" + product.id} className="remove-link">
                <div className="cards-products">
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
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <h4 className="card-title text-center">{product.brand}</h4>
                    <h4 className="card-title text-center">{product.model}</h4>
                  </div>
                  <h4 className="text-center mt-1">
                    {(product.price_in_cents / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </h4>
                  <hr/>
                  <div className="card-content mt-2">
                    <div className="d-flex justify-content-around">
                      <p> {product.locality}</p>
                      <p>{product.product_type.name}</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>

          );
        })}
      </div>
    </div>
  );
}
