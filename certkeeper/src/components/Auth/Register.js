import React, { Component } from 'react';


export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            wallet: null
        }
        this.registerUser = this.registerUser.bind(this);
    }

    async registerUser(event){
        console.log(`Request is sent with {"type": "register"}`);
        if (true) {
            let path = 'http://localhost:5000/register';
            let response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                }),
            });
            let data = await response.json();
            console.log(data);
            if (response.status === 200) {
            }
        }
    }

    render() {
        return (
            <div>
                <h2>Register Page</h2>
                <button onClick={this.registerUser}>Register</button>
            </div>
        );
    }
}