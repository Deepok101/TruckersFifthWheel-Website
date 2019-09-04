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
import socketIOClient from 'socket.io-client';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

class NavBar extends React.Component{
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.getFriendsReqData = this.getFriendsReqData.bind(this)
    this.fetchUserNotifications = this.fetchUserNotifications.bind(this)

    this.state = {
      friends: [],
      friendReqs: [],
      modalShow: false,
      notifications: [],
      notificationToggle: true,
      friendToggle: true,
      setNotifOpen: false,
      notifContent: ""
    }

    this.userID = window.sessionStorage.getItem('id');
    this.endpoint = 'http://localhost:5000';
    this.socket = socketIOClient.connect(this.endpoint, {transports:['websocket']});
    this.notifSnackbar = null;

  }
  componentDidMount(){
    if(this.userID){
      this.getFriendsReqData();
      this.fetchUserNotifications();
    }
    this.socket.on('notification', (data)=> {
      console.log("TEST")
      this.setState({notifContent: data.content, setNotifOpen: true})
    })

  }

  notificationSnackbar(content){
    return (
    <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.setNotifOpen}
          autoHideDuration={6000}
          onClose={(event, reason)=> {
            if (reason === 'clickaway') {
              return;
            }
        
            this.setState({setNotifOpen: false});
          }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{content}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => this.setState({setNotifOpen: false})}
            >
              <CloseIcon />
            </IconButton>,
          ]}
      />
      </div>
    )
  }

  handleLogout(){
    this.props.logout();
    window.sessionStorage.clear();
    this.props.history.push('/');
  }

  getFriendsReqData(){
    console.log(this.userID)

    var body = {
      "id": this.userID
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

  fetchUserNotifications(){
    var body = {
      "receiverID": this.userID
    }

    fetch('/api/accounts/notifications/head', {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        this.setState({notifications: data})
      }).then(() => console.log(this.state.notifications))
  }

  render(){
    console.log(this.state.setNotifOpen)

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

    let snackbar = this.notificationSnackbar(this.state.notifContent)
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
        <NotificationBar invisible={this.state.notificationToggle} notifications={this.state.notifications}/>
        <FriendReqBar invisible={this.state.friendToggle} friendReqs={this.state.friendReqs}/>
        {snackbar}
      </div>
      );
  }
  
}

const mapStateToProps = state => ({
  userID: state.auth.userID,
})

export default  withRouter(connect(mapStateToProps, { logout })(NavBar));