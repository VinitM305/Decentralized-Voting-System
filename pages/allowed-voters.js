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

const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [voterArray, setVoterArray] = useState([]);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  const router = useRouter();
  const {uploadToIPFS, createVoter} = useContext(VotingContext);

  const onDrop = useCallback(async (acceptedFil) => {
    const url = await uploadToIPFS(acceptedFil[0]);
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
// useEffect(() => {
//   console.log("Voter Array:", voterArray);
// }, [voterArray]); 


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
                  Name: <span> {formInput.name}</span>
                </p>
                <p>
                  Add:  <span> {formInput.address.slice(0,20)}</span>
                </p>
                <p>
                  Pos:  <span> {formInput.position}</span>
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
                {/* {voterArray.map((el, i) => (
                  <div key = {i+1} classname={Style.card_box}>
                    <div className={Style.image}>
                      <img src="" alt="Profile photo" />
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
          <h1>Create New Voter</h1>
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
            placeholder="Voter Name"
            handleClick={(e) => 
              setFormInput({...formInput, name: e.target.value })
            }
          />
          <Input 
            inputType="text"
            title="Address"
            placeholder="Voter Address"
            handleClick={(e) => 
              setFormInput({...formInput, address: e.target.value })
            }
          />
          <Input 
            inputType="text"
            title="Position"
            placeholder="Voter Position"
            handleClick={(e) => 
              setFormInput({...formInput, position: e.target.value })
            }
          />
          <div className={Style.Button}>
          <button className={Style.btn}
            onClick={() => {
              createVoter(formInput, fileUrl, router);
            }}
          >
            Authorized Voter
          </button>
          <button className={Style.btn}
            onClick={() => {
              getVoter(setVoterArray);
            }}
          >
            Fetch Voter
          </button>
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

export default allowedVoters;
