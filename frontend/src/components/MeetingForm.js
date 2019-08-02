import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import './../css/Login.css';


class Meetingform extends React.Component{
	constructor(props) {
		super(props);
		this.state = { users:[],
      success:0,
			     purpose:"",
                 detail:"", 
                 venue:"",
                 meeting_choice:1,
                 host:1,
                 errors: null,
                 datetime:"2019-06-14T05:58:05Z",
                 invitees:[],
	              };
    this.getUsers=this.getUsers.bind(this);
    this.getUsers();
	}
    handleSubmit(e, data) {
    	e.preventDefault();
    	let x=0;
    	fetch('http://127.0.0.1:8000/schedule/test/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `JWT ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then(json => {
      	this.setState({
      		success:1,
      	})
console.log(data);
      });

    }
    
    getUsers() {
    fetch('http://127.0.0.1:8000/schedule/userlist/',{
      method:'GET',
      headers: {
         'Authorization': `JWT ${window.localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then((response) => {
      this.setState({
        users: response,
      });
    })
    .catch(error => this.setState({ error }));
    console.log(this.state.users);
   }

    handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name] : value
    });
  };

  handle_Change2 = e => {
  var options = e.target.options;
  // const value = e.target.value;
  // this.setState({invitees: [...e.target.selectedOptions].map(o => o.value)}); 

  var value = Array.from(e.target.selectedOptions, option => option.value);
  // console.log(value);
  this.setState({ invitees : Array.from(e.target.selectedOptions, option => option.value) });
  // this.state.invitees.push(value);
  // this.state.invitees.push(value);
  console.log(this.state.invitees);
};


    render () {
    	if(this.state.success==1) {
    		return <Redirect to ="./" />
    	}
    return(
   <form onSubmit={e => this.handleSubmit(e, this.state)}>
   <div className="Login">
   <label>
   purpose
        </label>

   <input 
     name="purpose"
     className="input"
     placeholder="Purpose"
     type="text"
     value={this.state.purpose}
     onChange={this.handle_change} />
     <br />
     <label> Detail </label>

     <textarea name="detail" placeholder="Detail" value={this.state.detail} onChange={this.handle_change} />
     <br />
     <label>
   venue
        </label>

   <input 
     name="venue"
     className="input"
     placeholder="Venue"
     type="text"
     value={this.state.venue}
     onChange={this.handle_change} />
     <br />
     <label>
   meeting_choice
        </label>
 <select name="meeting_choice" value={this.state.meeting_choice} onChange={this.handle_change}>
  <option value='1'>Public</option>
  <option value='2'>Private</option>
</select> 

     <br />
     <label>
   datetime
        </label>
   <input 
     name="datetime"
     type="datetime"
     className="input"
     value={this.state.datetime}
     onChange={this.handle_change} />

     <br />
     <label>
       host
        </label>
<select name="host" onChange={this.handle_change} value = {this.state.host} >
{this.state.users.map(user => <option value={user.id}>{user.username}</option>)}
</select>
     <br />
       <label>
        invitees
         </label>
<select name="invitees" onChange={this.handle_Change2} value = {this.state.invitees} multiple={true}>
{this.state.users.map(user => <option value={user.id}>{user.username}</option>)}
</select>
     <input type="submit" />
     </div>
  </form>
  );
  }
}
export default Meetingform;
