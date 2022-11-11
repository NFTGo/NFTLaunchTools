import * as hre from "hardhat";
import { BigNumber } from "ethers";

const { ethers, network } = hre;

async function setWhitelistMerkleRoot() {
  console.log(`Current Network: ${network.name}`);

  console.log(`Connect Nft Contract at: ${process.env.CONTRACT_ADDRESS!}`);

  const Nft = await ethers.getContractAt("NFT", process.env.CONTRACT_ADDRESS!);

  let signer = (await ethers.getSigners())[0];
  let nonce = await signer.getTransactionCount("latest");
  console.log({ nonce });

  await (await Nft.setWhitelistMerkleRoot(process.env.CONTRACT_WHITELIST_ROOT!, { nonce })).wait();
  console.log(`set setWhitelistMerkleRoot success!!`);
}

setWhitelistMerkleRoot();
