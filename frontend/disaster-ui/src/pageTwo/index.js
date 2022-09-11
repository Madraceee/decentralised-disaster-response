import React, { useState } from 'react';
import { ethers } from 'ethers';
import { ExpandAltOutlined } from '@ant-design/icons';

import abi from './utils/EventInformationABI.json';

// Function to connect to metamask and get the account


export default function PageTwo() {
    const [familyEventText, setFamilyEventText] = useState();
    const [mainEventText, setMainEventText] = useState();
    const [disasters, setDisasters] = useState([]);

    let generalInfo;
    let verificationID;
    let verificationStatus;
    let requestInfo;

    const contractABI = abi;
    const connect = async () => {
        const { ethereum } = window;
        if (typeof window.ethereum !== 'undefined') {
            await ethereum.request({ method: "eth_requestAccounts" });
        }
        else {
            alert("Get MetaMask!");          // Gives an alert .. NO NEED TO MAKE UI .. BUT IF NOT CONNECTED GIVE BUTTON TO CONNECT
            return;
        }
    }
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

    const verifyEvent = async () => {
        if (verificationID.value.length != 0 && verificationStatus.value.length != 0) {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const Signer = provider.getSigner();
                const EventInformationContract = new ethers.Contract(contractAddress, contractABI, Signer);

                const eventTxn = await EventInformationContract.verifiyEvent(verificationID.value, verificationStatus.value, { value: ethers.utils.parseEther("0.027"), gasLimit: 3000000 }); // Change verifyEvent spelling after updating contract
                console.log("Mining:", eventTxn);
                await eventTxn.wait();
                console.log("Mined");
            }
        }

    }

    const showAllEvents = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const Signer = provider.getSigner();


                const EventInformationContract = new ethers.Contract(contractAddress, contractABI, Signer);

                let eventCount = await EventInformationContract.getTotalEvents();

                eventCount = ethers.BigNumber.from(eventCount).toNumber();

                const events = [];
                for (let i = 1; i <= eventCount; i++) {
                    const event = await EventInformationContract.getEventByID(i);
                    events.push({
                        generalInfo: event.generalInfo,
                        verficationTrue: event.verficationTrue,
                        verficationFalse: event.verficationFalse,
                        verified: event.verified,
                        // time: event.time  Time will be addded later
                        owner: event.owner
                    });
                }

                for (let i = 0; i < eventCount; i++) {
                    console.log(events[i]);           // THE RESULT IS PRINTED IN THE CONSOLE... NEED UI TO DISPLAY THEM ( LIKE STACK)
                }                                        // General Info, Time , Verification numbers and final status should be printed.. Owner not needed
            }

        } catch (err) {
            console.log(err);
        }
    }

    const createRequest = async () => {
        if (requestInfo.value.length != 0 && location.value.length != 0) {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const Signer = provider.getSigner();
                const EventInformationContract = new ethers.Contract(contractAddress, contractABI, Signer);

                const eventTxn = await EventInformationContract.createRequest(requestInfo.value, location.value, { gasLimit: 3000000 });
                console.log("Mining:", eventTxn);
                await eventTxn.wait();
                console.log("Mined");
            }
        }
    }

    const showAllRequests = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const Signer = provider.getSigner();


                const EventInformationContract = new ethers.Contract(contractAddress, contractABI, Signer);

                let requestCount = await EventInformationContract.getTotalRequests();

                requestCount = ethers.BigNumber.from(requestCount).toNumber();

                const requests = [];
                for (let i = 1; i <= requestCount; i++) {
                    const request = await EventInformationContract.getRequestByID(i);
                    requests.push({
                        info: request.info,
                        location: request.location,
                        owner: request.owner,
                        time: request.time,
                    });
                }

                for (let i = 0; i < requestCount; i++) {
                    console.log(requests[i]);           // THE RESULT IS PRINTED IN THE CONSOLE... NEED UI TO DISPLAY THEM ( LIKE STACK)
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='container' >
            <picture>
                <img src={require('../assets/images/BG.webp')} alt='BG' className='BG' />
            </picture>


        </div >

    )

}
