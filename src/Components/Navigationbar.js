import React from 'react';
import { Navbar, Nav, Container, NavbarBrand, NavLink } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';

export default class Navigationbar extends React.Component {
    render() {
        return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <NavbarBrand href='/' className="navbar-brand">
                <img src="https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg"
                alt='' width="25" height="25" />
            </NavbarBrand>
            <Nav className="mr-auto">
                <NavLink href='/'> ENSIAS </NavLink>
                <NavLink href='/add'> Ajouter modules </NavLink>
                <NavLink href='/list'> Liste des modules </NavLink>
            </Nav>
            </Container>
        </Navbar>
        </>
        );
    }
}
