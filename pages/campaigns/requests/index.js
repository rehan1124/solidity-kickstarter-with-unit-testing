import React from "react";
import { Header, Button, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import campaign from "../../../ethereum/campaign";

const RequestIndex = ({ address }) => {
  // const { Header, Row, HeaderCell, Body } = Table;
  return (
    <Layout>
      <Header size="medium">Requests list</Header>
      <Link route={`/campaigns/${address}/requests/new`}>
        <Button primary>Add request</Button>
      </Link>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Approval count</Table.HeaderCell>
            <Table.HeaderCell>Approve</Table.HeaderCell>
            <Table.HeaderCell>Finalize</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
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
