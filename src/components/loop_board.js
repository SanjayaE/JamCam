import React, { Component } from 'react';

class LoopBoard extends Component {


    render() {
        return (
            <div id="loops_container">
                <div className={this.props.cb('loops', 'kick')}>Kick</div>
                <div className={this.props.cb('loops', 'bass')}>Bass</div>
                <div className={this.props.cb('loops', 'clap')}>Clap</div>
                <div className={this.props.cb('loops', 'hat')}>Hat</div>
                <div className={this.props.cb('loops', 'perc')}>Perc</div>
                <div className={this.props.cb('loops', 'vocal')}>Vocal</div>
            </div>
        );
    }
}

export default LoopBoard;