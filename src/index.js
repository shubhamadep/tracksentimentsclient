import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

//context
import ProductDetailsProvider from 'contexts/ProductDetailsContext';

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
    <ProductDetailsProvider>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
      </ProductDetailsProvider>
    </Router>,
  document.getElementById("root")

);
