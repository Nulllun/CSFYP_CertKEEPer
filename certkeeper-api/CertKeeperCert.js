class CertKeeperCert {
    constructor(){
        // the ID of the certificat, which is unique
        this.certID = '';
        // the platform that issue the certificate (e.g. LMS)
        this.issuePlatform = '';
        // the institution that offer the course (e.g. CUHK)
        this.institution = '';
        // information of the course taken {ID, title, description}
        this.course = {};
        // information of the teachers. For example, {ID: 0001 , name: Prof. King}
        this.teacher = {};
        // information of the recipient {ID, name}
        this.recipient = {};
        this.grade = '';
        // date in string representation
        this.issueDate = '';
        // digital signature and information of the signer {ID, name, signature}
        this.signature = {};
    }

    readFromJson(json){
        this.certID = json.certID;
        this.issuePlatform = json.issuePlatform;
        this.institution = json.institution;
        this.course = json.course;
        this.teacher = json.teacher;
        this.recipient = json.recipient;
        this.grade = json.grade;
        this.issueDate = '';
        this.signature = json.signature;
    }
}

module.exports=CertKeeperCert;