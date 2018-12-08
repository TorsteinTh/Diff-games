import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Game_1 from "./Game_1/src/App.js"
// import Game2 from "./../apps/Game_2/src/App.js"
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./components/Home.js"
import NavbarGames from "./components/Navbar.js"



class App extends Component {
  contructor(props) {
  }

  render() {
    return (
      <BrowserRouter>
        <div>

          <NavbarGames />
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/game_1" component={Game_1} ></Route>
            {/* <Route path="/game_2" component={Game_2} ></Route> */}
          </Switch>
        </div>
      </BrowserRouter >
    );
  }
}

export default App;


const ButtonContainer = styled.div`
  position: relative;
  border: 5px;
  align-items: center;
  &:hover{
    background-color: green;
  }
  &:focus{
    background-colorr:blue;
  }
`;