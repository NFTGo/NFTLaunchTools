import * as hre from "hardhat";
import writeEnv from "./utils";

const { ethers, network } = hre;

async function main() {
  console.log(`Current Network: ${network.name}`);

  // We get the contract to deploy
  const Nft = await ethers.getContractFactory("NFTs");

  // We get the args to deploy
  const [
    name,
    symbol,
    baseUri,
    collectionUri,
    whitelistMintAmount,
    whitelistSalePrice,
    publicMintAmount,
    publicSalePrice,
    mintLimitPerWallet,
    royalty,
  ] = require("./args.js");

  let signer = (await ethers.getSigners())[0];
  let nonce = await signer.getTransactionCount("latest");
  console.log({ nonce });

  const nft = await Nft.deploy(
    name,
    symbol,
    baseUri,
    collectionUri,
    whitelistMintAmount,
    whitelistSalePrice,
    publicMintAmount,
    publicSalePrice,
    mintLimitPerWallet,
    royalty,
    { nonce }
  );

  await nft.deployed();

  console.log(`Nft deployed to: ${nft.address} with network:${network.name}`);

  // Write back to .env CONTRACT_ADDRESS
  writeEnv("CONTRACT_ADDRESS", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
