import React, { useState } from 'react';
import { ethers } from 'ethers';
import '../index2.css';
import { CheckCircleOutlined, PlusCircleOutlined, UploadOutlined, FolderViewOutlined, ExclamationCircleOutlined, GiftOutlined } from '@ant-design/icons';
// import { ExpandAltOutlined } from '@ant-design/icons';

import abi from './utils/EventInformationABI.json';

// Function to connect to metamask and get the account


export default function PageTwo() {

    const [familyEventText, setFamilyEventText] = useState();
    const [mainEventText, setMainEventText] = useState();


    // const [familyEventText, setFamilyEventText] = useState();
    // const [mainEventText, setMainEventText] = useState();
    // const [disasters, setDisasters] = useState([]);

    let generalInfo;
    // let verificationID;
    // let verificationStatus;
    // let requestInfo;

    const contractABI = abi;
    // const connect = async () => {
    //     const { ethereum } = window;
    //     if (typeof window.ethereum !== 'undefined') {
    //         await ethereum.request({ method: "eth_requestAccounts" });
    //     }
    //     else {
    //         alert("Get MetaMask!");          // Gives an alert .. NO NEED TO MAKE UI .. BUT IF NOT CONNECTED GIVE BUTTON TO CONNECT
    //         return;
    //     }
    // }
    let contractAddress = "0x38e798FdeF6026Fbb2EC42441c5ccbF7659B80DC";

    const createEvent = async () => {
        if (generalInfo.value.length != 0) {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const Signer = provider.getSigner();
                const EventInformationContract = new ethers.Contract(contractAddress, contractABI, Signer);

                const eventTxn = await EventInformationContract.createEvent(generalInfo.value, { value: ethers.utils.parseEther("0.15"), gasLimit: 3000000 });
                console.log("Mining:", eventTxn);
                await eventTxn.wait();
                console.log("Mined");
            }
        }
    }

    // const verifyEvent = async () => {
    //     if (verificationID.value.length != 0 && verificationStatus.value.length != 0) {
    //         const { ethereum } = window;
    //         if (ethereum) {
    //             const provider = new ethers.providers.Web3Provider(window.ethereum);
    //             await provider.send("eth_requestAccounts", []);
    //             const Signer = provider.getSigner();
    //             const EventInformationContract = new ethers.Contract(contractAddress, contractABI, Signer);

    //             const eventTxn = await EventInformationContract.verifiyEvent(verificationID.value, verificationStatus.value, { value: ethers.utils.parseEther("0.027"), gasLimit: 3000000 }); // Change verifyEvent spelling after updating contract
    //             console.log("Mining:", eventTxn);
    //             await eventTxn.wait();
    //             console.log("Mined");
    //         }
    //     }

    // }

    // const showAllEvents = async () => {
    //     try {
    //         if (window.ethereum) {
    //             const provider = new ethers.providers.Web3Provider(window.ethereum);
    //             await provider.send("eth_requestAccounts", []);
    //             const Signer = provider.getSigner();


    //             const EventInformationContract = new ethers.Contract(contractAddress, contractABI, Signer);

    //             let eventCount = await EventInformationContract.getTotalEvents();

    //             eventCount = ethers.BigNumber.from(eventCount).toNumber();

    //             const events = [];
    //             for (let i = 1; i <= eventCount; i++) {
    //                 const event = await EventInformationContract.getEventByID(i);
    //                 events.push({
    //                     generalInfo: event.generalInfo,
    //                     verficationTrue: event.verficationTrue,
    //                     verficationFalse: event.verficationFalse,
    //                     verified: event.verified,
    //                     // time: event.time  Time will be addded later
    //                     owner: event.owner
    //                 });
    //             }

    //             for (let i = 0; i < eventCount; i++) {
    //                 console.log(events[i]);           // THE RESULT IS PRINTED IN THE CONSOLE... NEED UI TO DISPLAY THEM ( LIKE STACK)
    //             }                                        // General Info, Time , Verification numbers and final status should be printed.. Owner not needed
    //         }

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // const createRequest = async () => {
    //     if (requestInfo.value.length != 0 && location.value.length != 0) {
    //         const { ethereum } = window;
    //         if (ethereum) {
    //             const provider = new ethers.providers.Web3Provider(window.ethereum);
    //             await provider.send("eth_requestAccounts", []);
    //             const Signer = provider.getSigner();
    //             const EventInformationContract = new ethers.Contract(contractAddress, contractABI, Signer);

    //             const eventTxn = await EventInformationContract.createRequest(requestInfo.value, location.value, { gasLimit: 3000000 });
    //             console.log("Mining:", eventTxn);
    //             await eventTxn.wait();
    //             console.log("Mined");
    //         }
    //     }
    // }

    // const showAllRequests = async () => {
    //     try {
    //         if (window.ethereum) {
    //             const provider = new ethers.providers.Web3Provider(window.ethereum);
    //             await provider.send("eth_requestAccounts", []);
    //             const Signer = provider.getSigner();


    //             const EventInformationContract = new ethers.Contract(contractAddress, contractABI, Signer);

    //             let requestCount = await EventInformationContract.getTotalRequests();

    //             requestCount = ethers.BigNumber.from(requestCount).toNumber();

    //             const requests = [];
    //             for (let i = 1; i <= requestCount; i++) {
    //                 const request = await EventInformationContract.getRequestByID(i);
    //                 requests.push({
    //                     info: request.info,
    //                     location: request.location,
    //                     owner: request.owner,
    //                     time: request.time,
    //                 });
    //             }

    //             for (let i = 0; i < requestCount; i++) {
    //                 console.log(requests[i]);           // THE RESULT IS PRINTED IN THE CONSOLE... NEED UI TO DISPLAY THEM ( LIKE STACK)
    //             }
    //         }

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <div className='container' >
            <picture>
                <img src={require('../assets/images/BG.webp')} alt='BG' className='BG' />
            </picture>

            <div className='centerBox'>

                <div id="eventVerification" className='inputFields2'>
                    <input type="text" name="familyEvent" id="familyEvent" placeholder="Family event" value={familyEventText} onChange={event => setFamilyEventText(event.target.value)} />
                    <CheckCircleOutlined style={{ fontSize: 40, color: "green", alignSelf: 'center' }} />

                    <PlusCircleOutlined style={{ fontSize: 40, color: "red", alignSelf: 'center', transform: 'rotate(45deg)' }} />

                </div>

                <div id="eventCreation" className='inputFields2'>
                    <input type="text" name="familyEvent" id="familyEvent" placeholder="Family event" value={familyEventText} onChange={event => setFamilyEventText(event.target.value)} />
                    <input type="text" name="mainEvent" id="mainEvent" placeholder="Main Event" value={mainEventText} onChange={event => setMainEventText(event.target.value)} />
                    <button id="createContract" onClick={createEvent}>Create Contract</button>
                </div>

                <div className='inputFields2'>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p>Upload Media</p>
                        <UploadOutlined style={{ fontSize: 30, color: "black", alignSelf: 'center' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p>View Media</p>
                        <FolderViewOutlined style={{ fontSize: 30, color: "black", alignSelf: 'center' }} />
                    </div>
                </div>

                <div className='inputFields2'>
                    <button className='viewEvent' id='viewEvent' >Show All Events</button>
                    <button className='connect' id='connect' >connect</button>
                </div>

                <div id="request" className='inputFields2'>
                    <input type="text" name="familyEvent" id="familyEvent" placeholder="Emergency Request" value={familyEventText} onChange={event => setFamilyEventText(event.target.value)} />

                    <ExclamationCircleOutlined style={{ fontSize: 40, color: "red", alignSelf: 'center' }} />


                </div>


                <div id="rewards" className='inputFields2'>
                    <p>Claim Rewards</p>
                    <GiftOutlined style={{ fontSize: 40, color: "black", alignSelf: 'center' }} />


                </div>


            </div>

        </div >

    )

}
