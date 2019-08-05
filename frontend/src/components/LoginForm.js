import React, {Component} from 'react'
import { Button, Checkbox, Form, Input  } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './../css/Login.css';
import GoogleLogin from 'react-google-login';


class LoginForm extends React.Component {
	constructor(props){
		super(props);
	}
  state = {
    username: '',
    password: ''
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
  
  render() {

    return (
    	<div>
      <form onSubmit={e => this.props.handle_login(e, this.state)}>
        <h1>Log In</h1>
        <div className="Login">
        <Form.Field>
        <input
          type="text"
          placeholder="Username"
          className="input"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        </Form.Field>
        <Form.Field>
        <input
          type="password"
          placeholder="Password"
          className="input"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        </Form.Field>
         <Button color="teal" class="buttons" type='submit'>Submit</Button>
         </div>
      </form>
        <br />
        <h3> OR </h3>
        </div>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};