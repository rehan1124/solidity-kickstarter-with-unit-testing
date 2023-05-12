import React from "react";
import { Table } from "semantic-ui-react";

const RequestListTable = ({ requestsList }) => {
  const addRow = () => {
    return requestsList.map((request, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{index}</Table.Cell>
          <Table.Cell>{request.description}</Table.Cell>
          <Table.Cell>{request.value}</Table.Cell>
          <Table.Cell>{request.recipient}</Table.Cell>
          <Table.Cell>{request.approvalCount}</Table.Cell>
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
