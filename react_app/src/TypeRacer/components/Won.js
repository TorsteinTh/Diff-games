import React, { Component } from "react"
import styled from "styled-components"


class Won extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <MainContainer>
                    <h1>
                        YOU FINISHED !!
                    </h1>
                </MainContainer >
            </div >

        )
    }
}
export default Won;

const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    text-align: center;
    &:hover{
        background-color: pink; 
    }

`;