export const CONTRACT_ADDRESS = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'

export const CONTRACT_ABI = [
  // mint the amount of nfts specified
  'function mint(uint256 count) external payable',

  // open the mint
  'function mintOpen() public view returns (bool)',

  // returns the amount of nfts owned by address
  'function balanceOf(address owner) public view virtual override returns (uint 256)',

  // Goerli contract test supply func
  'function totalSupply() public view returns (uint256)',

  // Goerli contract text name func
  'function name() public view returns (string memory)',

  // Greeter func get
  'function greet() public view returns (string memory)',

  // Set greeter func
  'function setGreeting(string memory _greeting) public',

  // test nft mint
  'function mintNFTs(uint _count) public payable',

  // test nft balance
  'function tokensOfOwner(address _owner) external view returns (uint[] memory)'

]
