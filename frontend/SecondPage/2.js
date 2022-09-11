import { ethers } from "../ethers.js";
import abi from './utils/EventInformationABI.json' assert { type: "json" };

// Function to connect to metamask and get the account

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

cosnt 
const createEvent = async()=>{

}
