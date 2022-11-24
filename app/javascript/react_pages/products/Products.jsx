import React, { useEffect, useState } from "react";


export function Products(props) {
  const [products, setProducts] = useState([])
  const [productTypes, setProductTypes] = useState([])
  const [productTypeAttributes, setProductTypeAttributes] = useState([])
  const [attributesForProduct, setAttributesForProduct] = useState([]);



  const [categoryFilter, setCategoryFilter] = useState("");
  const [productTypeFilter, setProductTypeFilter] = useState("");

  const [modalityFilter, setModalityFilter] = useState("");

  const [productTypeAttributesFilter, setProductTypeAttributesFilter] = useState("");

  const [sortBy, setSortBy] = useState("");

  useEffect(async () => {
    let url = "/api/v1/products?";
    if (categoryFilter) url = url + `&category=${categoryFilter}`
    if (modalityFilter) url = url + `&modality=${modalityFilter}`
    if (productTypeFilter) url = url + `&product_type_id=${productTypeFilter}`
    if (productTypeAttributesFilter) url = url + `&product_type_id=${productTypeAttributesFilter}`


    if (sortBy) url = url + `&sort_by=${sortBy}`

    const response = await axios.get(url);
    console.log(response)
    setProducts(response.data.products);
    setProductTypes(response.data.product_types)
    setProductTypeAttributes(response.data.product_type_attributes)

  }, [categoryFilter, modalityFilter, sortBy, productTypeFilter])

  const handleProductAtributes = (e) => {
    console.log(e)
    setProductTypeFilter(e.target.value)
    setAttributesForProduct(productTypeAttributes.filter(productType => productType.product_type_id === productTypeFilter))
    console.log(attributesForProduct)
  }

  return (
    <div className="p-5 br-8">

      <h2 className="text-center">Produtos</h2>
      <div className="row row-cols-1 mt-5">
        <div className="filters col-12 col-md-3">
          <p className="text-success">Filtrar</p>
          <div className="">
            <h5 className="text-success">Produto</h5>
            <select
              value={productTypeFilter}
              onChange={(e) => handleProductAtributes(e)}
              className="select-answer"
            >
              <option value=""></option>
              {productTypes.map((productType) => {
                return (<option value={productType.id}>{productType.name}</option>)
              })}
            </select>

            <h5 className="text-success mt-3">categoria</h5>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="select-answer"
            >
              <option value=""></option>
              <option value="mountain_bike">Mountain Bike</option>
              <option value="dirt_street">Dirt</option>
              <option value="road">Road</option>
              <option value="infant">Infantil</option>
              <option value="urban">Urbano</option>
            </select>

            {/* <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value=""></option>
              <option value="price_ascending">Prc Asc</option>
              <option value="price_descending">Prc Desc</option>
            </select> */}

            {categoryFilter === "mountain_bike" && (<>
              <h5 className="text-success mt-3">Modalidade</h5>
              <select
                value={modalityFilter}
                onChange={(e) => setModalityFilter(e.target.value)}
                className="select-answer"

              >
                <option value=""></option>
                <option value="downhill">Downhill</option>
                <option value="enduro">Enduro</option>
                <option value="gravel">Gravel</option>
                <option value="speed">Speed</option>
                <option value="trail">Trail</option>
                <option value="xc_cross_country">XC Cross Country</option>
              </select>
            </>)}

            {categoryFilter === "dit_street" && (<>
              <h5 className="text-success mt-3">Modalidade</h5>
              <select
                value={modalityFilter}
                onChange={(e) => setModalityFilter(e.target.value)}
                className="select-answer"

              >
                <option value=""></option>
                <option value="street_bmx">Street BMX</option>
                <option value="race_bmx">Race BMX</option>
                <option value="big_wheel_bmx">Big Wheel BMX</option>
                <option value="dirt_jump">Dirt Jump</option>
              </select>
            </>)}

            {categoryFilter === "road" && (<>
              <h5 className="text-success mt-3">Modalidade</h5>
              <select
                value={modalityFilter}
                onChange={(e) => setModalityFilter(e.target.value)}
                className="select-answer"

              >
                <option value=""></option>
                <option value="speed_performance">Speed Performance</option>
                <option value="triathlon">triathon</option>
                <option value="ciclocross">Ciclocross</option>
                <option value="cicloviagem">Cicloviagme</option>
                <option value="gravel">Gravel</option>

              </select>
            </>)}

            {productTypeFilter && (<>
              <h5 className="text-success mt-3">Atributos</h5>
                {attributesForProduct.map((attribute) => {

                  <>
                    <h5 className="text-success mt-3">{productTypeAttribute.prompt}</h5>
                    <select
                      value={productTypeAttributesFilter}
                      onChange={(e) => setProductTypeAttributesFilter(e.target.value)}
                      className="select-answer"
                    >
                      <option value=""></option>

                      {attribute.options.map((option, index) => {
                        return (<option key={index} value={option}>{option}</option>)
                      })}
                    </select>
                  </>
                })}
            </>)}

            {/* <input
              type="number"
              value={modalityFilter}
              onChange={(e) => setModalityFilter(e.target.value)}
            /> */}
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
                  <h4 className="card-title text-center mt-3">{product.product_type.name}</h4>
                  <h4 className="text-center mt-1">
                    {(product.price_in_cents / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </h4>
                  <hr/>
                  <div className="card-content mt-2">
                    <p className="text-center mt-1">{product.category.name} | {product.modality}</p>
                    <div className="d-flex justify-content-around">
                      <p> {product.brand}</p>
                      <p>{product.name}</p>
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
