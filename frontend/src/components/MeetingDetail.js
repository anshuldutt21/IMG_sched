import React, { Component } from 'react';
import Service from './Service';
import './../css/Login.css';
import {Button} from 'semantic-ui-react';


const service = new Service();

class MeetingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { users:[] ,
        	invitees: [1]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getUsers();

      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          service.getMeeting(params.pk).then((meeting)=>{
            this.refs.purpose.value = meeting.purpose;
            this.refs.detail.value = meeting.detail;
            this.refs.venue.value = meeting.venue;
            this.refs.meeting_choice.value = meeting.meeting_choice;
            this.refs.datetime.value = meeting.datetime;
            this.refs.host.value = meeting.host;
            this.refs.invitees.value = this.state.invitees;
          })
        }
  }

 handle_Change2 = e => {
  let value = Array.from(e.target.selectedOptions, option => option.value);
this.setState({invitees : value});
}


      handleUpdate(pk){
        service.updateMeeting(
          {
            "pk": pk,
            "purpose": this.refs.purpose.value,
            "detail": this.refs.detail.value,
            "venue": this.refs.venue.value,
            "meeting_choice": this.refs.meeting_choice.value,
            "datetime": this.refs.datetime.value,
            "host": this.refs.host.value,
            "invitees": this.state.invitees,
        }          
        ).then((result)=>{
          alert("Meeting updated!");
        }).catch(()=>{
        	console.log(this.state.invitees);
          alert('There was an error! Please re-check your form date-time. OR You are not authorized to change the form');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }

        event.preventDefault();
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

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="Login">
          <h1> Update Meeting </h1>
          <div class="form">
            <label>
              Purpose:</label>
              <input className="input" type="text" ref='purpose' />
              </div>
            <div class="form">
            <label>
              Detail:</label>
              <input className="input" type="text" ref='detail'/>
            </div>
            <div class="form">
            <label>
              meeting_choice:</label>
              <select className="form-control" ref='meeting_choice'  >
           <option value='1'>Public</option>
            <option value='2'>Private</option>
               </select>
 			</div>
 			<div class="form">
            <label>
              venue:</label>
              <input className="input" type="text" ref='venue' />
            </div>
            <div class="form">
            <label>
              datetime:</label>
              <input className="input" type="text" ref='datetime' />
              </div>
            <div class="form">
            <label>
              host:</label>
             <select className="select" ref='host' >
             {this.state.users.map(user => <option value={user.id}>{user.username}</option>)}
             </select>
             </div>
             <br />
             <div class="form">
             <label>
             invitees </label>
             <select className="select" ref='invitees' onChange={this.handle_Change2}  multiple>
             {this.state.users.map(user => <option value={user.id}>{user.username}</option>)}
             </select>
             </div>
             <br />
            <Button color="teal" class="buttons" type="submit">SUBMIT </Button>
            </div>
          </form>
        );
      }  
}

export default MeetingDetail;
