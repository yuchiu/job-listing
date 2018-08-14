import React from "react";
import "antd-mobile/dist/antd-mobile.css";
import { Button } from "antd-mobile";

import { Navbar } from "../global";
import logo from "../../data/svg/logo.svg";
import "./index.css";

const LandingPage = () => (
  <div className="App">
    <Navbar />
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <Button type="primary">Aloha</Button>
  </div>
);

export default LandingPage;
