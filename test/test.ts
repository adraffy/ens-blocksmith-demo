import { Foundry } from "@adraffy/blocksmith";
import { namehash, solidityPackedKeccak256 } from "ethers/hash";

// registry is same on mainnet/sepolia/holesky
const ENS_REGISTRY = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";

// launch anvil, fork sepolia
const foundry = await Foundry.launch({
	fork: "https://rpc.ankr.com/eth_sepolia", // or "/eth" for mainnet, or any other provider
});

// deploy the demo resolver
const DemoResolver = await foundry.deploy({
	file: "DemoResolver",
	args: ["0x51050ec063d393217B436747617aD1C2285Aeeee"],
});

// hijack the registry
await hijackResolver("demo.eth", DemoResolver.target);

// test it (simple)
console.log(await foundry.provider.resolveName("demo.eth"));

// test it (advanced)
const resolver = await foundry.provider.getResolver("demo.eth");
if (resolver) {
	console.log('Address:', await resolver.getAddress());
	console.log('Text', await resolver.getText("echo this"));
}

await foundry.shutdown();

async function hijackResolver(name: string, resolver: string) {
	await foundry.setStorageValue(
		ENS_REGISTRY,
		BigInt(
			solidityPackedKeccak256(["bytes32", "uint256"], [namehash(name), 0])
		) + 1n,
		resolver
	);
	console.log(`Set ${name} to ${resolver}`);
}
