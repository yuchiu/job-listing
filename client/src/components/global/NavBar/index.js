import React from "react";
import { Button, Menu, Icon } from "antd";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "../../../actions";
import "./index.scss";

class NavBar extends React.Component {
  state = {
    current: ""
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  handleLogout = () => {
    const { logout, history } = this.props;
    logout();
    history.push("/");
  };

  render() {
    const { isUserAuthenticated, username } = this.props;
    return (
      <div className="navbar-container">
        {isUserAuthenticated &&
          username && (
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="home">
                <Link to="/">
                  <Icon type="home" />
                  Job Hunting
                </Link>
              </Menu.Item>
              <Menu.Item key="browse">
                <Link to="/browse">
                  <Icon type="bars" />
                  Browse
                </Link>
              </Menu.Item>
              <Menu.Item key="message">
                <Link to="/my-message">
                  <Icon type="message" />
                  My Message
                </Link>
              </Menu.Item>
              <Menu.SubMenu
                style={{ float: "right" }}
                title={
                  <span>
                    <Icon type="user" />
                    {username}
                  </span>
                }
              >
                <Menu.ItemGroup title="User's Setting">
                  <Menu.Item key="my-profile">
                    <Link to="/my-profile">My Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="edit-profile">
                    <Link to="/edit-profile">Edit Profile</Link>
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="______________">
                  <Menu.Item key="logout">
                    <p onClick={this.handleLogout}>Log Out</p>
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.SubMenu>
            </Menu>
          )}
        {!isUserAuthenticated && (
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="home">
              <Link to="/">
                <Icon type="home" />
                Job Hunting
              </Link>
            </Menu.Item>
            <Menu.Item key="browse">
              <Link to="/browse">
                <Icon type="bars" />
                Browse
              </Link>
            </Menu.Item>
            <Menu.Item key="testing">
              <Link to="/testing">
                <Icon type="appstore" />
                testing
              </Link>
            </Menu.Item>
            <Menu.Item style={{ float: "right" }}>
              <Link to="/register">
                <Icon type="user-add" />
                register
              </Link>
            </Menu.Item>
            <Menu.Item style={{ float: "right" }}>
              <Link to="/login">
                <Icon type="login" />
                login
              </Link>
            </Menu.Item>
          </Menu>
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
