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
  // const [loadingApprove, setLoadingApprove] = useState(false);
  // const [loadingFinalize, setLoadingFinalize] = useState(false);

  // Approve button
  const handleApproveClick = async (event) => {
    setHasError(false);
    try {
      // setLoadingApprove(true);
      const cn = await campaign(address);
      const accounts = await web3.eth.getAccounts();
      const requestIndex = Number(
        event.target.getAttribute("data-button-approve-id")
      );
      await cn.methods.approveRequest(requestIndex).send({ from: accounts[0] });
      window.location.reload(false);
    } catch (err) {
      setHasError(true);
      setErrorMessage(err.message);
      // setLoadingApprove(false);
    }
  };

  // Finalize button
  const handleFinalizeClick = async (event) => {
    setHasError(false);
    try {
      // setLoadingFinalize(true);
      const cn = await campaign(address);
      const accounts = await web3.eth.getAccounts();
      const requestIndex = Number(
        event.target.getAttribute("data-button-finalize-id")
      );
      await cn.methods
        .finalizeRequest(requestIndex)
        .send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
      setHasError(true);
      setErrorMessage(err.message);
      // setLoadingFinalize(false);
    }
  };

  // For each request, generate table row.
  const addRow = () => {
    return requestsList.map((request, index) => {
      return (
        <Table.Row
          key={index}
          disabled={request.complete}
          positive={
            request.approvalCount >= totalApprovers / 2 && !request.complete
          }
        >
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
              data-button-approve-id={index}
              // loading={loadingApprove}
              disabled={request.complete ? true : false}
              onClick={handleApproveClick}
            >
              Approve
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button
              color={request.complete ? "red" : "teal"}
              disabled={request.complete ? true : false}
              // loading={loadingFinalize}
              onClick={handleFinalizeClick}
            >
              Finalize
            </Button>
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
