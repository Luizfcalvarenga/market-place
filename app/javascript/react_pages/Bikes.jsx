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
    <div className="vh-40 p-5 br-8">
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
        {bikes.map((bike) => {
          return (
            <div className="col-12 col-md-3">
              <div className="cards-bikes">
              <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="bike-card.png" class="d-block w-100 img-card-index" alt="" />
                  </div>
                  <div class="carousel-item">
                    <img src="bike-card.png" class="d-block w-100 img-card-index" alt="" />
                  </div>
                  <div class="carousel-item">
                    <img src="bike-card.png" class="d-block w-100 img-card-index" alt="" />
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
                <p>
                  #{bike.id} - {bike.category} - Age: {bike.age} - Size: {bike.size}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
