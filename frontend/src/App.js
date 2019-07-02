import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './components/Profile';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/Register';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://127.0.0.1:8000/schedule/current_user/', {
        headers: {
             'Authorization': `JWT ${window.localStorage.getItem('token')}`  
      }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username, is_staff: json.is_staff });
        });
    }
  }

  handle_login = (event, data) => {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/schedule/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then(json => {
        window.localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username,
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/schedule/userlist/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        window.localStorage.setItem('token', json.token);
        console.log(data);
        this.setState({
          displayed_form: '',
          username: json.username,
          is_staff: json.is_staff,
          logged_in: true
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }
    if(!this.state.logged_in){
    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}

        </h3>
      </div>
    );
  }
  else {
    return (
        <Profile handle_logout={this.handle_logout} username={this.state.username} />
    )
  }
}
}

export default App;