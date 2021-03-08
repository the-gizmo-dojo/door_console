import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

import "./Login.css";

export function Login() {
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [success, setSuccess] = useState(true);

  const ref = React.createRef();

  function validateForm() {
    return password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    ref.current.value = "";
    if (password === "officer") {
      console.log(password);
      setRedirect(true);
    } else {
      setSuccess(false);
    }
  }

  function renderRedirect() {
    if (redirect) {
      return <Redirect to="/members" />;
    }
  }

  function buttonVariant() {
    return success ? "primary" : "danger";
  }

  return (
    <div className="Login">
      {renderRedirect()}
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={ref}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
          variant={buttonVariant()}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
