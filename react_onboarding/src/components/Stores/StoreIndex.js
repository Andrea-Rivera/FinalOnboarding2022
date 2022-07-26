import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { StoreCreate } from "./StoreCreate";
import { StoreEdit } from "./StoreEdit";
import { StoreDelete } from "./StoreDelete";

export class StoreIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      DataisLoaded: false,
    };
  }

  refreshList() {
    fetch("http://localhost:60246/api/store/getstores")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ stores: data, DataisLoaded: true });
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
    const { DataisLoaded, stores } = this.state;
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
        <h4> Store Index </h4>

        <Button.Group>
          <StoreCreate show={this.state.showModal} onClose={closeModal} />
        </Button.Group>

        <Table celled className="mt-4">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Store Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {stores.map((storList) => (
              <Table.Row key={storList.Id}>
                <Table.Cell>{storList.Id}</Table.Cell>
                <Table.Cell>{storList.Name}</Table.Cell>
                <Table.Cell>{storList.Address}</Table.Cell>
                <Table.Cell>
                  <StoreEdit
                    show={this.state.editopen}
                    onClose={this.editclose}
                    Id={storList.Id}
                    Name={storList.Name}
                    Address={storList.Address}
                  />
                </Table.Cell>
                <Table.Cell>
                  <StoreDelete
                    show={this.state.deleteopen}
                    onClose={this.deleteclose}
                    Id={storList.Id}
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
