# CertKEEPer

The Chinese University of Hong Kong

Department of Computer Science and Engineering

Final Year Project 2019-2020


Group: IK1901

Supevisor: Professor KING Kuo Chin Irwin

## Demo
Youtube: https://www.youtube.com/watch?v=20CdIIswAn4

## Prerequisites
Follow this link to install the prerequisities of Hyperledger:

https://hyperledger-fabric.readthedocs.io/en/release-2.0/prereqs.html

Follow this link to install Samples, Binaries, and Docker Images of Hyperledger:

https://hyperledger-fabric.readthedocs.io/en/release-2.0/install.html

Use

```
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.0.0 1.4.6 0.4.18
```
to pull down binaries and images.

## Installing

```
git clone git@github.com:Nulllun/CSFYP_CertKEEPer.git
```

Start Hyperledger Fabric first
```
cd hyperledger/keep-network
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC
```

After chaincode has been successfully deployed, start REST API server
```
cd certkeeper-api
npm install
rm wallet/*
node enrollAdmin.js
npm start
```
Server should be listening on port 5000


Next, start general KEEP user's frontend
```
cd frontend
npm install
npm start
```
frontend should be listening on port 3000


Start admin's frontend
```
cd frontend_admin
npm install
npm start
```
Admin frontend should be listening on port 3001


After use, remember execute the following
```
cd hyperledger/test-network
./network.sh down
```
to completely shut down hyperledger fabric

## Bring New Org to Existing Network
### Localhost

Please start the Hyperledger Fabric Network before running the following code
```
cd hyperledger/keep-network/addOrg3
./addOrg3.sh up -ca -s couchdb
./addOrg3.sh deployCC
```

### Not in Localhost
Generate the new config.json for the new organization in new organization's machine
```
cd hyperledger/keep-network/addOrg3
./addOrg3.sh generate -ca
```
Then send the new config.json to the endorsers

For the first endorsers, run the following commands
```
cd hyperledger/keep-network/addOrg3
./addOrg3.sh genConfigBlock -j /path/to/new/config.json -o new_config_block.pb
export PATH=${PWD}/../../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=${PWD}
export CORE_PEER_LOCALMSPID=<MSPID>
export CORE_PEER_TLS_ROOTCERT_FILE=/path/to/tls/rootcert
export CORE_PEER_MSPCONFIGPATH=/path/to/msp/config
export CORE_PEER_ADDRESS=<peer address>
peer channel signconfigtx -f new_config_block.pb
```
The new_config_block.pb need to be sent to next endorser after signer

For the second to n-1 endorsers, run the following command
```
cd hyperledger/keep-network/addOrg3
export PATH=${PWD}/../../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=${PWD}
export CORE_PEER_LOCALMSPID=<MSPID>
export CORE_PEER_TLS_ROOTCERT_FILE=/path/to/tls/rootcert
export CORE_PEER_MSPCONFIGPATH=/path/to/msp/config
export CORE_PEER_ADDRESS=<peer address>
peer channel signconfigtx -f new_config_block.pb
```

For the last endorser, run the following command
```
cd hyperledger/keep-network/addOrg3
export PATH=${PWD}/../../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=${PWD}
export CORE_PEER_LOCALMSPID=<MSPID>
export CORE_PEER_TLS_ROOTCERT_FILE=/path/to/tls/rootcert
export CORE_PEER_MSPCONFIGPATH=/path/to/msp/config
export CORE_PEER_ADDRESS=<peer address>
peer channel update -f org3_update_in_envelope.pb -c mychannel -o <orderer endpoint> --ordererTLSHostnameOverride  orderer.example.com --tls --cafile /path/to/orderer/tls/cert
```

## Built With
[Material Kit React. Coded by Creative Tim](https://www.creative-tim.com/product/material-kit-react) - Material UI Kit used

[npm](https://www.npmjs.com/) - Package manager

[Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/en/release-2.0/tutorials.html) - Blockchain

## Authors
[Nullun](https://github.com/Nulllun)

[daisymlt](https://github.com/daisymlt)

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Nulllun/CSFYP_CertKEEPer/blob/master/LICENSE) file for details

