import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';




export default class CertVerifier extends Component {

    async handleSubmit(event) {
        let certID = event.target.certID.value
        event.preventDefault();
        console.log("certID: " + certID);
        if (certID !== '') {
            let path = 'http://localhost:5000/test';
            let response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    certID: certID
                }),
            });
            let data = await response.json();
            console.log(data);
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="certID">
                    <Form.Label>Please input a certID</Form.Label>
                    <Form.Control type="input" placeholder="Enter certID" />
                    <Form.Text className="text-muted">
                        testing text
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}