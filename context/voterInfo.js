// app.js
import voting from './Create.json';
import {ethers} from 'ethers';
import React, {useEffect, useState} from 'react';
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = voting.abi;

// const pushVoter = [];
// const [voterArray, setVoterArray] = useState(pushVoter);


export async function getVoter(setVoterArray) 
{
  try {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const count = await contract.getVoterList();
    //console.log(count);
    const pushVoter = [];

    count.map(async (eL) => {
      const singleVoterData = await contract.getVoterdata(eL);
      pushVoter.push(singleVoterData);
      //console.log(singleVoterData);
    });

    setVoterArray(pushVoter);
    console.log(pushVoter);
  } catch (error) {
    console.error("Error fetching the voter count:", error);
    alert("Error fetching voter count. See console for details.");
  }
}

