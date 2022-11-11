import * as hre from "hardhat";
import { BigNumber } from "ethers";

const { ethers, network } = hre;

async function main() {
  console.log(`Current Network: ${network.name}`);

  console.log(`Connect Nft Contract at: ${process.env.CONTRACT_ADDRESS!}`);

  const Nft = await ethers.getContractAt("NFT", process.env.CONTRACT_ADDRESS!);

  let signer = (await ethers.getSigners())[0];
  let nonce = await signer.getTransactionCount("latest");
  console.log({ nonce });

  await (
    await Nft.publicMint(1, {
      value: BigNumber.from(ethers.utils.parseEther(process.env.CONTRACT_PUBLIC_SALE_PRICE!)),
      nonce,
    })
  ).wait();

  console.log(`Public Minting is complete! Minted 1 tokens`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
