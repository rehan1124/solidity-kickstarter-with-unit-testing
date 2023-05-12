import React from "react";
import { Header, Button, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../../../components/Layout";
import RequestListTable from "../../../components/RequestListTable";
import { Link } from "../../../routes";
import campaign from "../../../ethereum/campaign";

const RequestIndex = ({ address, requestsList }) => {
  return (
    <Layout>
      <Header size="medium">Requests list</Header>
      <Link route={`/campaigns/${address}/requests/new`}>
        <Button primary>Add request</Button>
      </Link>
      <RequestListTable requestsList={requestsList} />
    </Layout>
  );
};

RequestIndex.getInitialProps = async (props) => {
  const { address } = props.query;
  const cn = campaign(address);
  const requestsCount = Number(await cn.methods.getRequestsCount().call());
  const requestsList = await Promise.all(
    Array(requestsCount)
      .fill()
      .map((items, index) => {
        return cn.methods.requests(index).call();
      })
  );
  console.log(`Requests under the campaign ${address}`, requestsList);
  return { address, requestsCount, requestsList };
};

export default RequestIndex;
