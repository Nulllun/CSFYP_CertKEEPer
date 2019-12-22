import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';
import Logo from '../certkeeper-nobg.png';

export default class MyNavbar extends Component {
    render() {
        return(
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">
                <img
                    alt=""
                    src= {Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                CertKEEPer
                </Navbar.Brand>

                <Nav className="mr-auto">
                    <Nav.Link href="/verify">Verify</Nav.Link>
                    <Nav.Link href="/issue">Issue</Nav.Link>
                    <Nav.Link href="/view">View</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href="/Login">Login</Nav.Link>
                    <Nav.Link href="/Register">Register</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

