const crypto = require('crypto');


class CertKeeperCert {
    constructor() {
        this.content = {
            // the ID of the certificat, which is unique
            certID: "",
            // the platform that issue the certificate (e.g. LMS)
            issuePlatform: "",
            // the institution that offer the course (e.g. CUHK)
            institution: "",
            // information of the course taken {ID, title, description}
            courseID: "",
            courseTitle: "",
            courseDescription: "",
            // information of the teachers. For example, {ID: 0001 , name: Prof. King}
            teacherID: "",
            teacherName: "",
            // information of the recipient {ID, name}
            recipientID: "",
            recipientName: "",
            grade: "",
            // date in string representation
            issueDate: "",
            // information of the signer {ID, name, signature}
            signerID: "",
            signerName: ""
        };
        this.digest = "";
        this.signature = "";
    }

    readContent(json) {
        this.content.certID = json.certID;
        this.content.issuePlatform = json.issuePlatform;
        this.content.institution = json.institution;
        this.content.courseID = json.courseID;
        this.content.courseTitle = json.courseTitle;
        this.content.courseDescription = json.courseDescription;
        this.content.teacherID = json.teacherID;
        this.content.teacherName = json.teacherName;
        this.content.recipientID = json.recipientID;
        this.content.recipientName = json.recipientName;
        this.content.grade = json.grade;
        this.content.issueDate = json.issueDate;
        this.content.signerID = json.signerID;
        this.content.signerName = json.signerName;
        this.digest = this.generateHash(this.content);
    }

    getContent() {
        const json = {
            certID: this.content.certID,
            issuePlatform: this.content.issuePlatform,
            institution: this.content.institution,
            courseID: this.content.courseID,
            courseTitle: this.content.courseTitle,
            courseDescription: this.content.courseDescription,
            teacherID: this.content.teacherID,
            teacherName: this.content.teacherName,
            recipientID: this.content.recipientID,
            recipientName: this.content.recipientName,
            grade: this.content.grade,
            issueDate: this.content.issueDate,
            signerID: this.content.signerID,
            signerName: this.content.signerName
        }
        return json;
    }

    generateHash(content){
        const hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(content));
        let digest = hash.digest('hex');
        return digest;
    }

}

// the following is for testing

// var a = new CertKeeperCert();
// a.readContent({
//     certID: "Org1MSP-4v324f",
//     issuePlatform: "KEEP",
//     institution: "CUHK",
//     courseID: "CSCI2100",
//     courseTitle: "Data Structure",
//     courseDescription: "Teaching ADT",
//     teacherID: "IK12421",
//     teacherName: "Irwin King",
//     recipientID: "keep-11550",
//     recipientName: "Michael Lun",
//     grade: "A+",
//     issueDate: "Today",
//     signerID: "IK12421",
//     signerName: "Iwrin"
// });
// console.log(a);
// a.readContent({
//     certID: "Org1MSP-4v324f",
//     issuePlatform: "KEEP",
//     institution: "CUHK",
//     courseID: "CSCI2100",
//     courseTitle: "Data Structure",
//     courseDescription: "Teaching ADT",
//     teacherID: "IK2421",
//     teacherName: "Irwin King",
//     recipientID: "keep-11550",
//     recipientName: "Michael Lun",
//     grade: "A+",
//     issueDate: "Today",
//     signerID: "IK12421",
//     signerName: "Iwrin"
// });
// console.log(a);

module.exports.CertKeeperCert = CertKeeperCert;