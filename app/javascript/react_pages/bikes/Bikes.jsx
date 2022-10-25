import React, { useEffect, useState } from "react";

export function Bikes(props) {
  const [bikes, setBikes] = useState([])
  const [categoryFilter, setCategoryFilter] = useState("");
  const [maxAgeFilter, setMaxAgeFilter] = useState(0);
  const [galoFilter, setGaloFilter] = useState("")
  const [sortBy, setSortBy] = useState("");

  useEffect(async () => {
    let url = "/api/v1/bikes?";
    if (categoryFilter) url = url + `&category=${categoryFilter}`
    if (maxAgeFilter) url = url + `&max_age=${maxAgeFilter}`
    if (sortBy) url = url + `&sort_by=${sortBy}`

    const response = await axios.get(url);
    setBikes(response.data.bikes);
  }, [categoryFilter, maxAgeFilter, sortBy])

  return (
    <div className="p-5 br-8">
      <h2>Bikes</h2>
      <div className="d-flex gap-24">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value=""></option>
          <option value="age_ascending">Age Asc</option>
          <option value="age_descending">Age Desc</option>
          <option value="size_ascending">Size Asc</option>
          <option value="size_descending">Size Desc</option>
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
          value={maxAgeFilter}
          onChange={(e) => setMaxAgeFilter(e.target.value)}
        />

        {categoryFilter === "MTB" && (
          <div>
            <input
              type="number"
              value={galoFilter}
              onChange={(e) => setGaloFilter(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="row row-cols-1 mt-5">
        {bikes.map((bike, idx) => {
          return (
            <div className="col-12 col-md-3 flex-wrap" bike={bike} key={bike.id}>
            <a href={"bikes/" + bike.id} className="remove-link">
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
                <h4 className="card-title text-center mt-3">{bike.model}</h4>
                <h4 className="text-center mt-1">
                  {(bike.price_in_cents / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h4>
                <hr/>
                <div className="card-content mt-2">
                  <p className="text-center mt-1">{bike.category.name} | {bike.modality}</p>
                  <div className="d-flex justify-content-around">
                    <p>{bike.suspension_type}</p>
                    <p>{bike.brake_type}</p>
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
