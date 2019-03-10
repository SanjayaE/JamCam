import React, { Component } from 'react';

class Key extends Component {
    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    render() {
        return (
            <div className={this.props.cb('keys', this.props.name)}>{this.capitalize(this.props.name)}</div>
        );
    }
}

export default Key;