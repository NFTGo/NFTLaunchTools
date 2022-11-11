const { ethers } = require("hardhat");
const { BigNumber } = ethers;

const {
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  CONTRACT_BASE_URI,
  CONTRACT_COLLECTION_URI,
  CONTRACT_WHITELIST_MINT_AMOUNT,
  CONTRACT_WHITELIST_SALE_PRICE,
  CONTRACT_PUBLIC_MINT_AMOUNT,
  CONTRACT_PUBLIC_SALE_PRICE,
  CONTRACT_MINT_LIMIT_PER_WALLET,
  CONTRACT_ROYALTY,
} = process.env;

const name = CONTRACT_NAME;
const symbol = CONTRACT_SYMBOL;
const baseUri = CONTRACT_BASE_URI;
const collectionUri = CONTRACT_COLLECTION_URI;
const whitelistMintAmount = BigNumber.from(CONTRACT_WHITELIST_MINT_AMOUNT);
const whitelistSalePrice = ethers.utils.parseEther(CONTRACT_WHITELIST_SALE_PRICE);
const publicMintAmount = BigNumber.from(CONTRACT_PUBLIC_MINT_AMOUNT);
const publicSalePrice = ethers.utils.parseEther(CONTRACT_PUBLIC_SALE_PRICE);
const mintLimitPerWallet = BigNumber.from(CONTRACT_MINT_LIMIT_PER_WALLET);
const royalty = BigNumber.from(CONTRACT_ROYALTY);

if (!(royalty >= 100 && royalty <= 9000)) {
  console.info("Invalid CONTRACT_ROYALTY in .env !!!");
  process.exit(-1);
}

module.exports = [
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
];
