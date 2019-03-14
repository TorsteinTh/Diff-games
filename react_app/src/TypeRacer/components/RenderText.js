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
                    <span className="FinishedTextHolder">
                        {this.props.finishedWords.join(" ") + " "}
                    </span>
                    {this.props.remainingWords.join(" ")}
                </TextHolder>

            </div>

        )
    }
}
export default RenderText;

const TextHolder = styled.p` 
    background-color: lightgray;
    
    .FinishedTextHolder {    
        color: white  
        background-color: lightgreen;
    }
`;

