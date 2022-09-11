# Decentralised Disaster Response Portal (DDRP)
---
DDRP is a decentralised portal which is used during a disaster.
By decentralisation, it allows the local poeple, government to work together and act immediately. Information regarding the disaster is made available to all the citizens while maintaining authenticity.
By having a decentralised system using blockchain, the information is available to everyone and this information is immutable. The Government can use the information from the smart contract for auditing/ analysis of the disaster.
Citizens/Governments can also use this information to fix the problems in the society and make sure the problem does not occur.


## How it works

A smart contract *DisasterCollection* is available on the polygon(test) network. The web app gets the information regarding each disaster from this contract.
Only government officials can make a new disaster object.

Each new disaster object deploys another smart contract *EventInformation*.

User can select the required object from the home page and they will be redirected to the respective disaster event webpage.

In each *EventInformation* contract, users can create an event.
Each event can be verified by other users. This makes sure false information is not propogated in the system. Media(Image/Video) related to the events can also be uploaded.

### Verification
For every user who uploads an event has to depost certain money(10Rs) and every verifier has to deposit for each verification(2Rs). Once the event is over, the contract owner can give back rewards to the participants.
The user who event was verified to be **TRUE** gets double(or any amount) the deposit.
Verifiers gets reward only when their verification status(**TRUE/FALSE**) for a particular event is in the majority for the particular event.

**NOTE: The deposit money is very less for testing purpose**

### REQUEST
Those who are in immediate need of help can send a **REQUEST** message. This message can be viewed by anyone, and those willing can offer their service to the distressed user.

Example
> For an particular event "Flood in XYZ area" , the verifiers can vote TRUE/FALSE
> If the majority vote for this event is TRUE, then those verifiers who voted TRUE are rewarded
> while those with vote as FALSE do not get reward.
> 
> If the event has a majority of FALSE, those verifiers who voted FALSE are rewarded.
> Since the event is FALSE(Fake), the user who created this event is not rewarded for his event creation

### Reward System

By having a reward system, it encourages citizens to participate and help the community while they are in distress.
By depositing certain amount of money, we can make sure that **FALSE** information is not propogated in the system. 
This encourages everyone to give truthful information.




## Tech


- Solidity - Used to write smart contracts.
- ReactJS - HTML enhacned for web apps!
- ethersJS - Library used to interact with ethereum based block chains.

## Constraints
For the success of this platform, a large number of users should actively particiapte in sending information and verification. By having a small number of users, wrong information can be easily propogated.
Government has to fund the smart contract for the reward system to work. This will encourage other users to participate.
