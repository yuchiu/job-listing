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
      verifyUser,
      history,
      location: { pathname }
    } = this.props;
    const publicList = ["/register", "/login"];
    if (publicList.indexOf(pathname) !== -1) {
      return null;
    }

    console.log("run component");
    const token = auth.getToken();
    verifyUser(token);
    if (isUserAuthenticated) {
      this.props.history.push("/dashboard");
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return <div>assasas</div>;
  }
}

const stateToProps = state => ({
  isUserAuthenticated: state.userReducer.isUserAuthenticated
});
const dispatchToProps = dispatch => ({
  verifyUser: token => {
    dispatch(userAction.verifyUser(token));
  }
});

VerifyAuthRouter.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
  verifyUser: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(VerifyAuthRouter)
);
