import React from "react";
import { Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Error = ({ errorMessage }) => (
  <Message error>
    <Message.Header>There were some errors with your submission</Message.Header>
    <Message.List>
      <Message.Item>{errorMessage}</Message.Item>
    </Message.List>
  </Message>
);

export default Error;
