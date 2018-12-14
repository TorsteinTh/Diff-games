import React, { Component } from "react"
import styled from "styled-components"
import { Button } from "react-bootstrap"
import { Redirect } from "react-router-dom"


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleClick1 = this.handleClick1.bind()
    }
    handleClick1() {
    }

    render() {
        return (
            <div>
                <sideBar>
                    <p>
                        Apps/games
                </p>
                </sideBar >
                <div className="Selection">
                    <p>
                        Select your game
                    </p>
                    <Button bsStyle="info" onClick={this.handleClick1}>Game 1</Button>
                    <Button bsStyle="info">Game 2</Button>
                    <Button bsStyle="info">Game 3</Button>
                </div>
            </div >

        )
    }
}
export default Home;

const sideBar = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  &:hover{
    background-color: gray; 
  }

`;