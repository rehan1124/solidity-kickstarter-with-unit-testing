import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Error from "./Error";
import campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const ContributeForm = ({ campaignAddress }) => {
  const [contribution, setContribution] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setContribution(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Submitted contribution: ", contribution);
    // console.log("hasError: ", hasError);
    setLoading(true);
    try {
      const getCampaign = await campaign(campaignAddress);
      const accounts = await web3.eth.getAccounts();
      await getCampaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, "ether"),
      });
      Router.replaceRoute(`/campaigns/${campaignAddress}`);
      setLoading(false);
      setHasError(false);
      setErrorMessage("");
      setContribution("");
    } catch (err) {
      console.log(err.message);
      setHasError(true);
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Form floated="right" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Amount to contribute:</label>
          <Input
            placeholder="Contribution"
            label="ether"
            labelPosition="right"
            value={contribution}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button type="submit" loading={loading} primary>
          Contribute!
        </Button>
      </Form>
      {hasError && <Error errorMessage={errorMessage} />}
    </>
  );
};

export default ContributeForm;
