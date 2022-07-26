import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <div className="ui inverted segment">
          <div className="ui inverted secondary menu">
            <h4 className=" item">React</h4>

            <a href="/customers" className=" item">
              Customers
            </a>
            <a href="/products" className="item">
              Products
            </a>
            <a href="/stores" className="item">
              Stores
            </a>
            <a href="/sales" className="item">
              Sales
            </a>
          </div>
        </div>
      </div>
    );
  }
}
