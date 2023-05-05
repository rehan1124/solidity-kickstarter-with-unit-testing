import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
// import web3 from "../ethereum/web3";
// import instance from "../ethereum/factory";
import factory from "../ethereum/factory";
import { Link } from "../routes";

class CampaignIndex extends Component {
  // To get initial data using nextjs server from Ethereum
  static async getInitialProps() {
    const campaignList = await factory.methods.getDeployedCampaigns().call();
    return { campaignList };
  }

  renderCampaigns() {
    // Read list of campaigns and convert them into a group of cards using map()
    // `fluid: true` property helps in covering full width of browser for a card
    const items = this.props.campaignList.map((address, index) => {
      return {
        header: address,
        description: <Link route={`/campaigns/${address}`}>View campaign</Link>,
        fluid: true,
        "data-testid": `campaign${index + 1}`,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h2>Open campaigns 💸</h2>
        <Link route="/campaigns/new">
          <Button
            data-testid="create-campaign"
            floated="right"
            content="Create Campaign"
            icon="add circle"
            className="ui primary button"
            // labelPosition="left"
          />
        </Link>
        <div data-testid="campaign-list">{this.renderCampaigns()}</div>
      </Layout>
    );
  }
}

export default CampaignIndex;
