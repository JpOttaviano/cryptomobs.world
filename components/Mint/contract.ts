export const CONTRACT_ADDRESS = '0x7af963cF6D228E564e2A0aA0DdBF06210B38615D'

export const CONTRACT_ABI = [
    // mint the amount of nfts specified
    "function mint(uint256 count) external payable",

    // open the mint
    "function mintOpen() public view returns (bool)",

    // returns the amount of nfts owned by address
    "function balanceOf(address owner) public view virtual override returns (uint 256)",

    // Goerli contract test supply func
    'function totalSupply() public view returns (uint256)',

    // Goerli contract text name func
    'function name() public view returns (string memory)'
]