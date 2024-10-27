import React, {useState, useEffect, useContext} from "react";
import Image from 'next/image';

import {VotingContext} from '../context/Voter';
import Style from '../styles/index.module.css';
import Card from '../components/card/card';
import image from '../assets/candidate-1.jpg';
const {getCandidate} = require("../context/candidateInfo.js");
import useCandidates from "./useCandidates"; 

const index = () => {
  const {giveVote, checkIfWalletIsConnected} = useContext(VotingContext);
  const { candidateArray, candidateLength } = useCandidates();
  //console.log("hii");
  //console.log(candidateArray);
  //console.log(candidateLength);
  return <div>{}</div>;
};

export default index;
