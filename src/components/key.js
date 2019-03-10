import React, { Component } from 'react';

class Key extends Component {
    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    defineClass(name, keyState) {
        if (keyState === true) {
            return name + ' active';
        }
        else {
            return name + ' inactive'
        }
    }

    render() {
        return (
            <div className={this.defineClass(this.props.name, this.props.keyState)}>{this.capitalize(this.props.name)}</div>
        );
    }
}

export default Key;