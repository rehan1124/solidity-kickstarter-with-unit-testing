import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../../components/Layout";

class CampaignNew extends Component {
  constructor(props) {
    super(props);
    this.state = { minimumInput: 0 };
  }
  // handleInputChange = (event) => {
  //   this.setState({ minimumInput: event.target.value });
  //   console.log(this.state.minimumInput);
  // };
  render() {
    return (
      <Layout>
        <h3>--- Create a new Campaign ---</h3>
        <form className="ui form" data-testid="campaign-form">
          <div className="field">
            <label>Minimum contribution:</label>
            <div className="ui right labeled input">
              <input
                type="text"
                placeholder="Enter minimum contribution in wei"
                data-testid="wei-input"
                onChange={(event) => {
                  this.setState({ minimumInput: event.target.value });
                }}
              />
              <div className="ui basic label">Wei</div>
            </div>
          </div>
          <button
            className="ui button primary"
            type="submit"
            data-testid="form-submit"
          >
            Create
          </button>
        </form>
      </Layout>
    );
  }
}

export default CampaignNew;
