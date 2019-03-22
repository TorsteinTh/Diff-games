import React, { Component } from 'react';

import Game_1 from "./Game_1/src/App.js"
import TypeRacer from "./TypeRacer/src/App.js"

import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./components/Home.js"
import NavbarGames from "./components/Navbar.js"
import Fail from "./components/Fail.js"
import Loaders from "./components/Loaders.js"



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
            <Route path="/game_1" component={Game_1} ></Route>
            <Route path="/game_2" component={TypeRacer} ></Route>
            <Route path="/loaders" component={Loaders} ></Route>
            <Route path="/" component={() => <Home />} exact></Route>
            <Route component={() =>
              <Fail />
            }>
            </Route>
          </Switch>
        </div>

      </BrowserRouter >
    );
  }
}

export default App;