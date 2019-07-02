import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import MeetingForm from './components/MeetingForm';
import MeetingDetail from './components/MeetingDetail';

const routing = (
<Router>
<div>
<Route path="/" component={App}/>
<Route path="/MeetingForm" component={MeetingForm}/>
<Route path="/MeetingDetail" component= {MeetingDetail} />
</div>
</Router>
  );
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
