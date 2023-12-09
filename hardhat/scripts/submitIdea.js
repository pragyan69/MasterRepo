require('dotenv').config();


task("submitIdea", "Submits an idea to a specific room")
    .addParam("roomid", "The ID of the room")  // Changed to lowercase
    .addParam("idea", "The idea to submit")
    .setAction(async (taskArgs, hre) => {
        const { roomid, idea } = taskArgs;  // Changed to lowercase

        const contractAddress = process.env.CONTRACT_ADDRESS;
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
        const provider = new hre.ethers.providers.JsonRpcProvider(hre.network.config.url);
        const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

        const contract = new hre.ethers.Contract(contractAddress, contractABI, signer);

        try {
            const tx = await contract.submitIdea(roomid, idea);  // Changed to lowercase
            await tx.wait();
            console.log(`Idea submitted to room ${roomid}: ${idea}`);
        } catch (error) {
            console.error('Error in submitIdea task:', error);
        }
    });

module.exports = {};