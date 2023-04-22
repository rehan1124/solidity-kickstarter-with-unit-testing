const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");
const gasLimit = "2000000";

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
    .send({ from: accounts[0], gas: gasLimit });

  await factory.methods
    .createCampaign(100)
    .send({ from: accounts[0], gas: gasLimit });
  // Take out first address
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  console.log(`Campaign deployed at address: ${campaignAddress}`);
  // --- Deployment-2: Using an existing contract deployed at some address ---
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("[Scenario] When contract is deployed,", async () => {
  it("[Test] CampaignFactory & Campaign is created.", () => {
    assert.ok(factory._address);
    assert.ok(campaign._address);
  });

  it("[Test] Marks caller as campaign manager.", async () => {
    const manager = await campaign.methods.manager().call();
    assert(manager === accounts[0]);
  });

  it("[Test] Allows people to contribute money and become an approver.", async () => {
    const newContributor = accounts[2];

    // Send 200 wei as contribution (Minimum is 100 wei)
    await campaign.methods
      .contribute()
      .send({ from: newContributor, value: 200 });

    // Check if person has become approver (Checking mapping)
    const isContributor = await campaign.methods
      .approvers(newContributor)
      .call();

    assert(isContributor);
  });

  it("[Test] Minimum contribution amount is mandatory.", async () => {
    const lessThanMinContributor = accounts[3];
    try {
      await campaign.methods
        .contribute()
        .send({ from: lessThanMinContributor, value: "5" });
    } catch (err) {
      assert(err);
    }
  });

  it("[Test] Manager can create a payment request.", async () => {
    const managerAddress = accounts[0];
    const sendMoneyToAccount = accounts[4];
    const requestDescription = "Buy chips";

    await campaign.methods
      .createRequest(requestDescription, 100, sendMoneyToAccount)
      .send({ from: managerAddress, gas: gasLimit });

    const requestCreated = await campaign.methods.requests(0).call();
    assert(requestDescription, requestCreated.description);
  });

  it("[Test] Process request for money transfer.", async () => {
    const manager = { from: accounts[0], gas: gasLimit };

    // Contributing 10 ether towards Campaign
    await campaign.methods
      .contribute()
      .send({ from: accounts[0], value: web3.utils.toWei("10", "ether") });

    // Get initial balance for recipient
    const initialBalance = await web3.eth.getBalance(accounts[1]);

    // Send money to recipient
    await campaign.methods
      .createRequest(
        "Transport arrangements",
        web3.utils.toWei("5", "ether"),
        accounts[1]
      )
      .send({ ...manager });

    // Approve the request created
    await campaign.methods.approveRequest(0).send({ ...manager });

    // Finalize the request
    await campaign.methods.finalizeRequest(0).send({ ...manager });

    // Final balance for recipient
    const finalBalance = await web3.eth.getBalance(accounts[1]);

    assert(
      finalBalance - initialBalance === Number(web3.utils.toWei("5", "ether"))
    );
  });
});
