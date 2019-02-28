import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from "react-webcam";


class App extends Component {
  handleUserMedia = () => {
    const stream = this.webcam.stream;
  }
  constructor(props) {
    super(props);
    this.state = {
      net: {}
    }
  }

  async componentDidMount() {
    const net = await posenet.load();
    this.setState({
      net
    })
  }

  render() {
    console.log(posenet)
    return ( <
      Webcam ref = {
        e => this.webcam = e
      }
      onUserMedia = {
        this.handleUserMedia
      }
      />
    );
  }
}
export default App;