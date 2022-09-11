import { ethers } from "./ethers.js";
import abi from './utils/DisasterCollectionABI.json' assert { type: "json" };



const contractAddress = "0xd726183524c3fcb011E9428F4b8b0f91C41963e6";   // DisasterCollection contract address
const contractABI = abi;  // ABI available in utils





const button1 = document.getElementById('connect');               // Connect to metamask
const button2 = document.getElementById('viewEvent');            // View all the disaster events
const button3 = document.getElementById('createContract');          // Create a new event


// Function to connect to metamask and get the account
const connect = async() =>{
    if( typeof window.ethereum !== 'undefined'){
        await ethereum.request({method:"eth_requestAccounts"});
    }
    else{
        alert("Get MetaMask!");          // Gives an alert .. NO NEED TO MAKE UI
        return;
    }
}

button1.addEventListener('click',connect.call());


// Function to get all the disasters
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
            };

            for(let i=0; i<disasterCount-1 ; i++){
                console.log(disasters[i]);           // THE RESULT IS PRINTED IN THE CONSOLE... NEED UI TO DISPLAY THEM ( LIKE STACK)
            }                                        // DISPLAY ID, FAMILY EVENT, MAIN EVENT, TIME    THE "DisasterCollectionContract" SHOULD BE A LINK TO ANOTHER PAGE
        }
        
    }catch(err){
        console.log(err);
    }
    
    

}

button2.addEventListener('click',viewEvents);



// Function to create a new event
const familyEventText = document.getElementById('familyEvent');
const mainEventText = document.getElementById('mainEvent');
const createEvent = async()=>{

    try{
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

button3.addEventListener('click',createEvent);
