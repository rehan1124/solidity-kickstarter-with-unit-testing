import web3 from "./web3";
import cf from "./build/CampaignFactory";

const abi = cf.abi;

const instance = new web3.eth.Contract(
  abi,
  "0x5c3A0aAE14061Bb4F102b23367fB42302447bF1d"
);

export default instance;
