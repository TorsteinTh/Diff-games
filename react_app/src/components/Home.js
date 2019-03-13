import React, { Component } from "react"
import styled from "styled-components"

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (

            <SideBar>
                <h1>
                    Welcome
                </h1>
                <p>
                    Please select game :)
                </p>
            </SideBar >


        )
    }
}
export default Home;

const SideBar = styled.div`
  margin: 0 40% 0 40%
  text-align: center;
  transition-duration:  1s;
  &:hover{
    background-color: pink; 
    font-size: 20px
  }

`;