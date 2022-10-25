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
  const [locality, setLocality] = useState("");
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


  //////////////////////////////////////////////// frames

  const frameBrands = [ "alfameq",
    "astro",
    "audax",
    "bH",
    "bianchi",
    "bMC",
    "caloi",
    "cannondale",
    "canyon",
    "carrera",
    "cervelo",
    "corratec",
    "cube",
    "dabomb",
    "felt",
    "first",
    "focus",
    "fuji",
    "giant",
    "groove",
    "gT",
    "gTS",
    "ibis",
    "jamis",
    "kona",
    "lapierre",
    "marin",
    "merida",
    "mosso",
    "oggi",
    "orbea",
    "pinarello",
    "raleigh",
    "rava",
    "ridley",
    "santa_cruz",
    "schwinn",
    "scott",
    "sense",
    "soul",
    "specialized",
    "swift Carbon",
    "trek",
    "tsw",
    "wilier",
    "yt",
    "argon_21",
    "bliv",
    "blue",
    "bottecchia",
    "cipollini",
    "cly",
    "cumberland",
    "de_rosa",
    "e_moving",
    "gary_fisher",
    "gioia",
    "kaiena",
    "kestrel",
    "kode",
    "kuota",
    "lazzaretti",
    "lev_e_bike",
    "litespeed",
    "look",
    "lotus",
    "mercian",
    "miyamura Gravel",
    "open",
    "quintana_roo",
    "redland",
    "riva",
    "rose",
    "sava",
    "sundown",
    "time",
    "trinx",
    "trust",
    "velorbis",
    "vicinitech",
    "victory",
    "eddy_merckx",
    "salsa",
    "surly",
    "soma",
    "diamondback",
    "dahon",
    "other"
  ].sort()

  const roadFrameSizes =  [ "<46", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "XXS", "XS", "S", "M", "L", "XL", "XXL"]
  const dirtMtbFrameSizes =   [  "<13''", "14''", "15''", "16''", "17''", "18''", "19''", "20''", "21''", "22''", ">23''", "XXS", "XS", "S", "M", "M/L", "L", "XL", "XXL" ]
  const frameMaterials = [ "aluminum ", "carbon", "carbon_aluminum_chainstay", "other"]

  //////////////////////////////////////////////// suspensions
  const frontSuspensionTravels = ["80 mm", "90 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm"]
  const rearSuspensionTravels = ["80 mm", "100 mm", "110 mm", "120 mm", "130 mm", "140 mm", "150 mm", "160 mm", "170 mm", "180 mm", "200 mm"]

 ///////////////////////////////////////////////// brake

  const brakeTypes = [ "v_brake", "hydraulic_disc", "mechanical_disc", "coaster_brake", "caliper" ]


  //////////////////////////////////////////////// seat post

  const seatPostTravels = ["50 mm", "70 mm", "75 mm","100 mm","125 mm","150 mm","175 mm","200 mm" ]

  /////////////////////////////////////////////// gears

  const frontGears = [1, 2, 3]
  const rearGears = [1, 7, 8, 9, 10, 11, 12]

  ///////////////////////////////////////////// rim

  const rimSizes = [ "20''", "24''", "26''", "27,5''", "27,5'' Plus", "29''", "29'' Plus", "700C", "650B", "Fatbike"]

  /////////////////////////////////////////// conditions

  const structuralVisualConditions = ["perfect_condition", "minor_surface_scratches", "spalls_in_paint", "painted_frame", "frame_welded_repaired", "frame_cracks_or_fissures_must_be_repaired", "components_welded_repaired", "components_cracks_or_fissures_must_be_repaired" ]
  const operatingConditions = ["rears_worn_out_higher_75", "hifters_not_working_properly", "front_suspension_not_working_properly", "rear_suspension_not_working_properly", "suspensions_lock_not_working_properly", "brake_not_working_properly", "retractable_seat_post_not_working_properly", "creaking_when_pedaling", "wheels_bent", "tyres_worn_out_minus_50"]

 ////////////////////////////////////////////////// documentation

 const documentationTypes = ["Nota fiscal", "Documento de importação", "Cupom Fiscal Estrangeiro", "Sem Documento"]

 //////////////////////////////////////////////// batteries

 const batteries = ["320wH", "500Wh", "625Wh", "700Wh", "other"]

  return (

    <div className="w-60 text-center new-bike-react py-5">
      <h1 className="text-success">Anuncie aqui</h1>
      <div className="card-bike-select mb-5">
        <label htmlFor="category" className="">Qual a categoria da sua bicicleta?</label>
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


        {category  && category != "other" && (<>
          <label htmlFor="modality" className="mt-3">Qual a modalidade da sua bicicleta?</label>
          <select
            value={modality}
            onChange={(e) => e.preventDefault && setModality(e.target.value)}
            className="select-answer"
          >
            {modalities.map((modality, index) => {
              return (<option key={index}>{modality}</option>);
            })}
          </select>
        </>)}

        {modality && (<>
          <label htmlFor="bikeType" className="mt-3">Qual o tipo da sua bicicleta?</label>
          <select
            class="select-answer"
            value={bikeType}
            onChange={(e) => setBikeType(e.target.value)}

          >
            <option>electric</option>
            <option>no_electric</option>
          </select>
        </>)}
      </div>

      { bikeType && (<>
        <div className="card-bike-select mb-5">
          {bikeType === "electric" && (<>
            <label htmlFor="frameSize" className="mt-3">Qual a bateria da sua bike?</label>
            <select
              class="select-answer"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
            >
              {batteries.map((battery, index)=> {
                return (<option key={index}>{battery}</option>);
              })}
            </select>

          </>)}
          <label htmlFor="frameBrand" className="mt-3">Qual a marca do quadro?</label>
          <select
            class="select-answer"
            value={frameBrand}
            onChange={(e) => setFrameBrand(e.target.value)}

          >
            {frameBrands.map((frameBrand, index) => {
              return (<option key={index}>{frameBrand}</option>);
            })}
          </select>

          {category === "road" && (<>
            <label htmlFor="frameSize" className="mt-3">Qual o tamanho do quadro?</label>
            <select
              class="select-answer"
              value={frameSize}
              onChange={(e) => setFrameSize(e.target.value)}

            >
              {roadFrameSizes.map((frameSize, index)=> {
                return (<option key={index}>{frameSize}</option>);
              })}
            </select>

          </>)}

          {["dirt_street", "mountain_bike"].includes(category) && (<>
            <label htmlFor="frameSize" className="mt-3">Qual o tamanho do quadro?</label>
            <select
              class="select-answer"
              value={frameSize}
              onChange={(e) => setFrameSize(e.target.value)}

            >
              {dirtMtbFrameSizes.map((frameSize, index)=> {
                return (<option key={index}>{frameSize}</option>);
              })}
            </select>

          </>)}

          <label htmlFor="frameMaterial" className="mt-3">Qual o material do quadro?</label>
          <select
            class="select-answer"
            value={frameMaterial}
            onChange={(e) => setFrameMaterial(e.target.value)}

          >
            {frameMaterials.map((frameMaterial, index)=> {
              return (<option key={index}>{frameMaterial}</option>);
            })}
          </select>

          <label htmlFor="suspensionType" className="mt-3">Qual o tipo de suspensão?</label>
          <select
            class="select-answer"
            value={suspensionType}
            onChange={(e) => setSuspensionType(e.target.value)}

          >
            <option>full_suspension</option>
            <option>hard_tail</option>
          </select>

          <br/>

          {suspensionType === "full_suspension" && (<>
            <label htmlFor="frontSuspensionTravel" className="mt-3">Suspensão dianteira?</label>
            <select
              class="select-answer"
              value={frontSuspensionTravel}
              onChange={(e) => setFrontSuspensionTravel(e.target.value)}

            >
              {frontSuspensionTravels.map((frontSuspensionTravel, index)=> {
                return (<option key={index}>{frontSuspensionTravel}</option>);
              })}
            </select>

            <br/>

            <label htmlFor="rearSuspensionTravel" className="mt-3">Suspensão traseira?</label>
            <select
              class="select-answer"
              value={rearSuspensionTravel}
              onChange={(e) => setRearSuspensionTravel(e.target.value)}

            >
              {rearSuspensionTravels.map((rearSuspensionTravel, index)=> {
                return (<option key={index}>{rearSuspensionTravel}</option>);
              })}
            </select>
          </>)}

          {suspensionType === "hard_tail" && (<>
            <label htmlFor="rearSuspensionTravel" className="mt-3">Suspensão traseira?</label>
            <select
              class="select-answer"
              value={rearSuspensionTravel}
              onChange={(e) => setRearSuspensionTravel(e.target.value)}

            >
              {rearSuspensionTravels.map((rearSuspensionTravel, index)=> {
                return (<option key={index}>{rearSuspensionTravel}</option>);
              })}
            </select>
          </>)}

          <label htmlFor="brakeType" className="mt-3">Qual o tipo de freio?</label>
          <select
            class="select-answer"
            value={brakeType}
            onChange={(e) => setBrakeType(e.target.value)}

          >
            {brakeTypes.map((brakeType, index)=> {
              return (<option key={index}>{brakeType}</option>);
            })}
          </select>

          <label htmlFor="seatPostType" className="mt-3">Qual o tipo de canote?</label>
          <select
            class="select-answer"
            value={seatPostType}
            onChange={(e) => setSeatPostType(e.target.value)}

          >
            <option>retractable</option>
            <option>rigid</option>
          </select>

          {seatPostType === "retractable" && (<>
            <label htmlFor="seatPostTravel" className="mt-3">Qual o curso do canote?</label>
            <select
              class="select-answer"
              value={seatPostTravel}
              onChange={(e) => setSeatPostTravel(e.target.value)}

            >
              {seatPostTravels.map((seatPostTravel, index)=> {
                return (<option key={index}>{seatPostTravel}</option>);
              })}
            </select>
          </>)}

          <br />

          <label htmlFor="numberOfFrontGears" className="mt-3">Marchas dianteiras?</label>
          <select
            class="select-answer"
            value={numberOfFrontGears}
            onChange={(e) => setNumberOfFrontGears(e.target.value)}

          >
            {frontGears.map((frontGear, index)=> {
              return (<option key={index}>{frontGear}</option>);
            })}
          </select>

          <label htmlFor="numberOfRearGears" className="mt-3">Marchas traseiras?</label>
          <select
            class="select-answer"
            value={numberOfRearGears}
            onChange={(e) => setNumberOfRearGears(e.target.value)}

          >
            {rearGears.map((rearGear, index)=> {
              return (<option key={index}>{rearGear}</option>);
            })}
          </select>

          <br />

          <label htmlFor="rimSize" className="mt-3">Tamanho do aro?</label>
          <select
            class="select-answer"
            value={rimSize}
            onChange={(e) => setRimSize(e.target.value)}

          >
            {rimSizes.map((rimSize, index)=> {
              return (<option key={index}>{rimSize}</option>);
            })}
          </select>

          <br />

          <label htmlFor="rimSize" className="mt-3">Qual a condição da bike?</label>
          <select
            class="select-answer"
            value={bikeCondition}
            onChange={(e) => setBikeCondition(e.target.value)}

          >
            <option>used</option>
            <option>new</option>
          </select>

          <br />

          {bikeCondition === "used" && (<>

            <label htmlFor="structuralVisualCondition" className="mt-3">Qual a condição estrutural/visual?</label>
            <select
              class="select-answer"
              value={structuralVisualCondition}
              onChange={(e) => setStructuralVisualCondition(e.target.value)}

            >
              {structuralVisualConditions.map((structuralVisualCondition, index)=> {
                return (<option key={index}>{structuralVisualCondition}</option>);
              })}
            </select>

            <br />

            <label htmlFor="operatingCondition" className="mt-3">Qual a condição estrutural/visual?</label>
            <select
              class="select-answer"
              value={operatingCondition}
              onChange={(e) => setOperatingCondition(e.target.value)}

            >
              {operatingConditions.map((operatingCondition, index)=> {
                return (<option key={index}>{operatingCondition}</option>);
              })}
            </select>
          </>)}

          <br />

          <label htmlFor="documentationType" className="mt-3">Sua bike possui documentação?</label>
          <select
            class="select-answer"
            value={documentationType}
            onChange={(e) => setDocumentationType(e.target.value)}

          >
            {documentationTypes.map((documentationType, index)=> {
              return (<option key={index}>{documentationType}</option>);
            })}
          </select>


          <div className="d-flex mt-3">
            <div className="input-group input-group-sm mb-3 w-50">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Ano</span>
              </div>
              <input type="text" className="form-control" placeholder=""  value={year} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setYear(e.target.value)}/>
            </div>

            <div className="input-group input-group-sm mb-3 w-50">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Modelo</span>
              </div>
              <input type="text" className="form-control" placeholder="" value={model} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setModel(e.target.value)}/>
              { errors && errors.product && errors.product.name && (
                <p className="text-danger">{errors.product.name}</p>
              )}
            </div>
          </div>

          <div className="d-flex">
            <div className="input-group input-group-sm mb-3 w-50">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Qual seu preço?</span>
              </div>
              <input type="text" className="form-control" placeholder="" value={priceInCents} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setPriceInCents(e.target.value)}/>
              { errors && errors.product && errors.product.name && (
                <p className="text-danger">{errors.product.name}</p>
              )}
            </div>

            <div className="input-group input-group-sm mb-3 w-50">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">quantity</span>
              </div>
              <input type="text" className="form-control" placeholder="" value={quantity} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setQuantity(e.target.value)}/>
              { errors && errors.product && errors.product.name && (
                <p className="text-danger">{errors.product.name}</p>
              )}
            </div>
          </div>

          <div className="d-flex">
            <div className="input-group input-group-sm mb-3 w-50">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Peso da sua bicicleta?</span>
              </div>
              <input type="text" className="form-control" placeholder="" value={weight} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setWeight(e.target.value)}/>
              { errors && errors.product && errors.product.name && (
                <p className="text-danger">{errors.product.name}</p>
              )}
            </div>

            <div className="input-group input-group-sm mb-3 w-50">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Cidade</span>
              </div>
              <input type="text" className="form-control" placeholder=""  value={locality} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setLocality(e.target.value)}/>
            </div>
          </div>

          <div className="input-group input-group-sm mb-3 w-50">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">De uma descrição:</span>
            </div>
            <input type="text" className="form-control" placeholder=""  value={description} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setDescription(e.target.value)}/>
          </div>







        </div>

      </>)}

    </div>


  );
}
