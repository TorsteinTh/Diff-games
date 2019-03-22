import React, { Component } from "react"
import styled, { css, keyframes } from "styled-components"
// import keyframes from ""


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <SideBar>
                <Title >
                    Welcome
                </Title>
                <p style={{
                    paddingTop: "160px",
                    paddingLeft: "11px"
                }}>
                    Please select game :)
                </p>
            </SideBar >
        )
    }
}
export default Home;

const ani = keyframes` 
  0% {
    opacity: 0;
    font-size: 20px
    transform: rotate(30deg)
  }
  50%{
      transform: rotate(-30deg)
  }
  100% {
    opacity: 1;
    font-size: 40px
    transform: rotate(360deg)
  }
`;

const animation = () =>
    css`
    ${ani} 3s linear infinite;
  `

const Title = styled.p`
    
    width: 40%
    position: absolute
    margin-top: 50px 
    margin-left: auto
    margin-right: auto
    left: 0
    right: 0
    align-items: center
    animation: ${animation}
    animation-direction: alternate
`


const SideBar = styled.div`
    margin: 0 40% 0 40%
    text-align: center;
`;