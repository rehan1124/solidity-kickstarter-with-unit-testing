import React from "react";

export default () => {
  return (
    <div
      className="ui menu"
      data-testid="nav-bar"
      style={{ marginTop: "0.8rem" }}
    >
      <a className="item" data-ol-has-click-handler="">
        CrowdCoin
      </a>
      <div className="right menu">
        <a className="item" data-ol-has-click-handler="">
          Create campaign
        </a>
        <a className="item" data-ol-has-click-handler="">
          +
        </a>
      </div>
    </div>
  );
};
