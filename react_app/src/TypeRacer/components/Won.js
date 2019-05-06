import React, { Component } from "react"
import styled from "styled-components"


class Won extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        var WPM = (this.props.total_words / this.props.time_used * 60).toFixed(3)
        return (
            <div>
                <MainContainer>
                    <h1 class="Title">
                        YOU FINISHED !!
                    </h1>
                    <hr></hr>
                    <h4>WPM: {WPM} </h4>
                    <h4>You used: {this.props.time_used} seconds</h4>
                    <h4>Total words: {this.props.total_words} words</h4>
                </MainContainer >
            </div >

        )
    }
}
export default Won;

const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    text-align: center;
    .Title{
        padding-buttom: 50px
    }
    &:hover{
        background-color: pink; 
    }

`;