// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./EventInformation.sol";

contract DisasterCollection{

    struct disaster{
        uint256 id;
        string familyEvent;
        string mainEvent;
        address eventInformationContract;   
        uint time;              
    }// add address list for verification

    
    mapping(address => uint[]) eventOwner;
    uint256 internal disasterCount;
    disaster[] internal DisasterEvent;

    constructor()
    {
       disasterCount = 1;
    }

    // Creates a new object which contains the basic information regarding the disaster event 
    function createEvent(string memory _familyEvent,string memory _mainEvent) public payable{

        // Initialzing and push the new Event  
        EventInformation eventInfo = new EventInformation(msg.sender);
        DisasterEvent.push(disaster(disasterCount,_familyEvent,_mainEvent,address(eventInfo),block.timestamp));
        disasterCount++;
        
        // Storing the owner of the event
        eventOwner[msg.sender].push(disasterCount);
    }

    // To get total number of disaster Contracts created
    function getDisasterCount() public view returns(uint256){
        return disasterCount;
    }

    // To ge the disaster information using Index
    function viewEvent(uint _index)  public view returns(disaster memory){
        return DisasterEvent[_index-1];
    }

    // Owner can access the contract and get fundes from the contract


    

}



// 1.Create time based event 