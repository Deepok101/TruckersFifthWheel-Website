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

    }
    handleClick(e){
        e.preventDefault();
        var body = {
            username: this.state.username,
            password: this.state.password
        }
        fetch('/api/accounts/auth', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(data => this.setState({session: data.session}, () => console.log(this.state)))
          .then(()=> {
            if(this.state.session){
                console.log(this.state)
                this.setState({display: "none"})
                this.props.history.push('/home')
            } 
          })
        if (!this.state.session){
            this.props.history.push('/')

        }
        
    }
    componentDidMount(){
         if (!this.state.session){
            this.props.history.push('/')
        }
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

export default Login;