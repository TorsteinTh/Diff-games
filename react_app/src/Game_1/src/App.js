
import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap"

class Game1 extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind()
    }

    handleClick() {
        // echo './run';

    }

    render() {
        return (
            <GameScreen>
                <Button bsStyle="success" onClick={this.handleClick}>Start game 1, BREAK OUT</Button>
                Hei, inne i GAME 1
            </GameScreen >
        );
    }
}
export default Game1;

const GameScreen = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
`;
