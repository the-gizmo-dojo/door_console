import "./app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Member } from "./components/member";
import { AddMember } from "./components/AddMember";
import { Confirmation } from "./components/Confirmation";
import { Login } from "./components/Login";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      show: false,
    };
  }

  setShow = (show) => {
    this.setState({ show });
  };

  componentDidMount() {
    fetch("https://door-293802.wm.r.appspot.com/")
      .then((r) => r.json())
      .then((data) => {
        this.setState({ members: data });
      });
  }

  onNewMember = (member, header, body) => {
    this.setState((prevState) => ({
      members: [...prevState.members, member],
      toastH: header,
      toastB: body,
    }));

    this.setShow(true);
  };

  onUpdateMember = (header, body) => {
    this.setState({
      toastH: header,
      toastB: body,
    });

    this.setShow(true);
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/members">
            {this.state.show && (
              <Confirmation
                header={this.state.toastH}
                body={this.state.toastB}
                toggle={this.setShow}
              />
            )}
            <Container>
              <Row>
                <Col xs={12} className="mb-5" key={0}>
                  <AddMember onNewMember={this.onNewMember} />
                </Col>
                {this.state.members.map((data) => (
                  <Col xs={12} className="mb-5" key={`${data.key}`}>
                    <Member data={data} onUpdateMember={this.onUpdateMember} />
                  </Col>
                ))}
              </Row>
            </Container>
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    );
  }
}
