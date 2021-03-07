import {
  Card,
  Badge,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";
import React, { Component } from "react";

export class Member extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: props.first,
      last: props.last,
      fob: props.fob,
      active: props.active,
      editing: false,
      edit: {},
    };
  }

  componentWillMount() {
    const data = this.props.data;
    this.setState({ data });
  }

  badgeVariant = (status) => {
    if (status === "active") {
      return "success";
    }
    return "warning";
  };

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
    const oldFob = this.state.data.fob;
    let url = `https://door-293802.wm.r.appspot.com/members/${oldFob}`;
    // url = `http://localhost:8080/members/${oldFob}`
    fetch(url, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    })
      .then((r) => r.json())
      .then((d) => {
        this.props.onUpdateMember(
          `done updating new member: ${d.first} ${d.last}`,
          "✅"
        );
      });
    this.setState({
      editing: !this.state.editing,
      data: edit,
    });
    this.props.onUpdateMember(
      `Updating new member: ${edit.first} ${edit.last}`,
      "wait for confirmation"
    );
  };

  cardBody = () => {
    if (!this.state.editing) {
      return (
        <Card.Body className="d-flex flex-column">
          <div className="d-flex mb-2 justify-content-between">
            <Card.Title className="mb-0 font-weight-bold">
              {this.state.data.first} {this.state.data.last}
            </Card.Title>
            <Badge
              pill
              className="mb-1"
              variant={this.badgeVariant(this.state.data.active)}
              onChange={this.onActiveChange}
            >
              {this.state.data.active}
            </Badge>
          </div>
          <Card.Text className="text-secondary">
            Key# {this.state.data.fob}
          </Card.Text>
          <Row>
            <Col xs={3}>
              <Button
                onClick={() => {
                  const edit = { ...this.state.data };
                  this.setState({
                    editing: !this.state.editing,
                    edit,
                  });
                }}
                className="mt-auto font-weight-bold"
                variant="outline-dark"
              >
                Edit
              </Button>
            </Col>
          </Row>
        </Card.Body>
      );
    } else {
      return (
        <Card.Body className="d-flex flex-column">
          <div className="d-flex mb-2 justify-content-between">
            <Card.Title className="mb-0 font-weight-bold">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>First and last name</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder={this.state.data.first}
                  onChange={this.onFirstChange}
                />
                <Form.Control
                  type="text"
                  placeholder={this.state.data.last}
                  onChange={this.onLastChange}
                />
              </InputGroup>
            </Card.Title>
          </div>
          <Card.Text className="text-secondary">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Key#</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder={this.state.data.fob}
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
              <Button
                onClick={() => {
                  this.setState({
                    editing: !this.state.editing,
                    edit: {},
                  });
                }}
                className="mt-auto font-weight-bold"
                variant="outline-dark"
              >
                cancel
              </Button>
            </Col>
          </Row>
        </Card.Body>
      );
    }
  };

  render() {
    return (
      <Card className="h-100 shadow-sm bg-white rounded">
        {this.cardBody()}
      </Card>
    );
  }
}
