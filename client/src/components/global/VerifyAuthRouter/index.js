import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "../../../actions";
import { auth } from "../../../utils";

class VerifyAuthRouter extends React.Component {
  // eslint-disable-next-line consistent-return
  componentDidMount() {
    const {
      isUserAuthenticated,
      history,
      location: { pathname }
    } = this.props;
    const publicList = ["/register", "/login"];
    if (publicList.indexOf(pathname) !== -1) {
      return null;
    }

    const token = auth.getToken();
    if (isUserAuthenticated) {
      this.props.history.push("/browse");
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return null;
  }
}

const stateToProps = state => ({
  isUserAuthenticated: state.userReducer.isUserAuthenticated
});
const dispatchToProps = dispatch => ({});

VerifyAuthRouter.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired
};

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(VerifyAuthRouter)
);
