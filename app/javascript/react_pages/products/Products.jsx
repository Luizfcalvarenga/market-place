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
    <div className="vh-40 p-5 br-8">
      <h2>Produtos</h2>
      <div className="d-flex gap-24">
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
          <option value="MTB">MTB</option>
          <option value="BMX">BMX</option>
          <option value="Road">Road</option>
          <option value="Urbano">Urbano</option>
        </select>
        <input
          type="number"
          value={modalityFilter}
          onChange={(e) => setModalityFilter(e.target.value)}
        />
      </div>

      <div className="row row-cols-1 mt-5">
        {products.map((product, idx) => {
          return (
            <div className="col-12 col-md-3" product={product} key={product.id}>
              <a href={"products/" + product.id}>
                <div className="cards-bikes">
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
                    <p className="text-center mt-1">{product.name} | {product.brand}</p>
                    <div className="d-flex justify-content-around">
                      <p>{product.category.name}</p>
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
