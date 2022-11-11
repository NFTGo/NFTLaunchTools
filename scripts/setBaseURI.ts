import * as hre from "hardhat";
import { BigNumber } from "ethers";

const { ethers, network } = hre;

async function setBaseURI() {
  console.log(`Current Network: ${network.name}`);

  console.log(`Connect Nft Contract at: ${process.env.CONTRACT_ADDRESS!}`);

  const Nft = await ethers.getContractAt("NFT", process.env.CONTRACT_ADDRESS!);

  let signer = (await ethers.getSigners())[0];
  let nonce = await signer.getTransactionCount("latest");
  console.log({ nonce });

  await (await Nft.setBaseURI(process.env.CONTRACT_BASE_URI!, { nonce })).wait();
  console.log(`set BaseURI success!!`);
}

setBaseURI();
