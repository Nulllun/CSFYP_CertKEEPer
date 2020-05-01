const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const { CertKeeperCert } = require('./CertKeeperCert');

const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'keep-network', 'organizations', 'peerOrganizations', 'keep.example.com','connection-keep.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

// View user's own certs
router.post('/', async (req, res) => {

    try {
        // let certID = req.body.certID;
        let content = req.body.certContent;

        const hash = crypto.createHash('sha256');
        hash.update(content.recipientID + content.courseID + content.certMsg + content.issueDate);
        let hashedCertID = hash.digest('hex');
        let certID = hashedCertID;

        let cert = new CertKeeperCert();
        cert.certID = certID;
        cert.readContent(content);
        if(content.signerID != "" && content.signerName != "" && content.signerID != null && content.signerName != null){
            let privateKey = req.body.privateKey;
            cert.generateSign(privateKey);
        };

        // Create a new gateway for connecting to our peer node.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('certkeeper');

        // Evaluate the specified transaction.
        await contract.submitTransaction('issueCert', JSON.stringify(cert));

        console.log("Transaction has been submitted");
        res.status(200).json({ result: "Insertion is proposed to Hyperledger" });
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({ result: "Fail" });
    }
});

module.exports = router;