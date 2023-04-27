import React, { Component } from "react";
import Header from "./Header";

export default (props) => {
  return (
    <div data-testid="layout" className="ui container">
      <Header />
      {props.children}
    </div>
  );
};
