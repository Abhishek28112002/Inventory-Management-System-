import React, { useState, useEffect } from "react";
import './Login.css'
import {useNavigate} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
const ForgotPassword =() => {
  const [email, setemail] = useState();
  const navigate =useNavigate();
  const [password, setpassword] = useState();
 const[currentuser,setcurrentuser] = useState(true);
 const[confirmpassword, setconfirmpassword] = useState();
  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };
  const handleconfirmPasswordChange = (event) => {
    setconfirmpassword(event.target.value);
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
  const Verifyemail = ()=>{
    setcurrentuser(false);
  }
  return (
    <div className="login">
      <h1>Forgot Password</h1>
      { currentuser?
     ( <Form onSubmit={(e) => handleSubmit(e)}>
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
        <Button onClick={() =>Verifyemail()}>Next</Button>
        </Form>
  ):(
    <Form>
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
        <FormGroup>
        <Label for="password">ConfirmPassword</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={confirmpassword}
          onChange={(e) => handleconfirmPasswordChange(e)}
        />
      </FormGroup>
        
        <Button>Submit</Button>
        <div className="form-group"><span>Create New Account</span> <a class="red" onClick={() =>navigate('/register')}>Register</a></div>
      </Form>
  )
}
    </div>
  );
};
export default ForgotPassword;
