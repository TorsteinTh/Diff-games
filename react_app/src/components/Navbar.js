import React, { Component } from "react"
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap"
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom"


const NavbarGames = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Games from INF-1400</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/game_1">Game 1</NavLink>
                    <NavLink to="/game_2">Game 2</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarGames;