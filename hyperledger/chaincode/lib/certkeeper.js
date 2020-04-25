'use strict';

const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;

class CertKeeper extends Contract {

    async initLedger(ctx){
        // generate certificates for testing
        const certs = [
            {   
                certID: "Org1MSP-test1",
                content: {
                    courseID: "CSCI2100",
                    courseTitle: "Data Structure",
                    grade: "A+",
                    institution: "CUHK",
                    issueDate: "Today",
                    issuePlatform: "KEEP",
                    recipientID: "keep-11550",
                    recipientName: "Michael Lun",
                    signerID: "IK12421",
                    signerName: "Iwrin",
                    teacherID: "IK12421",
                    teacherName: "Irwin King"
                },
                disclosed: true,
                digest: "06314951cf26428647f2ec9dd4fe5ae32057b384dfbdc3afd3ebc4a4097f57fe",
                signature: "1cd20d5fa4a19ee166d1faaa3e07df58e51d7bf69c6251cad7ccfcaba8886375c2486301d99294536c5b8f762d70f1ee85a08854d69a802d6b044a1f546600e6b819b6c7cab5a2ced4706122163f762eb901e5171f607266acdd1cc7caaf99584e3fae6c4334514f7da7b65d3099e6d8da670aa34722205ebbf39f0d5c560b6a9019793099786990119a97fbd44ab50753c5b073b51182ff13dd0e31de08b83f8647911acf30848a6a480284cf4323e75dbfa77cac6b56ae4a5d1edaaab76dd6cf30a22972e0616fdfc7ce793d52442c0a8427eb35c0157b48806ad490e24ccc455d412e72913f6a5e89cfa02d7c53c9a3316fe8ce03ad1676fc5313c728175d"
            },
        ];

        for (let i = 0; i < certs.length ; i++){
            certs[i].docType = "CERT";
            await ctx.stub.putState('Org1MSP-test1', Buffer.from(JSON.stringify(certs[i])));
        }

    }

    async queryCert(ctx, certID){
        const certAsBytes = await ctx.stub.getState(certID);
        if (!certAsBytes || certAsBytes.length === 0) {
            throw new Error(`${certID} does not exist`);
        }
        console.log(certAsBytes.toString());
        let cert = JSON.parse(certAsBytes.toString());
        return JSON.stringify(cert);
    }

    async queryCertByString(ctx, query){
        const iterator = await ctx.stub.getQueryResult(query);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                Record.certID = res.value.key;
                allResults.push(Record);
            }
            if (res.done) {
                await iterator.close();
                return JSON.stringify(allResults);
            }
        }
    }

    async issueCert(ctx, certStr){
        let cert = JSON.parse(certStr);
        cert.docType = 'CERT';
        let cid = new ClientIdentity(ctx.stub);
        let mspID = cid.getMSPID();
        // cert.certID = `${mspID}-${cert.certID}`;
        cert.certID = `KEEP-${cert.certID}`;
        await ctx.stub.putState(cert.certID, Buffer.from(JSON.stringify(cert)));
    }

    async signCert(ctx, certID, signature){
        var cert = await ctx.stub.getState(certID);
        if(cert.signature == ''){
            cert.signature = signature;
            await ctx.stub.putState(certID, Buffer.from(JSON.stringify(cert)));
        }
    }

    async deleteCert(ctx, certID){
        await ctx.stub.deleteState(certID);
    }

    async discloseCert(ctx, certID, option){
        const certAsBytes = await ctx.stub.getState(certID);
        if (!certAsBytes || certAsBytes.length === 0) {
            throw new Error(`${certID} does not exist`);
        }
        console.log(certAsBytes.toString());
        let cert = JSON.parse(certAsBytes.toString());
        cert.disclosed = option;
        await ctx.stub.putState(certID, Buffer.from(JSON.stringify(cert)));
    }

    async insertPubKey(ctx, userID, publicKey){
        const tuple = {
            userID: userID,
            publicKey: publicKey,
            docType: "PUBKEY"
        }
        await ctx.stub.putState("PUBKEY-" + tuple.userID, Buffer.from(JSON.stringify(tuple)));
    }

    async queryPubKey(ctx, userID){
        const publicKeyTurple = await ctx.stub.getState("PUBKEY-" + userID);
        if (!publicKeyTurple || publicKeyTurple.length === 0) {
            throw new Error(`${userID} does not exist`);
        }
        let turple = JSON.parse(publicKeyTurple.toString());
        return JSON.stringify(turple);
    }

}

module.exports = CertKeeper;