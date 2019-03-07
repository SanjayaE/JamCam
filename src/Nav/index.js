import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import logo from "./logo.jpg";

const Nav = () => (
  <nav>
    <img src={logo} alt="" />
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/video">Video</Link>
      </li>
    </ul>
  </nav>
);
export default Nav;
