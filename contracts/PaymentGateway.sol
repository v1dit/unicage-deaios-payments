// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PaymentToken.sol";

contract PaymentGateway is ReentrancyGuard, Ownable {
    PaymentToken public paymentToken;
    
    struct Payment {
        uint256 id;
        address sender;
        address recipient;
        uint256 amount;
        uint256 timestamp;
        bool settled;
        string metadata;
    }
    
    uint256 private _paymentIds = 0;
    mapping(uint256 => Payment) public payments;
    mapping(address => uint256[]) public userPayments;
    
    event PaymentInitiated(uint256 indexed paymentId, address indexed sender, address indexed recipient, uint256 amount);
    event PaymentSettled(uint256 indexed paymentId, address indexed recipient, uint256 amount);
    
    constructor(address _paymentToken) Ownable(msg.sender) {
        paymentToken = PaymentToken(_paymentToken);
    }
    
    function initiatePayment(
        address recipient,
        uint256 amount,
        string memory metadata
    ) external nonReentrant returns (uint256) {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        require(
            paymentToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        
        _paymentIds++;
        uint256 paymentId = _paymentIds;
        
        payments[paymentId] = Payment({
            id: paymentId,
            sender: msg.sender,
            recipient: recipient,
            amount: amount,
            timestamp: block.timestamp,
            settled: false,
            metadata: metadata
        });
        
        userPayments[msg.sender].push(paymentId);
        userPayments[recipient].push(paymentId);
        
        emit PaymentInitiated(paymentId, msg.sender, recipient, amount);
        
        return paymentId;
    }
    
    function settlePayment(uint256 paymentId) external nonReentrant {
        Payment storage payment = payments[paymentId];
        require(payment.id != 0, "Payment does not exist");
        require(!payment.settled, "Payment already settled");
        require(msg.sender == payment.recipient, "Only recipient can settle");
        
        payment.settled = true;
        
        require(
            paymentToken.transfer(payment.recipient, payment.amount),
            "Settlement transfer failed"
        );
        
        emit PaymentSettled(paymentId, payment.recipient, payment.amount);
    }
    
    function getPayment(uint256 paymentId) external view returns (Payment memory) {
        return payments[paymentId];
    }
    
    function getUserPayments(address user) external view returns (uint256[] memory) {
        return userPayments[user];
    }
    
    function getPaymentCount() external view returns (uint256) {
        return _paymentIds;
    }
} 