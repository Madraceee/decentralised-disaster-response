# Decentralised Disaster Response Portal (DDRP)

---

DDRP is a decentralised portal which is used during a disaster.
By decentralisation, it allows the local poeple and the government to work together and act immediately. Information regarding the disaster is made available to all the citizens while maintaining authenticity.
By having a decentralised system using blockchain, the information is available to everyone and this information is immutable. The government can use the information from the smart contract for auditing/ analysis of the disaster.
The citizens and political representatives can use this information to
fix problems in the society and also prevent them from occurring again.


## How it works

A smart contract _DisasterCollection_ is available on the polygon(test) network. The web app gets the information regarding each disaster from this contract.
Only government officials can make a new disaster object.

Each new disaster object deploys another smart contract _EventInformation_.

User can select the required object from the home page and they will be redirected to the respective disaster event webpage.

In each _EventInformation_ contract, users can create an event.
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

## Polygon

We have choosen polygon blockchain over others because of its faster, cheaper execution of smart contracts. Polygon is much faster and cheaper that ethereum when deploying and executing a smart contract. Thus this allows any user to participate in the DDRP system without worrying about GAS price. Fast network means information is available to everyone which is very important during disaster response.
Polygon's interoperability can be used to extend the features of DDRP system. Polygon's new zkEVM can be used to execute transcation and reduce the gas price. Polygon is an interoperability and scaling protocol which has a very good and stable future. 

## Constraints

For the success of this platform, a large number of users should actively particiapte in sending information and verification. By having a small number of users, wrong information can be easily propogated.
Government has to fund the smart contract for the reward system to work. This will encourage other users to participate.
