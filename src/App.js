import "./app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Member } from "./components/member";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    fetch("https://door-293802.wm.r.appspot.com/")
      .then((r) => r.json())
      .then((data) => {
        this.setState({ members: data });
      });
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.members.map((data) => (
            <Col xs={12} className="mb-5" key={`${data.key}`}>
              <Member data={data} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
