import React, { Component } from "react"
import styled from "styled-components"
import { Button } from "react-bootstrap"

const Home = () => {
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
                <Button bsStyle="info" style={{ border: 5 }}>Game 1</Button>
                <Button bsStyle="info" style={{ border: 5 }}>Game 2</Button>
                <Button bsStyle="info" style={{ border: 5 }}>Game 3</Button>
            </div>
        </div>

    )
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