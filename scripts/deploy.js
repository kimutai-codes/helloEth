async function main() {
	const HelloWorld = await ethers.getContractFactory('helloWorld');

	const hello_world = await HelloWorld.deploy('Dunia Ayeh!');
	console.log('Deployed to: ', hello_world.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
