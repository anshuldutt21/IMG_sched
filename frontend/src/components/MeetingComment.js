import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


var path= window.location.pathname;
var room = path.substring(path.lastIndexOf('/') + 1);
var url = window.location.href;
var myParam = window.location.search.split('user=')[1];
console.log(myParam);

export const CommentSocket = new WebSocket(
        'ws://' + '127.0.0.1:8000' +
        '/ws/schedule/' + room +  '/');

class MeetingComment extends React.Component {

	constructor(props){
		super(props); 
    this.state = {
      comments: [],
      isloading: true,
      errors: null,
    };
    this.getComment = this.getComment.bind(this);
    this.submit=this.submit.bind(this);
    this.getComment();
    CommentSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
        var message = data['message'];
        document.querySelector('#comment-log').value += (message + '\n');
    };
}

 getComment() {
    fetch('http://127.0.0.1:8000/schedule/comment/'+room,{
    	method:'GET',
    	headers: {
         'Authorization': `JWT ${window.localStorage.getItem('token')}`
      }
    })
   	.then(response => response.json())
   	.then((response) => {
   		console.log(response.json);
   		this.setState({
   			comments: response,
   			isloading: false,
   		});
   	})
   	.catch(error => this.setState({ error , isloading: false}));
   }


    
   submit(e){
       document.querySelector('#comment-message-input').onkeyup = function(e) {
        if (e.keyCode === 13) {  
            document.querySelector('#comment-message-submit').click();
        }
        };
       var messageInputDom = document.querySelector('#comment-message-input');
        var message = messageInputDom.value; 
        CommentSocket.send(JSON.stringify({
            'message': message,
            'user' : myParam
        }));
        this.getComment();
        messageInputDom.value = '';
    }
 render(){

 	  const { isloading,comments } =this.state;
 	return (
 		<div>
    <textarea id="comment-log" cols="100" rows="20"></textarea><br/>
    <input id="comment-message-input" type="text" size="100"/><br/>
    <input id="comment-message-submit" type="button" value="Send" onClick={this.submit}/>
 		<React.Fragment>
              <div>
          {!isloading ? (
            comments.map(comment => {
              const { comment_id,comment_post,comment_user,datetime } = comment;
              return (
              	<Comment>
                <div key={comment_id}>
                <Comment.Content>
                <h2>{comment_id}</h2>
                  <Comment.Author><h3>{comment_user}</h3></Comment.Author>
                  <Comment.Text>{comment_post}</Comment.Text>
                  <h3> {datetime}</h3>
                  </Comment.Content>
                  <hr />
                </div>
                </Comment>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        </React.Fragment>
 		</div>

 		)
 }
}

export default MeetingComment;