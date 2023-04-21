const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  // List of accounts
  accounts = await web3.eth.getAccounts();
  // console.log(`List of accounts: ${accounts}`);
  // --- Deployment-1: Creating a new deployment of contract ---
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "2000000" });

  await factory.methods
    .createCampaign(100)
    .send({ from: accounts[0], gas: "2000000" });
  // Take out first address
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  console.log(`Campaign deployed at address: ${campaignAddress}`);
  // --- Deployment-2: Using an existing contract deployed at some address ---
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("When KickstarterFactory.sol is compiled,", () => {
  it("Deployes CampaignFactory & Campaign", () => {
    assert.ok(factory._address);
    assert.ok(campaign._address);
  });
});
