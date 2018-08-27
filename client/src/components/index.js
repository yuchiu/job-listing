import React from "react";
import "antd-mobile/dist/antd-mobile.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "../utils/interceptors";
import "./index.scss";
import { auth } from "../utils";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import BossFollowUpPage from "./BossFollowUpPage";
import GeniusFollowUpPage from "./GeniusFollowUpPage";
import BrowsePage from "./BrowsePage";
import MessagePage from "./MessagePage";
import MyProfilePage from "./MyProfilePage";
import TestingPage from "./TestingPage";
import NotFoundPage from "./NotFoundPage";

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
class Router extends React.Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true
    });
  }

  render() {
    const { hasError } = this.state;
    return hasError ? (
      <h2>Error occured while rendering this page</h2>
    ) : (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/browse" component={BrowsePage} />
          <Route exact path="/testing" component={TestingPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <AuthenticatedRoute
            exact
            path="/bossfollowup"
            component={BossFollowUpPage}
          />
          <AuthenticatedRoute
            exact
            path="/geniusfollowup"
            component={GeniusFollowUpPage}
          />
          <AuthenticatedRoute
            exact
            path="/message/:user"
            component={MessagePage}
          />
          <AuthenticatedRoute
            exact
            path="/my-profile"
            component={MyProfilePage}
          />
          <Route exact path="/:unfoundLocation" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
