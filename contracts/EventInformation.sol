// SPDX-License-Identifier: MIT

// Note "event" word has been used a lot which represents a real life event

pragma solidity ^0.8.0;

import "./PriceConvertor.sol";  //import PriceConvertor.sol to get MATIC to USD then USD to INR

contract eventInformation{
    using PriceConvertor for uint256;
    
    // Store address and their option(True or false)
    struct eventVerifiers{
        address verifier;           // Address of the verifier
        bool verificationStatus;    // 0 ->false   1->True
        bool isValue;            
    }

    mapping(uint32 => eventVerifiers[] )  verifiers;  // Store multiple verufiers for a single Event 
    mapping(uint32 => string[]) media;                // Store media related to a certain event

    // Structure of the event and information it stores
    struct eventDetail{
        string generalInfo;
        uint64 verficationTrue;
        uint64 verficationFalse;
        bool verified;       
        address owner;           // owner of the event
    }

    // Request structure.. Used by those in distress and want serious help
    struct urgentRequest{
        string info;
        string location;
        address owner;
        bool status;
    }

    
    mapping(uint32 =>eventDetail) EventDetails;
    uint32 EventCount;
    
    urgentRequest[] urgentRequests;    
    uint time;

    address public immutable i_owner;   // Owner of the Contract .. Mostly government
    uint8 public constant EVENTCREATIONDEPOSIT =10;  //INR
    uint8 public constant VERIFIERDEPOSIT = 2;     //INR


    constructor(){
        i_owner = msg.sender;
        time = block.timestamp;
        EventCount = 1;
    }


    modifier checkEventDeposit(){
        require(msg.value.getConversionRate() >= EVENTCREATIONDEPOSIT,"Did not send enough Event Creation Deposit");
        _;
    }
    
    event NewEvent(uint32 indexed _id, bool _Accepted );
    // Initialize a new event
    function createEvent(string memory _generalInfo) public payable checkEventDeposit(){
        EventDetails[EventCount].generalInfo = _generalInfo;
        EventDetails[EventCount].verficationTrue = 0;
        EventDetails[EventCount].verficationFalse = 0;
        EventDetails[EventCount].verified = false;
        EventDetails[EventCount].owner = msg.sender;
        emit NewEvent(EventCount, true);
        EventCount++;
    }

    // functions , modifiers, events for Verification of an Event

    event UpdateEvent(uint32 indexed _id, bool _verifiedStatus);

    modifier checkVerifierDeposit(){
        require(msg.value.getConversionRate() >= VERIFIERDEPOSIT,"Did not send enough Verification Deposit");
        _;
    }
    
    // To check wether the current sender has already given his status on the event 
    modifier checkAddressVerification(uint32 _id,address _sender){
        require( _id<= EventCount );
        bool status;
        uint256 length = verifiers[_id].length;
        for(uint i=0; i< length;i++)
        {            
            if(verifiers[_id][i].verifier == _sender){
                status = true;
            }
        }

        if(status == false){
            _;
        }
        else{
            revert("Event verified by the Sender");
        }
    }

    // Funtion to verify the event 
    function verifiyEvent(uint32 _id,bool _verificationStatus) public payable checkAddressVerification(_id,msg.sender){
        verifiers[_id].push(eventVerifiers(msg.sender,_verificationStatus,true)); // Executed only when the sender has not already given his response
        if(_verificationStatus == false){
            EventDetails[_id].verficationFalse++;
        }else {
             EventDetails[_id].verficationTrue++;
        }

        if(EventDetails[_id].verficationFalse > EventDetails[_id].verficationTrue){
            EventDetails[_id].verified = false;
        }else{
            EventDetails[_id].verified = true;
        }

        emit UpdateEvent(_id,EventDetails[_id].verified);
    } 


    // Upload media  to a event using id
    function uploadMedia(uint32 _id, string memory _mediaLink) public payable{
        media[_id].push(_mediaLink);
    }

    //Functions to send events to the frontend
    
    function getTotalEvents() public view returns(uint32){
        return EventCount;
    }

    function getEventByID(uint32 _id) public view returns( eventDetail memory){
        return EventDetails[_id];
    }
    
    // Create Request

    // Add function to check whether a problem has been fixed
    

    //Send rewards back to verifiers and event creators

    
}