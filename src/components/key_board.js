import React, { Component } from 'react';
import Key from './key'
import { uniqueID } from '../services/helpers';

class KeyBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: ['chord1', 'chord2', 'chord3', 'chord4']
        };
    }

    render() {
        return (
            <div id="keys_container">
                {this.state.keys.map(e => (<Key key={uniqueID()} name={e} defineClass={this.props.defineClass} />))}
            </div>
        );
    }
}

export default KeyBoard;