import React, { Component } from 'react';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletFile: null,
            wallet: null
        }
        this.importWallet = this.importWallet.bind(this);
        this.renderWallet = this.renderWallet.bind(this);
    }

    async importWallet(event) {
        if (event.target.files[0] !== undefined) {
            this.setState({ walletFile: event.target.files[0] }, () => {
                const reader = new FileReader();
                reader.readAsText(this.state.walletFile, "UTF-8");
                reader.onload = (event) => {
                    let wallet = JSON.parse(event.target.result)
                    this.setState({ wallet:  wallet});
                    window.sessionStorage.setItem("wallet", JSON.stringify(wallet));
                }
                reader.onerror = (event) => {
                    alert('Fail to read walle file')
                }
            });
        }
    }

    renderWallet() {
        if (this.state.wallet !== null) {
            return (
                <p>Login Success</p>
            );
        }
        else{
            return(
                <input onChange={this.importWallet} type="file" />
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Login Page</h2>
                {this.renderWallet()}
            </div>
        );
    }
}