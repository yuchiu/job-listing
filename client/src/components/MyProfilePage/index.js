import React from "react";
import { connect } from "react-redux";
import { Card, Button, Modal } from "antd";
import PropTypes from "prop-types";

import { NavBar } from "../global";
import { userAction } from "../../actions";

class MyProfilePage extends React.Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div className="user-container">
        <NavBar />
        <Card className="personal-center-wrapper">
          <img
            src={require(`../global/AvatarSelector/images/${user.avatar}.png`)}
            alt=""
          />
          <Card.Meta
            title={`username：${user.username}`}
            description={
              <div>
                <b>{user.role === "boss" ? "requirements" : "description"}</b>：
                {user.desc.split("\n").map(v => (
                  <p key={v}>{v}</p>
                ))}
              </div>
            }
          />
        </Card>
      </div>
    );
  }
}
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
