import React, { Component } from "react";
import styled from "styled-components";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

class TypeRacer extends Component {
    constructor(props) {
        super(props);
    }

    // handleChange = this.handleChange.bind(this)
    state = {
        started: true,
        typedWords: ''
    };
    parsedText = ''
    textArray = ["Her skal texten ligge!! XD "]
    remainingWords = ["test", "hei", "på", "dere"]
    finishedWords = []
    totalTime = 0

    handleClick() {
        this.setState({
            started: this.state.started ? false : true
        })
    }
    handleText = e => {
        const word = e.target.value
        const lastChar = word[word.length - 1]
        if (lastChar === ' ') {
            console.log("typed: ", this.state.typedWords)
            console.log("remaining: ", this.remainingWords[0])
            if (word === this.remainingWords[0] + ' ') {
                this.finishedWords.push(this.remainingWords[0])
                this.remainingWords.shift()
                e.target.value = ''
                console.log("Riktig !!!!!!!!!!!")
            }
            console.log("test: ", this.finishedWords)
        }

    }
    handleChange = e => {
        this.setState(
            { typedWords: e.target.value },
            this.handleText(e)
        )
    }


    render() {
        return (
            <GameScreen>
                {!this.state.started && (
                    <Button bsStyle="success" onClick={this.handleClick}>Start Typeracer</Button>
                )}
                {this.state.started && (
                    <div>
                        {this.textArray}
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Write the text </ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                placeholder="Enter here"
                                onChange={this.handleText}
                                value={this.state.typedwords}
                            />
                            {/* onFocus="true" */}
                        </FormGroup>
                    </div>)}
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
