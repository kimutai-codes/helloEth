//TODO Learn types of import
const {ethers} = require('hardhat');
const contract = require('../artifacts/contracts/HelloWorld.sol/helloWorld.json');

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// node provider - how we interact with the blockchain
//alchemy is one of them

const alchemyProvider = new ethers.providers.AlchemyProvider(
	(network = 'ropsten'),
	API_KEY
);

//signer - you as the one intracting with the blockchain.
//you "sign" with your private key
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//contract interaction
//is abi interface?
const helloWorldContract = new ethers.Contract(
	CONTRACT_ADDRESS,
	contract.abi,
	signer
);

async function main() {
	//update contract message
	const message = await helloWorldContract.message(); //intracting with the public getter of the contract
	console.log(`The message is: ${message}`);

	//update the msg
  console.log("Updating the message . . .");
  //TODO make it take input
	const tx = await helloWorldContract.update('Hello Dunia');
	//wait for the transaction to be mined
	await tx.wait();

	//read the message again
	const newMsg = await helloWorldContract.message();
	console.log(`The new message is: ${newMsg}`);
	console.log(message); //TODO know why it returns previous value
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
