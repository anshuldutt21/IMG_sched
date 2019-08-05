import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MeetingForm from './MeetingForm';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Service from './Service';
import {Redirect} from 'react-router-dom';
import { Button, Checkbox, Form, Input,Image, Item  } from 'semantic-ui-react';
import './../css/Login.css';
import MeetingComment from './MeetingComment';

const service = new Service();
class  Profile extends React.Component{
constructor(props) {
    super(props); 
    this.state = {
      meetings: [],
      isloading: true,
      errors: null,
    };
    this.calendar  =this.calendar.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getPosts();
    this.calendar();
   }
   calendar() {
   	fetch('http://127.0.0.1:8000/schedule/calendar/cal',{
   		method:'GET',
    	headers: {
         'Authorization': `JWT ${window.localStorage.getItem('token')}`
      }
   	})
   }
   getPosts() {
    fetch('http://127.0.0.1:8000/schedule/test/',{
    	method:'GET',
    	headers: {
         'Authorization': `JWT ${window.localStorage.getItem('token')}`
      }
    })
   	.then(response => response.json())
   	.then((response) => {
   		console.log(response.json);
   		this.setState({
   			meetings: response,
   			isloading: false,
   		});
   	})
   	.catch(error => this.setState({ error , isloading: false}));
   }
   handleDelete(e, pk){
   	service.deleteMeeting({pk : pk}).then(()=>{
   		this.setState({
   			meetings : []
   		})
   	   this.getPosts();
   	});
   }


   render() {
   	   const { isloading,meetings } =this.state;
   	   const username = this.props.username;
   		return(
             <div>
             <div class="Prof">
			<h1>Hello {this.props.username}  </h1>
              <Button class="buttonlog"  onClick = {this.props.handle_logout}>logout</Button>
			</div>
			<Link to='/MeetingForm' className="meetingadd"><h3 class="meetingsadd">Create Meeting</h3></Link>
              <React.Fragment>
              <div>
          {!isloading ? (
            meetings.map(meeting => {
              const { pk,purpose,detail,venue,datetime,host,invitees } = meeting;
              return (
                <div key={pk} class = "Meeting">
                  <h2>{purpose}</h2>
                  <p>{detail}</p>
                  <h3>Venue - {venue}</h3>
                  <h3> DATETIME - {datetime.slice(0,10)+"  at   "+datetime.slice(11,19)}</h3>
                  <Button  onClick={(e)=>  this.handleDelete(e,meeting.pk) }> Delete</Button>
                  <a href={"/MeetingDetail/"+meeting.pk} className="update">Update </a>
                  <br />
                  <br />

                  <a href={"/MeetingComment/"+meeting.pk+"?user="+username} className="commentsb"> COMMENTS </a>
                  <br />
                  <br />
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        </React.Fragment>
			 </div>
  )}
  } 
export default Profile;
Profile.propTypes = {
  handle_logout: PropTypes.func.isRequired
};