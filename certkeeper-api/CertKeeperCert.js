const crypto = require('crypto');


class CertKeeperCert {
    constructor(cert) {
        if(cert != null){
            this.certID = cert.certID;
            this.content = cert.content;
            this.disclosed = cert.disclosed;
            this.digest = cert.digest;
            this.signature = cert.signature;
        }
        else{
            this.certID = "";
            this.content = {};
            this.disclosed = "true";
            this.digest = "";
            this.signature = "";
        }
        
    }

    readContent(contentJson) {
        this.content = this.sortContent(contentJson);
        this.generateHash();
    }

    sortContent(toSort) {
        var self = this;
        var ordered = {};
        Object.keys(toSort).sort().forEach(function(key) {
            if(typeof toSort[key] === 'object'){
                ordered[key] = self.sortContent(toSort[key]);
            }
            else{
                ordered[key] = toSort[key];
            }
        });
        return ordered;
    };

    getContent() {
        return this.sortContent(this.content);
    }

    generateHash(){
        const hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(this.getContent()));
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
        hash.update(JSON.stringify(this.getContent()));
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

// a.readContent({
//     certID: "Org1MSP-test1",
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
// console.log(a);

// const keyPair = crypto.generateKeyPairSync('rsa', {
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
// a.generateSign(keyPair.privateKey);
// console.log(a);
// console.log(JSON.stringify(keyPair));

module.exports.CertKeeperCert = CertKeeperCert;