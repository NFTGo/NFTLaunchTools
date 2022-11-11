##Prepare Your metadata before deploy
upload you jpg directory to ipfs



## Steps to Deploy
1. Make a copy of `.env.example` to `.env` and fill it out

   You should fill out at least the following fields:

    ```
    GOERLI_API_URL,MAINNET_API_URL= your node rpc
    ETHERSCAN_API_KEY= Regist on https=//etherscan.io/login
    PRIVATE_KEY and PUBLIC_KEY= Your Wallet Information

    CONTRACT_NAME=Your NFT name 
    CONTRACT_SYMBOL=Your NFT symbol
    CONTRACT_BASE_URI=ipfs://<Your NFT information directory cid>/   eg:QmbqKVoqVq9t4SA2b2F2WYStyB6VyjqfFxaaHyRwXvnQN8
    CONTRACT_COLLECTION_URI=ipfs=//<Your NFT collection information directory cid>/  eg:QmbqKVoqVq9t4SA2b2F2WYStyB6VyjqfFxaaHyRwXvnQN8
    CONTRACT_WHITELIST_MINT_AMOUNT=NFT whiteList amount  eg:10
    CONTRACT_WHITELIST_SALE_PRICE=NFT whiteList price  eg:0.0001
    CONTRACT_PUBLIC_MINT_AMOUNT=NFT publicmint amount    eg: 1000
    CONTRACT_PUBLIC_SALE_PRICE=NFT publicmint price     eg: 0.0001
    CONTRACT_MINT_LIMIT_PER_WALLET= Maximum number of NFTs could mint per wallet   eg: 10
   
    CONTRACT_ADDRESS = It will be automatically filled  after you deploy your smart contract!
    CONTRACT_WHITELIST_ROOT = It will be automatically filled  after generate the whiteListMerkleTree
    
    ```
2. Compile the contract
    ```
    yarn && yarn compile
    ```

3. Deploy the contract

   --network choose the network you want to deploy
    ```
    yarn deploy --network goerli
    ```

   You should see a confirmation in your terminal like this:
    ```zsh
    Current Network: goerli
   { nonce: 78 }
   Nft deployed to: 0x7bA6a9c3FCC234B97fE9927ce2C8c1026780a34a with network:goerli
   Write to .env CONTRACT_ADDRESS success

    ```

Check out your newly deployed contract on etherscan.




## Verify Your Contract on Etherscan

Run the following command with your `DEPLOYED_CONTRACT_ADDRESS`, the network where it's deployed.
```
yarn verify <Your Contract Address>
```

## Generate and set MerkelTree root 

```
"generate Your WhitelistMerkleRoot": "yarn generateWhitelistMerkleRoot",
"set WhitelistMerkleRoot onchain": "yarn setWhitelistMerkleRoot",
```


## Set Your Contract Configs

```

    "reset contract BaseURI onchain": "yarn setBaseURI",
    "reset CollectionURI onchain": "yarn setCollectionURI",
    
    "set Sale Active": "yarn setSaleActive",
    "set Sale Inactive": "yarn setSaleInactive",

```

## Test Your NFT mint function 

```
    "mint a NFT by publicMint with one nft": "yarn publicMint",
    
    "mint a NFT by whiteListMint onchain with one nft(need set WhitelistMerkleRoot first)": "yarn whiteListMint",
    
```

## Generate Metadata
1. modify `scripts/metadata.ts` line 27
2. `yarn generateMetadata`

## NOTICE
`default network: goerli`
Always remember to choose the right network by --network (mainnet or goerli) when you run the command






