// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockV0 is ERC20 {
    constructor() ERC20("V0 Token", "V0") {
        _mint(msg.sender, 1_000_000 * 10**18);
    }
}
