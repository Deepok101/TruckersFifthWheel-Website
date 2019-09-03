import React from 'react';
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
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationBar from './assets/notificationBar'
import FriendReqBar from './assets/friendsBar'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

class NavBar extends React.Component{
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.getFriendsReqData = this.getFriendsReqData.bind(this)

    this.state = {
      friends: [],
      friendReqs: [],
      modalShow: false,
      notificationToggle: true,
      friendToggle: true
    }
  }
  componentDidMount(){
    this.getFriendsReqData()
  }
  handleLogout(){
    this.props.logout();
    window.sessionStorage.clear();
    this.props.history.push('/');
  }

  getFriendsReqData(){
    var body = {
      "id": "5cede2fb0530b21d94733d27"
    }

    fetch('/api/accounts/profile', {
      method:"POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        let friends = data.profile.connections.friendList;
        let friendReqs = friends.filter(friend => friend.statusNumber == 2); 
        this.setState({friends: friends, friendReqs: friendReqs});
      })
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

    if(this.state.friends){
      var a = <FriendReqBar friendReqs={this.state.friends}/>

    }
    return(
      <div class="sticky-top">

      <nav style={{...{backgroundColor: '#0082c8'},...{color: "white"}}} class="navbar navbar-expand-lg navbar-dark">
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
          <IconButton onClick={() => this.setState(prevState => ({notificationToggle: !prevState.notificationToggle}))} size='small' color='inherit'>
            <Badge badgeContent={5} color="secondary"> 
              <NotificationsIcon size='small'/>
            </Badge>
          </IconButton>
          <IconButton onClick={() => this.setState(prevState => ({friendToggle: !prevState.friendToggle}))} size='small' color='inherit' style={{margin: '0px 10px'}}>
            <Badge badgeContent={this.state.friendReqs.length} color="secondary"> 
              <GroupAddIcon size='small'/>
            </Badge>
          </IconButton>

          {log}
        </div>
      </nav>
        <NotificationBar invisible={this.state.notificationToggle}/>
        <FriendReqBar invisible={this.state.friendToggle} friendReqs={this.state.friendReqs}/>
      </div>
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