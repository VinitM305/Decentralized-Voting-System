import React, {useState, useEffect, useContext} from "react";

import VoterCard from '../components/voterCard/voterCard';
import Style from '../styles/voterList.module.css';
import {VotingContext} from '../context/Voter';
import useVoters from "./useVoters";

const voterList = () => {
  const {checkIfWalletIsConnected} = useContext(VotingContext);
  const { voterArray, voterLength } = useVoters();
  const [showCard, setShowCard] = useState(false);
  useEffect(() => {
    checkIfWalletIsConnected();
    
    const timer = setTimeout(() => {
      setShowCard(true); // Set to true after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [checkIfWalletIsConnected]);

  return (
    <div className={Style.voterList}>
      {showCard && ( 
        <VoterCard voterArray={voterArray} />
      )}
    </div>
  )
};

export default voterList;
