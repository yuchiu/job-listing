import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <div className="nav-bar">
        <Link to="/">
          <li>Job Hunting</li>
        </Link>
        <Link to="/testing">
          <li>testing</li>
        </Link>
      </div>
    );
  }
}

export default NavBar;
