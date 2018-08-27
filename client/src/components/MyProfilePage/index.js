import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { NavBar } from "../global";
import { Profile } from "./presentations";

const MyProfilePage = ({ user }) => (
  <div className="user-container">
    <NavBar />
    <Profile user={user} />
  </div>
);
MyProfilePage.propTypes = {
  user: PropTypes.object
};
const stateToProps = state => ({
  user: state.userReducer.user
});

export default connect(
  stateToProps,
  null
)(MyProfilePage);
