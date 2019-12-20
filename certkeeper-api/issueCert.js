const express = require('express');
const router = express.Router();

const { InMemoryWallet, Gateway } = require('fabric-network');
const path = require('path');

const { CertKeeperCert } = require('./CertKeeperCert');
const CryptoSuite_ECDSA_AES = require('fabric-ca-client/lib/impl/CryptoSuite_ECDSA_AES');

const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'first-network', 'connection-org1.json');

// View user's own certs
router.post('/', async (req, res) => {

    try {
        let cert = req.body.cert;
        let walletJson = req.body.wallet;
        let userID = walletJson.userID;
        let wallet = new InMemoryWallet();
        await wallet.import(userID, walletJson);
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: userID, discovery: { enabled: true, asLocalhost: true } });
        let crypto = gateway.getClient().getCryptoSuite();
        let key = await crypto.importKey(walletJson.privateKey);
        let targetCert = new CertKeeperCert();
        targetCert.readFromJson(cert);
        let signature = await crypto.sign(key, Buffer.from(JSON.stringify(targetCert.outputCertContent()))).toString('hex');

        cert.signerID = walletJson.userID;
        cert.signerName = walletJson.userID + "(Name)";
        cert.signature = signature;
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('certkeeper');

        // Evaluate the specified transaction.
        await contract.submitTransaction('issueCert', JSON.stringify(cert));
        await gateway.disconnect();
        res.status(200).json({ result: "Insertion is proposed to Hyperledger" });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({ result: "Fail" });
    }
});

module.exports = router;