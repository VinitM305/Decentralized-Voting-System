import React, { useState, useEffect, useContext } from "react";

import VoterCard from '../components/voterCard/voterCard';
import Style from '../styles/voterList.module.css';
import { VotingContext } from '../context/Voter';
import useVoters from "./useVoters";

const VoterList = () => {
  const { checkIfWalletIsConnected } = useContext(VotingContext);
  const { voterArray, voterLength } = useVoters();
  const [showCard, setShowCard] = useState(false);
  
  useEffect(() => {
    checkIfWalletIsConnected();
    
    const timer = setTimeout(() => {
      setShowCard(true); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, [checkIfWalletIsConnected]);

  return (
    <div className={Style.voterList}>
      {showCard && (
        voterLength === 0 ? (
          <p className={Style.noVotersMessage}><h1>No voters created</h1> </p> 
        ) : (
          <VoterCard voterArray={voterArray} />
        )
      )}
    </div>
  );
};

export default VoterList;
