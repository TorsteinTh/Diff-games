import React from "react"
import { Navbar } from "react-bootstrap"


const NavbarGames = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <a className="navbar-brand" href="/">Home</a>
                <a className="navbar-brand" href="/game_1">Game 1</a>
                <a className="navbar-brand" href="/game_2">Game 2</a>
                <a className="navbar-brand" href="/game_3">Game 3</a>
                <a className="navbar-brand" href="/loaders">Loaders</a>

            </Navbar.Collapse>
        </Navbar>
    )
}


export default NavbarGames; 