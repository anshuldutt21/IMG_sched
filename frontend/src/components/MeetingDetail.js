import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class MeetingDetail extends React.Component{

	getMeet() {
    fetch('http://127.0.0.1:8000/schedule/test/{id}',{
    	method:'GET',
    	headers: {
         'Authorization': `JWT ${window.localStorage.getItem('token')}`
      }
    })
   	.then(response => response.json())
   	.then((response) => {
   		console.log(response.json);
   		this.setState({
   		
   		});
   	})
   	.catch(error => this.setState({ error , isloading: false}));
   }

  
}
export default MeetingDetail;