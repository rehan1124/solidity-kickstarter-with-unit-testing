import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";

const ContributeForm = () => {
  const [contribution, setContribution] = useState("");

  const handleInputChange = (event) => {
    setContribution(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted contribution: ", contribution);
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
    </Form>
  );
};

export default ContributeForm;
