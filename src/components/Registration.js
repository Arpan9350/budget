import { Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
// import { Route } from 'react-router-dom'
import { Navigate } from "react-router";
import React, { useRef, useState } from "react";
import { Alert } from "@mui/material";
import CryptoJS from "crypto-js";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+.[^\s@]+$/);
const regForName = RegExp(/^[a-zA-Z]/);
const regForUserName = RegExp(
  /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])[a-zA-Z0-9]+$/
);
const regForpassword = RegExp(
  "^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&])(?=.{8,})"
);

export default function Registration() {
  const fNameInput = useRef(null);
  const lNameInput = useRef(null);
  const uNameInput = useRef(null);
  const emailInput = useRef(null);
  const passInput = useRef(null);
  const cPassInput = useRef(null);
  const [error, seterror] = useState(" ");
  const [data, setData] = useState({
    credData: [],
    isLoggedIn: 0,
  });

  const register = () => {
    if (
      document.getElementById("Name").value === "" ||
      document.getElementById("lastname").value === "" ||
      document.getElementById("username").value === "" ||
      document.getElementById("email").value === "" ||
      document.getElementById("password").value === "" ||
      document.getElementById("confirmpassword").value === ""
    ) {
      alert("Please fill all fields");
    } else {
      const encyPass = CryptoJS.AES.encrypt(
        JSON.stringify(passInput.current.value),
        "secret key 123"
      ).toString();
      let formData = {
        name: fNameInput.current.value,
        lastname: lNameInput.current.value,
        userName: uNameInput.current.value,
        email: emailInput.current.value,
        password: encyPass,
        budget:0,
        expenses: [],
      };
      setData((data) => ({
        // ...data,
        credData: [...data.credData, formData],
      }));
      axios.post(`http://localhost:3001/users`, formData);
    }
  };
  const login = () => {
    setData({ isLoggedIn: 1 });
  };

  const handler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fNameInput":
        let error1 = regForName.test(value)
          ? " "
          : "First Name Should be only in character";
        seterror(error1);
        break;
      case "lNameInput":
        let error2 = regForName.test(value)
          ? " "
          : "Last Name Should be only in character";
        seterror(error2);
        break;
      case "uNameInput":
        let error3 = regForUserName.test(value)
          ? " "
          : "user name should be  combination of no and character";
        seterror(error3);
        break;
      case "emailInput":
        let error4 = regForEmail.test(value)
          ? " "
          : "email format should be correct";
        seterror(error4);
        break;

      case "passInput":
        let error5 = regForpassword.test(value)
          ? " "
          : "password should be a alphaNumeric ";
        seterror(error5);
        break;
    }
  };

  return (
    <>
      <div style={{ marginTop: "150px", backgroundColor: "whitesmoke" }}>
        <Form className="border border-info rounded m-5 p-3">
          <Row className="mb-3">
            <h2 className="text-dark">Registration Form</h2>
          </Row>
          {error.length > 1 && <Alert severity="warning">{error}</Alert>}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="text-dark float-start" id="Name">
                First Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First name"
                id="Name"
                ref={fNameInput}
                name="fNameInput"
                onChange={handler}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className="text-dark" id="lastname">
                Last Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Lastname"
                id="lastname"
                ref={lNameInput}
                name="lNameInput"
                onChange={handler}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className="text-dark float-start" id="username">
                UserName
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                id="username"
                ref={uNameInput}
                name="uNameInput"
                onChange={handler}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="text-dark float-start" id="email">
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                id="email"
                ref={emailInput}
                name="emailInput"
                onChange={handler}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label className="text-dark float-start" id="password">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                id="password"
                ref={passInput}
                name="passInput"
                onChange={handler}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label className="text-dark" id="confirmpassword">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                id="confirmpassword"
                ref={cPassInput}
                name="cPassInput"
                onChange={handler}
              />
            </Form.Group>
          </Row>
          <Button
            variant="primary"
            type="submit"
            className="m-3"
            onClick={register}
          >
            Register
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="m-3"
            href="/"
            onClick={login}
          >
            Login
          </Button>
        </Form>
        {data.isLoggedIn === 1 && <Navigate to="/" />}
      </div>
    </>
  );
}
