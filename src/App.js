import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import * as posenet from '@tensorflow-models/posenet';
// const net = await posenet.load();

class App extends Component {
  async render() {
    const net = await posenet.load();
    console.log(net);
    return (<div> root</div>);
  }
}
      export default App;