//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GenericEye is ERC721, Ownable, ReentrancyGuard, PaymentSplitter {
    using Strings for uint256;
    using Counters for Counters.Counter;

    bytes32 public root;
    mapping(address => uint256) public vipClaimed;
    mapping(address => uint256) public presaleClaimed;

    address proxyRegistryAddress;

    uint256 public price;
    uint256 public maxSupply;
    uint256 public maxMintAmountPerTx;

    string private baseURI; // ! Make private on next contract
    string public hiddenMetadataUri =
        "ipfs://QmXbSt9F1fx2VvvgS5Hj7FrSaZe5k99pAZv2GKv1H9Mff3/hidden.json";
    string public baseExtension = ".json";

    bool public paused = false;
    bool public revealed = false;
    bool public presaleM = false;
    bool public publicM = false;
    bool public vipM = true; // ! set vipM to true upon initialization

    // uint256 _price = 50000000000000000; // 0.05 ETH

    Counters.Counter private _tokenIds;

    uint256[] private _teamShares = [25, 35, 40]; // 3 PEOPLE IN THE TEAM
    address[] private _team = [
        0xFD821ac0fe07f65f8c7b72616E145d393a82d406, // Admin Account gets 25% of the total revenue
        0x4173492Fb0E3dfB8EAF7610bA139e86E30B0Dafd, // Test Account gets 35% of the total revenue
        0xDF2D8bAe5FC6b0F7e634fee9b195CbE704C1dF07 // VIP Account gets 40% of the total revenue
    ];

    constructor(
        string memory uri,
        bytes32 merkleroot,
        address _proxyRegistryAddress,
        uint256 _price,
        uint256 _maxSupply,
        uint256 _maxMintAmountPerTx
    )
        ERC721("GenericEye", "EYE")
        PaymentSplitter(_team, _teamShares) // Split the payment based on the teamshares percentages
        ReentrancyGuard() // A modifier that can prevent reentrancy during certain functions
    {
        root = merkleroot;
        proxyRegistryAddress = _proxyRegistryAddress;

        setBaseURI(uri);
        setPrice(_price);
        maxSupply = _maxSupply;
        setMaxMintAmountPerTx(_maxMintAmountPerTx);
    }

    function setBaseURI(string memory _tokenBaseURI) public onlyOwner {
        baseURI = _tokenBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function reveal() public onlyOwner {
        revealed = true;
    }

    function setMerkleRoot(bytes32 merkleroot) public onlyOwner {
        root = merkleroot;
    }

    modifier onlyAccounts() {
        require(msg.sender == tx.origin, "Not allowed origin");
        _;
    }

    modifier isValidMerkleProof(bytes32[] calldata _proof) {
        require(
            MerkleProof.verify(
                _proof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            ) == true,
            "Not allowed origin"
        );
        _;
    }

    // TODO: Gas Optimizer

    // TODO: Implement Pull Payment Strategy


    // Unpause function when any type of sale is enabled

    function togglePause() public onlyOwner {
        paused = !paused;
    }

    function toggleVipSale() public onlyOwner {
        vipM = !vipM;
        paused = true;
    }

    function togglePresale() public onlyOwner {
        presaleM = !presaleM;
        paused = true;
    }

    function togglePublicSale() public onlyOwner {
        publicM = !publicM;
        paused = true;
    }

    function vipMint(
        address account,
        uint256 _amount,
        bytes32[] calldata _proof
    ) external payable isValidMerkleProof(_proof) onlyAccounts {
        require(msg.sender == account, "GenericEyes: Not allowed");
        require(vipM, "GenericEyes: VIP is OFF");
        require(!paused, "GenericEyes: Contract is paused");
        require(
            _amount <= maxMintAmountPerTx,
            "GenericEyes: You can't mint so many tokens"
        );
        require(
            vipClaimed[msg.sender] + _amount <= maxMintAmountPerTx,
            "GenericEyes: You can't mint so many tokens"
        );

        uint256 current = _tokenIds.current();

        require(
            current + _amount <= maxSupply,
            "GenericEyes: max supply exceeded"
        );
        require(
            price * _amount <= msg.value,
            "GenericEyes: Not enough ethers sent"
        );

        vipClaimed[msg.sender] += _amount;

        for (uint256 i = 0; i < _amount; i++) {
            mintInternal();
        }
    }

    function presaleMint(
        address account,
        uint256 _amount,
        bytes32[] calldata _proof
    ) external payable isValidMerkleProof(_proof) onlyAccounts {
        require(msg.sender == account, "GenericEyes: Not allowed");
        require(presaleM, "GenericEyes: Presale is OFF");
        require(!paused, "GenericEyes: Contract is paused");
        require(
            _amount <= maxMintAmountPerTx,
            "GenericEyes: You can't mint so much tokens"
        );
        require(
            presaleClaimed[msg.sender] + _amount <= maxMintAmountPerTx,
            "GenericEyes: You can't mint so much tokens"
        );

        uint256 current = _tokenIds.current();

        require(
            current + _amount <= maxSupply,
            "GenericEyes: max supply exceeded"
        );
        require(
            price * _amount <= msg.value,
            "GenericEyes: Not enough ethers sent"
        );

        presaleClaimed[msg.sender] += _amount;

        for (uint256 i = 0; i < _amount; i++) {
            mintInternal();
        }
    }

    function publicSaleMint(uint256 _amount) external payable onlyAccounts {
        require(publicM, "GenericEyes: PublicSale is OFF");
        require(!paused, "GenericEyes: Contract is paused");
        require(_amount > 0, "GenericEyes: zero amount");

        uint256 current = _tokenIds.current();

        require(
            current + _amount <= maxSupply,
            "GenericEyess: Max supply exceeded"
        );
        require(
            price * _amount <= msg.value,
            "GenericEyes: Not enough ethers sent"
        );

        for (uint256 i = 0; i < _amount; i++) {
            mintInternal();
        }
    }

    function mintInternal() internal nonReentrant {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _safeMint(msg.sender, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        if (revealed == false) {
            return hiddenMetadataUri;
        }

        string memory currentBaseURI = _baseURI();

        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function setMaxMintAmountPerTx(uint256 _maxMintAmountPerTx)
        public
        onlyOwner
    {
        maxMintAmountPerTx = _maxMintAmountPerTx;
    }

    // function sethiddenMetadataURI(string memory _hiddenMetadataUri) public onlyOwner {
    //     hiddenMetadataUri = _hiddenMetadataUri;
    // }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }


    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }
}

/**
  @title An OpenSea delegate proxy contract which we include for whitelisting.
  @author OpenSea
*/
contract OwnableDelegateProxy {

}

/**
  @title An OpenSea proxy registry contract which we include for whitelisting.
  @author OpenSea
*/
contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}
