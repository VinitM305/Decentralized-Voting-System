// app.js
import voting from './Create.json';
import {ethers} from 'ethers';
import React, {useEffect, useState} from 'react';
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = voting.abi;

export async function getVoter(setVoterArray, setVoterLength) 
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
    const pushVoter = [];
    const count = await contract.getVoterList();
    const voterL = await contract.getVoterLength();

    //console.log(voterL.toNumber());
    //console.log(count);
    

    count.map(async (eL) => {
      const singleVoterData = await contract.getVoterdata(eL);
      pushVoter.push(singleVoterData);
      //console.log(singleVoterData);
    });

    setVoterArray(pushVoter);
    setVoterLength(voterL.toNumber());
    //console.log(pushVoter);
  } catch (error) {
    console.error("Error fetching the voter count:", error);
    //alert("Error fetching voter count. See console for details.");
  }
}

