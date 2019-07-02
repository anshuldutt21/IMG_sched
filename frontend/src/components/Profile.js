import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MeetingForm from './MeetingForm';
import {Link} from 'react-router-dom';
import axios from 'axios';


class  Profile extends React.Component{
    
constructor(props) {
    super(props);
    this.state = {
      meetings: [],
      isloading: true,
      errors: null,
    };
    this.getPosts = this.getPosts.bind(this);
    this.getPosts();
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
   		console.log(this.state.isloading);
   	})
   	.catch(error => this.setState({ error , isloading: false}));
   }


   render() {
   	   const { isloading,meetings } =this.state;
   		return(
             <div>
			<h1>hello {this.props.username}  </h1>
			<ul>
              <li onClick = {this.props.handle_logout}>logout</li>
  			</ul>
			<Link to='/MeetingForm'>add meeting</Link>
              <React.Fragment>
              <div>
          {!isloading ? (
            meetings.map(meeting => {
              const { id,purpose,detail,venue,datetime,host,invitees } = meeting;
              return (
                <div key={id}>
                <h2>{id}</h2>
                  <h2>{purpose}</h2>
                  <p>{detail}</p>
                  <h3>{venue}</h3>
                  <h3> {datetime}</h3>
                  <h3> {host} </h3>
                  <Link to ='/MeetingDetail?id={id}'> more info </Link>
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