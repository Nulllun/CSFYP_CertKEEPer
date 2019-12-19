const express = require('express');
const router = express.Router();

const { InMemoryWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'first-network', 'connection-org1.json');

// View user's own certs
router.post('/', async (req, res) => {
    let walletStr = req.body.wallet;
    try {
        let walletJson = JSON.parse(walletStr);
        let userID = walletJson.userID;
        let wallet = new InMemoryWallet();
        await wallet.import(userID, walletJson);
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: userID, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('certkeeper');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryCertByString', `{"selector": {"recipient": "${userID}"}}`);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json(JSON.parse(result.toString()));

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({result: "Fail"});
    }
});

module.exports = router;