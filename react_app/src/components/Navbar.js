import React, { Component } from "react"
import styled from "styled-components"
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap"
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom"


const NavbarGames = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <a class="navbar-brand" href="/">Home</a>
                <a class="navbar-brand" href="/game_1">Game 1</a>
                <a class="navbar-brand" href="/game_2">Game 2</a>
                <a class="navbar-brand" href="/game_3">Game 3</a>

            </Navbar.Collapse>
        </Navbar>
    )
}


export default NavbarGames; 