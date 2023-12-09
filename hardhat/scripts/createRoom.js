task("createRoom", "Creates a room in the contract")
    .addParam("creator", "The address of the member creating the room")
    .addParam("name", "The name of the room")
    .addParam("description", "The description of the room")
    .addParam("memberlimit", "The member limit of the room")
    .addParam("validityindays", "The validity of the room in days")
    .setAction(async (taskArgs, { ethers, network }) => {
        const { creator, name, description, memberlimit, validityindays } = taskArgs;

        const contractAddress = '0x5bc4701B7A67f19E47698C804fA9474d18B7B0e5';
        const contractABI = [
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "roomId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "featureName",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "featureDescription",
                "type": "string"
              }
            ],
            "name": "addRoomFeature",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "member",
                "type": "address"
              }
            ],
            "name": "assignMember",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "memberLimit",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "validityInDays",
                "type": "uint256"
              }
            ],
            "name": "createRoom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "roomId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "member",
                "type": "address"
              }
            ],
            "name": "joinRoom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "member",
                "type": "address"
              }
            ],
            "name": "revokeMember",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "stake",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "roomId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "idea",
                "type": "string"
              }
            ],
            "name": "submitIdea",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getAllMembers",
            "outputs": [
              {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "roomId",
                "type": "uint256"
              }
            ],
            "name": "getRoomFeatures",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                  }
                ],
                "internalType": "struct StakingUpdated.Feature[]",
                "name": "",
                "type": "tuple[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "roomId",
                "type": "uint256"
              }
            ],
            "name": "getRoomIdeas",
            "outputs": [
              {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "roomId",
                "type": "uint256"
              }
            ],
            "name": "getRoomMembers",
            "outputs": [
              {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getRooms",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "memberLimit",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "validity",
                    "type": "uint256"
                  },
                  {
                    "internalType": "address[]",
                    "name": "members",
                    "type": "address[]"
                  },
                  {
                    "components": [
                      {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                      },
                      {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                      }
                    ],
                    "internalType": "struct StakingUpdated.Feature[]",
                    "name": "features",
                    "type": "tuple[]"
                  }
                ],
                "internalType": "struct StakingUpdated.Room[]",
                "name": "",
                "type": "tuple[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "isMember",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "listAllRooms",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "memberLimit",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "validity",
                    "type": "uint256"
                  },
                  {
                    "internalType": "address[]",
                    "name": "members",
                    "type": "address[]"
                  },
                  {
                    "components": [
                      {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                      },
                      {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                      }
                    ],
                    "internalType": "struct StakingUpdated.Feature[]",
                    "name": "features",
                    "type": "tuple[]"
                  }
                ],
                "internalType": "struct StakingUpdated.Room[]",
                "name": "",
                "type": "tuple[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "memberIdeas",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "roomCount",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "rooms",
            "outputs": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "memberLimit",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "validity",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "stakes",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ]

        const provider = ethers.provider;
        const privateKey = process.env.PRIVATE_KEY;
        const signer = new ethers.Wallet(privateKey, provider);

        const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );

        try {
            const tx = await contract.createRoom(creator, name, description, memberlimit, validityindays);
            await tx.wait();
            console.log(`Room created with name: ${name}`);
        } catch (error) {
            console.error('Error in createRoom task:', error);
        }
    });

module.exports = {};