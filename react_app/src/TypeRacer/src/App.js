import React, { Component } from "react";
import styled from "styled-components";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Won from "./../components/Won.js";
import RenderText from "./../components/RenderText.js";
import Time from "./../components/Time.js";
import Wiki from "./../components/Wiki.js";


class TypeRacer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
            finished: false,
            timer_finished: false,
            typedWords: '',
            remainingWords: [],
            finishedWords: []
        };
    }
    totalTime = 0


    handleButtonClick = () => {
        this.setState({
            started: this.state.started ? false : true
        })
    }

    handleText = e => {
        const word = e.target.value
        if (word === this.state.remainingWords[0] + ' ') {
            this.setState({
                finishedWords: [...this.state.finishedWords, this.state.remainingWords.shift()],
            })
            e.target.value = ''
        }

        if (this.state.remainingWords.length === 0) {
            this.setState({
                finished: true
            })
        }

    }

    set_content = e => {
        this.setState({ remainingWords: e })
    }

    timer_finished = () => {
        this.setState({
            timer_finished: true,
        })
    }




    render() {
        return (
            <GameScreen>
                {!this.state.started && (
                    <div>
                        <Button bsStyle="success" onClick={this.handleButtonClick}>Start Typeracer</Button>
                        <Wiki
                            set_content={this.set_content}
                            want_to_start={this.handleButtonClick}
                            {...this.state}>
                        </Wiki>
                    </div>
                )}
                {this.state.started && !this.state.finished && (
                    <GameHolder>
                        <RenderText {...this.state}></RenderText>



                        {this.state.timer_finished === true ? (
                            <FormGroup>
                                <ControlLabel>Write the text </ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="Enter here"
                                    onChange={this.handleText}
                                    value={this.state.typedwords}
                                    autoFocus
                                />
                            </FormGroup>)
                            :
                            (
                                <Time timer_finished={this.timer_finished}></Time>
                            )
                        }
                    </GameHolder>)}
                {this.state.finished && (
                    <Won></Won>
                )}
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

const GameHolder = styled.div`
    height: 100%;
    width: 40%;
    display: grid;
    justify-content: center;
`;

