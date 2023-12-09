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

    // function to revoke members
    function revokeMember(address member) public onlyOwner {
        if (isMember[member]) {
            isMember[member] = false;

            // Remove from member list
            for (uint i = 0; i < memberList.length; i++) {
                if (memberList[i] == member) {
                    memberList[i] = memberList[memberList.length - 1];
                    memberList.pop();
                    break;
                }
            }
        }
    }


// function to submit ideas
    function submitIdea(uint256 roomId, string memory idea) public {
        require(isMember[msg.sender], "Only members can submit ideas");
        require(roomId < roomCount, "Invalid room ID");
        bool isMemberOfRoom = false;
        for (uint i = 0; i < rooms[roomId].members.length; i++) {
            if (rooms[roomId].members[i] == msg.sender) {
                isMemberOfRoom = true;
                break;
            }
        }
        require(isMemberOfRoom, "Member not part of the room");
        roomIdeas[roomId].push(idea);
    }

    // Function to get ideas for a specific room
    function getRoomIdeas(uint256 roomId) public view returns (string[] memory) {
        require(roomId < roomCount, "Invalid room ID");
        return roomIdeas[roomId];
    }


// function to create room
  function createRoom(string memory name, string memory description, uint256 memberLimit, uint256 validityInDays) public {
        require(isMember[msg.sender], "Only members can create rooms");
        require(memberLimit > 0, "Member limit must be positive");
        require(validityInDays > 0, "Validity must be positive");

        Room storage room = rooms[roomCount++];
        room.name = name;
        room.description = description;
        room.memberLimit = memberLimit;
        room.validity = block.timestamp + (validityInDays * 1 days);
        room.members.push(msg.sender);
    }

// this function , will return the room name , correspond to the owner of the room
    function getRooms() public view returns (Room[] memory) {
        Room[] memory allRooms = new Room[](roomCount);
        for (uint i = 0; i < roomCount; i++) {
            allRooms[i] = rooms[i];
        }
        return allRooms;
    }

// function to join room
    function joinRoom(uint256 roomId) public {
        require(isMember[msg.sender], "Only members can join rooms");
        require(roomId < roomCount, "Invalid room ID");

        Room storage room = rooms[roomId];

        // Check if the room has not exceeded its member limit
        require(room.members.length < room.memberLimit, "Room is full");

        // Add member to the room
        room.members.push(msg.sender);
    }


// function to return all the members with their address
    function getAllMembers() public view returns (address[] memory) {
        return memberList;
    }

// this function will return all the rooms with the ID
    function listAllRooms() public view returns (Room[] memory) {
        Room[] memory allRooms = new Room[](roomCount);
        for (uint i = 0; i < roomCount; i++) {
            allRooms[i] = rooms[i];
        }
        return allRooms;
    }

     // Add a function to get members of a specific room
    function getRoomMembers(uint256 roomId) public view returns (address[] memory) {
        require(roomId < roomCount, "Invalid room ID");
        return rooms[roomId].members;
    }

     // function for the room feature
    function addRoomFeature(uint256 roomId, string memory featureName, string memory featureDescription) public {
        require(isMember[msg.sender], "Only members can add features");
        require(roomId < roomCount, "Invalid room ID");

        Room storage room = rooms[roomId];

        // Check if the sender is a member of the room
        bool isMemberOfRoom = false;
        for (uint i = 0; i < room.members.length; i++) {
            if (room.members[i] == msg.sender) {
                isMemberOfRoom = true;
                break;
            }
        }

        require(isMemberOfRoom, "Member not part of the room");

        // Add the feature to the room
        Feature memory newFeature = Feature(featureName, featureDescription);
        room.features.push(newFeature);
    }


    // functions that return the room features 

     function getRoomFeatures(uint256 roomId) public view returns (Feature[] memory) {
        require(roomId < roomCount, "Invalid room ID");
        return rooms[roomId].features;
    }



}