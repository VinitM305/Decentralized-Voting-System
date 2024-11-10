import React, { useEffect, useState, useRef } from 'react';
import { getVoter } from './voterInfo';

export default function abc() {
  const pushVoter = useRef([]);
  const [voterArray, setVoterArray] = useState(pushVoter);

  useEffect(() => {
    getVoter(pushVoter, setVoterArray);
  }, []);

  return (
    <div>
      
    </div>
  );
}
