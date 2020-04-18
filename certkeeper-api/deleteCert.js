const express = require('express');
const router = express.Router();

const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');


const { CertKeeperCert } = require('./CertKeeperCert');

const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com','connection-org1.json');
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
        const result = await contract.submitTransaction('deleteCert', certID);

        console.log("Transaction has been submitted");
        res.status(200).json({ result: result.toString() });

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({ result: error });
    }
});

module.exports = router;