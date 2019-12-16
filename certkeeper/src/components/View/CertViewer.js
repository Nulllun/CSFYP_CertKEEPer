import React, { Component } from 'react';


export default class CertViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "Michael"
        };
        this.getCert = this.getCert.bind(this);
    }

    async getCert() {
        let userID = this.state.userID;
        console.log(`Request is sent with {"userID": ${userID}}`);
        if (userID !== '') {
            let path = 'http://localhost:5000/test';
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
        }
    }

    render() {
        return (
            <button onClick={this.getCert}>CertViewer</button>
        );
    }
}