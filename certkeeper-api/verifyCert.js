const express = require('express');
const router = express.Router();

const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const { CertKeeperCert } = require('./CertKeeperCert');

const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'keep-network', 'organizations', 'peerOrganizations', 'keep.example.com','connection-keep.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

// View user's own certs
router.post('/', async (req, res) => {
    let certID = req.body.certID;

    try {

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('certkeeper');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryCert', certID);

        let certJson = JSON.parse(result.toString());
        let cert = new CertKeeperCert(certJson);
        cert.certID = certID;
        let verifyResult = 'no signature';

        if(certJson.signature != ""){
            let publicKey = req.body.publicKey;
            if(cert.verifyHash() && cert.verifySign(publicKey)){
                verifyResult = 'true'
            }
            else{
                verifyResult = 'false'
            }
        }

        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({ cert: cert, verifyResult: verifyResult });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({ result: error.message });
    }
});

module.exports = router;