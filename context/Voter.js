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

    // CREATE VOTER

    const createVoter = async(formInput, fileUrl, router) => {
        try{
            const {name, address, position} = formInput;
            if(!name || !address || !position)
                return console.log("Input data is missing");

            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            // console.log(contract);
            //console.log("Contract instance", contract);

            const data = JSON.stringify({name, address, position, image: fileUrl});
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
                //console.log(url);

                const voter = await contract.voterRight(address, name, url, fileUrl);
                console.log("Voter created", voter);
                const r = await voter.wait();
                if(r.status === 1)
                    console.log("tra com");
                else
                    console.log("tra failed");
                router.push("/voterList");
            }catch(error){
                setError("Error in creating voter");
            }
            
        } catch (error) {
            setError("Error in creating voter");
        }
    };

    // const getAllVoterData = async() => {
    //     const web3Modal = new Web3Modal();
    //     const connection = await web3Modal.connect();
    //     const provider = new ethers.providers.Web3Provider(connection);
    //     const signer = provider.getSigner();
    //     //console.log("Current account", signer.getAddress());
    //     const contract = fetchContract(signer);

    //     //const voterListData = await contract.getVoterList();
    //     setVoterAddress(voterListData);
    //     console.log(voterAddress);
    // };
    // useEffect(() => {
    //     fetchVoterCount();
    //  },[]);

    return (
        <VotingContext.Provider value={{votingTitle, checkIfWalletIsConnected, connectWallet, uploadToIPFS, createVoter}}>
            {children}
        </VotingContext.Provider>
    );
};

