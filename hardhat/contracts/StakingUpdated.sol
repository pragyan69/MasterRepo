// SPDX-License-Identidifier: MIT
pragma solidity 0.8.16;

contract StakingUpdated {
    address public owner;
    mapping(address => uint256) public stakes;
    mapping(address => bool) public isMember;
    mapping(address => string[]) public memberIdeas;
    address[] private memberList; // Array to track member addresses
    mapping(uint256 => string[])  roomIdeas; // New mapping to store ideas for each room
    
    // struct of the feature that will have the details of the features
    struct Feature {
        string name;
        string description;
    }
     struct Room {
        string name;
        string description;
        uint256 memberLimit;
        uint256 validity; // Validity in days
        address[] members;
        Feature[] features;
    }
    mapping(uint256 => Room) public rooms;
    uint256 public roomCount = 0;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

// function to stake tokens
    function stake() public payable {
        require(msg.value > 0, "Stake amount must be positive");
        stakes[msg.sender] += msg.value;
        if (!isMember[msg.sender]) {
            isMember[msg.sender] = true;
            memberList.push(msg.sender); // Add to member list
        }
    }

// function to withdraw 
    function withdraw() public {
        uint256 stakedAmount = stakes[msg.sender];
        require(stakedAmount > 0, "No stake to withdraw");
        stakes[msg.sender] = 0;
        isMember[msg.sender] = false;

        // Remove from member list
        for (uint i = 0; i < memberList.length; i++) {
            if (memberList[i] == msg.sender) {
                memberList[i] = memberList[memberList.length - 1];
                memberList.pop();
                break;
            }
        }

        payable(msg.sender).transfer(stakedAmount);
    }


// function to assign members
    function assignMember(address member) public onlyOwner {
        if (!isMember[member]) {
            isMember[member] = true;
            memberList.push(member); // Add to member list
        }
    }
}