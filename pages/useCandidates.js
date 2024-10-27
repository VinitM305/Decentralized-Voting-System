// useCandidates.js
import { useState, useEffect } from "react";
import { getCandidate } from "../context/candidateInfo.js";

const useCandidates = () => {
  const [candidateArray, setCandidateArray] = useState([]);
  const [candidateLength, setCandidateLength] = useState('');

  useEffect(() => {
    getCandidate(setCandidateArray, setCandidateLength);
  }, []);

  return { candidateArray, candidateLength };
};

export default useCandidates;
