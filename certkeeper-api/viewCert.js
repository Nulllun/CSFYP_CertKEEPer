const express = require('express');
const router = express.Router();

const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com','connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

// View user's own certs
router.post('/', async (req, res) => {
    let searchCriteria = req.body.searchBy;

    try {
        // let walletJson = req.body.wallet;
        // let userID = walletJson.userID;
        // let wallet = new InMemoryWallet();
        // await wallet.import(userID, walletJson);
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
        if (searchCriteria == 1){
            // const result = await contract.evaluateTransaction('queryCert', req.body.certID);
            // const result = await contract.evaluateTransaction('queryCertByString', `{"selector": {"certID": "${req.body.certID}", "docType": "CERT"}}`);
            const result = await contract.evaluateTransaction('queryCert', req.body.certID);
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            res.status(200).json(JSON.parse(result.toString()));
        }
        else if (searchCriteria == 2){
            const result = await contract.evaluateTransaction('queryCertByString', `{"selector": {"recipientID": "${req.body.recipientID}", "docType": "CERT"}}`);
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            res.status(200).json(JSON.parse(result.toString()));
        }
        else if (searchCriteria == 3){
            // const result = await contract.evaluateTransaction('queryCert', req.body.issueDate);
            const result = await contract.evaluateTransaction('queryCertByString', `{"selector": {"issueDate": "${req.body.issueDate}", "docType": "CERT"}}`);
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            res.status(200).json(JSON.parse(result.toString()));
        }
        else{
            res.status(404).json({result: "Fail. No search critera is provided."});
        }

        // const result = await contract.evaluateTransaction('queryCertByString', `{"selector": {"recipientID": ${req.body.recipientID}, "docType": "CERT"}}`);
        // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // res.status(200).json(JSON.parse(result.toString()));

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({result: "Fail"});
    }
});

module.exports = router;