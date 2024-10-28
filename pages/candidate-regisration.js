import React, {useState, useEffect, useCallback, useContext} from "react";
import {useRouter} from 'next/router';
import {useDropzone} from 'react-dropzone';
import Image from 'next/image';

import {VotingContext} from '../context/Voter';
import Style from '../styles/allowedVoter.module.css';
import images from '../assets';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
const {getVoter} = require("../context/voterInfo.js");
const {getCandidate} = require("../context/candidateInfo.js");

const candidateRegistrations = () => {
  const [fileUrl, setFileUrl] = useState(null);
  
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    address: "",
    age: "",
  });
  
  const router = useRouter();
  const {createCandidate, uploadToIPFSCandidate} = useContext(VotingContext);

  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFSCandidate(acceptedFil[0]);
    setFileUrl(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
        'image/gif': ['.gif'],
        'image/webm': ['.webm']
    },
    maxSize: 10000000,
});

//getting data from blocks
const [voterArray, setVoterArray] = useState([]);
const [voterLength, setVoterLength] = useState('');
const [candidateArray, setCandidateArray] = useState([]);
const [candidateLength, setCandidateLength] = useState('');

// useEffect(() =>{
//   getCandidate(setCandidateArray, setCandidateLength);
// },[]);

// useEffect(() => {
//   console.log("Candidate array:", candidateArray);
// }, [candidateArray]); 


//console.log("vinit");

  return (
    <div className = {Style.createVoter}>
      <div>
        {fileUrl && (
          <div className = {Style.voterInfo}>
            <div className = {Style.dummydiv}>
              <img src={fileUrl} alt="Voter Image" className={Style.voterInfoImage}/>
              <div className = {Style.voterInfo_paragraph}>
                <p>
                  Name: <span> {candidateForm.name}</span>
                </p>
                <p>
                  Add:  <span> {candidateForm.address.slice(0,20)}</span>
                </p>
                <p>
                  Age:  <span> {candidateForm.age}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {
          !fileUrl &&(
            <div className = {Style.sideInfo}>
              <div className = {Style.sideInfo_box}>
                <h4>Create candidate For Voting</h4>
                <p>
                  Blockchain voting organization, provide ethereum blockchain ecosystem.
                </p>
                <p className = {Style.sideInfo_para}>Contract Candidate List</p>
              </div>

              <div className = {Style.card}>
                {/* {candidateArray.map((el, i) => (
                  <div key = {i+1} className={Style.card_box}>
                    <div className={Style.image}>
                      <img src={el[3]} alt="Profile photo" />
                    </div>
                    <div className={Style.card_info}>
                      <p>
                        Name
                      </p>
                      <p>
                        Address
                      </p>
                      <p>
                        Details
                      </p>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          )
        }
      </div>

      <div className = {Style.voter}>
        <div className = {Style.voter__container}>
          <h1>Create New Candidate</h1>
          <div className = {Style.voter__container__box}>
            <div className = {Style.voter__container__box__div}>
              <div {...getRootProps()}>
                <input {...getInputProps()}/>
                <div className={Style.voter__container__box__div__info}>
                  <p>Upload file: JPG, PNG, GIF, WEBM MAX 10MB</p>
                  <div className={Style.voter__container__box__div__image}>
                    <Image
                      src = {images.upload} 
                      width={150} 
                      height={150}
                      objectfit="contain"
                      alt="File Upload"
                    />
                  </div>
                  <p>Drag & Drop File</p>
                  <p>or Browse Media on your device</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={Style.input__container}>
          <Input 
            inputType="text"
            title="Name"
            placeholder="Candidate Name"
            handleClick={(e) => 
              setCandidateForm({...candidateForm, name: e.target.value })
            }
          />
          <Input 
            inputType="text"
            title="Address"
            placeholder="Candidate Address"
            handleClick={(e) => 
              setCandidateForm({...candidateForm, address: e.target.value })
            }
          />
          <Input 
            inputType="text"
            title="Age"
            placeholder="Candidate Age"
            handleClick={(e) => 
              setCandidateForm ({...candidateForm, age: e.target.value })
            }
          />
          <div className={Style.Button}>
          <button className={Style.btn}
            onClick={() => {
              createCandidate(candidateForm, fileUrl, router);
            }}
          >
            Authorized Candidate
          </button>
          {/* <button className={Style.btn}
            onClick={() => {
              getCandidate(setCandidateArray, setCandidateLength, router);
            }}
          >
            Store all Candidates
          </button> */}
          </div>
        </div>
      </div>
      <div className={Style.createdVoter}>
        <div className={Style.createdVoter__info}>
          <Image src={images.creator} alt="user Profile"/>
          <p>Notice For User</p>
          <p>
            Organizer <span>0x939939..</span>
          </p>
          <p>
            Only organizer of the voting contract can create voter for voting election.
          </p>
        </div>
      </div>
    </div>
  )
};

export default candidateRegistrations;
