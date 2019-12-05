#!/bin/bash

echo
echo " ____    _____      _      ____    _____ "
echo "/ ___|  |_   _|    / \    |  _ \  |_   _|"
echo "\___ \    | |     / _ \   | |_) |   | |  "
echo " ___) |   | |    / ___ \  |  _ <    | |  "
echo "|____/    |_|   /_/   \_\ |_| \_\   |_|  "
echo
echo "Build your first network (BYFN) end-to-end test"
echo
CHANNEL_NAME="$1"
DELAY="$2"
LANGUAGE="$3"
TIMEOUT="$4"
VERBOSE="$5"
NO_CHAINCODE="$6"
: ${CHANNEL_NAME:="mychannel"}
: ${DELAY:="3"}
: ${LANGUAGE:="golang"}
: ${TIMEOUT:="10"}
: ${VERBOSE:="false"}
: ${NO_CHAINCODE:="false"}
LANGUAGE=`echo "$LANGUAGE" | tr [:upper:] [:lower:]`
COUNTER=1
MAX_RETRY=10

CC_SRC_PATH="github.com/chaincode/chaincode_example02/go/"
if [ "$LANGUAGE" = "node" ]; then
	CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/customChaincode/node/"
fi

if [ "$LANGUAGE" = "java" ]; then
	CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/chaincode_example02/java/"
fi

echo "Channel name : "$CHANNEL_NAME

# import utils
. scripts/utils.sh

createChannel() {
	setGlobals 0 1

	if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
                set -x
		peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx >&log.txt
		res=$?
                set +x
	else
				set -x
		peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt
		res=$?
				set +x
	fi
	cat log.txt
	verifyResult $res "Channel creation failed"
	echo "===================== Channel '$CHANNEL_NAME' created ===================== "
	echo
}

joinChannel () {
	for org in 1 2; do
	    for peer in 0 1; do
		joinChannelWithRetry $peer $org
		echo "===================== peer${peer}.org${org} joined channel '$CHANNEL_NAME' ===================== "
		sleep $DELAY
		echo
	    done
	done
}

## Create channel
echo "Creating channel..."
createChannel

## Join all the peers to the channel
echo "Having all peers join the channel..."
joinChannel

## Set the anchor peers for each org in the channel
echo "Updating anchor peers for org1..."
updateAnchorPeers 0 1
echo "Updating anchor peers for org2..."
updateAnchorPeers 0 2

if [ "${NO_CHAINCODE}" != "true" ]; then

	## Install chaincode on peer0.org1 and peer0.org2
	echo "Installing chaincode on peer0.org1..."
	installChaincode 0 1
	echo "Install chaincode on peer0.org2..."
	installChaincode 0 2

	# Instantiate chaincode on peer0.org2
	echo "Instantiating chaincode on peer0.org2..."
	instantiateChaincode 0 2

	# Query chaincode on peer0.org1
	echo "Querying chaincode on peer0.org1..."
	chaincodeQuery 0 1 '{"name":"Michael","code":"IK1901"}'

	# Invoke chaincode on peer0.org1 and peer0.org2
	echo "Sending invoke transaction on peer0.org1 peer0.org2..."
	chaincodeInvoke 0 1 0 2
	
	## Install chaincode on peer1.org2
	echo "Installing chaincode on peer1.org2..."
	installChaincode 1 2

	echo "Querying chaincode on peer1.org2..."
	chaincodeQuerySign 1 2 '{"signature":"32c5ef9fec785c707c76d1183e94853a35fce57252e3bb853bdff925b39d45fa6ecb3d725d4f47a6935a65ff582894b0d26c10f3c2636a969f943e77b9382a6c3bd88bbbeac0e2075459a8ffa2600d4ed115feb52f7d69303568652b6afd95cfca1b17fc93f5342e9d800f8e61a177587ce3d3766284ca921b4f1bd9d3363396fe4284089b99b06582578d6ec8efa9c6b7c58c7194401eae9b76e4df6bdd41538cf265dea6a41ead695df3fb7c63f1a8ded6c483f1c9043d1b8c5fa63ed619e33108e885d175aa171b6c0a1d85e065f8bf7ca12df2c63688f0e07943245be3b9aaf388019a1af621806e8f1adbf83eca2ee766cd66c17329645d7d49c277f89e"}'

fi

echo
echo "========= All GOOD, BYFN execution completed =========== "
echo

echo
echo " _____   _   _   ____   "
echo "| ____| | \ | | |  _ \  "
echo "|  _|   |  \| | | | | | "
echo "| |___  | |\  | | |_| | "
echo "|_____| |_| \_| |____/  "
echo

exit 0
