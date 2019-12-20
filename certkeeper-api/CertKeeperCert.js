class CertKeeperCert {
    constructor() {
        // the ID of the certificat, which is unique
        this.certID = '';
        // the platform that issue the certificate (e.g. LMS)
        this.issuePlatform = '';
        // the institution that offer the course (e.g. CUHK)
        this.institution = '';
        // information of the course taken {ID, title, description}
        this.courseID = '';
        this.courseTitle = '';
        this.courseDescription = '';
        // information of the teachers. For example, {ID: 0001 , name: Prof. King}
        this.teacherID = '';
        this.teacherName = '';
        // information of the recipient {ID, name}
        this.recipientID = '';
        this.recipientName = '';
        this.grade = '';
        // date in string representation
        this.issueDate = '';
        // digital signature and information of the signer {ID, name, signature}
        this.signature = '';
        this.signerID = '';
        this.signerName = '';
    }

    readFromJson(json) {
        this.certID = json.certID;
        this.issuePlatform = json.issuePlatform;
        this.institution = json.institution;
        this.courseID = json.courseID;
        this.courseTitle = json.courseTitle;
        this.courseDescription = json.courseDescription;
        this.teacherID = json.teacherID;
        this.teacherName = json.teacherName;
        this.recipientID = json.recipientID;
        this.recipientName = json.recipientName;
        this.grade = json.grade;
        this.issueDate = json.issueDate;
        this.signature = json.signature;
        this.signerID = json.signerID;
        this.signerName = json.signerName;
    }

    outputCertContent() {
        const json = {
            certID: this.certID,
            issuePlatform: this.issuePlatform,
            institution: this.institution,
            courseID: this.courseID,
            courseTitle: this.courseTitle,
            courseDescription: this.courseDescription,
            teacherID: this.teacherID,
            teacherName: this.teacherName,
            recipientID: this.recipientID,
            recipientName: this.recipientName,
            grade: this.grade,
            issueDate: this.issueDate,
        }
        return json;
    }
}

module.exports.CertKeeperCert = CertKeeperCert;