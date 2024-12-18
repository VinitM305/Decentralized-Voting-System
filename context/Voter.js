import React, {useEffect, useState} from 'react';
import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import axios from 'axios';
import {useRouter} from 'next/router';

import {VotingAddress, VotingAddressABI} from './constants';
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
const fetchContract =(signerOrProvider) =>
    new ethers.Contract( VotingAddress, VotingAddressABI, signerOrProvider);

export const VotingContext = React.createContext();

export const VotingProvider =({children}) =>{
    const votingTitle = 'My first smart contract app';
    const router = useRouter();
    const [currentAccount, setCurrentAccount] = useState('');
    const [candidateLength, setCandidateLength] = useState('');
    const pushCandidate = [];
    const candidateIndex = [];
    const [candidateArray, setCandidateArray] = useState(pushCandidate);

    // 

    const [error, setError] = useState('');
    const highestVote = [];
    const pushVoter = [];
    const [voterArray, setVoterArray] = useState(pushVoter);
    const [voterLength, setVoterLength] = useState('');
    const [voterAddress, setVoterAddress] = useState([]);

    //
    

    const checkIfWalletIsConnected = async() =>{
        if(!window.ethereum) return setError("Please Install Metamask");

        const account = await window.ethereum.request({
            method: "eth_accounts",
        });

        if(account.length){
            setCurrentAccount(account[0]);
        }else{
            setError("Please Install Metamask and connect and reload");
        }
    };

    const connectWallet = async() => {
        if(!window.ethereum) return setError("Please Install MetaMask");

        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        setCurrentAccount(account[0]);
    };

    const uploadToIPFS = async(file) =>{
        if(file){
            try{
                const formData = new FormData();
                formData.append("file", file);

                const response = await axios({
                    method:"post",
                    url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `137beff0c4b3ee13b027`,
                        pinata_secret_api_key: `eeea29d0f268fd2c8af8d4177c612e19e7b6a82010f229e5afc1774144e45972`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

                return ImgHash;
            }catch(error){
                setError("Error uploading file to IPFS");
            }
        }
    }

    const uploadToIPFSCandidate = async(file) =>{
        if(file){
            try{
                const formData = new FormData();
                formData.append("file", file);

                const response = await axios({
                    method:"post",
                    url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `137beff0c4b3ee13b027`,
                        pinata_secret_api_key: `eeea29d0f268fd2c8af8d4177c612e19e7b6a82010f229e5afc1774144e45972`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

                return ImgHash;
            }catch(error){
                setError("Error uploading file to IPFS");
            }
        }
    }

    // CREATE VOTER

    const createVoter = async(formInput, fileUrl, router) => {
        try {
            const { name, address, position } = formInput;
            if (!name || !address || !position) {
                return setError("Input data is missing");
            }
    
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
    
            const data = JSON.stringify({ name, address, position, image: fileUrl });
            console.log("data");
            console.log(data);
            try {
                const response = await axios({
                    method: "POST",
                    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                    data: data,
                    headers: {
                        pinata_api_key: `137beff0c4b3ee13b027`,
                        pinata_secret_api_key: `eeea29d0f268fd2c8af8d4177c612e19e7b6a82010f229e5afc1774144e45972`,
                        "Content-Type": "application/json",
                    },
                });
    
                const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
                console.log("hiii");
                const voter = await contract.voterRight(address, name, url, fileUrl, position);
                console.log(voter);
                await voter.wait();
                router.push("/voterList");
            } catch (error) {
                setError("Error in creating voter");
            }
        } catch (error) {
            setError("Error in creating voter");
        }
    };
    

    //Give Vote

    const giveVote = async(id) => {
        try
        {
            const candidateAddress = id.address;
            const candidateId = id.id;
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            //console.log("Voter Address:", currentAccount); 

            const voteredList = await contract.vote(candidateAddress, candidateId);
        }
        catch (error) {
            if (error?.reason) {
                alert(error.reason);
              } else if (error?.data?.message) {
                alert("An error occurred: " + error.data.message);
              } else {
                alert("An unexpected error occurred. Please try again.");
              }
        }
    }

    //---------CANDIDATE SECTION---------
    const createCandidate = async(candidateForm, fileUrl, router) => {
        try{
            const {name, address, age} = candidateForm;
            if(!name || !address || !age)
                return setError("Input data is missing");

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const data = JSON.stringify({name, address, image: fileUrl, age});
            try{
                const response = await axios({
                    method: "POST",
                    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                    data: data,
                    headers: {
                        pinata_api_key: `137beff0c4b3ee13b027`,
                        pinata_secret_api_key: `eeea29d0f268fd2c8af8d4177c612e19e7b6a82010f229e5afc1774144e45972`,
                        "Content-Type": "application/json",
                    },
                });

                const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

                const candidate = await contract.setCandidate(address, age, name, fileUrl, url);
                candidate.wait();
                router.push("/");
            }catch(error){
                setError("Error in creating candidate");
            }
             
        } catch (error) {
            setError("Error in creating voter");
        }
    };

    return (
        <VotingContext.Provider value={{votingTitle, error, checkIfWalletIsConnected, connectWallet, uploadToIPFS, createVoter, giveVote, createCandidate, uploadToIPFSCandidate, currentAccount}}>
            {children}
        </VotingContext.Provider>
    );
};

