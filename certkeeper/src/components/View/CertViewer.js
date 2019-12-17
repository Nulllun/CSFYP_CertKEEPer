import React, { Component } from 'react';


export default class CertViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "Michael",
            certs: []
        };
        this.getCert = this.getCert.bind(this);
        this.renderCerts = this.renderCerts.bind(this);
    }

    async getCert() {
        let userID = this.state.userID;
        console.log(`Request is sent with {"userID": ${userID}}`);
        if (userID !== '') {
            let path = 'http://localhost:5000/view';
            let response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: userID
                }),
            });
            let data = await response.json();
            console.log(data);
            if(response.status === 200){
                this.setState({ certs: this.state.certs.concat(data) });
            }
        }
    }

    renderCerts(certs) {
        return certs.map((cert, arrKey) => {
            return (
                <div className="certificate" key={arrKey}>
                    <p>Certificate ID: {cert.certID}</p>
                    <p>Title: {cert.title}</p>
                    <p>Grade: {cert.grade}</p>
                    <p>Recipient: {cert.recipient}</p>
                </div>
            )
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.getCert}>Show My Certificates</button>
                {this.renderCerts(this.state.certs)}
            </div>
        );
    }
}