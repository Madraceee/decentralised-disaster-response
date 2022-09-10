// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

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
       disasterCount = 0;
    }

    // Creates a new object which contains the basic information regarding the disaster event 
    function createEvent(string memory _familyEvent,string memory _mainEvent) public payable{

        // Initialzing and push the new Event         
        DisasterEvent.push(disaster(disasterCount,_familyEvent,_mainEvent,address(0),block.timestamp));
        disasterCount++;
        
        // Storing the owner of the event
        eventOwner[msg.sender].push(disasterCount);
    }

    function getDisasterCount()  public view returns(uint256){
        return disasterCount;
    }

    function viewEvent(uint index)  public view returns(disaster memory){
        return DisasterEvent[index];
    }

    // Owner can access the contract and get fundes from the contract


    

}


// 1.Create time based event 