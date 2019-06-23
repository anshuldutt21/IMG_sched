import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };
  handlechange = (event) => {
    const target = event.target,
          value = target.type ===
            'checkbox' ? target.checked : target.value,
          name = target.name

    this.setState({
      [name]: value
    });
  }

  // onSubmit = (event) => {
  //   event.preventDefault()
  //   this.props.onSubmit(this.state.username, this.state.password)
  // }

  // render() {
  //   const errors = this.props.errors || {}

  //   return (
  //     <div className="form-container">
  //       <Form onSubmit={this.onSubmit}>
  //         <h1>Authentication</h1>
  //         {errors.non_field_errors ? <Message
  //         error
  //         content={errors.non_field_errors}
  //         /> : void(0) }
  //         {errors.username ?
  //         <Message
  //         error
  //         content={errors.username}
  //         /> : void(0) }
  //         <Form.Field>
  //           <label>Username</label>
  //           <input type="text" placeholder="Username" name="username" onChange={this.handleInputChange} />
  //         </Form.Field>
  //         <Form.Field>
  //           <label>Password</label>
  //           <input type="password" placeholder="Password" name="password" onChange={this.handleInputChange} />
  //         </Form.Field>
  //         <Button type="submit">Login</Button>
  //       <div>Dont have an account? Apply <a href="./register">here</a> to create an account</div>
  //       </Form>
  //       </div>
  //   )
  // }
// }
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
      <form onSubmit={e => this.props.handle_login(e, this.state)}>
        <h4>Log In</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default LoginForm;

 LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};