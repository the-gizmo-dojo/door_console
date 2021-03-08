import React, { Component } from "react";

import { Card, Button, Row, Col, Form, InputGroup } from "react-bootstrap";

export class AddMember extends Component {
  constructor(props) {
    super(props);

    this.firstRef = React.createRef();
    this.lastRef = React.createRef();
    this.fobRef = React.createRef();

    this.state = {
      edit: {
        active: "active",
      },
      fields: {
        fist: "",
      },
    };
  }

  onFirstChange = (event) => {
    const edit = { ...this.state.edit };
    edit.first = event.target.value;
    this.setState({ edit });
  };

  onLastChange = (event) => {
    const edit = { ...this.state.edit };
    edit.last = event.target.value;
    this.setState({ edit });
  };

  onFobChange = (event) => {
    const edit = { ...this.state.edit };
    edit.fob = event.target.value;
    this.setState({ edit });
  };

  save = (_) => {
    const edit = { ...this.state.edit };
    let url = `https://door-293802.wm.r.appspot.com/members/`;
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    })
      .then((r) => r.json())
      .then((d) => {
        this.props.onNewMember(
          edit,
          `done adding new member: ${d.data.first} ${d.data.last}`,
          "✅"
        );
      });
    this.firstRef.current.value = "";
    this.lastRef.current.value = "";
    this.fobRef.current.value = "";

    this.props.onNewMember(
      edit,
      `adding new member: ${edit.first} ${edit.last}`,
      "wait for confirmation"
    );
  };

  cardBody = () => {
    return (
      <Card.Body className="d-flex flex-column">
        <div className="d-flex mb-2 justify-content-between">
          <Card.Title className="mb-0 font-weight-bold">
            Insert new member.
          </Card.Title>
        </div>
        <Card.Text className="text-secondary">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>First and last name</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              ref={this.firstRef}
              type="text"
              placeholder="first"
              onChange={this.onFirstChange}
            />
            <Form.Control
              ref={this.lastRef}
              type="text"
              placeholder="last"
              onChange={this.onLastChange}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Key#</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              ref={this.fobRef}
              type="text"
              placeholder="fob number"
              onChange={this.onFobChange}
            />
          </InputGroup>
        </Card.Text>
        <Row>
          <Col xs={3}>
            <Button
              onClick={this.save}
              className="mt-auto font-weight-bold"
              variant="outline-dark"
            >
              save
            </Button>
          </Col>
        </Row>
      </Card.Body>
    );
  };

  render() {
    return (
      <Card className="h-100 shadow-sm bg-white rounded">
        {this.cardBody()}
      </Card>
    );
  }
}
