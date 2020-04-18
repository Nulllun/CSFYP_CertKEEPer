const crypto = require('crypto');


class CertKeeperCert {
    constructor() {
        this.content = {
            // // the ID of the certificat, which is unique
            // certID: "",
            // // the platform that issue the certificate (e.g. LMS)
            // issuePlatform: "",
            // // the institution that offer the course (e.g. CUHK)
            // institution: "",
            // // information of the course taken {ID, title}
            // courseID: "",
            // courseTitle: "",
            // // information of the teachers. For example, {ID: 0001 , name: Prof. King}
            // teacherID: "",
            // teacherName: "",
            // // information of the recipient {ID, name}
            // recipientID: "",
            // recipientName: "",
            // grade: "",
            // // date in string representation
            // issueDate: "",
            // // information of the signer {ID, name, signature}
            // signerID: "",
            // signerName: ""
        };
        this.disclosed = false;
        this.digest = "";
        this.signature = "";
    }

    readContent(contentJson) {
        // this.content.certID = contentJson.certID;
        // this.content.issuePlatform = contentJson.issuePlatform;
        // this.content.institution = contentJson.institution;
        // this.content.courseID = contentJson.courseID;
        // this.content.courseTitle = contentJson.courseTitle;
        // this.content.teacherID = contentJson.teacherID;
        // this.content.teacherName = contentJson.teacherName;
        // this.content.recipientID = contentJson.recipientID;
        // this.content.recipientName = contentJson.recipientName;
        // this.content.grade = contentJson.grade;
        // this.content.issueDate = contentJson.issueDate;
        // this.content.signerID = contentJson.signerID;
        // this.content.signerName = contentJson.signerName;
        this.content = contentJson;
        this.generateHash();
    }

    getContent() {
        // const json = {
        //     certID: this.content.certID,
        //     issuePlatform: this.content.issuePlatform,
        //     institution: this.content.institution,
        //     courseID: this.content.courseID,
        //     courseTitle: this.content.courseTitle,
        //     courseDescription: this.content.courseDescription,
        //     teacherID: this.content.teacherID,
        //     teacherName: this.content.teacherName,
        //     recipientID: this.content.recipientID,
        //     recipientName: this.content.recipientName,
        //     grade: this.content.grade,
        //     issueDate: this.content.issueDate,
        //     signerID: this.content.signerID,
        //     signerName: this.content.signerName
        // }
        return this.content;
    }

    generateHash(){
        const hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(this.content));
        let digest = hash.digest('hex');
        this.digest = digest;
        return digest;
    }

    generateSign(privateKey){
        const sign = crypto.createSign('sha256');
        sign.update(this.digest);
        sign.end();
        const signature = sign.sign(privateKey, 'hex');
        this.signature = signature;
        return signature;
    }

    verifyHash(){
        const hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(this.content));
        let digest = hash.digest('hex');
        return this.digest == digest;
    }

    verifySign(publicKey){
        const verify = crypto.createVerify('sha256');
        verify.update(this.digest);
        verify.end();
        const result = verify.verify(publicKey, this.signature, 'hex');
        return result;
    }

}

// the following is for testing

// var a = new CertKeeperCert();
// console.log(a);
// a.readContent({
//     certID: "Org1MSP-4v324f",
//     issuePlatform: "KEEP",
//     institution: "CUHK",
//     courseID: "CSCI2100",
//     courseTitle: "Data Structure",
//     teacherID: "IK12421",
//     teacherName: "Irwin King",
//     recipientID: "keep-11550",
//     recipientName: "Michael Lun",
//     grade: "A+",
//     issueDate: "Today",
//     signerID: "IK12421",
//     signerName: "Iwrin"
// });

// const keyPair1 = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//       type: 'spki',
//       format: 'pem'
//     },
//     privateKeyEncoding: {
//       type: 'pkcs8',
//       format: 'pem',
//     }
// });
// console.log(a);

module.exports = CertKeeperCert;