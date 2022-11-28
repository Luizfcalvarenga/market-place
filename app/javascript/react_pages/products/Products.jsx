import React, { useEffect, useState } from "react";


export function Products(props) {
  const [products, setProducts] = useState([])
  const [productTypes, setProductTypes] = useState([])
  const [productTypeAttributes, setProductTypeAttributes] = useState([])
  const [attributesForProduct, setAttributesForProduct] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [productTypeFilter, setProductTypeFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [modalityFilter, setModalityFilter] = useState("");
  const [productAttributesFilter, setProductAttributesFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const [sortBy, setSortBy] = useState("");

  useEffect(async () => {
    let url = "/api/v1/products?";
    if (categoryFilter) url = url + `&category=${categoryFilter}`
    if (modalityFilter) url = url + `&modality=${modalityFilter}`
    if (productTypeFilter) url = url + `&product_type_id=${productTypeFilter}`
    if (conditionFilter) url = url + `&condition=${conditionFilter}`
    if (priceFilter) url = url + `&price=${priceFilter}`
    if (productAttributesFilter) url = url + `&product_attribute_value=${productAttributesFilter}`
    if (brandFilter) url = url + `&brand=${brandFilter}`

    if (sortBy) url = url + `&sort_by=${sortBy}`

    const response = await axios.get(url);
    console.log(response)
    setProducts(response.data.products);
    setProductTypes(response.data.product_types)
    setProductTypeAttributes(response.data.product_type_attributes)

  }, [categoryFilter, modalityFilter, sortBy, productTypeFilter, conditionFilter, priceFilter, productAttributesFilter, brandFilter])

  const handleProductAtributes = (e) => {
    console.log(e)
    setProductTypeFilter(e.target.value)
    const attrs = productTypeAttributes.filter(attribute => attribute.product_type_id === Number(e.target.value))
    setAttributesForProduct(attrs)

    if (attrs.length > 1 ) {
      attrs.pop()
      console.log(attrs)
      attrs.shift()
      console.log(attrs)

    }
  }

  const renderProductAttributeSelect = (attribute, index) => {
    // VERIFICAR RETORNO DO ESCOLHA DE TIPO DE SUSPENSÃO PARA COMPONENTO QUADROAPARENTEMENTE PRA QUADRO E HARDTAIL NÃO PERGUNTA CURSO DE NENHUMA SUSPANSÃO(CONFERIR)
    let options = []
    if (["mountain_bike", "dirt_street"].includes(categoryFilter) && attribute.name === "frame_size") {
      options = [ "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL" ]
    } else if (categoryFilter === "road" && attribute.name === "frame_size") {
      options = ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
    } else if (!categoryFilter && attribute.name === "frame_size") {
      options = ["<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "M/L", "XL", "XXL"]
    } else {
      options = attribute.options
    }

    return (
      <div attribute={attribute} key={attribute.id} className="">
        <div id="">
          <label htmlFor="product attribute" className="mt-4" key={index}>{attribute.prompt}</label><br />
          <select
          className="select-answer"
          onChange={(e) => setProductAttributesFilter(e.target.value)}
          >
            <option value=""></option>
            {options?.map((option, index) => {
              return (<option key={index} value={option}>{option}</option>)
            })}
          </select>
        </div>
      </div>
    )
  }

  const handleConditionFilter = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      setConditionFilter(e.target.value)
    } else {
      setConditionFilter("")
    }
  }

  const handlePriceFilter = (e) => {
    setPriceFilter(e.target.value)
    if (e.target.value === "0") {
      setPriceFilter("")
    }
  }

  return (
    <div className="p-5 br-8">
      <h2 className="text-center text-success">Produtos</h2>
      <div className="row row-cols-1 mt-5">
        <div className="filters col-12 col-md-3 my-1">
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

            {!categoryFilter && (<>
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
                <option value="downhill">Downhill</option>
                <option value="enduro">Enduro</option>
                <option value="speed">Speed</option>
                <option value="trail">Trail</option>
                <option value="xc_cross_country">XC Cross Country</option>
                <option value="street_bmx">Street BMX</option>
                <option value="race_bmx">Race BMX</option>
                <option value="big_wheel_bmx">Big Wheel BMX</option>
                <option value="dirt_jump">Dirt Jump</option>
              </select>
            </>)}

            <div className="model-filter">
              <h5 className="text-success mt-3">Marca</h5>
              <input type="text" className="text-input" onChange={(e) => setBrandFilter(e.target.value)}/>
            </div>

            <div className="condition-filter">
              <h5 className="text-success mt-3">condição</h5>
              <div className="d-flex justify-content-between">

                <label htmlFor="new" className="me-2 text-success">
                  <input
                    type="checkbox"
                    value="new"
                    name="condition"
                    onChange={(e) => handleConditionFilter(e)}
                  />  Novo
                </label>

                <label htmlFor="used" className="me-2 text-success">
                <input
                  type="checkbox"
                  value="used"
                  name="condition"
                  onChange={(e) => handleConditionFilter(e)}
                />  Usado
                </label>
              </div>
            </div>

            <div className="price-filter">
              <div className="d-flex justify-content-between">
                <h5 className="text-success mt-3">preço</h5>
                {priceFilter && (<>
                  <h5 className="text-success mt-3">
                  {(priceFilter / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h5>
                </>)}
              </div>
              <input type="range" class="form-range" min="0" max="500000" id="customRange1" step="100" onChange={(e) => handlePriceFilter(e)} />
              <div className="d-flex justify-content-between">
                <h6 className="text-success price-filter-text"><small>R$0,00</small></h6>
                <h6 className="text-success price-filter-text"><small>R$5.000,00</small></h6>
              </div>
            </div>

            {productTypeFilter.length > 1 && (<>
              <h5 className="text-success mt-3">Atributos</h5>
                {attributesForProduct.map((attribute, index) => {
                  return renderProductAttributeSelect(attribute, index)
                  // return (<>
                  //   <h5 className="text-success mt-3">{attribute.prompt}</h5>
                  //   <select
                  //     className="select-answer"
                  //     onChange={(e) => setProductTypeAttributesFilter(e, attribute)}
                  //     >
                  //       {attribute.options.map((option, index) => {
                  //         return (<option key={index} value={option}>{option}</option>)
                  //       })}
                  //   </select>
                  // </>)
                })}
            </>)}

            {productTypeFilter.length === 1 && (<>
              <h5 className="text-success mt-3">Atributos</h5>
                {attributesForProduct.map((attribute, index) => {

                    return renderProductAttributeSelect(attribute, index)
                    // return (<option key={index} value={option}>{option}</option>)

                  // return (<>
                  //   <h5 className="text-success mt-3">{attribute.prompt}</h5>
                  //   <select
                  //     className="select-answer"
                  //     onChange={(e) => setProductTypeAttributesFilter(e, attribute)}
                  //     >
                  //       <option value=""></option>
                  //       {attribute.options.map((option, index) => {
                  //         // return (<option key={index} value={option}>{option}</option>)
                  //       })}
                  //   </select>
                  // </>)
                })}
            </>)}
          </div>
        </div>
        <div className="col-12 col-md-9 d-flex flex-wrap">
          {products.map((product, idx) => {
            return (
              <div className="w-25" product={product} key={product.id}>
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
                    <h3 className="text-center mt-1 product-price">
                      {(product.price_in_cents / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h3>
                    <hr  className="index-line"/>
                    <div className="card-content mt-2">
                      <h4 className="text-center mt-1 product-infos-index">{product.category.name}</h4>
                      <div className="d-flex justify-content-around">
                        <h4 className="product-infos-index"> {product.brand}</h4>
                        <h4 className="product-infos-index">{product.name}</h4>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
