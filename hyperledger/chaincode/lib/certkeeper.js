'use strict';

const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;

class CertKeeper extends Contract {

    async initLedger(ctx){
        // generate certificates for testing
        const certs = [
            {
                certID: 'CERT-test',
                recipientID: 'testID',
                courseTitle: 'testCourseTitle',
                grade: 'testGrade',
            },
        ];

        for (let i = 0; i < certs.length ; i++){
            certs[i].docType = "CERT";
            await ctx.stub.putState('CERT-test', Buffer.from(JSON.stringify(certs[i])));
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
        cert.certID = `${mspID}-${cert.certID}`;
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