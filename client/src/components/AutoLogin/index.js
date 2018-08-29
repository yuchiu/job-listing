import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "../../actions";

class AutoLogin extends React.Component {
  componentDidMount() {
    const { autoLogin } = this.props;
    autoLogin();
  }

  render() {
    return null;
  }
}

AutoLogin.propTypes = {
  autoLogin: PropTypes.func.isRequired
};

const dispatchToProps = dispatch => ({
  autoLogin: () => {
    dispatch(userAction.autoLogin());
  }
});

export default connect(
  null,
  dispatchToProps
)(AutoLogin);
