import React, { useState } from "react";

import "semantic-ui-css/semantic.min.css";
import { Header, Form, Button } from "semantic-ui-react";

import Layout from "../../../components/Layout";

import campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

import { Link, Router } from "../../../routes";

const RequestNew = ({ address }) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleDescriptionChange = async (event) => {
    setDescription(event.target.value);
  };

  const handleValueChange = async (event) => {
    setValue(event.target.value);
  };

  const handleRecipientChange = async (event) => {
    setRecipient(event.target.value);
  };

  return (
    <Layout>
      <Header size="medium">Create a new request</Header>
      <Form>
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
        <Button type="submit" primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

RequestNew.getInitialProps = async (props) => {
  const { address } = props.query;
  return { address };
};
export default RequestNew;
