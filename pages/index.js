import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
// import web3 from "../ethereum/web3";
// import instance from "../ethereum/factory";
import factory from "../ethereum/factory";

class CampaignIndex extends Component {
  // To get initial data using nextjs server from Ethereum
  static async getInitialProps() {
    const campaignList = await factory.methods.getDeployedCampaigns().call();
    return { campaignList };
  }

  renderCampaigns() {
    // Read list of campaigns and convert them into a group of cards using map()
    // `fluid: true` property helps in covering full width of browser for a card
    const items = this.props.campaignList.map((address) => {
      return {
        header: address,
        description: <a>View campaign</a>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h2>Open campaigns</h2>
        <Button
          floated="right"
          data-testid="create-campaign"
          content="Create Campaign"
          icon="add circle"
          // labelPosition="left"
          primary
        />
        <div data-testid="campaign-list">{this.renderCampaigns()}</div>
      </Layout>
    );
  }
}

export default CampaignIndex;
