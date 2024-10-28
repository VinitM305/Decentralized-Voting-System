// useCandidates.js
import { useState, useEffect } from "react";
import { getVoter } from "../context/voterInfo.js";

const useVoters = () => {
  const [voterArray, setVoterArray] = useState([]);
  const [voterLength, setVoterLength] = useState('');

  useEffect(() => {
    getVoter(setVoterArray, setVoterLength);
  }, []);

  return { voterArray, voterLength };
};

export default useVoters;
