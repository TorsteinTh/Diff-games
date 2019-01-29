import React, { Component } from "react"
import styled from "styled-components"
import { Button } from "react-bootstrap"
import { Redirect } from "react-router-dom"


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <SideBar>
                    <h1>
                        Welcome fuckface
                    </h1>
                </SideBar >
            </div >

        )
    }
}
export default Home;

const SideBar = styled.div`
  text-align: center;
  &:hover{
    background-color: pink; 
  }

`;