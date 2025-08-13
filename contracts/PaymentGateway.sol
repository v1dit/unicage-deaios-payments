// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IERC20 {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract PaymentGateway {
    uint256 private _nonce;

    event PaymentInitiated(
        bytes32 indexed id,
        address indexed payer,
        address indexed token,
        address to,
        uint256 amount,
        string memo
    );

    function initiatePayment(address token, address to, uint256 amount, string calldata memo)
        external
        returns (bytes32)
    {
        require(to != address(0), "bad recipient");
        require(amount > 0, "amount=0");

        // pull funds
        require(IERC20(token).transferFrom(msg.sender, to, amount), "transferFrom failed");

        // make an id
        bytes32 id = keccak256(abi.encodePacked(block.chainid, block.timestamp, msg.sender, to, amount, _nonce++));
        emit PaymentInitiated(id, msg.sender, token, to, amount, memo);
        return id;
    }
}
