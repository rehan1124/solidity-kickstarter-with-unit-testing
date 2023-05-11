import React, { useState } from "react";

import "semantic-ui-css/semantic.min.css";
import { Header, Form, Button } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import campaign from "../../../ethereum/campaign";
import Error from "../../../components/Error";
import web3 from "../../../ethereum/web3";

import { Link, Router } from "../../../routes";

const RequestNew = ({ address }) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDescriptionChange = async (event) => {
    setDescription(event.target.value);
  };

  const handleValueChange = async (event) => {
    setValue(event.target.value);
  };

  const handleRecipientChange = async (event) => {
    setRecipient(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setHasError(false);
    const cn = campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(`Accounts attached to the Metamask user: ${accounts}`);
      await cn.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });

      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      console.log(err);
      setHasError(true);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
      setValue("");
      setDescription("");
      setRecipient("");
    }
  };

  return (
    <Layout>
      <Link route={`/campaigns/${address}/requests`}>
        <u>Back</u>
      </Link>
      <Header size="medium">Create a new request</Header>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <label>Description</label>
          <input
            placeholder="Request description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Value (in ether)</label>
          <input
            placeholder="Amount to be deposited"
            value={value}
            onChange={handleValueChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient (Address)</label>
          <input
            placeholder="Recipient's address"
            value={recipient}
            onChange={handleRecipientChange}
          />
        </Form.Field>
        <Button type="submit" loading={loading} primary>
          Create!
        </Button>
      </Form>
      {hasError && <Error errorMessage={errorMessage} />}
    </Layout>
  );
};

RequestNew.getInitialProps = async (props) => {
  const { address } = props.query;
  return { address };
};
export default RequestNew;
