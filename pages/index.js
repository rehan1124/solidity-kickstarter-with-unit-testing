import React, { Component } from "react";
import web3 from "../ethereum/web3";
import instance from "../ethereum/factory";
import factory from "../ethereum/factory";

class CampaignIndex extends Component {
  // To get initial data using nextjs server from Ethereum
  static async getInitialProps() {
    const campaignList = await factory.methods.getDeployedCampaigns().call();
    return { campaignList };
  }

  render() {
    return <div>{this.props.campaignList}</div>;
  }
}

export default CampaignIndex;
