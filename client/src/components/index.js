import React from "react";
import "antd-mobile/dist/antd-mobile.css";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import TestingPage from "./TestingPage";
import NotFoundPage from "./NotFoundPage";
import DashboardPage from "./DashBoardPage";
import AuthPage from "./AuthPage";

const LocationTest = () => <div>location</div>;

// no login info, redirect to login
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/auth" component={AuthPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/testing" component={TestingPage} />
      <Route exact path="/:unfoundLocation" component={NotFoundPage} />
      <Redirect to="/dashboard" />
    </Switch>
  </BrowserRouter>
);

export default Router;
