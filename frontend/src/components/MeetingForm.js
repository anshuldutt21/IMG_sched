import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';


class Meetingform extends React.Component{
	constructor(props) {
		super(props);
		this.state = { users:[],
      success:0,
			     purpose:"",
                 detail:"", 
                 venue:"",
                 meeting_choice:1,
                 host:2,
                 errors: null,
                 datetime:"2019-06-14T05:58:05Z",
                 invitees:[1],
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
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then(json => {
      	this.setState({
      		success:1,
      	})

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
   }

    handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name] : value
    });
    console.log(value);
  };

  handle_Change2 = e => {
  let value = Array.from(e.target.selectedOptions, option => option.value);
  this.setState({invitees : value});
  console.log(this.state.invitees);
}

    render () {
    	if(this.state.success==1) {
    		return <Redirect to ="./" />
    	}
    return(
   <form onSubmit={e => this.handleSubmit(e, this.state)}>
   <label>
   purpose
        </label>

   <input 
     name="purpose"
     type="text"
     value={this.state.purpose}
     onChange={this.handle_change} />
     <br />
     <label> Detail </label>

     <textarea name="detail" value={this.state.detail} onChange={this.handle_change} />
     <br />
     <label>
   venue
        </label>

   <input 
     name="venue"
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
     type="datetime-local"
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
<select name="invitees" onChange={this.handle_Change2} value = {this.state.invitees} multiple>
{this.state.users.map(user => <option value={user.id}>{user.username}</option>)}
</select>
     <input type="submit" />
  </form>
  );
  }
}
export default Meetingform;
