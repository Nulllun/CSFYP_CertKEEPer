import React, { Component } from 'react';


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            wallet: null
        }
        this.importWallet = this.importWallet.bind(this);
    }

    async importWallet(event){
        this.setState({wallet: event.target.value});
        console.log(this.state.wallet);
    }

    render() {
        return (
            <div>
                <h2>Login Page</h2>
                <input onChange={this.importWallet} type="file"/>
            </div>
        );
    }
}