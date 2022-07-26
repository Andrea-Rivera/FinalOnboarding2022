import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { SalesCreate } from "./SalesCreate";
import { SalesEdit } from "./SalesEdit";
import { SalesDelete } from "./SalesDelete";

export class SalesIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sales: [],
      DataisLoaded: false,
      showModal: false,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal = () => this.setState({ showModal: false });

  refreshList() {
    fetch("http://localhost:60246/api/sales/getsales")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ sales: data, DataisLoaded: true });
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
    //Set variables DataisLoaded and array that contains customers array created in react after fetching data.
    const { DataisLoaded, sales } = this.state;
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
        <h4> Sales Index </h4>

        <Button.Group>
          <SalesCreate show={this.state.showModal} onClose={this.closeModal} />
        </Button.Group>

        <Table celled className="mt-4">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
              <Table.HeaderCell>Date Sold</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {sales.map((saleList) => (
              <Table.Row key={saleList.Id}>
                <Table.Cell>{saleList.Id}</Table.Cell>
                <Table.Cell>{saleList.Customer.Name}</Table.Cell>
                <Table.Cell>{saleList.Product.Name}</Table.Cell>
                <Table.Cell>{saleList.Store.Name}</Table.Cell>
                <Table.Cell>
                  {Intl.DateTimeFormat(["ban", "id"]).format(
                    new Date(saleList.DateSold)
                  )}
                </Table.Cell>
                <Table.Cell>
                  <SalesEdit
                    show={this.state.editopen}
                    onClose={this.editclose}
                    Id={saleList.Id}
                    salescustomerid={saleList.Customer.Id}
                    salesproductid={saleList.Product.Id}
                    salesstoreid={saleList.Store.Id}
                    salesdatesold={Intl.DateTimeFormat(["ban", "id"]).format(
                      new Date(saleList.DateSold)
                    )}
                  />
                </Table.Cell>
                <Table.Cell>
                  <SalesDelete
                    show={this.state.deleteopen}
                    onClose={this.deleteclose}
                    Id={saleList.Id}
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
