import React, { Component } from 'react';
import '../main.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
  
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
            document.body.innerHTML += '<br/><p style="background-color:#FFFFFF">A .json file is downloaded actomactically. Please save it in a location you would remember as you will need this to login into CertKEEPer.</p>';
        }
        else{
            document.body.innerHTML += '<br/><p style="background-color:#FFFFFF">ID is null or has been registered. Please enter a new one.</p>'
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
            <div id="padding">
                <h2>Register Page</h2>
                <p>Please input the userID you want to use.</p>
                <input onChange={this.handleInput} placeholder="User ID"/>
                <Button variant="info" onClick={this.registerUser}>Register</Button>
            </div>
        );
    }
}