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
      this.handleChange = this.handleChange.bind(this);

    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
        this.props.inputChange(e.target.value)
    }
    handleClick(e){
        e.preventDefault();
        this.props.fetchAuth(this.props.username, this.state.password)
            
        setTimeout(()=>{
            this.props.history.push('/home')
            this.setState({display: "none"}) 

 

            
        }, 400)
        

    }
  
    render(){

 
        return( 
            
            <div style={{display: this.state.display}} class="login-form">
                <h1 style={{marginTop: "2em"}}>DeepEmploi</h1>
                <h1>Login Form</h1>
                <form action="/api/accounts/auth" method="POST">
                    <input value={this.state.username} onChange={this.handleChange} type="text" name="username" placeholder="Username" required/>
                    <input value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password" required/>
                </form>
                <button id='submit-btn' onClick={this.handleClick}>Submit</button>
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