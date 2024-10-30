import React from "react";
import Style from './card.module.css';

const Card = ({ candidateArray, candidateLength, giveVote, isElectionStarted }) => {
  const handleVote = (id, address) => {
    if (isElectionStarted) {
      giveVote({ id, address });
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
