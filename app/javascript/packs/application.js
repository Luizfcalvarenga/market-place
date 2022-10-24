// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import React from "react";
import ReactDOM from "react-dom";
import "trix";
import "@rails/actiontext";

import "../stylesheets/application";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

// External imports
import "bootstrap";

// Internal imports
import "./components/form_navbar";
import "./mask";
import "./payment_pooling";

// Import components and pages
import { ReactPage } from "../react_pages/ReactPage";
import { Bikes } from "../react_pages/bikes/Bikes";
import { Products } from "../react_pages/products/Products";
import { Product } from "../react_pages/products/Product";
import { ProductForm } from "../react_pages/products/ProductForm";






document.addEventListener("turbolinks:load", () => {
  const reactContainers = document.querySelectorAll("react");

  if (!reactContainers) return;
  reactContainers.forEach((reactContainer) => {

    const components = {
      ReactPage: <ReactPage message={reactContainer.dataset.message} />,
      Bikes: (
        <Bikes
          bikes={reactContainer.dataset.bikes}
          batata={2}
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
