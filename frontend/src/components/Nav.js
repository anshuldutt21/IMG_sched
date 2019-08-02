import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
// import Profile from './Profile'

function Nav(props) {
  const logged_out_nav = (

    <div class="tab">
  <button class="tablinks" onClick={() => props.display_form('login')}>Login</button>
  <button class="tablinks" onClick={() => props.display_form('signup')}>Sign Up</button>
</div>

  );

  const logged_in_nav = (
    <ul>
      <li onClick={props.handle_logout}>logout</li>
    </ul>

  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav} </div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};