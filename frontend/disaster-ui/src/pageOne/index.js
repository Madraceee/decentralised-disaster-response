import React, { useState } from 'react';
import { ethers } from 'ethers';
import abi from './utils/DisasterCollectionABI.json';
<<<<<<< HEAD

=======
import { ExpandAltOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
>>>>>>> 89bf4c76d6ad06fac9491bf7dbf6bc1cb2806309

const contractAddress = "0x4cE3E3f60FACAB09A35610Ed463D5E25768aDe3d";
const contractABI = abi;

export default function PageOne() {
<<<<<<< HEAD
    
    
    const {ethereum} = window;
    const connect = async() =>{
        if( typeof window.ethereum !== 'undefined'){
            await ethereum.request({method:"eth_requestAccounts"});
        }
        else{
            alert("Get MetaMask!");          // Gives an alert .. NO NEED TO MAKE UI
=======
    const [familyEventText, setFamilyEventText] = useState();
    const [mainEventText, setMainEventText] = useState();
    const [disasters, setDisasters] = useState([]);

    const connect = async () => {
        const { ethereum } = window;
        if (typeof window.ethereum !== 'undefined') {
            await ethereum.request({ method: "eth_requestAccounts" });
        }
        else {
            alert("Get MetaMask!");
>>>>>>> 89bf4c76d6ad06fac9491bf7dbf6bc1cb2806309
            return;
        }
    }

<<<<<<< HEAD

    const viewEvents = async()=>{
    
        try{
            if(window.ethereum){
                const provider = new ethers.providers.Web3Provider(window.ethereum); 
=======
    const viewEvents = async () => {
        setDisasters([]);
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
>>>>>>> 89bf4c76d6ad06fac9491bf7dbf6bc1cb2806309
                await provider.send("eth_requestAccounts", []);
                const Signer = provider.getSigner();


                const DisasterCollectionContract = new ethers.Contract(contractAddress, contractABI, Signer);

                let disasterCount = await DisasterCollectionContract.getDisasterCount();

                disasterCount = ethers.BigNumber.from(disasterCount).toNumber();
                console.log(disasterCount);
                // const disasters = [];
                for (let i = 0; i < (disasterCount - 1); i++) {
                    const disaster = await DisasterCollectionContract.viewEvent(i);
                    disasters.push({
                        id: disaster.id,
                        familyEvent: disaster.familyEvent,
                        mainEvent: disaster.mainEvent,
                        eventInformationContract: DisasterCollectionContract,
                        time: disaster.time
                    });
                    setDisasters([...disasters, disaster])
                }

                for (let i = 0; i < disasterCount - 1; i++) {
                    console.log(disasters[i]);           // THE RESULT IS PRINTED IN THE CONSOLE... NEED UI TO DISPLAY THEM ( LIKE STACK)
                }                                        // DISPLAY ID, FAMILY EVENT, MAIN EVENT, TIME    THE "DisasterCollectionContract" SHOULD BE A LINK TO ANOTHER PAGE
            }
        } catch (err) {
            console.log(err);
        }
    }

    const createEvent = async () => {

        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const Signer = provider.getSigner();

                const DisasterCollectionContract = new ethers.Contract(contractAddress, contractABI, Signer);


                if (familyEventText.length != 0 && mainEventText.length != 0) {                  // Need a UI for accept 2 fields make sure they are not null.. then call this part
                    const eventTxn = await DisasterCollectionContract.createEvent(familyEventText.value, mainEventText.value, { gasLimit: 3000000 });
                    console.log("Mining:", eventTxn);
                    await eventTxn.wait();
                }                                             // NEED UI


            } else {
                console.log("No ethereum object");
            }
        } catch (err) {
            console.log(err);
        }
    }
<<<<<<< HEAD


    const familyEventText = document.getElementById('familyEvent');
    const mainEventText = document.getElementById('mainEvent');
    const createEvent = async()=>{

        try{
            console.log(familyEventText.value)
            const {ethereum}= window;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(window.ethereum); 
                await provider.send("eth_requestAccounts", []);
                const Signer = provider.getSigner();           
    
                const DisasterCollectionContract = new ethers.Contract(contractAddress,contractABI, Signer);
    
                
                if(familyEventText.value.length!=0 && mainEventText.value.length!=0){                  // Need a UI for accept 2 fields make sure they are not null.. then call this part
                    const eventTxn = await DisasterCollectionContract.createEvent(familyEventText.value,mainEventText.value,{ gasLimit: 3000000 });
                    console.log("Mining:",eventTxn);
                    await eventTxn.wait();
                }                                             // NEED UI
                
    
            }else{
                console.log("No ethereum object");
            }
        }catch(err){
            console.log(err);
        }
    }
    
    
=======
>>>>>>> 89bf4c76d6ad06fac9491bf7dbf6bc1cb2806309

    return (
        <div className='container' >
            <picture>
                <img src={require('../assets/images/BG.webp')} alt='BG' className='BG' />
            </picture>

            <div className='centerBox'>
                <div style={{ margin: 30, display: 'flex', justifyContent: 'space-evenly' }}>
                    <button className='viewEvent' id='viewEvent' onClick={viewEvents}>View Events</button>
                    <button className='connect' id='connect' onClick={connect}>connect</button>
<<<<<<< HEAD
=======
                </div>

                <div className='eventList'>

                    {disasters.map(item => (
                        <div key={item.id} className='eventCard'>
                            <div>
                                <p>Event Category: {item.familyEvent}</p>
                                <p style={{ fontWeight: 'bold' }}>Event: {item.mainEvent}</p>
                                <p>Location: {item.location}</p>
                            </div>
                            <ExpandAltOutlined style={{ fontSize: 25, color: "black", alignSelf: 'center' }} onClick={<Link to="/2" />} />
                        </div>
                    ))}



>>>>>>> 89bf4c76d6ad06fac9491bf7dbf6bc1cb2806309
                </div>






                <div id="eventCreation" className='inputFields'>
<<<<<<< HEAD
                    <input type="text" name="familyEvent" id="familyEvent" placeholder="Family event" />
                    <input type="text" name="mainEvent" id="mainEvent" placeholder="Main Event" />
                <button id="createContract" onClick={createEvent}>Create Contract</button>
=======
                    <input type="text" name="familyEvent" id="familyEvent" placeholder="Family event" value={familyEventText} onChange={event => setFamilyEventText(event.target.value)} />
                    <input type="text" name="mainEvent" id="mainEvent" placeholder="Main Event" value={mainEventText} onChange={event => setMainEventText(event.target.value)} />
                    <button id="createContract" onClick={createEvent}>Create Contract</button>
>>>>>>> 89bf4c76d6ad06fac9491bf7dbf6bc1cb2806309
                </div>

            </div>


        </div >
    )
}
