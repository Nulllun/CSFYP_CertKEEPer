'use strict';

const { Contract } = require('fabric-contract-api');

class CertKeeper extends Contract {

    async initLedger(ctx){
        // generate certificates for testing
        const certs = [
            {
                owner: 'Michael',
                title: 'CSCI2100',
                grade: 'B+',
            },
            {
                owner: 'Daisy',
                title: 'CSCI4998',
                grade: 'PASS',
            },
            {
                owner: 'Matthew',
                title: 'CSCI4180',
                grade: 'FAIL',
            },
            {
                owner: 'Sam',
                title: 'JASP2450',
                grade: 'B',
            },
            {
                owner: 'MoMo',
                title: 'CSCI4130',
                grade: 'A',
            },
            {
                owner: 'Michael',
                title: 'CSCI4130',
                grade: 'A-',
            },
        ];

        for (let i = 0; i < certs.length ; i++){
            certs[i].docType = "CERT";
            await ctx.stub.putState('CERT' + i, Buffer.from(JSON.stringify(certs[i])));
        }

    }

    async queryCert(ctx, certID){
        const certAsBytes = await ctx.stub.getState(certID);
        if (!certAsBytes || certAsBytes.length === 0) {
            throw new Error(`${certID} does not exist`);
        }
        console.log(certAsBytes.toString());
        return certAsBytes.toString();
    }

    async queryAllCert(ctx){
        const startKey = 'CERT1';
        const endKey = 'CERT6';
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                await iterator.close();
                return JSON.stringify(allResults);
            }
        }
    }

    async queryCertByString(ctx, query){
        const iterator = await ctx.stub.getQueryResult(query);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                await iterator.close();
                return JSON.stringify(allResults);
            }
        }
    }

    async insertCert(ctx, certID, owner, title, grade){
        const cert = {
            owner: owner,
            title: title,
            grade: grade,
            docType: 'CERT'
        };
        await ctx.stub.putState(certID, Buffer.from(JSON.stringify(cert)));
    }

    async signCert(ctx, certID, signature){
        var cert = await ctx.stub.getState(certID);
        if(cert.digiSign == ''){
            cert.digiSign = signature;
            await ctx.stub.putState(certID, Buffer.from(JSON.stringify(cert)));
        }
    }

    async deleteCert(ctx, certID){
        await ctx.stub.deleteState(certID);
    }

    checkFields(cert){
        return true;
    }

}

module.exports = CertKeeper;