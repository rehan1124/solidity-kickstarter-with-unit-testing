import web3 from "./web3";
import campaign from "./build/Campaign";

const abi = campaign.abi;

export default (address) => {
  return new web3.eth.Contract(abi, address);
};
