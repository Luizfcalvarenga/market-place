// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
// import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import React from "react";
import ReactDOM from "react-dom";
// import "trix";
// import "@rails/actiontext";
import "@hotwired/turbo-rails"
import "../stylesheets/application";

Rails.start();
Turbo.start();
ActiveStorage.start();

// External imports
import "bootstrap";

// Internal imports
import "controllers"
import "channels"

import "./components/form_navbar";
import "./components/chat_mobile";
import "./components/mobile_search";
import "./components/bottom_navbar_btn";
import "./components/toggle_password";
import "./components/enlarge_chat_img";






import "./mask";
import "./payment_pooling";

// Import components and pages
import { ReactPage } from "../react_pages/ReactPage";
import { Bikes } from "../react_pages/bikes/Bikes";
import { Bike } from "../react_pages/bikes/Bike";
import { BikeForm } from "../react_pages/bikes/BikeForm";
import { Products } from "../react_pages/products/Products";
import { Product } from "../react_pages/products/Product";
import { ProductForm } from "../react_pages/products/ProductForm";


document.addEventListener("turbo:load", () => {
  const reactContainers = document.querySelectorAll("react");

  if (!reactContainers) return;
  reactContainers.forEach((reactContainer) => {

    const components = {
      ReactPage: <ReactPage message={reactContainer.dataset.message} />,
      Bikes: (
        <Bikes
          bikes={reactContainer.dataset.bikes}
        />
      ),
      Bike: (
        <Bike
          bikeId={reactContainer.dataset.bikeId}
          userPresent={reactContainer.dataset.userPresent}
          currentUser={reactContainer.dataset.currentUser}

        />
      ),
      BikeForm: (
        <BikeForm
          bikeId={reactContainer.dataset.bikeId}
        />
      ),
      Products: (
        <Products
          products={reactContainer.dataset.products}
        />
      ),
      Product: (
        <Product
          productId={reactContainer.dataset.productId}
          productAttributes={reactContainer.dataset.productAttributes}
          userPresent={reactContainer.dataset.userPresent}
          currentUser={reactContainer.dataset.currentUser}

        />
      ),
      ProductForm: (
        <ProductForm
          productId={reactContainer.dataset.productId}
          // productAttributes={reactContainer.dataset.productAttributes}
        />
      ),
    };

    ReactDOM.render(
      components[reactContainer.dataset.component],
      reactContainer
    );
  })
});
