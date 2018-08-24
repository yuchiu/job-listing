import React from "react";
import { Button } from "antd";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "../../../actions";

class NavBar extends React.Component {
  handleClick = () => {
    const { logout, history } = this.props;
    logout();
    history.push("/");
  };

  render() {
    const { isUserAuthenticated, username } = this.props;
    return (
      <div>
        {isUserAuthenticated &&
          username && (
            <div className="nav-bar">
              <Link to="/">
                <li>Job Hunting</li>
              </Link>
              <span>Hi! {username}</span>
              <Link to="/browse">
                <li>Browse</li>
              </Link>
              <Link to="/testing">
                <li>testing</li>
              </Link>
              <Link to="/message">
                <li>Message</li>
              </Link>
              <Link to="/my-profile">
                <li>My Profile</li>
              </Link>
              <Button type="primary" onClick={this.handleClick}>
                Log Out
              </Button>
            </div>
          )}
        {!isUserAuthenticated && (
          <div className="nav-bar">
            <Link to="/">
              <li>Job Hunting</li>
            </Link>
            <Link to="/testing">
              <li>testing</li>
            </Link>
            <span>Hi there!</span>
            <Link to="/login">
              <li>login</li>
            </Link>
            <Link to="/register">
              <li>register</li>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

NavBar.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string
};

const stateToProps = state => ({
  isUserAuthenticated: state.userReducer.isUserAuthenticated,
  username: state.userReducer.user.username
});
const dispatchToProps = dispatch => ({
  logout: () => {
    dispatch(userAction.logout());
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavBar)
);
