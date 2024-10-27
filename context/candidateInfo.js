// app.js
import voting from './Create.json';
import {ethers} from 'ethers';
import React, {useEffect, useState} from 'react';
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = voting.abi;



export async function getCandidate(setCandidateArray, setCandidateLength) 
{
  try {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const candidateIndex = [];
    const pushCandidate = [];
    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const count = await contract.getCandidate();
    const candidateL = await contract.getCandidateLength();

    //console.log(voterL.toNumber());
    //console.log(count);
    

    count.map(async (eL) => {
      const singleCandidateData = await contract.getCandidatedata(eL);
      pushCandidate.push(singleCandidateData);
      candidateIndex.push(singleCandidateData[2].toNumber());
      //console.log(singleVoterData);
    });

    setCandidateArray(pushCandidate);
    setCandidateLength(candidateL.toNumber());
    //console.log(pushCandidate);
    // console.log(candidateL.toNumber());
  } catch (error) {
    console.error("Error fetching the voter count:", error);
    alert("Error fetching voter count. See console for details.");
  }
}

