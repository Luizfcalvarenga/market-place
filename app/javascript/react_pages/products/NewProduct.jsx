import React, { useEffect, useState } from "react";

export function NewProduct(props) {
  const [newProduct, setNewProduct] = useState({});
  const [user, setUser] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productTypeId, setProductTypeId] = useState();
  const [selectedProductTypeId, setSelectedProductTypeId] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalities, setModalities] = useState([]);
  const [selectedModality, setSelectedModality] = useState("");
  const [productTypeAttributes, setProductTypeAttributes] = useState([]);
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(null);
  const [productQuantity, setProductQuantity ] = useState(null);

  useEffect(() => {
    fetch(`/get_information_for_new_product`)
     .then((response) => response.json())
     .then((data) => {
      setProductTypes(data.types_of_product)
      setCategories(data.categories)
      setUser(data.user.id)
     })
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setModalities(categories.find(element => element.name === selectedCategory).modalities)
      setCategoryId(categories.find(element => element.name === selectedCategory).id);
    }
  });


  useEffect(() => {
    if(selectedProductTypeId) {
      fetch(`/get_attributes_for_product?product_type_id=${selectedProductTypeId}`)
      .then((response) => response.json())
      .then((data) => {


        setProductTypeAttributes(
          data
        );
      })
    }
  }, [selectedProductTypeId]);

  // useEffect(() => {
  //   if (selectedProductTypeId) {
  //     setProductTypeId(productTypes.find(element => element.name === selectedProductTypeId).id);
  //   }
  // })

  const createProductAttributes = (e, attribute) => {

    axios.post('', {
      product_id: productTypeId,
      product_type_attribute_id: attribute.id,
      value: e.target.value,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  const handleSubmit = () => {

    const product = {
      user_id: user,
      category_id: categoryId,
      modality: selectedModality,
      product_type_id: selectedProductTypeId,
      brand: productBrand,
      name: productName,
      description: productDescription,
      price_in_cents: productPrice,
      quantity: productQuantity

    }

    console.log(newProduct)

    axios.post('/api/v1/products', {
      product
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
    <div className="">
      <h1>Cheguei</h1>
      <form>

        <label htmlFor="category">Qual a categoria do seu produto?</label><br />
        <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => {
            return (<option key={category.id} value={category.name}>{category.name}</option>)
          })}
        </select>


        <br />

        {selectedCategory === "other" && (
          <>
            <label htmlFor="category">Qual?</label>
            <input type="text" />
          </>
        )}

        <br />

        {selectedCategory && selectedCategory != "other" && (
          <><label htmlFor="modality">Qual a modalidade do seu produto?</label><select
              value={selectedModality}
              onChange={(e) => e.preventDefault && setSelectedModality(e.target.value)}
            >
              {modalities.map((modality, index) => {
                return (<option key={index}>{modality}</option>);
              })}
            </select></>
        )}

        <br />
        {selectedModality && (
          <><label htmlFor="product">O que deseja anunciar?</label>
          <select
          value={selectedProductTypeId}
          onChange={(e) => setSelectedProductTypeId(e.target.value)}
          >
            {productTypes.map((productType) => {
              return (<option key={productType.id} value={productType.id}>{productType.name}</option>)
            })}
          </select></>
        )}

        <br />
        {selectedProductTypeId && productTypeAttributes && (

          <div>
            <p>{JSON.stringify(productTypeAttributes)}</p>
            {productTypeAttributes.map((attribute) => {
              return (
                <><div attribute={attribute} key={attribute.id}>

                  <label htmlFor="product attribute" key={attribute.id}>{attribute.prompt}</label><br />
                  {/* <select

                  onChange={(e) => createProductAttributes(e, attribute)}
                  >
                    {attribute.options?.map((option) => {
                      return (<option value={option}>{option}</option>)
                    })}
                  </select> */}
                </div></>
              )
            })}

            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Marca</span>
              </div>
              <input type="text" className="form-control" placeholder="Marca" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductBrand(e.target.value)}/>
            </div>

            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Nome</span>
              </div>
              <input type="text" className="form-control" placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductName(e.target.value)}/>
            </div>

            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Descrição</span>
              </div>
              <input type="text" className="form-control" placeholder="Descrição" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductDescription(e.target.value)}/>
            </div>

            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">RS</span>
              </div>
              <input type="number" className="form-control" placeholder="Preço" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductPrice(e.target.value)}/>
            </div>

            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Quantidade</span>
              </div>
              <input type="number" className="form-control" placeholder="Quantidade" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setProductQuantity(e.target.value)}/>
            </div>
          </div>
        )}

        <br />

        <input type="radio" name="" id="" onChange={(e) => console.log(newProduct)}/>
        <button onClick={() => handleSubmit()}>Criar Produto</button>




      </form>
    </div>
  );
}
