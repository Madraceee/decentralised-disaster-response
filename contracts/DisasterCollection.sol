// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./EventInformation.sol";

contract DisasterCollection{

    struct disaster{
        uint256 id;
        string familyEvent;
        string mainEvent;
        address eventInformationContract;
        string location;
        uint time;              
    }

    
    mapping(address => uint[]) eventOwner;
    uint256 internal disasterCount;
    disaster[] internal DisasterEvent;

    constructor()
    {
       disasterCount = 1;
    }

    // Creates a new object which contains the basic information regarding the disaster event 
    function createEvent(string memory _familyEvent,string memory _mainEvent,string memory _location) public payable{

        // Initialzing and push the new Event  
        EventInformation eventInfo = new EventInformation(msg.sender);
        DisasterEvent.push(disaster(disasterCount,_familyEvent,_mainEvent,address(eventInfo),_location,block.timestamp));
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



    

}



