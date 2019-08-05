import React, {Component} from 'react'
import { Button, Form, Message, Select} from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './../css/Login.css';
import GoogleLogin from 'react-google-login';


class SignupForm extends React.Component {
  constructor(props){
    super(props);

  }
      state = {
    username: '',
    password: '',
    is_staff: false,
  };

 
  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  toggle_change = e => {
    this.setState({
      is_staff: !this.state.is_staff,
    });
  }

     

  render() {
    return (
      <div>
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <h1>Sign Up</h1>
        <div className="Login">
        <input
        placeholder="UserName"
        className="input"
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <Checkbox label="ARE YOU ADMIN ?" name="is_staff"
          value={this.state.is_staff}
          onChange={this.toggle_change} 
          className="label" />
        <input
        className="input"
        placeholder="Password"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <Button color="teal" type="submit">SUBMIT </Button>
        </div>
      </form>
      <h3> OR </h3>
      <br />

        </div>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};
