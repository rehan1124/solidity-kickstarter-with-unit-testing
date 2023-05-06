import web3 from "./web3";
import cf from "./build/CampaignFactory";

const abi = cf.abi;

const instance = new web3.eth.Contract(
  abi,
  "0x08036333b976C4b0AE84Ee574570eeC67048A44d"
);

export default instance;
