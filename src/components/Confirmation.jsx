import React, { Component } from "react";
import { Toast } from "react-bootstrap";

export class Confirmation extends Component {
  render() {
    return (
      <Toast onClose={() => this.props.toggle(false)}>
        <Toast.Header>
          <strong className="mr-auto">{this.props.header}</strong>
        </Toast.Header>
        <Toast.Body>{this.props.body}</Toast.Body>
      </Toast>
    );
  }
}
