import React, {useContext, useState, useEffect} from "react";
import Style from './card.module.css';
import {VotingContext} from '../../context/Voter';
import useVoters from '../../pages/useVoters.js';

const Card = ({ candidateArray, candidateLength, giveVote, isElectionStarted }) => {

  const {currentAccount} = useContext(VotingContext);
  const { voterArray, voterLength } = useVoters();
  const [password, setPassword] = useState(null); // State to hold the password
  const [isPasswordFetched, setIsPasswordFetched] = useState(false);
  //console.log(voterArray);

  const findPassword = (address) => {
    console.log("hii");
  
  // Loop through each entry in the voterArray
  for (let i = 0; i < voterArray.length; i++) {
    const voter = voterArray[i];
    console.log(`Checking voter ${i}:`, voter[3]);
    console.log(`Comparing with`, address);
    console.log(`Password`, voter[0]);
    if (voter[3] && voter[3].toLowerCase().trim() === address.toLowerCase().trim()) {  
      console.log("Found matching voter:", voter);
      
      return voter[0];  
    }
  }

  console.log("No matching voter found.");
  return null;  
  };

  const handleVote = (id, address) => {
    console.log(currentAccount);
    const password = findPassword(currentAccount);
    console.log(password);
    if (isElectionStarted) {
      const checkpassword = prompt("Enter the voting password set by you at the time of registration:");
      if (checkpassword === password) {
        alert("The password is matched, you can vote.");
        giveVote({ id, address });
      } else {
        alert("The password is incorrect, you cannot vote.");
      }
    }
  };

  return (
    <div className={Style.card}>
      {candidateArray.map((el, i) => (
        <div key={i} className={Style.card_box}>
          <div className={Style.image}>
            <img src={el[3]} alt="profile" height={336} width={336} />
          </div>
          <div className={Style.card_info}>
            <h2>
              {el[1]} #{el[2].toNumber()}
            </h2>
            <p>{el[0]}</p>
            <p>Address: {el[6].slice(0, 30)}...</p>
            <p className={Style.total}>Total Vote</p>
          </div>
          <div className={Style.card_vote}>
            <p>{el[4].toNumber()}</p>
          </div>
          <div className={Style.card_button}>
            <button
              onClick={() => handleVote(el[2].toNumber(), el[6])}
              disabled={!isElectionStarted}
            >
              Give Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
