import { ethers } from "./ethers.js";
import abi from './utils/EventInformationABI.json' assert { type: "json" };

// Function to connect to metamask and get the account

const contractABI = abi;
const button2 = document.getElementById('connect');
const connect = async() =>{
    if( typeof window.ethereum !== 'undefined'){
        await ethereum.request({method:"eth_requestAccounts"});
    }
    else{
        alert("Get MetaMask!");          // Gives an alert .. NO NEED TO MAKE UI .. BUT IF NOT CONNECTED GIVE BUTTON TO CONNECT
        return;
    }
}
button2.addEventListener('click',connect.call());

// The home page will send the address as a parameter to this page.
// The parameter is a contract address which has the EventInformation contract address.. Using this address we will be to access the Data
// For now Adding a text box to get the contract address

const button1 = document.getElementById("contractAddressSubmit");
const addressField = document.getElementById("contractAddress");

let contractAddress;
const contractAddressGetter = async()=>{
    contractAddress = addressField.value;
    console.log(contractAddress);
}

button1.addEventListener('click',contractAddressGetter);


// Funtion to create a new event

const button3 = document.getElementById("createEventSubmit");
const generalInfo = document.getElementById("generalInfo");
const createEvent = async()=>{
    if(generalInfo.value.length != 0){
        const {ethereum} = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum); 
            await provider.send("eth_requestAccounts", []);
            const Signer = provider.getSigner();         
            const EventInformationContract = new ethers.Contract(contractAddress,contractABI, Signer);

            const eventTxn = await EventInformationContract.createEvent(generalInfo.value,{ value: ethers.utils.parseEther("0.15"), gasLimit: 3000000 });
            console.log("Mining:",eventTxn);
            await eventTxn.wait();
            console.log("Mined");
        }
    }
}

button3.addEventListener('click',createEvent);

// Function for verifiers to verify
const button4 = document.getElementById("verificationSubmit");
const verificationID = document.getElementById("verificationID");
const verificationStatus = document.getElementById("verification");

const verifyEvent = async() => {
    if(verificationID.value.length!=0 && verificationStatus.value.length!=0){
        const {ethereum} = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum); 
            await provider.send("eth_requestAccounts", []);
            const Signer = provider.getSigner();         
            const EventInformationContract = new ethers.Contract(contractAddress,contractABI, Signer);

            const eventTxn = await EventInformationContract.verifiyEvent(verificationID.value,verificationStatus.value,{ value: ethers.utils.parseEther("0.027"), gasLimit: 3000000 }); // Change verifyEvent spelling after updating contract
            console.log("Mining:",eventTxn);
            await eventTxn.wait();
            console.log("Mined");
        }
    }
    
}

button4.addEventListener('click',verifyEvent);

// Function to print all the events

const button5 = document.getElementById("showAllEvents");

const showAllEvents = async()=>{
    try{
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum); 
            await provider.send("eth_requestAccounts", []);
            const Signer = provider.getSigner();
            

            const EventInformationContract = new ethers.Contract(contractAddress,contractABI, Signer);

            let eventCount = await EventInformationContract.getTotalEvents();

            eventCount=  ethers.BigNumber.from(eventCount).toNumber();
    
            const events= [];
            for(let i=1; i <= eventCount ; i++){
                const event = await EventInformationContract.getEventByID(i);
                events.push({
                    generalInfo: event.generalInfo,
                    verficationTrue: event.verficationTrue,
                    verficationFalse : event.verficationFalse,
                    verified: event.verified,  
                    // time: event.time  Time will be addded later
                    owner : event.owner
                });
            };

            for(let i=0; i<eventCount ; i++){
                console.log(events[i]);           // THE RESULT IS PRINTED IN THE CONSOLE... NEED UI TO DISPLAY THEM ( LIKE STACK)
            }                                        // General Info, Time , Verification numbers and final status should be printed.. Owner not needed
        }
        
    }catch(err){
        console.log(err);
    }
}

button5.addEventListener('click',showAllEvents)