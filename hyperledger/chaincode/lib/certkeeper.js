'use strict';

const { Contract } = require('fabric-contract-api');

class CertKeeper extends Contract {

    async queryCert(ctx, certID){
        const certAsBytes = await ctx.stub.getState(certID);
        if (!certAsBytes || certAsBytes.length === 0) {
            throw new Error(`${certID} does not exist`);
        }
        console.log(certAsBytes.toString());
        return certAsBytes.toString();
    }

    async insertCert(ctx, certID, title, grade){
        console.info("========== START : Insert Certificate ==========");

        const cert = {
            id: certID,
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