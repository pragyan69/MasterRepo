import express from 'express';
import Web3 from 'web3';
import cors from 'cors'; 
import { exec } from 'child_process';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;
const STAKING_CONTRACT_ADDRESS = "0x5bc4701B7A67f19E47698C804fA9474d18B7B0e5";
const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const STAKING_CONTRACT_ABI = [
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
const contract = new web3.eth.Contract(STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS)
// functions
async function sendTransaction2(methodName, args, fromAddress, privateKey) {
  // Estimate gas price and limit
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = await contract.methods[methodName](...args).estimateGas({ from: fromAddress });

  // Get the current nonce for the given address, considering pending transactions
  const currentNonce = await web3.eth.getTransactionCount(fromAddress, 'pending');

  // Transaction object
  const txObject = {
      nonce: web3.utils.toHex(currentNonce),
      gasLimit: web3.utils.toHex(gasLimit),
      gasPrice: web3.utils.toHex(gasPrice),
      to: STAKING_CONTRACT_ADDRESS, // Ensure this is correctly defined
      data: contract.methods[methodName](...args).encodeABI(),
       value: '0x0', // Include this if the method sends value
  };

  console.log('Transaction object:', txObject);

  // Sign the transaction with the provided private key
  const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);

  // Send the signed transaction
  try {
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Transaction receipt:', receipt);
    return receipt;
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error; // Rethrow the error for further handling if necessary
  }
}

console.log("ABI Loaded:", STAKING_CONTRACT_ABI);
const stakingContract = new web3.eth.Contract(STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS);
console.log("Contract methods:", stakingContract.methods);

// this will check if the address is member or not
app.get('/isMember/:address', async (req, res) => {
    try {
        console.log("Checking membership for address:", req.params.address);
        const isMember = await stakingContract.methods.isMember(req.params.address).call();
        console.log("Membership status:", isMember);
        res.json({ isMember });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send(error.toString());
    }
});

// this will check how much token, currency the member is staking or not 
app.get('/getStake/:address', async (req, res) => {
    try {
        // Accessing the stakes mapping correctly
        const stake = await stakingContract.methods.stakes(req.params.address).call();
        res.json({ stake: stake.toString() });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.toString());
    }
});

// this function will add member 
app.post('/addMember', (req, res) => {
    // Ensuring that address is treated as a string
    if (!req.body || typeof req.body.address !== 'string') {
        return res.status(400).json({ error: 'Address is required in the request body and must be a string.' });
    }
    const { address } = req.body;
    const command = `npx hardhat assignMember --network alfajores --address "${address}"`;
    exec(command, { cwd: '../hardhat' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }
        res.json({ message: `Address ${address} added successfully`, output: stdout });
    });
});

// this function will submit idea 
app.post('/submitIdea', async (req, res) => {
    const { address, idea } = req.body;

    if (!address || typeof address !== 'string') {
        return res.status(400).json({ error: 'Address is required and must be a string.' });
    }

    if (!idea || typeof idea !== 'string') {
        return res.status(400).json({ error: 'Idea is required and must be a string.' });
    }

    try {
        // Check if the address is a member
        const isMember = await stakingContract.methods.isMember(address).call();
        if (!isMember) {
            return res.status(403).json({ error: 'Address is not a member.' });
        }


        const tx = await sendTransaction('submitIdea', [idea], address);

        res.json({ message: 'Idea submitted successfully', transaction: tx });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send(error.toString());
    }
});

// creating room and sending transaction to the blockchain 

app.post('/createRoom', (req, res) => {
    const { creator, name, description, memberlimit, validityindays } = req.body;
  
    // Validate the input
    if (!creator || !name || !description || !memberlimit || !validityindays) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
  
    const command = `npx hardhat createRoom --network alfajores --creator "${creator}" --name "${name}" --description "${description}" --memberlimit ${memberlimit} --validityindays ${validityindays}`;
    
    exec(command, { cwd: '../hardhat' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }
        res.json({ message: `Room '${name}' created successfully`, output: stdout });
    });
  });

  // to list the rooms 
app.get('/getRooms', async (req, res) => {
    try {
        const rooms = await contract.methods.getRooms().call();
  
        // Format the rooms data
        const formattedRooms = rooms.map(room => ({
            name: room.name,
            description: room.description,
            memberLimit: room.memberLimit.toString(), // Convert to string if it's a BigInt
            validity: new Date(parseInt(room.validity) * 1000).toISOString() // Convert to number then to ISO string
        }));
  
        res.status(200).json({ rooms: formattedRooms });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
  });

  // room Count , based on the roomCount variable 

app.get('/getRoomCount', async (req, res) => {
    try {
        const roomCount = await contract.methods.roomCount().call();
  
        res.status(200).json({ roomCount: roomCount });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
  });
  
  
  // to return all the members of a particular room 
  app.get('/getRoomMembers/:roomId', async (req, res) => {
    const roomId = req.params.roomId;
  
    // Validate that roomId is a number
    if (isNaN(parseInt(roomId))) {
        return res.status(400).json({ error: 'Room ID must be a valid number.' });
    }
  
    try {
        const members = await contract.methods.getRoomMembers(roomId).call();
  
        res.status(200).json({ roomId: roomId, members: members });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
  });
  

  app.post('/joinRoom', (req, res) => {
    const { roomId, member } = req.body;
  
    // Validate the input
    if (!roomId || !member) {
        return res.status(400).json({ error: 'Room ID and member address are required.' });
    }
  
    const command = `npx hardhat joinRoom --address "${member}" --room-id ${roomId} --network alfajores`;
    
    exec(command, { cwd: '../hardhat' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }
        res.json({ message: `Member ${member} joined room ${roomId} successfully`, output: stdout });
    });
  });

  
  // to get all the members in the network 
app.get('/getAllMembers', async (req, res) => {
    try {
        const members = await stakingContract.methods.getAllMembers().call();
  
        res.status(200).json({ members });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
  });

// the main exit function 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});