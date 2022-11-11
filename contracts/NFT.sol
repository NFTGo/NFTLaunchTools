// SPDX-License-Identifier: MIT
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract NFT is ERC721URIStorage, IERC2981, Ownable, ReentrancyGuard {
    string private _collectionURI;
    string public baseURI;
    using Counters for Counters.Counter;

    uint256 public royalty; // royalty eg 10% = 1000
    uint256 public MAX_SUPPLY; // maxWhitelistId + maxPublicMint

    /** eg:
     * whitelist are from 1-1000 (1000 max supply)
     * public mint from 1001 - 6000 (5000 max supply)
     **/
    uint256 public maxWhitelistId; // eg:  = 1000;
    uint256 public whitelistId; // eg:  = 1;
    uint256 public WHITELIST_SALE_PRICE; // eg:  = 0.01 ether;

    uint256 public maxPublicMint; // eg:  = 6000;
    uint256 public publicMintId; // eg:  = 1001;
    uint256 public PUBLIC_SALE_PRICE; // eg:  = 0.02 ether;
    uint256 public MINT_LIMIT_PER_WALLET; // eg:  = 3; // Mint limit of per wallet total

    bytes32 public whitelistMerkleRoot;

    Counters.Counter private supplyCounter;

    // keep track of those on whitelist who have claimed their NFT
    mapping(address => bool) public claimed;

    // keep track of those on publicMint who have claimed their NFT
    mapping(address => uint256) private mintCountMap;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory _baseURI,
        string memory collectionURI,
        uint256 _maxWhitelistId,
        uint256 _WHITELIST_SALE_PRICE,
        uint256 _maxPublicMint,
        uint256 _PUBLIC_SALE_PRICE,
        uint256 _MINT_LIMIT_PER_WALLET,
        uint256 _royalty
    ) ERC721(name_, symbol_) {
        require(_royalty <= 9000, "royalty must less than 9000");
        require(_royalty >= 100, "royalty must more than 100");

        setBaseURI(_baseURI);
        setCollectionURI(collectionURI);
        maxWhitelistId = _maxWhitelistId;

        whitelistId = 1;
        WHITELIST_SALE_PRICE = _WHITELIST_SALE_PRICE;

        maxPublicMint = _maxPublicMint;
        publicMintId = _maxWhitelistId + 1;
        PUBLIC_SALE_PRICE = _PUBLIC_SALE_PRICE;
        MINT_LIMIT_PER_WALLET = _MINT_LIMIT_PER_WALLET;

        MAX_SUPPLY = _maxWhitelistId + _maxPublicMint;
        royalty = _royalty;
    }

    /**
     * @dev validates merkleProof
     */
    modifier isValidMerkleProof(bytes32[] calldata merkleProof, bytes32 root) {
        require(
            MerkleProof.verify(merkleProof, root, keccak256(abi.encodePacked(msg.sender))),
            "Address does not exist in list"
        );
        _;
    }

    modifier isCorrectPayment(uint256 price, uint256 numberOfTokens) {
        require(price * numberOfTokens == msg.value, "Incorrect ETH value sent");
        _;
    }

    modifier canMint(uint256 numberOfTokens) {
        require(saleIsActive, "Sale not active");
        require(publicMintId + numberOfTokens <= maxPublicMint, "Not enough tokens remaining to mint");
        _;
    }

    /** ACTIVATION **/

    bool public saleIsActive = false;

    function setSaleIsActive(bool saleIsActive_) external onlyOwner {
        saleIsActive = saleIsActive_;
    }

    function allowedMintCount(address minter) public view returns (uint256) {
        return MINT_LIMIT_PER_WALLET - mintCountMap[minter];
    }

    function updateMintCount(address minter, uint256 count) private {
        mintCountMap[minter] += count;
    }

    // ============ PUBLIC FUNCTIONS FOR MINTING ============

    /**
     * @dev mints 1 token per whitelisted address, does not charge a fee
     * Max supply: 1000 (token ids: 1-1000)
     * charges a fee
     */
    function mintWhitelist(
        bytes32[] calldata merkleProof
    )
        public
        payable
        isValidMerkleProof(merkleProof, whitelistMerkleRoot)
        isCorrectPayment(WHITELIST_SALE_PRICE, 1)
        nonReentrant
    {
        require(whitelistId <= maxWhitelistId, "minted the maximum # of whitelist tokens");
        require(!claimed[msg.sender], "NFT is already claimed by this wallet");
        _mint(msg.sender, whitelistId);
        whitelistId++;
        claimed[msg.sender] = true;
        supplyCounter.increment();
    }

    /**
     * @dev mints specified # of tokens to sender address
     * max supply 5000, no limit on # of tokens
     */
    function publicMint(
        uint256 numberOfTokens
    ) public payable isCorrectPayment(PUBLIC_SALE_PRICE, numberOfTokens) canMint(numberOfTokens) nonReentrant {
        if (allowedMintCount(msg.sender) >= numberOfTokens) {
            updateMintCount(msg.sender, numberOfTokens);
        } else {
            revert("Minting limit exceeded");
        }

        for (uint256 i = 0; i < numberOfTokens; i++) {
            _mint(msg.sender, publicMintId);
            publicMintId++;
            supplyCounter.increment();
        }
    }

    // ============ PUBLIC READ-ONLY FUNCTIONS ============
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: query for nonexistent token");
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"));
    }

    function totalSupply() public view returns (uint256) {
        return supplyCounter.current();
    }

    /**
     * @dev collection URI for marketplace display
     */
    function contractURI() public view returns (string memory) {
        return _collectionURI;
    }

    // ============ OWNER-ONLY ADMIN FUNCTIONS ============
    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    /**
     * @dev set collection URI for marketplace display
     */
    function setCollectionURI(string memory collectionURI) public onlyOwner {
        _collectionURI = collectionURI;
    }

    function setWhitelistMerkleRoot(bytes32 merkleRoot) external onlyOwner {
        whitelistMerkleRoot = merkleRoot;
    }

    /**
     * @dev withdraw funds for to specified account
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function withdrawTokens(IERC20 token) public onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
    }

    function withdrawNftTokens(IERC721 token, address to, uint256 tokenId) public onlyOwner {
        token.safeTransferFrom(address(this), to, tokenId);
    }

    /** ROYALTIES **/

    function royaltyInfo(
        uint256,
        uint256 salePrice
    ) external view override returns (address receiver, uint256 royaltyAmount) {
        return (address(this), (salePrice * royalty) / 10000);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, IERC165) returns (bool) {
        return (interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId));
    }
}
