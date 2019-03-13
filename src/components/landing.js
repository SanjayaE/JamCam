import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import App from "./App";
import About from "./about";
import Intro from "./intro";

class Landing extends React.Component {
  // …
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Route path="/App" component={App} />
            <Route path="/about" component={About} />
            <Route exact path="/" component={Intro} />
            <hr />
          </div>
        </Router>
      </div>
    );
  }
}
export default Landing;
