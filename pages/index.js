import React, { useEffect, useContext, useState } from "react";
import Image from 'next/image';
import Countdown from 'react-countdown';
import { VotingContext } from '../context/Voter';
import Style from '../styles/index.module.css';
import Card from '../components/card/card';
import useCandidates from "./useCandidates";
import useVoters from "./useVoters";

const Index = () => {
  const { giveVote, checkIfWalletIsConnected, currentAccount } = useContext(VotingContext);
  const { candidateArray, candidateLength } = useCandidates();
  const { voterArray, voterLength } = useVoters();

  const [showCard, setShowCard] = useState(false); 

  useEffect(() => {
    checkIfWalletIsConnected();
    
    const timer = setTimeout(() => {
      setShowCard(true); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, [checkIfWalletIsConnected]);

  console.log("why");
  console.log(candidateArray);

  return (
    <div className={Style.home}>
      {currentAccount && 
      (
        <div className={Style.winner}>
          <div className={Style.winner_info}>
            <div className={Style.candidate_list}>
              <p>
                No Candidate: <span>{candidateLength}</span>
              </p>
            </div>
            <div className={Style.candidate_list}>
              <p>
                No Voter: <span>{voterLength}</span>
              </p>
            </div>
          </div>

          <div className={Style.winner_message}>
            <small>
              <Countdown date={Date.now() + 100000000} />
            </small>
          </div>
        </div>
      )}
      {showCard && ( 
        candidateLength === 0 ? (
          <p className={Style.noVotersMessage}><h1>No candidates created</h1> </p> 
        ) : (
        <Card candidateArray={candidateArray} candidateLength={candidateLength} giveVote={giveVote} />
      ))}
    </div>
  );
};

export default Index;
