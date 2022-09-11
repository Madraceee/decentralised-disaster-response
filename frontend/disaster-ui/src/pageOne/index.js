import React from 'react';
import {ethers} from 'ethers';
import abi from './utils/DisasterCollectionABI.json';


const contractAddress = "0x4cE3E3f60FACAB09A35610Ed463D5E25768aDe3d";   // DisasterCollection contract address
const contractABI = abi;  // ABI available in utils

export default function PageOne() {
    
    
    const {ethereum} = window;
    const connect = async() =>{
        if( typeof window.ethereum !== 'undefined'){
            await ethereum.request({method:"eth_requestAccounts"});
        }
        else{
            alert("Get MetaMask!");          // Gives an alert .. NO NEED TO MAKE UI
            return;
        }
    }


    const viewEvents = async()=>{
    
        try{
            if(window.ethereum){
                const provider = new ethers.providers.Web3Provider(window.ethereum); 
                await provider.send("eth_requestAccounts", []);
                const Signer = provider.getSigner();
                
    
                const DisasterCollectionContract = new ethers.Contract(contractAddress,contractABI, Signer);
    
                let disasterCount = await DisasterCollectionContract.getDisasterCount();
    
                disasterCount=  ethers.BigNumber.from(disasterCount).toNumber();
                console.log(disasterCount);
                const disasters= [];
                for(let i=0; i < (disasterCount-1) ; i++){
                    const disaster = await DisasterCollectionContract.viewEvent(i);
                    disasters.push({
                        id: disaster.id,
                        familyEvent: disaster.familyEvent,
                        mainEvent : disaster.mainEvent,
                        eventInformationContract: DisasterCollectionContract,  
                        time: disaster.time
                    });
                }
    
                for(let i=0; i<disasterCount-1 ; i++){
                    console.log(disasters[i]);           // THE RESULT IS PRINTED IN THE CONSOLE... NEED UI TO DISPLAY THEM ( LIKE STACK)
                }                                        // DISPLAY ID, FAMILY EVENT, MAIN EVENT, TIME    THE "DisasterCollectionContract" SHOULD BE A LINK TO ANOTHER PAGE
            }
            
        }catch(err){
            console.log(err);
        }
        
        
    
    }


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
    
    

    return (
        <div className='container' >
            <picture>
                <img src={require('../assets/images/BG.webp')} alt='BG' className='BG' />
            </picture>

            <div className='centerBox'>
                <div style={{ margin: 30, display: 'flex', justifyContent: 'space-evenly' }}>
                    <button className='viewEvent' id='viewEvent' onClick={viewEvents}>View Events</button>
                    <button className='connect' id='connect' onClick={connect}>connect</button>
                </div>

                {/* <div className='eventList'>
                    {
                        Array.map(item)=>{
                        return(<div>
                            <p>{item.Name}</p>
                            <p>{item.Name}</p>
                            <p>{item.Name}</p>
                        
                    </div>
                    )
                    }
                    }
                </div> */}

                <div id="eventCreation" className='inputFields'>
                    <input type="text" name="familyEvent" id="familyEvent" placeholder="Family event" />
                    <input type="text" name="mainEvent" id="mainEvent" placeholder="Main Event" />
                <button id="createContract" onClick={createEvent}>Create Contract</button>
                </div>

            </div>


        </div >
    )
}
