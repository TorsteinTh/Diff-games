
import React, { Component } from "react";
import styled from "styled-components";

class Game2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GameScreen>
                Hei, inne i GAME 2
                <script src="main.py"></script>
            </GameScreen>
        );
    }
}
export default Game2;

const GameScreen = styled.div`

`;
