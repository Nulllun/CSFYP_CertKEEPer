/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, InMemoryWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', 'hyperledger', 'first-network', 'connection-org1.json');

async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (userExists) {
            console.log('An identity for the user "user1" already exists in the wallet');
            return;
        }

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
        const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: 'user7', role: 'client' }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: 'user7', enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('Org1MSP', enrollment.certificate, enrollment.key.toBytes());
        
        let newWallet = new InMemoryWallet(userIdentity);

        //await newWallet.import('user7-1', userIdentity);
        //await newWallet.import('user7-2', userIdentity2);

        //let tmp = await newWallet.export('user7-1');
        //let tmp2 = await newWallet.export('user7-2');

        //console.log(tmp);
        //console.log(tmp2)
        console.log(newWallet);
        console.log('Successfully registered and enrolled admin user "user7" and imported it into the wallet');
        resizeBy.status(200).json(newWallet);
    } catch (error) {
        console.error(`Failed to register user "user7": ${error}`);
        process.exit(1);
    }
}

main();
