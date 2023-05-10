import React, { useState, useEffect } from "react";
import { Router } from "../../routes";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Error from "../../components/Error";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const CampaignNew = () => {
  const [minimumInput, setMinimumInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hasError) {
      console.log(errorMessage);
    }
  }, [hasError, errorMessage]);

  const handleButtonClick = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setHasError(false);
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(minimumInput, typeof minimumInput);
      await factory.methods.createCampaign(parseInt(minimumInput, 10)).send({
        from: accounts[0],
      });

      Router.pushRoute("/");
    } catch (err) {
      setErrorMessage(err.message);
      setHasError(true);
    }
  };

  const handleInputOnChange = async (event) => {
    setMinimumInput(event.target.value);
  };

  return (
    <Layout>
      <h1>Create a new Campaign</h1>
      <Form onSubmit={handleOnSubmit} error={hasError}>
        <Form.Field>
          <label>Minimum Contribution:</label>
          <Input
            label="Wei"
            labelPosition="right"
            value={minimumInput}
            onChange={handleInputOnChange}
          />
        </Form.Field>
        <Button
          primary
          type="submit"
          data-testid="form-submit"
          loading={loading}
          onClick={handleButtonClick}
        >
          Create
        </Button>
      </Form>
      {hasError && <Error errorMessage={errorMessage} />}
    </Layout>
  );
};

export default React.memo(CampaignNew);
