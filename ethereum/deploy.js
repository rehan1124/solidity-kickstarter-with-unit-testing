const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const providerUrl = "<Infura URL>";
const passwordPhrase = "<Password phrase from metamask account>";

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
    if (provider.engine.running) {
      provider.engine.stop();
    }
  } catch (error) {
    console.log("An error occured!", error);
  }
};

deployContract();

// Contract has been deployed. Check link: https://sepolia.etherscan.io/address/0xb26d45410391b8b165ffa12910ced1a9b997ace2
// Contract deployed at address: 0xB26D45410391b8b165Ffa12910CED1a9B997ACE2
