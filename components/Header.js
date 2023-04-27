import React from "react";

export default () => {
  return (
    <div class="ui menu" data-testid="nav-bar" style={{ marginTop: "0.8rem" }}>
      <a class="item" data-ol-has-click-handler="">
        CrowdCoin
      </a>
      <div class="right menu">
        <a class="item" data-ol-has-click-handler="">
          Create campaign
        </a>
        <a class="item" data-ol-has-click-handler="">
          +
        </a>
      </div>
    </div>
  );
};
