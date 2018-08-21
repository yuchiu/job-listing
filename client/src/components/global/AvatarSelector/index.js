import React from "react";
import { Row, Col, Button } from "antd";
import PropTypes from "prop-types";
import "./index.css";

class AvatarSelector extends React.Component {
  state = {
    icon: "",
    text: "",
    clientWidth: document.body.clientWidth
  };

  handleSelect(value) {
    const { selectAvatar } = this.props;
    this.setState(value);
    selectAvatar(value.text);
  }

  render() {
    const imgList = "waiter,worker,nurse,robot,technology,police,service,courier,student,grandma,grandpa,national,man,man2,girl,girl2,soldier,doctor,sportsman,criminal"
      .split(",")
      .map(v => ({
        // eslint-disable-next-line
        icon: require(`./images/${v}.png`),
        text: v
      }));
    const Header = this.state.icon ? (
      <div className="avatar-selector-header">
        The avatar you selected is:
        <img src={this.state.icon} alt="" />
      </div>
    ) : (
      <div className="avatar-selector-header">Please select your avatar</div>
    );
    return (
      <div className="avatar-selector-container">
        {Header}
        <Row>
          <div className="avatar-selector-ImgContainer">
            {this.state.clientWidth > 1023
              ? imgList.map((value, index) => (
                  <Col
                    span={3}
                    key={value.text}
                    className="avatar-selector-col"
                  >
                    <img
                      src={value.icon}
                      alt=""
                      onClick={this.handleSelect.bind(this, value)}
                    />
                  </Col>
                ))
              : imgList.map((value, index) => (
                  <Col
                    span={6}
                    key={value.text}
                    className="avatar-selector-col"
                  >
                    <img
                      src={value.icon}
                      alt=""
                      onClick={this.handleSelect.bind(this, value)}
                    />
                  </Col>
                ))}
          </div>
        </Row>
      </div>
    );
  }
}
AvatarSelector.propTypes = {
  selectAvatar: PropTypes.func.isRequired
};
export default AvatarSelector;
