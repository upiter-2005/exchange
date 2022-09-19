## About 

It,a a prototype Binance project. You wont get any risk by trading on this platform.

You can try to start demo trading following this link - https://creation.support

## Features

User can to authenticate (login or register) your account, functionality was provided by Auth0 service. 
After registration you receive a demo balance and therefore you can to start trading on platform
All orders will be saved in history, also you can remove orders, all these data will be written to database

Real changing data such as current coin price we retrieve from Binance socket, also we retrieve ask and bid coin information from socket

Persent or 24h price changes we retrieve from Binance API with setIntrval and it dependes on server response speed.


## Tools:

React.js, Redux toolkit, Binance API, Binance socket

## Notice:
 
Some modules as order complete module, switch filter pairs to other coins (trade to ETH, BNB, USDC etc.), futures trading will be develop in next release