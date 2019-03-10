import React, { Component } from 'react';

class KeyBoard extends Component {


    render() {
        return (
            <div id="keys_container">
                <div className={this.props.cb('keys', 'chord1')}>1</div>
                <div className={this.props.cb('keys', 'chord2')}>2</div>
                <div className={this.props.cb('keys', 'chord3')}>3</div>
                <div className={this.props.cb('keys', 'chord4')}>4</div>
            </div>
        );
    }
}

export default KeyBoard;