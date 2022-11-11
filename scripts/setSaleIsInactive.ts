import * as hre from "hardhat";

const { ethers, network } = hre;

async function setSaleIsActive() {
  console.log(`Current Network: ${network.name}`);

  console.log(`Connect Nft Contract at: ${process.env.CONTRACT_ADDRESS!}`);

  const Nft = await ethers.getContractAt("NFT", process.env.CONTRACT_ADDRESS!);

  let signer = (await ethers.getSigners())[0];
  let nonce = await signer.getTransactionCount("latest");
  console.log({ nonce });

  await (await Nft.setSaleIsActive(false, { nonce })).wait();
  console.log(`set Sale Inactive success!!`);
}

setSaleIsActive();
