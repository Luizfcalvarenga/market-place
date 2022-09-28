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

// Import components and pages
import { ReactPage } from "../react_pages/ReactPage";
import { Bikes } from "../react_pages/bikes/Bikes";
import { Products } from "../react_pages/products/Products";
import { Product } from "../react_pages/products/Product";
import { NewProduct } from "../react_pages/products/NewProduct";




document.addEventListener("turbolinks:load", () => {
  const reactContainer = document.querySelector("react");

  if (!reactContainer || !reactContainer.dataset.component) return;

  const components = {
    ReactPage: <ReactPage message={reactContainer.dataset.message} />,
    Bikes: <Bikes galo="doido" batata={2} />,
    Products: <Products />,
    Product: <Product />,
    NewProduct: <NewProduct/>,

  };

  ReactDOM.render(
    components[reactContainer.dataset.component],
    reactContainer
  );
});
