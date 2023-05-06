# solidity-kickstarter-with-unit-testing

A complete application written in NextJS and Solidity for smart-contract

- Clone the project and install dependencies using `npm install` command

- Once dependencies are installed, execute command `npm run dev`. Wait for process to run.

```npm
nextjs-kickstarter@1.0.0 dev
node server.js
event - compiled client and server successfully in 810 ms (156 modules)
Ready to host app on localhost:3000
```

- To access application, open url `localhost:3000` in your browser

#### Below are some additional steps to be executed when changes are made inside Smart Contracts:

- For compiling the solidity files, go to `ethereum` folder and run command `node compile.js`. This will create build files (.json) in `ethereum/build` directory.

- To deploy Smart Contract, run command `node deploy.js`. Only `CampaignFactory` will be deployed as that is what we need to get started. Do check cli message for address at which smart contract is deployed.

- Address for compiled contract is added inside `factory.js`.
