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

      <div>
        {bikes.map((bike) => {
          return (
            <p>
              #{bike.id} - {bike.category} - Age: {bike.age} - Size: {bike.size}
            </p>
          );
        })}
      </div>
    </div>
  );
}
