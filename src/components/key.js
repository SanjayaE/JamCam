import React, { Component } from 'react';
import { defineClass } from '../services/helpers';

class Key extends Component {
    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    //Determines CSS for active or inactive states
    defineClass(name, activeState) {
        if (activeState === true) {
            return name + ' active';
        }
        else {
            return name + ' inactive'
        }
    }

    render() {
        return (
            <div className={defineClass(this.props.name, this.props.keyState)}>{this.capitalize(this.props.name)}</div>
        );
    }
}

export default Key;