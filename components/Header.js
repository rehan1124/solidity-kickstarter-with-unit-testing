import React from "react";
import { Link } from "../routes";

export default () => {
  return (
    <div
      className="ui menu"
      data-testid="nav-bar"
      style={{ marginTop: "0.8rem" }}
    >
      <Link route="/" className="item" data-ol-has-click-handler="">
        CrowdCoin
      </Link>
      <div className="right menu">
        <Link route="/" className="item" data-ol-has-click-handler="">
          Campaigns
        </Link>
        <Link
          route="/campaigns/new"
          className="item"
          data-ol-has-click-handler=""
        >
          +
        </Link>
      </div>
    </div>
  );
};
