require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const providerUrl = process.env.INFURA_URL;
const passwordPhrase = process.env.METAMASK_PHRASE;

const deployContract = async () => {
  const provider = new HDWalletProvider(passwordPhrase, providerUrl);
  const web3 = new Web3(provider);

  try {
    const accounts = await web3.eth.getAccounts();
    const deploymentAccount = accounts[2];
    const gasLimit = "2000000";
    console.log(
      "Attempting to deploy from Metamask account:",
      deploymentAccount
    );

    const deployedContract = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
      .send({ from: deploymentAccount, gas: gasLimit });

    console.log(
      "Contract deployed at address:",
      deployedContract.options.address
    );
    console.log("Contract abi:", JSON.stringify(compiledFactory.abi));

    // Stop the provider's engine after the deployment
    if (provider.engine) {
      provider.engine.stop();
    }
  } catch (error) {
    console.log("An error occured!", error);
  } finally {
    if (provider.engine) {
      provider.engine.stop();
    }
  }
};

deployContract();

// Contract deployed at address: 0x5c3A0aAE14061Bb4F102b23367fB42302447bF1d
