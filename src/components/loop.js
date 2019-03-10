import React, { Component } from 'react';

class Loop extends Component {

    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    render() {
        return (
            <div> {this.capitalize(this.props.name)}</div>
        );
    }
}

export default Loop;