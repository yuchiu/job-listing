import React from "react";
import { Button } from "antd";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "../../../actions";

class NavBar extends React.Component {
  handleClick = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { isUserAuthenticated } = this.props;
    return (
      <div>
        {isUserAuthenticated && (
          <div className="nav-bar">
            <Link to="/">
              <li>Job Hunting</li>
            </Link>
            <Link to="/testing">
              <li>testing</li>
            </Link>
            <Button type="primary" onClick={this.handleClick}>
              Log Out
            </Button>
          </div>
        )}
        {!isUserAuthenticated && <Redirect to="/login" />}
      </div>
    );
  }
}

NavBar.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
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

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavBar)
);
