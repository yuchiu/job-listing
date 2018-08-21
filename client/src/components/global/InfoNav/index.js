import React from "react";
import PropTypes from "prop-types";
import "./index.css";

class InfoNav extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="info-nav-header">
          <span>
            Hi <span className="info-nav-header__name">{this.props.name}</span>!{" "}
            {this.props.text}
          </span>
        </h1>
      </React.Fragment>
    );
  }
}

InfoNav.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string
};

export default InfoNav;
