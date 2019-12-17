import React, { Component } from 'react';


export default class CertIssuer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certID: '',
            recipient: '',
            courseTitle: '',
            grade: '',
        };
        this.issueCert = this.issueCert.bind(this);
    }

    async issueCert() {
        let cert = this.state;
        console.log(`Request is sent with ${cert}`);
        if (true) {
            let path = 'http://localhost:5000/issue';
            let response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cert),
            });
            let data = await response.json();
            console.log(data);
            if (response.status === 200) {
                console.log("Certificates issued");
            }
        }
    }

    render() {
        return (
            <div>
                <input onChange={(e) => this.setState({ certID: e.target.value })} placeholder="Enter certID" />
                <input onChange={(e) => this.setState({ recipient: e.target.value })} placeholder="Enter recipient" />
                <input onChange={(e) => this.setState({ courseTitle: e.target.value })} placeholder="Enter course title" />
                <input onChange={(e) => this.setState({ grade: e.target.value })} placeholder="Enter grade" />
                <button onClick={this.issueCert}>Issue</button>
            </div>
        );
    }
}