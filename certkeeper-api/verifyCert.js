const express = require('express');
const router = express.Router();

const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const NodeRSA = require('node-rsa');

const { CertKeeperCert } = require('./CertKeeperCert');

const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'test-network', 'organizations', 'peerOrganizations', 'org3.example.com','connection-org3.json');
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
        let verifyResult = 'no signature';
        // if (certJson.signature !== '' && certJson.signature != undefined) {
        //     let certContent = new CertKeeperCert();
        //     certContent.readFromJson(certJson);

        //     const keyBytes = await contract.evaluateTransaction('queryPubKey', certJson.signerID);
        //     let rsa = new NodeRSA();
        //     let rsaPubKey = JSON.parse(keyBytes.toString()).publicKey;
        //     console.log(rsaPubKey);
        //     await rsa.importKey(rsaPubKey, 'pkcs8-public-pem');
        //     verifyResult = await rsa.verify(Buffer.from(JSON.stringify(certContent.outputCertContent())), Buffer.from(certJson.signature, 'hex'));
        //     verifyResult = verifyResult.toString();
        // }

        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({ cert: certJson, verifyResult: verifyResult });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({ result: "Fail" });
    }
});

module.exports = router;