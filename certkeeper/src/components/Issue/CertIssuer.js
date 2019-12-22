import React, { Component } from 'react';
import '../main.css';
import Button from 'react-bootstrap/Button';
import { isModuleDeclaration } from '@babel/types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default class CertIssuer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certID: '',
            issuePlatform: '',
            institution: '',
            courseID: '',
            courseTitle: '',
            courseDescription: '',
            teacherID: '',
            teacherName: '',
            recipientID: '',
            recipientName: '',
            grade: '',
            issueDate: '',
            signature: '',
            signerID: '',
            signerName: '',
        };
        this.issueCert = this.issueCert.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    async issueCert() {
        let cert = this.state;
        let walletStr = sessionStorage['wallet'];
        console.log(`Request is sent with ${cert}`);
        if (cert !== null) {
            let path = 'http://localhost:5000/issue';
            let response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cert: cert,
                    wallet: JSON.parse(walletStr),
                }),
            });
            let data = await response.json();
            console.log(data);
            if (response.status === 200) {
                console.log("Certificates issued");
            }
        }
    }

    handleInput(event){
        this.setState({[event.target.id]: event.target.value})
    }

    submit = () => {
        confirmAlert({
          title: 'Confirm to issue',
          message: 'Please confirm the information is correct (To edit please click outside the box)',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.issueCert()
            },
            // {
            //   label: 'No',
            //   onClick: () => alert('Click No')
            // }
          ]
        });
    };

    render() {
        return (
            <div id='padding'>
            <div>
                <h4>Enter required information to issue certificate</h4>
                <br></br>
                <input id="certID" onChange={this.handleInput} placeholder="Enter certID" /><br/>
                <input id="issuePlatform" onChange={this.handleInput} placeholder="Enter issuePlatform" /><br/>
                <input id="institution" onChange={this.handleInput} placeholder="Enter institution" /><br/>
                <input id="courseID" onChange={this.handleInput} placeholder="Enter courseID" /><br/>
                <input id="courseTitle" onChange={this.handleInput} placeholder="Enter courseTitle" /><br/>
                <input id="courseDescription" onChange={this.handleInput} placeholder="Enter courseDescription" /><br/>
                <input id="teacherID" onChange={this.handleInput} placeholder="Enter teacherID" /><br/>
                <input id="teacherName" onChange={this.handleInput} placeholder="Enter teacherName" /><br/>
                <input id="recipientID" onChange={this.handleInput} placeholder="Enter recipientID" /><br/>
                <input id="recipientName" onChange={this.handleInput} placeholder="Enter recipientName" /><br/>
                <input id="grade" onChange={this.handleInput} placeholder="Enter grade" /><br/>
                <input id="issueDate" onChange={this.handleInput} placeholder="Enter issueDate" /><br/><br/>
                {/* <input id="signature" onChange={this.handleInput} placeholder="Enter signature" /><br/>
                <input id="signerID" onChange={this.handleInput} placeholder="Enter signerID" /><br/>
                <input id="signerName" onChange={this.handleInput} placeholder="Enter signerName" /><br/> */}
                <Button variant="info" onClick={this.submit}>Issue</Button>
                {/* <Button variant="info" onClick={() => console.log(this.state)}>Show</Button> */}
            </div>
            </div>
        );
    }
}