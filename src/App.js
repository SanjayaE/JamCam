import React, { Component } from 'react';
import * as posenet from '@tensorflow-models/posenet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      net: {}
    }
  }

  async componentDidMount() {
    const net = await posenet.load();
    this.setState({ net })
  }

  render() {
    console.log(posenet)
    return (<div> root</div>);
  }
}
export default App;