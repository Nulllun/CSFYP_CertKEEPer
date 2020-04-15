# CSFYP_CertKEEPer

The Chinese University of Hong Kong

Department of Computer Science and Engineering

Final Year Project 2019-2020

Group: IK1901

## Prerequisites:
Follow the instruction on this link and install the prerequisities:  
https://hyperledger-fabric.readthedocs.io/en/release-2.0/prereqs.html

## To start: 

```
git clone git@github.com:Nulllun/CSFYP_CertKEEPer.git

// To start the Hyperledger Fabric
cd hyperledger/test-network
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC

// After use, remember execute the following line
./network.sh down 

// To start the front end
cd frontend
npm install
npm start

// To start the API server
cd certkeeper-api
npm 
(clear all the files in /wallet)
node enrollAdmin_new.js
npm start
```

admin frontend is in progress, to view
```
cd frontend_admin
npm install
npm start
```
