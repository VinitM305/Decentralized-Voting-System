import { useState, useEffect} from "react";
import {useRouter} from 'next/router';
import { getCandidate } from "../context/candidateInfo.js";

const useCandidates = () => {
  const [candidateArray, setCandidateArray] = useState([]);
  const [candidateLength, setCandidateLength] = useState('');
  const router = useRouter(); 

  useEffect(() => {
      getCandidate(setCandidateArray, setCandidateLength, router);
  }, []);

  return { candidateArray, candidateLength };
};

export default useCandidates;
