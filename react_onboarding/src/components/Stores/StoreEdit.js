import React, { Component } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";

export class StoreEdit extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(event) {
    event.preventDefault();
    //console.log(typeof event.target.Id.value);
    fetch("http://localhost:60246/api/store/updateStores", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: event.target.Id.value,
        Name: event.target.Name.value,
        Address: event.target.Address.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(
        (result) => {
          alert("Successful");
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  state = { showModal: false };

  render() {
    const { showModal } = this.state;

    return (
      <div>
        <Modal
          open={showModal}
          onClose={this.closeModal}
          trigger={
            <Button
              onClick={() => this.setState({ showModal: true })}
              color="olive"
            >
              <Icon name="edit" />
              Edit
            </Button>
          }
          style={{
            height: "26rem",
            position: "relative",
          }}
        >
          <Modal.Header>Update Store</Modal.Header>
          <Modal.Content>
            <div className="container">
              <Form onSubmit={this.handleEdit}>
                <Form.Field>
                  <label>Id</label>
                  <input name="Id" defaultValue={this.props.Id} disabled />
                </Form.Field>
                <Form.Field>
                  <label>Name</label>
                  <input name="Name" defaultValue={this.props.Name} />
                </Form.Field>
                <Form.Field>
                  <label>Address</label>
                  <input name="Address" defaultValue={this.props.Address} />
                </Form.Field>

                <Modal.Actions>
                  <Button
                    content="Update"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => this.handleEdit}
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
