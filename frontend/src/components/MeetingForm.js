import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';


class Meetingform extends React.Component{
	constructor(props) {
		super(props);
		this.state = {success:0,
			     purpose:"",
                 detail:"", 
                 venue:"",
                 meeting_choice:1,
                 host:2,
                 datetime:"2019-06-14T05:58:05Z",
                 invitees:[1,3],
	              };
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
    handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

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
   <input 
     name="meeting_choice"
     type="number"
     value={this.state.meeting_choice}
     onChange={this.handle_change} />

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
   <input 
     name="host"
     type="number"
     value={this.state.host}
     onChange={this.handle_change} />
     <br />
       <label>
        invitees
         </label>

   <input 
     name="invitees"
     type="number"
     value={this.state.invitees}
      />
     <input type="submit" />
  </form>
  );
  }
}
export default Meetingform;
