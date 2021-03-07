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
      editing: false,
    };
  }

  badgeVariant = (status) => {
    if (status === "active") {
      return "success";
    }
    return "warning";
  };

  card() {
    if (!this.state.editing) {
      return (
        <Card.Body className="d-flex flex-column">
          <div className="d-flex mb-2 justify-content-between">
            <Card.Title className="mb-0 font-weight-bold">
              {this.props.data.first} {this.props.data.last}
            </Card.Title>
            <Badge
              pill
              className="mb-1"
              variant={this.badgeVariant(this.props.data.active)}
            >
              {this.props.data.active}
            </Badge>
          </div>
          <Card.Text className="text-secondary">
            Key# {this.props.data.fob}
          </Card.Text>
          <Row>
            <Col xs={3}>
              <Button
                onClick={() => {
                  this.setState({
                    editing: !this.state.editing,
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
                <Form.Control type="text" placeholder={this.props.data.first} />
                <Form.Control type="text" placeholder={this.props.data.last} />
              </InputGroup>
            </Card.Title>
            <Badge
              pill
              className="mb-1"
              variant={this.badgeVariant(this.props.data.active)}
            >
              <Form.Group>
                <Form.Check
                  disabled={this.props.data.active !== "active"}
                  type="switch"
                  id="custom-switch"
                  label=""
                />
              </Form.Group>
            </Badge>
          </div>
          <Card.Text className="text-secondary">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Key#</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text" placeholder={this.props.data.fob} />
            </InputGroup>
          </Card.Text>
          <Row>
            <Col xs={3}>
              <Button
                onClick={() => {
                  this.setState({
                    editing: !this.state.editing,
                  });
                }}
                className="mt-auto font-weight-bold"
                variant="outline-dark"
              >
                done
              </Button>
            </Col>
          </Row>
        </Card.Body>
      );
    }
  }

  render() {
    return (
      <Card className="h-100 shadow-sm bg-white rounded">{this.card()}</Card>
    );
  }
}
