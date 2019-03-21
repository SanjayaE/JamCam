import React, { Component } from 'react';
import loading from './loading.gif';

class Loading extends Component {
  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <div id="loading">
        <img src={loading} alt="loading gif" height="480" width="640" />
      </div>
    );
  }
}

export default Loading;
