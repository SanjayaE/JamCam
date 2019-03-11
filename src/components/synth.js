import React, { Component } from 'react';
import { defineClass } from '../services/helpers';

class Synth extends Component {
    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    render() {
        return (
            <div className={defineClass(this.props.name, this.props.keyState)}>{this.capitalize(this.props.name)}</div>
        );
    }
}

export default Synth;