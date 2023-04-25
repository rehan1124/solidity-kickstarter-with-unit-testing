import web3 from "./web3";
import cf from "./build/CampaignFactory";

const abi = cf.abi;

const instance = new web3.eth.Contract(
  abi,
  "0xB26D45410391b8b165Ffa12910CED1a9B997ACE2"
);

export default instance;
