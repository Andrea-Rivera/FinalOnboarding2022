import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { ProductCreate } from "./ProductCreate";
import { ProductEdit } from "./ProductEdit";
import { ProductDelete } from "./ProductDelete";

export class ProductIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      DataisLoaded: false,
    };
  }

  refreshList() {
    fetch("http://localhost:60246/api/product/getproducts")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data, DataisLoaded: true });
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
    const { DataisLoaded, products } = this.state;
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
        <h4> Products Index </h4>

        <Button.Group>
          <ProductCreate show={this.state.showModal} onClose={closeModal} />
        </Button.Group>

        <Table celled className="mt-4">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {products.map((prodList) => (
              <Table.Row key={prodList.Id}>
                <Table.Cell>{prodList.Id}</Table.Cell>
                <Table.Cell>{prodList.Name}</Table.Cell>
                <Table.Cell>{prodList.Price}</Table.Cell>
                <Table.Cell>
                  <ProductEdit
                    show={this.state.editopen}
                    onClose={this.editclose}
                    Id={prodList.Id}
                    Name={prodList.Name}
                    Price={prodList.Price}
                  />
                </Table.Cell>
                <Table.Cell>
                  <ProductDelete
                    show={this.state.deleteopen}
                    onClose={this.deleteclose}
                    Id={prodList.Id}
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
