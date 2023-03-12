import React, { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

import CONFIG from "../config";
import useFetch from "../hooks/useFetch";

export default function Login() {
  const { isAuthenticated } = useAuth0();
  const { error, setError } = useState(null);
  const history = useHistory();
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [isAuthenticated, history]);

  const onSignin = (event) => {
    event.preventDefault();

    // Validate username
    if (usernameRef.current.value.trim() === "") {
      usernameRef.current.isValid = false;
      usernameRef.current.focus();
      return;
    }

    // Validate password
    if (passwordRef.current.value.trim() === "") {
      passwordRef.current.isValid = false;
      passwordRef.current.focus();
      return;
    }

    // Call api
    const formData = new FormData();
    formData.append("username", usernameRef.current.value);
    formData.append("password", passwordRef.current.value);

    fetch(`${CONFIG.api_url}/login`, {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        const { result, error } = response;

        setError(null);

        if (error) {
          setError(error);
          return;
        }

        history.push("/products");
      });
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="icon">
          <img alt="icon" src="image/logo_transparent.png" />
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formLoginUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              ref={usernameRef}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLoginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <div className="button-container">
            <Button variant="dark" onClick={onSignin}>
              Sign In
            </Button>
            <Button variant="light" onClick={() => history.push("/createuser")}>
              Create Account
            </Button>
            <Button variant="link" onClick={() => history.push("/products")}>
              Continue as guest
            </Button>
          </div>
        </Form>
        {error && (
          <Alert key="danger" variant="danger">
            error
          </Alert>
        )}
      </div>
    );
  }

  return null;
}
