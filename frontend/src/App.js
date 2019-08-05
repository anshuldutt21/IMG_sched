import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './components/Profile';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/Register';
import './App.css';
import GoogleLogin from 'react-google-login';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
    };
    this.google_sign = this.google_sign.bind(this);
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
    console.log(JSON.stringify(data));
    fetch('http://127.0.0.1:8000/schedule/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then(json => {
        window.localStorage.setItem('token', json.token);
        window.location.reload();
        this.setState({
          displayed_form: '',
          username: json.username,
          logged_in: true,
        });
      }); 
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    console.log(JSON.stringify(data));
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
   google_sign(googleUser) {
    this.setState({
          username: googleUser.getBasicProfile().getName(),
        });
   }
  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login}  />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

     const responseGoogle = (response) => {
      // console.log(response.profileObj.name);
      fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+response.tokenId, {
        method:'GET',
      })
        .then(response => response.json())
    .then(json => {
      console.log(response.accessToken);
      console.log(response);
      if(json.email_verified){
        // window.localStorage.setItem('token',response.accessToken);
      }
    });
    var y=response.w3.ig;
    var x=response.googleId;
      let data1 = {
    "username" : "",
    "password": "",
    "is_staff" : false
      };
      var firstName = y.split(' ');
      data1['username'] = firstName[0];
      data1['password'] = x;
      console.log(data1);
      fetch('http://127.0.0.1:8000/schedule/userlist/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data1)
    })
      .then(res => res.json())
      .then(json => {
        window.localStorage.setItem('token', json.token);
        window.location.reload();
      this.setState({
        logged_in: true,
        username: response.profileObj.name,
      });
   });
  }


  const responseGoogle2 = (response) => {
      fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+response.tokenId, {
        method:'GET',
      })
        .then(response => response.json())
    .then(json => {
    });
    var y=response.w3.ig;
    var x=response.googleId;
      let data1 = {
    "username" : "",
    "password": "",
    "is_staff" : false
      };
      var firstName = y.split(' ');
      data1['username'] = firstName[0];
      data1['password'] = x;
      fetch('http://127.0.0.1:8000/schedule/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data1)
    })
      .then(res => res.json())
      .then(json => {
        window.localStorage.setItem('token', json.token);
        console.log(data1);
        console.log(response);
      this.setState({
        logged_in: true,
        username: response.profileObj.name,
      });
   });

  }


    if(!this.state.logged_in){
      console.log(this.state.displayed_form);
      if(this.state.displayed_form=='login') {document.getElementById("One").style.display="none"; document.getElementById("Two").style.display="block";}
      if(this.state.displayed_form=='signup') {document.getElementById("Two").style.display="none"; document.getElementById("One").style.display="block"; }
      if(this.state.displayed_form==null) {document.getElementById("One").style.display="none"; document.getElementById("Two").style.display="none";}
    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}

        <h3>
            <div id="One">
        <GoogleLogin
        clientId='915718732611-k5t8orhtst2sjojldkmfkbi8khtptsob.apps.googleusercontent.com'
        buttonText="SIGN UP  WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        />
        </div>
        <div id="Two">
                <GoogleLogin
        clientId='915718732611-k5t8orhtst2sjojldkmfkbi8khtptsob.apps.googleusercontent.com'
        buttonText="LOGIN IN  WITH GOOGLE"
        onSuccess={responseGoogle2}
        onFailure={responseGoogle2} />
        </div>
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