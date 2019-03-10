import React, { Component } from "react"
import styled from "styled-components"


class RenderText extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <TextHolder>
                    <FinishedTextHolder>
                        {this.props.finishedWords.join(" ") + " "}
                    </FinishedTextHolder>
                    {this.props.remainingWords.join(" ")}
                </TextHolder>

            </div>

        )
    }
}
export default RenderText;

const TextHolder = styled.p` 
    background-color: lightgray;
`;

const FinishedTextHolder = styled.span`
    color: white  
    background-color: lightgreen;
`;
