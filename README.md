# CertKEEPer

The Chinese University of Hong Kong

Department of Computer Science and Engineering

Final Year Project 2019-2020


Group: IK1901

Supevisor: Professor KING Kuo Chin Irwin

## Prerequisites
Follow this link to install the prerequisities of Hyperledger:

https://hyperledger-fabric.readthedocs.io/en/release-2.0/prereqs.html

Follow this link to install Samples, Binaries, and Docker Images of Hyperledger:

https://hyperledger-fabric.readthedocs.io/en/latest/install.html#

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
cd hyperledger/test-network
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC
```

After chaincode ha been successfully deployed, start REST API server
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


After use, remember execute the following line
```
./network.sh down
```
to completely shut down hyperledger fabric

## Built With
[Material Kit React. Coded by Creative Tim](https://www.creative-tim.com/product/material-kit-react) - Material UI Kit used

[npm](https://www.npmjs.com/) - Package manager

## Authors
[Nullun](https://github.com/Nulllun)

[daisymlt](https://github.com/daisymlt)

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Nulllun/CSFYP_CertKEEPer/blob/master/LICENSE) file for details

