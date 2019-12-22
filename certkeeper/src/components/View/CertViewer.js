import React, { Component } from 'react';
import '../main.css';
import Button from 'react-bootstrap/Button';
import {
    CollapsibleComponent,
    CollapsibleHead,
    CollapsibleContent
} from "react-collapsible-component";

export default class CertViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certList: []
        };
        this.getCert = this.getCert.bind(this);
        this.renderCerts = this.renderCerts.bind(this);
    }

    async getCert() {
        let walletStr = sessionStorage['wallet'];
        console.log('Request is sent');
        if (walletStr !== undefined && walletStr !== null) {
            let path = 'http://localhost:5000/view';
            let response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    wallet: JSON.parse(walletStr)
                }),
            });
            let certList = await response.json();
            console.log(certList);
            if (response.status === 200) {
                this.setState({ certList: this.state.certList.concat(certList) });
            }
        }
    }

    renderCerts(certList) {
        return certList.map((cert, arrKey) => {
            return (
                <div className="certificate" key={arrKey}>                    
                    <CollapsibleComponent>
                        <CollapsibleHead className="additionalClassForHead" isExpanded={true}>
                            {cert.courseTitle}
                        </CollapsibleHead>
                        <CollapsibleContent className="additionalClassForContent" isExpanded={true}>
                            <p>Certificate ID: {cert.certID}</p>
                            <p>Issue Platform: {cert.issuePlatform}</p>
                            <p>Institution: {cert.institution}</p>
                            <p>Title: {cert.courseTitle}</p>
                            <p>Description: {cert.courseDescription}</p>
                            <p>TeacherID: {cert.teacherID}</p>
                            <p>TeacherName: {cert.teacherName}</p>
                            <p>RecipientID: {cert.recipientID}</p>
                            <p>RecipientName: {cert.recipientName}</p>
                            <p>Grade: {cert.grade}</p>
                            <p>Issue Date: {cert.issueDate}</p>
                            <p>Signature: {cert.signature}</p>
                            <p>SignerID: {cert.signerID}</p>
                            <p>SignerName: {cert.signerName}</p>
                        </CollapsibleContent>
                    </CollapsibleComponent>
                    <hr></hr>
                </div>
            )
        });
    }

    render() {
        return (
            <div id="padding">
                <br></br>
                <Button variant="info" onClick={this.getCert}>Show My Certificates</Button>
                <br/>
                {this.renderCerts(this.state.certList)}
            </div>
        );
    }
}