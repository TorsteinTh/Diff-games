
import React, { Component } from "react";
import styled from "styled-components";

class Game1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GameScreen>
                Hei, inne i GAME 1
                <script src="main.py"></script>
            </GameScreen>
        );
    }
}
export default Game1;

const GameScreen = styled.div`

`;
