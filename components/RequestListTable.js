// Standard library import
import React, { useState } from "react";

// Any 3rd party imports
import { Table, Button } from "semantic-ui-react";

// Local components
import Error from "./Error";

// Ethereum imports
import web3 from "../ethereum/web3";
import campaign from "../ethereum/campaign";

const RequestListTable = ({ address, requestsList, totalApprovers }) => {
  // Setting state
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleApproveClick = async (event) => {
    setHasError(false);
    try {
      const cn = await campaign(address);
      const accounts = await web3.eth.getAccounts();
      const requestIndex = Number(event.target.getAttribute("data-button-id"));
      await cn.methods.approveRequest(requestIndex).send({ from: accounts[0] });
      window.location.reload(false);
    } catch (err) {
      setHasError(true);
      setErrorMessage(err.message);
    }
  };
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
          <Table.Cell>
            <Button
              color="green"
              onClick={handleApproveClick}
              data-button-id={index}
            >
              Approve
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button>Finalize</Button>
          </Table.Cell>
        </Table.Row>
      );
    });
  };
  return (
    <>
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
      {hasError && <Error errorMessage={errorMessage} />}
    </>
  );
};

export default RequestListTable;
