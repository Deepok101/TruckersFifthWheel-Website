import React from 'react';
import Clock from './assets/clock'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import { Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/authLogout';
import PropTypes from 'prop-types';

class NavBar extends React.Component{
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(){
    this.props.logout();
    window.sessionStorage.clear();
    this.props.history.push('/');
  }

  render(){
    return(
      <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <Link class="navbar-brand" to="/home">{this.props.company}</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/home">{this.props.firstSection} <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/newsfeed">{this.props.secondSection}</Link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">{this.props.thirdSection}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">{this.props.fourthSection}</a>
            </li>
          </ul>
          <a class="nav-link disabled">
            {this.props.username}  
          </a>
          <button class="nav-link" onClick={this.handleLogout}>
            Logout
          
          </button>
          <Clock/>
        </div>
      </nav>
      );
  }
  
}
NavBar.propTypes = {
  username: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
  username: state.auth.name
})

export default  withRouter(connect(mapStateToProps, { logout })(NavBar));