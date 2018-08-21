import React from "react";
import "antd-mobile/dist/antd-mobile.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { auth } from "../utils";
import TestingPage from "./TestingPage";
import NotFoundPage from "./NotFoundPage";
import DashboardPage from "./DashBoardPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import BossInfoPage from "./BossInfoPage";
import GeniusInfoPage from "./GeniusInfoPage";
import "../utils/interceptors";
import "../index.css";

// eslint-disable-next-line
const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

const Router = () => (
  <BrowserRouter>
    <Switch>
      <AuthenticatedRoute exact path="/" component={DashboardPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />
      <AuthenticatedRoute exact path="/bossinfo" component={BossInfoPage} />
      <AuthenticatedRoute exact path="/geniusinfo" component={GeniusInfoPage} />
      <AuthenticatedRoute exact path="/testing" component={TestingPage} />
      <Route exact path="/:unfoundLocation" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
