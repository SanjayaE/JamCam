import React, { Component } from 'react';
import { defineClass } from '../services/helpers';

class Loop extends Component {

    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    render() {
        return (
            <div className={defineClass(this.props.name, this.props.loopState)}> {this.capitalize(this.props.name)}</div>
        );
    }
}

export default Loop;