import React, { Component } from "react";
import styled from "styled-components";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Won from "./../components/Won.js";
import RenderText from "./../components/RenderText.js";
import Time from "./../components/Time.js";
import Timer from "./../components/Timer.js";
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
            finishedWords: [],
            time_used: 0
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
        this.setState({ remainingWords: ["Hei", "alle", "sammen", "no", "snakker", "vi"] })
    }

    timer_finished = () => {
        this.setState({
            timer_finished: true,
        })
    }

    time_used = time => {
        this.setState({ time_used: time })
    }




    render() {
        return (
            <GameScreen>
                {!this.state.started && (
                    <StartPage>
                        <Button bsStyle="success" onClick={this.handleButtonClick}>Start Typeracer</Button>
                        <hr />
                        <Wiki
                            set_content={this.set_content}
                            want_to_start={this.handleButtonClick}
                            {...this.state}>
                        </Wiki>
                    </StartPage>
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
                                <div style={{ margin: "15px 0 0 0" }}>
                                    <Timer time_used={this.time_used}></Timer>
                                </div>
                            </FormGroup>)
                            :
                            (
                                <Time timer_finished={this.timer_finished}></Time>
                            )
                        }
                    </GameHolder>)}
                {this.state.finished && (
                    <div>
                        <Won
                            time_used={this.state.time_used}
                            total_words={this.state.finishedWords.length}
                        />
                    </div>
                )}
            </GameScreen >
        );
    }
}
export default TypeRacer;

const StartPage = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    justify-content: center;
`;

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

