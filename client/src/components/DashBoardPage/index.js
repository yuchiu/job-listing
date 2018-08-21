import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { userAction } from "../../actions";
import { Navbar, ReactLogo } from "../global";
import "./index.css";

class DashboardPage extends React.Component {
  render() {
    const { isUserAuthenticated } = this.props;
    return (
      <div>
        {isUserAuthenticated && (
          <div className="App">
            <Navbar />
            <header className="App-header">
              <ReactLogo />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        )}
        {!isUserAuthenticated && <Redirect to="/login" />}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired
};

const stateToProps = state => ({
  isUserAuthenticated: state.userReducer.isUserAuthenticated,
  user: state.userReducer.user
});
const dispatchToProps = dispatch => ({
  logout: () => {
    dispatch(userAction.logout());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(DashboardPage);
