import React from 'react';
import Clock from './assets/clock'
import {
  Link,
  withRouter
} from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/authLogout';
import PropTypes from 'prop-types';
import './assets/feed.css'
import Button from 'react-bootstrap/Button'

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
    const username = window.sessionStorage.getItem('auth_firstName')

    return(
      <nav style={{...{backgroundColor: '#3cd0e7'},...{color: "white"}}} class="navbar navbar-expand-lg navbar-dark sticky-top">
        <Link class="navbar-brand" to="/home">{this.props.company}</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigationbar" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navigationbar">
          <ul class="navbar-nav mr-auto">
            <li className={`nav-item ${this.props.first}`}>
              <Link class="nav-link" to="/home">{this.props.firstSection} <span class="sr-only">(current)</span></Link>
            </li>
            <li className={`nav-item ${this.props.second}`}>
              <Link class="nav-link" to="/newsfeed">{this.props.secondSection}</Link>
            </li>
            <li className={`nav-item ${this.props.third}`}>
              <a class="nav-link" href="/chat">{this.props.thirdSection}</a>
            </li>
            <li className={`nav-item ${this.props.fourth}`}>
              <a class="nav-link disabled" href="#">{this.props.fourthSection}</a>
            </li>
          </ul>
          
          <a class="nav-link disabled">
            {username}  
          </a>
          <a class="nav-link" href='/'>
            <Button style={{...{marginTop: '-1.3em'},...{marginBottom: '-1em'}}} variant="outline-light">Logout</Button>
          </a>
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