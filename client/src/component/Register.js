import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Login.css'
const Register = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const[username,setusername] = useState();
  const[confirmpassword, setconfirmpassword] = useState();

  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };
  const handleUsername = (event) => {
    setusername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  };
  const handleconfirmPasswordChange = (event) => {
    setconfirmpassword(event.target.value);
  };


  const handleSubmit = (event) => {
    alert(this.state.email + " " + this.state.password + " ");
    event.preventDefault();
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
      <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            value={username}
            onChange={(e) => handleUsername(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => handleEmailChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
          />
        </FormGroup><FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={confirmpassword}
            onChange={(e) => handleconfirmPasswordChange(e)}
          />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" /> Remember Me
          </Label>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};
export default Register;
