// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract eventInformation{

    
    struct eventVerifiers{
        address verifier;
        bool verificationStatus;    // 0 ->false   1->True
        bool isValue;
    }

    mapping(uint32 => eventVerifiers[] )  verifiers;
    mapping(uint32 => string[]) media;

    struct eventDetail{
        uint32 id;
        string generalInfo;
        uint64 verficationTrue;
        uint64 verficationFalse;
        bool verified;       
        address owner;
    }

    struct urgentRequest{
        string info;
        string location;
        address owner;
        bool status;
    }

    
    eventDetail[] EventDetails;
    uint32 EventCount;
    urgentRequest[] urgentRequests;    
    uint time;

    address public immutable i_owner;   
    
    constructor(){
        i_owner = msg.sender;
        time = block.timestamp;
        EventCount = 1;
    }

    function createEvent(string memory _generalInfo,string memory _media) public payable{
        EventDetails.push(eventDetail(EventCount,_generalInfo,0,0,false,msg.sender));
        media[EventCount].push(_media);
    }

    modifier checkAddressVerification(uint32 _id,address _sender){
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

    function verifiyEvent(uint32 _id,bool _verificationStatus) public payable checkAddressVerification(_id,msg.sender){
        verifiers[_id].push(eventVerifiers(msg.sender,_verificationStatus,true));
    }
    
    

    

}