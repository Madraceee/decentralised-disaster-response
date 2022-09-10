// SPDX-License-Identifier: MIT
//Library 
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConvertor{
    function getPrice() public view returns(uint256){

        AggregatorV3Interface priceFeed=AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada); // Polygon Mumbai Testnet MATIC TO USD
        (, int256 price, , ,)=priceFeed.latestRoundData(); //Only price      
        return uint256(price*1e10);
        
    }

    function getConversionRate(uint256 maticAmount) public view returns(uint256){
        uint256 maticPrice=getPrice();
        uint256 maticAmountInUSD=(maticPrice*maticAmount);
        uint256 maticAmountInINR= (maticAmountInUSD * 79) / 1e18;
        return maticAmountInINR;
    }

}