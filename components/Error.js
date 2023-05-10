import React from "react";
import { Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Error = ({ errorMessage }) => {
  return (
    <Message
      error
      header="There were some errors with your submission"
      list={[errorMessage]}
    />
  );
};

export default Error;
