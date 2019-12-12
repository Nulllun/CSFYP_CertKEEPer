'use strict';

const { Contract } = require('fabric-contract-api');

class CertKeeper extends Contract {

    async initLedger(ctx){
        console.info("========== START : Initialize Ledger ==========");
        // generate certificates for testing
        const certs = [
            {
                id: '1',
                owner: 'Michael',
                title: 'CSCI2100',
                grade: 'B+',
            },
            {
                id: '2',
                owner: 'Daisy',
                title: 'CSCI4998',
                grade: 'PASS',
            },
            {
                id: '3',
                owner: 'Matthew',
                title: 'CSCI4180',
                grade: 'FAIL',
            },
            {
                id: '4',
                owner: 'Sam',
                title: 'JASP2450',
                grade: 'B',
            },
            {
                id: '5',
                owner: 'MoMo',
                title: 'CSCI4130',
                grade: 'A',
            },
        ];

        for (let i = 0; i < certs.length ; i++){
            await ctx.stub.putState('CERT' + certs[i].id, Buffer.from(JSON.stringify(certs[i])));
            console.info('Added <--> ', certs[i]);
        }

        console.info("========== END : Initialize Ledger ==========");
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
        const endKey = 'CERT5';

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
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async insertCert(ctx, certID, owner, title, grade){
        console.info("========== START : Insert Certificate ==========");

        const cert = {
            id: certID,
            owner: owner,
            title: title,
            grade: grade
        };

        await ctx.stub.putState(certID, Buffer.from(JSON.stringify(cert)));
    
        console.info("========== END : Insert Certificate ==========")
    }

    async deleteCert(ctx, certID){
        await ctx.stub.deleteState(certID);
    }

    checkFields(cert){
        return true;
    }

}

module.exports = CertKeeper;