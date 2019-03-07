import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Nav from "./Nav";
import Video from "./video";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "landing"
    };
  }

  componentDidMount = async () => {
    console.log("did mount");
  };

  render() {
    return (
      <Router>
        <div>
          <h1>Jam Cam</h1>
          <div>
            <Nav />
          </div>

          <hr />

          {/* <Route exact path="/" component={Home} />
          <Route path="/about" component={About} /> */}
          <Route path="/video" component={Video} />
        </div>
      </Router>
    );
  }
}
export default App;
