import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Error from "./Error";
import campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const ContributeForm = ({ campaignAddress }) => {
  const [contribution, setContribution] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setContribution(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted contribution: ", contribution);
    try {
      const getCampaign = await campaign(campaignAddress);
      const accounts = await web3.eth.getAccounts();
      await getCampaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, "ether"),
      });
    } catch (err) {
      console.log(err.message);
      setHasError(true);
      setErrorMessage(err.message);
    }
  };

  return (
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
      <Button type="submit" primary>
        Contribute!
      </Button>
      {hasError && <Error errorMessage={errorMessage} />}
    </Form>
  );
};

export default ContributeForm;
