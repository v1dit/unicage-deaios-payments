// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Payment {
    mapping(address => uint256) public balances;

    // Deposit funds into contract
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    // Withdraw your balance
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    // Check contract balance
    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

