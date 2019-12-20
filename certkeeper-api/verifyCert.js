const express = require('express');
const router = express.Router();

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const { CertKeeperCert } = require('./CertKeeperCert');

const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'first-network', 'connection-org1.json');

// View user's own certs
router.post('/', async (req, res) => {
    let certID = req.body.certID;

    try {

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        let crypto = gateway.getClient().getCryptoSuite();

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('certkeeper');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryCert', certID);

        let certJson = JSON.parse(result.toString());
        let verifyResult = 'no signature';
        if (certJson.signature !== '' && certJson.signature != undefined) {
            let certContent = new CertKeeperCert();
            certContent.readFromJson(certJson);

            const keyBytes = await contract.evaluateTransaction('queryPubKey', certJson.signerID);

            const keyPEM = JSON.parse(keyBytes.toString()).publicKey;
            const publicKey = await crypto.importKey(keyPEM);
            verifyResult = await crypto.verify(publicKey, Buffer.from(certJson.signature, 'hex'), Buffer.from(JSON.stringify(certContent.outputCertContent())));
            verifyResult = verifyResult.toString();
        }
        await gateway.disconnect();

        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({ cert: certJson, verifyResult: verifyResult });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({ result: "Fail" });
    }
});

module.exports = router;