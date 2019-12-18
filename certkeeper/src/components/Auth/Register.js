import React, { Component } from 'react';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
        }
        this.registerUser = this.registerUser.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.downloadWallet = this.downloadWallet.bind(this);
    }

    async registerUser() {
        const userID = this.state.userID;
        console.log(`Request is sent with {"userID": ${userID}}`);
        if (userID !== '') {
            let path = 'http://localhost:5000/register';
            let response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: userID,
                }),
            });
            let wallet = await response.json();
            if (response.status === 200) {
                this.downloadWallet(wallet);
            }
            console.log(wallet);

        }
    }

    downloadWallet(wallet) {
        const walletString = JSON.stringify(wallet)
        const element = document.createElement("a");
        const file = new Blob([walletString], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = "wallet.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
    }

    handleInput(event) {
        this.setState({userID: event.target.value});
    }

    render() {
        return (
            <div>
                <h2>Register Page</h2>
                <input onChange={this.handleInput} placeholder="User ID"/>
                <button onClick={this.registerUser}>Register</button>
            </div>
        );
    }
}