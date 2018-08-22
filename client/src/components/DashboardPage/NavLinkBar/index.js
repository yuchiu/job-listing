import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class NavLinkBar extends React.Component {
  handleClick = path => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    // filter out other paths, only show the path that user selected
    const data = this.props.data.filter(v => !v.hide);
    const {
      location: { pathname }
    } = this.props;
    return (
      <React.Fragment>
        {data.map(v => (
          <span
            key={v.path}
            className="navlink-span"
            onClick={this.handleClick(v.path)}
          >
            <img
              src={
                v.path === pathname
                  ? require(`./images/${v.icon}-active.png`)
                  : require(`./images/${v.icon}.png`)
              }
              alt=""
            />
            <a style={v.path === pathname ? { color: "#4a9aea" } : {}}>
              {v.title}
            </a>
          </span>
        ))}
      </React.Fragment>
    );
  }
}
NavLinkBar.propTypes = {
  data: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
export default withRouter(NavLinkBar);
