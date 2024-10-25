// app.js
import voting from './Create.json';
import {ethers} from 'ethers';
// Replace with your deployed contract address and ABI
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = voting.abi;


async function fetchVoterCount() 
{
  try {
    // Ensure MetaMask (or another provider) is injected
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    // Create a Web3Provider using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request the user's accounts
    await provider.send("eth_requestAccounts", []);

    // Get the current signer (authorized user account)
    const signer = provider.getSigner();

    // Create a contract instance using ethers.js
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Call the contract's method to get the voter count
    const count = await contract.getVoterList();
    // document.getElementById("voter-count").innerText = Voter Count: ${count.toString()};
    console.log(count);
  } catch (error) {
    console.error("Error fetching the voter count:", error);
    alert("Error fetching voter count. See console for details.");
  }
}

module.exports = {fetchVoterCount};

