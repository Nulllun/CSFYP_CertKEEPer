import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';



export default class MyNavbar extends Component {
    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">CertKEEPer</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/verify">Verify</Nav.Link>
                    <Nav.Link href="/issue">Issue</Nav.Link>
                    <Nav.Link href="/view">View</Nav.Link>
                    <Nav.Link href="/Login">Login</Nav.Link>
                    <Nav.Link href="/Register">Register</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

