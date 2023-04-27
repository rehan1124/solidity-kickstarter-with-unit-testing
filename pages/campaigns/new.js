import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../../components/Layout";

class CampaignNew extends Component {
  render() {
    return (
      <Layout>
        <h3>--- Create a new Campaign ---</h3>
        <form className="ui form">
          <div className="field">
            <label>Minimum contribution:</label>
            <input
              type="text"
              name="minimum-contribution"
              placeholder="Minimum contribution"
            />
          </div>
          <button className="ui button primary" type="submit">
            Create
          </button>
        </form>
      </Layout>
    );
  }
}

export default CampaignNew;
