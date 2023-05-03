import React from "react";
import "semantic-ui-css/semantic.min.css";

export default (props) => {
  return (
    <div className="ui error message">
      <i className="close icon" data-ol-has-click-handler=""></i>
      <div className="header">There were some errors with your submission</div>
      <ul className="list">
        <li>{props.errorMessage}</li>
      </ul>
    </div>
  );
};
