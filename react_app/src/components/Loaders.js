import React, { Component } from 'react'
import styled, { css, keyframes } from "styled-components"

class Loader extends Component {
    render() {


        return (
            <div sylte={{ alingItems: "center" }}>


                <PageWrapper>
                    Loader 1:
                    <Loader1 />
                    Loader 2:
                    <Loader2 />
                    Loader 3:
                    <Loader3 />
                    Loader 4:
                    <Loader4 />
                    Loader 5:
                    <Loader5>
                        <span />
                        <span />
                        <span />
                        <span />

                    </Loader5>



                </PageWrapper >
                <PageWrapper>

                    Pacman:
                    <Track>
                        <Kurt>
                            <Loader6 />
                        </Kurt>
                    </Track>
                </PageWrapper>
            </div>
        )
    }


}
export default Loader

const PageWrapper = styled.div`
    align-items: center
    vertical-align: middle
    margin-bottom: 100px
    background: white
    padding-bottom: 100px
    box-shadow: 0px 40px 60px -20px rgba(0,0,0,0.2)
`;

// common for all spinners, not pacman
const common = `
    width: 100px
    height: 100px
    background: #eee
    border-radius: 50%
    position: relative
    margin: 50px
    display: inline-block
    &:after, &:before{
        content: "";
        display: block
        width: 100px
        height: 100px
        border-radius: 50%
    }
`;

// ------------Loader 1 ---------------------------------------------------
const spinner = keyframes` 
    0%{
        transform: rotate(0deg) scale(0.8); 
        opacity: 0;
    }
    50%{
        transform: rotate(45deg) scale(1.2); 
    }
    100%{
        transform: rotate(720deg) scale(1);
        opacity: 1;
    }
`;

const animation1 = () =>
    css`
    ${spinner} 3s cubic-bezier(0.6, 0.46, 0.71, 1.22) infinite;
`;

const Loader1 = styled.div`
    ${common}
    &:after{
        position: absolute;
        top: 0px;
        left: 0px;
        border: 4px solid transparent;
        border-top-color: #13ff00;
        border-bottom-color: #13ff00;
        animation: ${animation1};
        animation-direction: alternate;
    }
`;


// ------------Loader 2 ---------------------------------------------------
const balls = keyframes` 
    0%, 100%{
        transform: translateY(0px)
    }
    50%{
        transform: translateY(30px)
    }
`;

const animation2 = () =>
    css`
    ${balls} 
`;

const animation3 = () =>
    css`
    ${spin} 2s linear infinite;
`;

const Loader2 = styled.div`
    ${common};
    animation: ${animation3} 2s linear infinite;
  
    &:before, &:after{
        height: 20px;
        width: 20px;
        background: #13ff00;
        position: absolute;
        top: -10px;
        left: 50%;
        margin-left: -10px ;  
        animation: ${animation2} 3s cubic-bezier(0.6, 0.46, 0.71, 1.22) infinite;
    }
    &:after{
        top: auto;
        bottom: -10px;
        animation: ${animation2} 1s cubic-bezier(0.6, 0.46, 0.71, 1.22) infinite;
    }
`;

// ------------Loader 3 ---------------------------------------------------
const spin = keyframes` 
    0%{
        transform: rotate(0deg)
    }
    100%{
        transform: rotate(360deg)
    }
`;

const Loader3 = styled.div`
    ${common}
    background: none
    border: 4px solid #eee
    
    &:after{
        width: 4px
        height: 66px
        background: #13ff00
        border-radius: 0px
        position: absolute
        top: 50%
        left: 50%
        margin-left: -2px
        transform-origin: top center
             
        animation: ${animation3} 3s linear infinite;
    }
`;
// ------------Loader 4 ---------------------------------------------------
const pulse = keyframes` 
0%{
    transform: scale(0);
    opacity: 1;
}
100%{
    transform: scale(1.3);
    opacity: 0;
}`;

const animation4 = () =>
    css`
    ${pulse}
`;

const Loader4 = styled.div`
    ${common}

    &:before, &:after{

        position: absolute
        top: 50%
        left: 50%
        margin-top: -50px
        margin-left: -50px
        background: #13ff00
        animation: ${animation4} 3s linear infinite
        opacity: 0
    }
    &:after{
        animation: ${animation4} 2s linear 2.3s infinite
    }  
`;
// ------------Loader 5 ---------------------------------------------------
const dot = keyframes` 
    0%, 75%, 100%{
        transform: translateY(0px)
    }
    25%{
        transform: translateY(-30px)
    }
`;

const animation5 = () =>
    css`
    ${dot}
`;

const Loader5 = styled.div`
    ${common}
    height: 0px
    width: 0px

    span{
        display: block
        height: 10px
        width: 10px
        background: #ddd
        border-radius: 50%
        position: absolute
        top: 0px
        
        &:nth-child(1){
            left: -50px
            animation: ${animation5} 1s ease-in-out infinite
        }
        
        &:nth-child(2){
            left: -25px
            animation: ${animation5} 1s ease-in-out 0.25s infinite
        }
        
        &:nth-child(3){
            animation: ${animation5} 1s ease-in-out 0.50s infinite
        }
        &:nth-child(4){
            left: 25px
            animation: ${animation5} 1s ease-in-out 0.75s infinite
        }
        
    }    
`;

// ------------Loader 6 ---------------------------------------------------

const bottomchomp = keyframes` 
    0%, 100%{
        transform: rotate(10deg)
    }
    50%{
        transform: rotate(-50deg)
    }
`;

const bottom = () =>
    css`
    ${bottomchomp}
`;

const topchomp = keyframes` 
    0%, 100%{
        transform: rotate(-20deg)
    }
    50%{
        transform: rotate(37deg)
    }
`;

const top = () =>
    css`
    ${topchomp}
`;
const moveChomp = keyframes` 
    0%, 100%{
        left: 0%
    }
    50%{
      left: 100%
    }

    0%, 49%{
      transform: rotateY(0deg)
    }
    50%, 100%{
        transform: rotateY(180deg)
    }

`;

const move = () =>
    css`
    ${moveChomp}
`;

const Track = styled.div`
    margin-left: 10%;
    width: 800px;
    height: 0px;
    border-top: 8px dotted #eee;
    display: inline-block;

`;

const Kurt = styled.div`

    background: pink;
    width: 10px;
    height: 10px;
    position: relative;
    top: -15px;
    animation: ${move} 10s linear infinite;
`;

const Loader6 = styled.div`


    background: none;
    display: inline-block;
    position: relative;


    &:before, &:after{

        content: '';
        display: block;
        height: 0px;
        width: 0px;
        border: 30px solid orangered;
        border-radius: 50%;
        border-right-color: transparent;
        border-bottom-color: transparent;
        position: absolute;
        top: 50%;
        margin-top: -34px;
        animation: ${top} 0.7s ease-in-out infinite reverse;
    }

    &:after{
        //left: 80px
        border-color: orangered;
        border-top-color: transparent;
        border-right-color: transparent;
        animation: ${bottom} 0.7s ease-in-out infinite;
    }
`;
