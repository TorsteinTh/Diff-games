import React, { Component } from "react";
import styled from "styled-components";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"

class TypeRacer extends Component {
    // constructor(props) {
    //     super(props);
    // }
    handleClick = this.handleClick.bind(this)
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
    handleText = () => {
        // const lastChar = this.state.typedWords[this.state.typedWords.length - 1]
        // if (lastChar === ' ') {
        //     console.log("typed: ", this.state.typedWords)
        //     console.log("remaining: ", this.remainingWords[0])
        //     if (this.state.typedWords === this.remainingWords[0] + ' ') {
        //         this.finishedWords.push(this.remainingWords[0])
        //         this.remainingWords.shift()
        //         this.setState({
        //             typedWords: ''
        //         })

        //     }
        //     console.log("test: ", this.state.typedWords)
        // }
        const lastChar = this.state.typedWords[this.state.typedWords.length - 1]
        if (lastChar === ' ') {
            if (this.state.typedWords === this.remainingWords[0] + ' ') {
                console.log("typed: ", this.state.typedWords)
                console.log("remaining: ", this.remainingWords[0])
                this.finishedWords.push(this.remainingWords[0])
                this.remainingWords.shift()
                this.setState({
                    typedWords: ''
                })

                console.log("test: ", this.state.typedWords)
            }
        }
    }
    handleChange = e => {
        this.setState(
            { typedWords: e.target.value },
            this.handleText
        )
        // console.log("tekst: ", this.state.typedWords)
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
                                value={this.state.typedwords}
                                onChange={this.handleChange}
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
