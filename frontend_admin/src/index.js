import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import HomePage from "views/HomePage/HomePage.js";
import VerifyPage from "views/VerifyPage/VerifyPage.js";
import IssuePage from "views/IssuePage/IssuePage.js";
import ViewCertPage from "views/ViewCertPage/ViewCert.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";
import AdminPage from "views/AdminPage/AdminPage.js";

var hist = createBrowserHistory();

// const NodeRSA = require("node-rsa");
// const key = new NodeRSA({ b: 512 });

// // generate public key
// var keydata = key.exportKey("pkcs1-public-pem");
// var k2 = new NodeRSA(keydata, "pkcs1-public-pem");

// // generate private key
// // var keydata = key.exportKey("pkcs8");
// // var k2 = new NodeRSA(keydata, "pkcs8");

// localStorage.setItem("public key", k2);

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/verify-page" component={VerifyPage} />
      <Route path="/issue-page" component={IssuePage} />
      <Route path="/view-cert" component={ViewCertPage} />
      <Route path="/register-page" component={RegisterPage} />
      <Route path="/admin-panel" component={AdminPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
