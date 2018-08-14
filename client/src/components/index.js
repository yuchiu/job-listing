import React from "react";
import "antd-mobile/dist/antd-mobile.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import TestingPage from "./TestingPage";
import LandingPage from "./LandingPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/testing" component={TestingPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
