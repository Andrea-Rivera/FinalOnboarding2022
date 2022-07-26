import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { CustomerCreate } from "./CustomerCreate";
import { CustomerEdit } from "./CustomerEdit";
import { CustomerDelete } from "./CustomerDelete";

export class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      DataisLoaded: false,
    };
  }

  refreshList() {
    fetch("http://localhost:60246/api/customer/getcustomers")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ customers: data, DataisLoaded: true });
      });
  }
  //componentdidmount is used to execute the code
  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  render() {
    let closeModal = () => this.setState({ showModal: false });
    //Set variables DataisLoaded and array that contains customers array created in react after fetching data.
    const { DataisLoaded, customers } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1> Server not loading.... </h1>{" "}
        </div>
      );

    return (
      <div
        style={{
          margin: "20px 20px 20px 20px",
        }}
      >
        <h4> Customer Index </h4>

        <Button.Group>
          <CustomerCreate show={this.state.showModal} onClose={closeModal} />
        </Button.Group>

        <Table celled className="mt-4">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {customers.map((custList) => (
              <Table.Row key={custList.Id}>
                <Table.Cell>{custList.Id}</Table.Cell>
                <Table.Cell>{custList.Name}</Table.Cell>
                <Table.Cell>{custList.Address}</Table.Cell>
                <Table.Cell>
                  <CustomerEdit
                    show={this.state.editopen}
                    onClose={this.editclose}
                    Id={custList.Id}
                    Name={custList.Name}
                    Address={custList.Address}
                  />
                </Table.Cell>
                <Table.Cell>
                  <CustomerDelete
                    show={this.state.deleteopen}
                    onClose={this.deleteclose}
                    Id={custList.Id}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
