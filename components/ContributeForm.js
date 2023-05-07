import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";

const ContributeForm = () => {
  const [firstName, setFirstName] = useState("");

  const handleInputChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted firstName: ", firstName);
  };

  return (
    <Form floated="right" onSubmit={handleSubmit}>
      <Form.Field>
        <label>Amount to contribute:</label>
        <Input
          placeholder="Contribution"
          label="ether"
          labelPosition="right"
          value={firstName}
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
