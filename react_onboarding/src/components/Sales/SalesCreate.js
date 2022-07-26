import React, { Component } from "react";
import { Modal, Button, Form } from "semantic-ui-react";

export class SalesCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sales: [],
      products: [],
      customers: [],
      stores: [],
      showModal: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._selectproduct = this._selectproduct.bind(this);
    this._selectcustomer = this._selectcustomer.bind(this);
    this._selectstore = this._selectstore.bind(this);
  }

  closeModal = () => this.setState({ showModal: false });
  componentDidMount() {
    fetch("http://localhost:60246/api/customer/getcustomers")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ customers: data });
      });

    fetch("http://localhost:60246/api/product/getproducts")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data });
      });

    fetch("http://localhost:60246/api/store/getstores")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ stores: data });
      });
  }

  _selectproduct = (event, val) => {
    event.preventDefault();
    this.setState({ salesproductid: val.value }, () => {
      console.log("updated ", this.state);
    });
  };
  _selectcustomer = (event, val) => {
    event.preventDefault();
    this.setState({ salescustomerid: val.value }, () => {
      console.log("updated ", this.state);
    });
  };

  _selectstore = (event, val) => {
    event.preventDefault();
    this.setState({ salesstoreid: val.value }, () => {
      console.log("updated ", this.state);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.salesproductid);
    console.log(this.state.salescustomerid);
    console.log(this.state.salesstoreid);
    console.log(event.target.salesdatesold.value);

    fetch("http://localhost:60246/api/sales/createsales", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SalesId: null,
        ProductId: this.state.salesproductid,
        CustomerId: this.state.salescustomerid,
        StoreId: this.state.salesstoreid,
        DateSold: event.target.salesdatesold.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert("Successful");
        },
        (error) => {
          alert("Failed");
        }
      );
  };

  render() {
    const { showModal } = this.state;

    return (
      <div>
        <Modal
          open={showModal}
          onClose={this.closeModal}
          trigger={
            <Button onClick={() => this.setState({ showModal: true })} primary>
              New Sale
            </Button>
          }
          style={{
            height: "26rem",
            position: "relative",
          }}
        >
          <Modal.Header>Create Sale</Modal.Header>
          <Modal.Content>
            <div className="container">
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Form.Select
                    fluid
                    label="Customer"
                    name="salescustomerid"
                    options={this.state.customers.map((customerList) => ({
                      name: customerList.Id,
                      key: customerList.Id,
                      value: customerList.Id,
                      text: customerList.Name,
                    }))}
                    placeholder="Customer"
                    onChange={this._selectcustomer}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Select
                    fluid
                    label="Product"
                    name="salesproductid"
                    options={this.state.products.map((productList) => ({
                      key: productList.Id,
                      value: productList.Id,
                      text: productList.Name,
                    }))}
                    placeholder="Product"
                    onChange={this._selectproduct}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Select
                    fluid
                    label="Store"
                    name="salesstoreid"
                    options={this.state.stores.map((storeList) => ({
                      name: storeList.Id,
                      key: storeList.Id,
                      value: storeList.Id,
                      text: storeList.Name,
                    }))}
                    placeholder="Store"
                    onChange={this._selectstore}
                  />
                </Form.Field>

                <Form.Field id="Date Sold">
                  <label>Date Sold</label>
                  <input
                    name="salesdatesold"
                    type="date"
                    placeholder="Enter Date Sold"
                    required
                  />
                </Form.Field>

                <Modal.Actions>
                  <Button
                    content="Create"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => this.handleSubmit}
                    positive
                  />

                  <Button
                    onClick={() => this.setState({ showModal: false })}
                    color="black"
                  >
                    Close
                  </Button>
                </Modal.Actions>
              </Form>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
