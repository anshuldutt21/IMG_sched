import React, { Component } from 'react';
import Service from './Service';

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
          alert('There was an error! Please re-check your form.');
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
          <div className="form-group">
            <label>
              Purpose:</label>
              <input className="form-control" type="text" ref='purpose' />

            <label>
              Detail:</label>
              <input className="form-control" type="text" ref='detail'/>

            <label>
              meeting_choice:</label>
              <select className="form-control" ref='meeting_choice'  >
           <option value='1'>Public</option>
            <option value='2'>Private</option>
               </select>

            <label>
              venue:</label>
              <input className="form-control" type="text" ref='venue' />

            <label>
              datetime:</label>
              <input className="form-control" type="text" ref='datetime' />

            <label>
              host:</label>
             <select className="form-control" ref='host' >
             {this.state.users.map(user => <option value={user.id}>{user.username}</option>)}
             </select>

             <label>
             invitees </label>
             <select className="form-control" ref='invitees' onChange={this.handle_Change2}  multiple>
             {this.state.users.map(user => <option value={user.id}>{user.username}</option>)}
             </select>
            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
      }  
}

export default MeetingDetail;
