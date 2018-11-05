import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import logo from './logo.svg';
import './App.css';

class App extends Component {
  contructor(props) {
    // super(props);
    this.state = {
      games: []
    }
  }
  render() {
    return (
      <div className="App">
        <sideBar>
          <p>
            Apps/games
              </p>
        </sideBar>
        <div className="theGame">
          The SCREEN for the game
          </div>

      </div>
    );
  }
}

export default App;

const sideBar = styled.div`
  width: 50px;
  height: 50px;
  posision: relative;
  &:hover{
    background-color: gray; 
  }

`;