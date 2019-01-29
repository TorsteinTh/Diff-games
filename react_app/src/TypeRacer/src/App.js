import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap"

class TypeRacer extends Component {
    // constructor(props) {
    //     super(props);
    // }
    handleClick = this.handleClick.bind(this)
    state = {
        started: false
    };

    handleClick() {
        this.setState({
            started: this.state.started ? false : true
        })
        console.log(this.state.started)
        // echo './run';

    }

    render() {
        return (
            <GameScreen>
                <Button bsStyle="success" onClick={this.handleClick}>Start Typeracer</Button>
                {this.state.started && (<div>den store fine teksten</div>)}
            </GameScreen >
        );
    }
}
export default TypeRacer;

const GameScreen = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
`;
