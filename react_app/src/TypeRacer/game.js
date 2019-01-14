import React, { Component } from 'react';
import styled from "styled-components";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <div>

          <NavbarGames />
          <Switch>
            {/* <Route path="/game_2" component={Game_2} ></Route> */}
            <Route path="/game_1" component={Game_1} ></Route>
            <Route path="/" component={() => <Home />} exact></Route>
            <Route component={() => <Fail />}></Route>
          </Switch>
        </div>
      </BrowserRouter >
    );
  }
}

export default App;