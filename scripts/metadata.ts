import * as fs from "fs";

async function generateMetadata() {
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

  let path = __dirname + "/../metadata/generated/";
  console.log(path);
  if (!fs.existsSync(path)) {
    await fs.mkdirSync(path);
  }
  const total = whitelistMintAmount.toNumber() + publicMintAmount.toNumber();
  for (let i = 1; i <= total; i++) {
    const json = {
      name: name + " #" + i,
      image: baseUri + "/" + i + ".jpg",
      description: process.env.CONTRACT_DESCRIPTION!,
      attributes: [],
    };

    await fs.writeFileSync(path + i + ".json", JSON.stringify(json, null, 2));
    return "Generate Metadata success!";
  }
}

generateMetadata().then(console.log);
