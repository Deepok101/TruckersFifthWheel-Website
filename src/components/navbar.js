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
import LoginModal from '../homepage/loginModal'

class NavBar extends React.Component{
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)

    this.state = {
      modalShow: false
    }
  }

  handleLogout(){
    this.props.logout();
    window.sessionStorage.clear();
    this.props.history.push('/');
  }

  render(){
    const username = window.sessionStorage.getItem('auth_firstName')

    let log;
    if(username){
      log = <a class="nav-link" href='/'>
              <Button style={{...{marginTop: '-1.3em'},...{marginBottom: '-1em'}}} onClick={this.handleLogout} variant="outline-light">Logout</Button>
            </a>
    }
    if (!username){
      log = <a class="nav-link" >
              <Button style={{...{marginTop: '-1.3em'},...{marginBottom: '-1em'}}} 
                      variant="outline-light" 
                      onClick={() => {this.setState({modalShow: true})}}
                      >
                  Login
              </Button>
            </a>
    }

    let modalClose = () => this.setState({modalShow: false})


    return(
      <nav style={{...{backgroundColor: '#0082c8'},...{color: "white"}}} class="navbar navbar-expand-lg navbar-dark sticky-top">
        <Link class="navbar-brand" to="/home">{this.props.company}</Link>
        <LoginModal {...this.props} onHide={modalClose} show={this.state.modalShow}/>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li className={`nav-item ${this.props.first}`}>
              <Link class="nav-link" to="/home">Home<span class="sr-only">(current)</span></Link>
            </li>
            <li className={`nav-item ${this.props.second}`}>
              <a class="nav-link" href="/newsfeed">Newsfeed</a>
            </li>
            <li className={`nav-item ${this.props.fifth}`}>
              <Link class="nav-link" to="/profile">Profile</Link>
            </li>
            <li className={`nav-item`}>
              <Link class="nav-link" to="/job">Jobs</Link>
            </li>
            <li className={`nav-item ${this.props.third}`}>
              <a class="nav-link" href="/chat">Chat</a>
            </li>
            <li className={`nav-item ${this.props.fourth}`}>
              <a class="nav-link disabled" href="#">{this.props.fourthSection}</a>
            </li>
          </ul>
          
          <a class="nav-link disabled">
            {username}  
          </a>
          {log}
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