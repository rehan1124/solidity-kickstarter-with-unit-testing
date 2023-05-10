import React, { Component } from "react";
import { Header, Button, Form, Input, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../../../components/Layout";
import { Link } from "../../../routes";

// class RequestIndex extends Component {
//   static async getInitialProps(props) {
//     const { address } = props.query;
//     return { address };
//   }

//   render() {
//     return (
//       <Layout>
//         <Header size="medium">Requests list</Header>
//         <Link route={`/campaigns/${this.props.address}/requests/new`}>
//           <Button primary>Add request</Button>
//         </Link>
//       </Layout>
//     );
//   }
// }

const RequestIndex = ({ address }) => {
  return (
    <Layout>
      <Header size="medium">Requests list</Header>
      <Link route={`/campaigns/${address}/requests/new`}>
        <Button primary>Add request</Button>
      </Link>
    </Layout>
  );
};

RequestIndex.getInitialProps = async (props) => {
  const { address } = props.query;
  return { address };
};

export default RequestIndex;
