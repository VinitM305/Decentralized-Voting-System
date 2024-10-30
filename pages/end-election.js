import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/end-election.module.css'; // Adjust the path as necessary

const EndElection = () => {
  const router = useRouter();
  const { candidates } = router.query; // Access the query parameter

  // Parse the candidates back into an array
  const candidateArray = candidates ? JSON.parse(candidates) : [];

  // Find the maximum votes
  const maxVotes = candidateArray.reduce((max, el) => Math.max(max, el[4]), 0);

  // Filter candidates with the maximum votes
  const winningCandidates = candidateArray.filter(el => el[4] === maxVotes);

  return (
    <div className={styles.container}> {/* Apply container class */}
      <h1 className={styles.title}>Election Results</h1> {/* Apply title class */}
      {winningCandidates.length > 1 ? ( // Check if there are multiple winners
        <p className={`${styles.tieMessage} ${styles.centerText}`}>No candidate has won the election as there is a tie.</p> // Display tie message
      ) : winningCandidates.length === 1 ? (
        <ul className={styles.list}> {/* Apply list class */}
          {winningCandidates.map((el, i) => (
            <li key={i} className={`${styles.listItem} ${styles.centerText}`}> {/* Apply listItem and centerText class */}
              The candidate {el[1]} has won the election with {el[4]} votes {/* Display candidate name and their votes */}
            </li>
          ))}
        </ul>
      ) : (
        <p className={`${styles.noCandidates} ${styles.centerText}`}>No candidates found.</p> 
      )}
    </div>
  );
};

export default EndElection;
