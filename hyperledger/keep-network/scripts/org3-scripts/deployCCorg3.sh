#!/bin/bash

# this script is to deploy certkeeper chaincode in mychannel

# import environment variables
. scripts/org3-scripts/envVarCLI.sh

export PATH=${PWD}/../bin:${PWD}:$PATH
# export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_TLS_ENABLED=true

setGlobals 3

peer lifecycle chaincode package certkeeper.tar.gz --path ../../../chaincode/ --lang node --label certkeeper_1

peer lifecycle chaincode install certkeeper.tar.gz

peer lifecycle chaincode queryinstalled >&log.txt

CC_PACKAGE_ID=$(sed -n "/certkeeper_1/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)

peer lifecycle chaincode approveformyorg -o orderer.example.com:7050 --ordererTLSHostnameOverride orderer.example.com --channelID mychannel --name certkeeper --version 1 --init-required --package-id $CC_PACKAGE_ID --sequence 1 --tls true --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

peer lifecycle chaincode querycommitted --channelID mychannel --name certkeeper --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

# peer chaincode query -C mychannel -n certkeeper -c '{"Args":["queryCert", "Org1MSP-test1"]}'
