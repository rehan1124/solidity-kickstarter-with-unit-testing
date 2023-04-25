import React, { Component } from "react";
import web3 from "../ethereum/web3";
import instance from "../ethereum/factory";
import factory from "../ethereum/factory";

class CampaignIndex extends Component {
  async componentDidMount() {
    const campaignList = await factory.methods.getDeployedCampaigns().call();
    console.log(campaignList);
  }

  render() {
    return <div>List of campaigns !!!</div>;
  }
}

export default CampaignIndex;
