import React, { useEffect, useState } from "react";

export function BikeForm(props) {
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState("");
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [modalities, setModalities] = useState([]);
  const [modality, setModality] = useState("");
  const [bikeType, setBikeType] = useState("");
  const [priceInCents, setPriceInCents] = useState(null);
  const [quantity, setQuantity ] = useState(null);
  const [frameBrand, setFrameBrand] = useState("");
  const [frameSize, setFrameSize] = useState("");
  const [frameMaterial, setFrameMaterial] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [rimSize, setRimSize] = useState("");
  const [numberOfFrontGears, setNumberOfFrontGears] = useState("");
  const [numberOfRearGears, setNumberOfRearGears] = useState("");
  const [brakeType, setBrakeType] = useState("");
  const [suspensionType, setSuspensionType] = useState("");
  const [frontSuspensionTravel, setFrontSuspensionTravel] = useState("");
  const [rearSuspensionTravel, setRearSuspensionTravel] = useState("");
  const [seatPostType, setSeatPostType] = useState("");
  const [seatPostTravel, setSeatPostTravel] = useState("");
  const [weight, setWeight] = useState("");
  const [bikeCondition, setBikeCondition] = useState("");
  const [structuralVisualCondition, setStructuralVisualCondition] = useState("");
  const [operatingCondition, setOperatingCondition] = useState("");
  const [documentationType, setDocumentationType] = useState("");
  const [description, setDescription] = useState("");
  const [accessories, setAccessories] = useState("");
  const [battery, setBattery] = useState("");
  const [photos, setPhotos ] = useState(null);

  const [errors, setErrors] = useState({
    bike: {},
    photos: {},
  });

  useEffect(() => {
    fetch(`/get_information_for_new_bike`)
     .then((response) => response.json())
     .then((data) => {
      setCategories(data.categories)
      setUser(data.user.id)
      setServices(data.services)
     })
    // if (props.productId) {
    //   fetchProduct();
    //   setProductId(props.productId)

    // }
  }, []);

  useEffect(() => {
    if (category) {
      setModalities(categories.find(element => element.name === category).modalities)
      setCategoryId(categories.find(element => element.name === category).id);
    }
  });

  // async function fetchBike() {
  //   const response = await axios.get(
  //     `http://localhost:3000/api/v1/products/${props.productId}/edit`
  //   );
  //   alert(JSON.stringify(response.data))
  //   if (response.data) {
  //     // const category = categories.find(element => element.id === response.data.product.category_id).name
  //     setUser(response.data.product.user_id);
  //     setProductTypeId(response.data.product.product_type_id);
  //     setCategoryId(response.data.product.category_id);
  //     // setProductCategory(category);
  //     setProductModality(response.data.product.modality);
  //     setProductBrand(response.data.product.brand);
  //     setProductName(response.data.product.name);
  //     setProductDescription(response.data.product.description);
  //     setProductPrice(response.data.product.price_in_cents);
  //     setProductQuantity(response.data.product.quantity);
  //     setProductAttributes(
  //       response.data.product_attributes
  //     );
  //   }
  // }


  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const dataObject = new FormData();
  //   dataObject.append( "product[user_id]", user );
  //   dataObject.append( "product[category_id]", categoryId );
  //   dataObject.append( "product[modality]", productModality );
  //   dataObject.append( "product[product_type_id]", productTypeId );
  //   dataObject.append( "product[brand]", productBrand );
  //   dataObject.append( "product[name]", productName );
  //   dataObject.append( "product[description]", productDescription );
  //   dataObject.append( "product[price_in_cents]", productPrice );
  //   dataObject.append( "product[quantity]", productQuantity );
  //   productPhotos.map((photo) => {
  //     dataObject.append( "product[photos][]", photo );
  //   })
  //   for (const [key, value] of Object.entries(productAttributes)) {
  //     console.log(`${key}: ${value}`);
  //     dataObject.append( `product[productAttributes][${key}]`, value );
  //   }

  //   const product = {
  //     user_id: user,
  //     category_id: categoryId,
  //     modality: productModality,
  //     product_type_id: productTypeId,
  //     brand: productBrand,
  //     name: productName,
  //     description: productDescription,
  //     price_in_cents: productPrice,
  //     quantity: productQuantity,
  //     photos: productPhotos,
  //     productAttributes,
  //     service: productServiceId

  //   }

  //   const url = props.productId
  //   ? `/api/v1/products/${props.productId}`
  //   : "/api/v1/products";
  //   const method = props.productId ? 'patch' : 'post';

  //   const response = await axios[method](url, dataObject);
  //   if (response.data.success) {
  //     window.location = response.data.redirect_url;
  //   } else {
  //     setErrors(response.data.errors);
  //     alert(
  //       "Erro ao criar a produto: " + JSON.stringify(response.data.errors)
  //     );
  //   }
  // }


  return (

    <div className="w-60 text-center new-bike-react py-5">
      <h1 className="text-success">Anuncie aqui</h1>
      <div className="card-bike-select d-flex mb-5">
        <label htmlFor="category" className="mb-3">Qual a categoria do seu produto?</label>
        <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select-answer"
        >
          {categories.map((category) => {
            return (<option key={category.id} value={category.name} className="answers-options">{category.name}</option>)
          })}
        </select>
        {category === "other" && (
          <>
            <label htmlFor="category" className="mx-3">Qual?</label>
            <input type="text" />
          </>
        )}


        {category  && category != "other" && (
          <div className="card-questions mb-5">
            <label htmlFor="modality" className="mb-3">Qual a novalidate do seu products?</label>
            <select
              value={modality}
              onChange={(e) => e.preventDefault && setModality(e.target.value)}
              className="select-answer"
            >
              {modalities.map((modality, index) => {
                return (<option key={index}>{modality}</option>);
              })}
            </select>
          </div>
        )}
      </div>

    </div>


  );
}
