const express = require('express');
const router = express.Router();

const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const NodeRSA = require('node-rsa');

const { CertKeeperCert } = require('./CertKeeperCert');

const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com','connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

// View user's own certs
router.post('/', async (req, res) => {

    try {
        let cert = req.body.cert;
        // let walletJson = req.body.wallet;
        // let userID = walletJson.userID;
        // let wallet = new InMemoryWallet();
        // await wallet.import(userID, walletJson);
        // Create a new gateway for connecting to our peer node.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });
        // let rsa = new NodeRSA();
        // await rsa.importKey(walletJson.rsaPrvKey, 'pkcs8-private-pem');
        // let targetCert = new CertKeeperCert();
        // targetCert.readFromJson(cert);
        // let signature = await rsa.sign(Buffer.from(JSON.stringify(targetCert.outputCertContent()))).toString('hex');

        // cert.signerID = walletJson.userID;
        // cert.signerName = walletJson.userID + "(Name)";
        // cert.signature = signature;
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('certkeeper');

        // Evaluate the specified transaction.
        await contract.submitTransaction('issueCert', JSON.stringify(cert));
        res.status(200).json({ result: "Insertion is proposed to Hyperledger" });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({ result: "Fail" });
    }
});

module.exports = router;