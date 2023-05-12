import React from "react";
import { Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import campaign from "../ethereum/campaign";

const RequestListTable = ({ requestsList, totalApprovers }) => {
  const addRow = () => {
    return requestsList.map((request, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{index}</Table.Cell>
          <Table.Cell>{request.description}</Table.Cell>
          <Table.Cell>
            {web3.utils.fromWei(request.value, "ether")} ETH
          </Table.Cell>
          <Table.Cell>{request.recipient}</Table.Cell>
          <Table.Cell>
            {request.approvalCount} / {totalApprovers}
          </Table.Cell>
          <Table.Cell>Approve</Table.Cell>
          <Table.Cell>Finalize</Table.Cell>
        </Table.Row>
      );
    });
  };
  return (
    <Table>
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
      <Table.Body>{addRow()}</Table.Body>
    </Table>
  );
};

export default RequestListTable;
