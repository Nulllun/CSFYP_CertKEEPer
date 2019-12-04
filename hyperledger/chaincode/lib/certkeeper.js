'use strict';

const { Contract } = require('fabric-contract-api');

class CertKeeper extends Contract {

    async queryCert(ctx, certID){
        const certAsBytes = await ctx.stub.getState(certID);
        if (!certAsBytes || certAsBytes.length === 0) {
            throw new Error(`${certID} does not exist`);
        }
        console.log(certAsBytes.toString());
        return carAsBytes.toString();
    }

    async insertCert(ctx, certID, cert){
        console.info("========== START : Insert Certificate ==========");

        if(typeof cert !== "object"){
            throw new Error("The input is not a JSON object");
        }
        if(checkFields(cert) != true){
            throw new Error("The input has missing fields");
        }

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