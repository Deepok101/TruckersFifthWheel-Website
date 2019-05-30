import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from 'react-router-dom'
import { Switch } from "react-router-dom";
import './style.css'
import { connect } from 'react-redux';
import { fetchAuth } from '../actions/authActions'
import { inputChange } from '../actions/inputAction'



class Login extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          loggedIn: false,
          data: 2,
          username: "",
          password: "",
          session: "",
          display: ""
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSignUpClick = this.handleSignUpClick.bind(this);

    }
    handleChangeUsername(e){
        this.setState({username: e.target.value})
        this.props.inputChange(e.target.value)
        console.log(this.props.username)
 
   
    }
    handleChangePassword(e){
        this.setState({password: e.target.value})
 

      
    }
    handleClick(e){
        e.preventDefault();
        this.props.fetchAuth(this.state.username, this.state.password)
        var body = {
            username: this.state.username,
            password: this.state.password
        }
        fetch('/api/accounts/auth', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(()=> this.props.history.push('/home'))
        if (this.props.auth){
            this.props.history.push('/')
        }
    }
    handleSignUpClick(){
        this.props.history.push('/signup')
    }
    
    render(){

 
        return( 
            
            <div style={{display: this.state.display}} class="login-form">
                <h1 style={{marginTop: "2em"}}>DeepEmploi</h1>
                <h1>Login Form</h1>
                <form action="/api/accounts/auth" method="POST">
                    <input value={this.state.username} onChange={this.handleChangeUsername} type="text" name="username" placeholder="Username" required/>
                    <input value={this.state.password} onChange={this.handleChangePassword} type="password" name="password" placeholder="Password" required/>
                </form>
                <button id='submit-btn' onClick={this.handleClick}>Submit</button>
                <button style={{marginTop: 10}} id='submit-btn' onClick={this.handleSignUpClick}>Sign Up</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.items,
    username: state.auth.name,
    cache: state.auth.bool
})
export default connect(mapStateToProps, { fetchAuth, inputChange })(Login);