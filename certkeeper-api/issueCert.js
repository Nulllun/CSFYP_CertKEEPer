const express = require('express');
const router = express.Router();

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'first-network', 'connection-org1.json');

// View user's own certs
router.post('/', async (req, res) => {
    let certID = req.body.certID;
    let recipient = req.body.recipient;
    let courseTitle = req.body.courseTitle;
    let grade = req.body.grade;

    try {

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('certkeeper');

        // Evaluate the specified transaction.
        await contract.submitTransaction('issueCert', certID, recipient, courseTitle, grade);
        await gateway.disconnect();
        res.status(200).json({result: "Insertion is proposed to Hyperledger"});

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({result: "Fail"});
    }
});

module.exports = router;