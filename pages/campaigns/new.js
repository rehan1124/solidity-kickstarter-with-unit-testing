import React, { Component } from "react";
import Script from "next/script";
import "semantic-ui-css/semantic.min.css";
import Layout from "../../components/Layout";
import Error from "../../components/Error";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimumInput: "",
      errorMessage: "",
      hasError: false,
      loading: false,
    };
  }

  handleButtonClick = async (event) => {
    event.target.classList.toggle("loading");
    setTimeout(function () {
      event.target.classList.toggle("loading");
    }, 2000);
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumInput)
        .send({ from: accounts[0] });
    } catch (err) {
      this.setState({ errorMessage: err.message, hasError: true });
    }
  };
  render() {
    return (
      <Layout>
        <h2>--- Create a new Campaign ---</h2>
        <form
          className="ui form"
          data-testid="campaign-form"
          onSubmit={this.handleOnSubmit}
        >
          <div className="field">
            <label>Minimum contribution:</label>
            <div className="ui right labeled input">
              <input
                type="text"
                placeholder="Enter minimum contribution in wei"
                data-testid="wei-input"
                value={this.state.minimumInput}
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
            onClick={this.handleButtonClick}
          >
            Create
          </button>
        </form>
        <div data-testid="error-message" style={{ marginTop: "1rem" }}>
          {this.state.hasError && (
            <Error errorMessage={this.state.errorMessage} />
          )}
        </div>
      </Layout>
    );
  }
}

export default CampaignNew;
