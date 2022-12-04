import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
const Login = () => {
  const [email, setemail] = useState();
  const navigate =useNavigate();
  const [password, setpassword] = useState();
  const handleclick =()=>{
    navigate("/");
    }
  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);
  };
  const handleChange=()=>{

  }

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
        </FormGroup>
        
        <Button>Submit</Button>
        <div className="form-group"><span>Create New Account</span> <a class="red" onClick={() => handleclick()}>Register</a></div>
      </Form>
    </div>
  );
};
export default Login;
