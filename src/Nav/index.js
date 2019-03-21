import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./Nav.css";
import logo from "./logo2.png";

const Nav = () => (

  <nav>
    <img class="logo-img" src={logo} alt="" />
    <ul class="links">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/App">Video</Link>
      </li>
    </ul>
  </nav>
);
export default Nav;
