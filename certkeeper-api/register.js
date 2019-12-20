const express = require('express');
const router = express.Router();

const { FileSystemWallet, InMemoryWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'first-network', 'connection-org1.json');

// View user's own certs
router.post('/', async (req, res) => {
    const userID = req.body.userID;
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: userID, role: 'client' }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: userID, enrollmentSecret: secret });
        let userIdentity = X509WalletMixin.createIdentity('Org1MSP', enrollment.certificate, enrollment.key.toBytes());
        userIdentity.publicKey = enrollment.key.getPublicKey().toBytes();
        userIdentity.userID = userID;
        
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('certkeeper');

        await contract.submitTransaction('insertPubKey', userIdentity.userID, userIdentity.publicKey)

        console.log(`Successfully registered and enrolled user ${userID}`);
        res.status(200).json(userIdentity);

    } catch (error) {
        res.status(500).json({ result: `Failed to register user ${userID}: ${error}`});
    }
});

module.exports = router;