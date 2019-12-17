import React, { Component } from 'react';


export default class CertVerifier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certID: '',
            cert: null
        };
        this.handleInput = this.handleInput.bind(this);
        this.verifyCert = this.verifyCert.bind(this);
    }

    async verifyCert() {
        let certID = this.state.certID;
        console.log(`Request is sent with {"certID": ${certID}}`);
        if (certID !== '') {
            let path = 'http://localhost:5000/verify';
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
            if (response.status === 200) {
                this.setState({ cert: data });
            }
        }
    }

    handleInput(event) {
        this.setState({ certID: event.target.value })
    }

    renderCert(cert) {
        if (cert !== null) {
            return (
                <div className="certificate">
                    <p>Certificate ID: {cert.certID}</p>
                    <p>Title: {cert.title}</p>
                    <p>Grade: {cert.grade}</p>
                    <p>Owner: {cert.owner}</p>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <input onChange={this.handleInput} placeholder="Enter certID" />
                <button onClick={this.verifyCert}>Verifiy</button>
                {this.renderCert(this.state.cert)}
            </div>
        );
    }
}