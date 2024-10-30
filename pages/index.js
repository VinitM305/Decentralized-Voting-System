import React, { useEffect, useContext, useState } from "react";
import Image from 'next/image';
import Countdown from 'react-countdown';
import { useRouter } from 'next/router';
import { VotingContext } from '../context/Voter';
import Style from '../styles/index.module.css';
import Card from '../components/card/card';
import useCandidates from "./useCandidates";
import useVoters from "./useVoters";

const Index = () => {
  const { giveVote, checkIfWalletIsConnected, currentAccount } = useContext(VotingContext);
  const { candidateArray, candidateLength } = useCandidates();
  const { voterArray, voterLength } = useVoters();
  const router = useRouter();

  const [showCard, setShowCard] = useState(false); 
  const [isElectionStarted, setIsElectionStarted] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
    
    const timer = setTimeout(() => {
      setShowCard(true); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, [checkIfWalletIsConnected]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedElectionStatus = localStorage.getItem("isElectionStarted");

      if (storedElectionStatus === "true") {
        setIsElectionStarted(true);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isElectionStarted", isElectionStarted);
    }
  }, [isElectionStarted]);

  const handleElectionToggle = () => {
    if (isElectionStarted) {
      // Prepare candidates to pass to the end election page
      const candidatesWithVoteCountAsNumber = candidateArray.map(el => [
        el[0], el[1], el[2], el[3], el[4].toNumber(), el[5], el[6]
      ]);

      // Redirect to end-election page
      router.push({
        pathname: '/end-election',
        query: { candidates: JSON.stringify(candidatesWithVoteCountAsNumber) },
      });

      setIsElectionStarted(false);
    } else {
      setIsElectionStarted(true);
    }
  };

  return (
    <div className={Style.home}>
      {currentAccount && (
        <div className={Style.winner}>
          <div className={Style.winner_info}>
            <div className={Style.candidate_list}>
              <p>No Candidate: <span>{candidateLength}</span></p>
            </div>
            <div className={Style.candidate_list}>
              <p>No Voter: <span>{voterLength}</span></p>
            </div>
          </div>
          <div className={Style.winner_message}>
            <small>
              <Countdown date={Date.now() + 100000000} />
            </small>
          </div>
          <button className={Style.btn} onClick={handleElectionToggle}>
            {isElectionStarted ? "End Election" : "Start Election"}
          </button>
        </div>
      )}
      {showCard && (
        candidateLength === 0 ? (
          <p className={Style.noVotersMessage}><h1>No candidates created</h1></p>
        ) : (
          <Card 
            candidateArray={candidateArray} 
            candidateLength={candidateLength} 
            giveVote={giveVote} 
            isElectionStarted={isElectionStarted} // Disable voting if election has ended
          />
        )
      )}
    </div>
  );
};

export default Index;
