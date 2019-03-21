import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import App from "./App";
import About from "./about";
import Intro from "./intro";

class Landing extends Component {
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
