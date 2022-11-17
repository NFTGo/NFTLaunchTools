import fs from "fs";
import writeEnv from "./utils";

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

async function main() {
  // eslint-disable-next-line node/no-path-concat
  const whitelistAddr: string[] = JSON.parse(fs.readFileSync(__dirname + "/whiteList.json", { encoding: "utf8" }));
  // console.log(whitelistAddr);

  const whitelistLeafNodes = whitelistAddr.map((addr: string) => keccak256(addr));

  const whitelistMerkleTree = new MerkleTree(whitelistLeafNodes, keccak256, { sort: true });
  const whitelistRootHash = whitelistMerkleTree.getHexRoot();

  const proofs: any = {};
  whitelistAddr.map((addr: string) => {
    proofs[addr.toLowerCase()] = whitelistMerkleTree.getHexProof(keccak256(addr));
  });

  const whiteListMerkeTreeJson = {
    root: whitelistRootHash,
    proofs: proofs,
  };

  const data = JSON.stringify(whiteListMerkeTreeJson, null, 2);
  // eslint-disable-next-line node/no-path-concat
  fs.writeFileSync(__dirname + "/whiteListMerkeTree.json", data);

  console.log(`Generated WhiteListMerkleTree Root: ${whitelistRootHash}`);

  console.log(`Write to scripts/whiteListMerkeTree.json success`);
  // Write back to .env CONTRACT_WHITELIST_ROOT
  writeEnv("CONTRACT_WHITELIST_ROOT", whitelistRootHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
