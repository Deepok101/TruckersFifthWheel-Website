import React from 'react';
import './style.css';
import NavBar from '../components/navbar'
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAuth } from '../actions/authActions'

class SignUpForm extends React.Component{
    constructor(props){
        super(props)

        this.state = {
          username: '',
          password: '',
          email: '',
          firstName: '',
          lastName: ''
        }
        this.onTyped = this.onTyped.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }
    onTyped(e){

      this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(){
      var body = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }

      fetch('/api/accounts/create', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(()=>{
      this.props.fetchAuth(body.username, body.password)
    })
      .then(()=> this.props.history.push('/home'))
    }
    render(){
        return(
          <div>
              <div id="body">
                <div id="contact" >
                  <h3>Sign Up Form</h3>
                  <h4>Enter the following forms</h4>
                  <fieldset>
                    <input placeholder="Username" name="username" value={this.state.username} onChange={this.onTyped} type="text" tabindex="1" autofocus/>
                  </fieldset>
                  <fieldset>
                    <input placeholder="First Name" name="firstName" value={this.state.firstName} onChange={this.onTyped} type="text" tabindex="1" autofocus/>
                  </fieldset>
                  <fieldset>
                    <input placeholder="Last Name" name="lastName" value={this.state.lastName} onChange={this.onTyped} type="text" tabindex="1" />
                  </fieldset>
                  <fieldset>
                    <input placeholder="Your Email Address" name="email" value={this.state.email} onChange={this.onTyped} type="email" tabindex="2" required/>
                  </fieldset>
                  <fieldset>
                    <input placeholder="Password" name="password" value={this.state.password} onChange={this.onTyped}  type="text" tabindex="3" required/>
                  </fieldset>
                
                  <button onClick={this.onSubmit} id="contact-submit">Submit</button>
               
                </div>

              </div>
          </div>
          
      
        )
    }
}
const mapStateToProps = state => ({
  auth: state.auth.items,
  username: state.auth.name,
  cache: state.auth.bool
})
export default connect(mapStateToProps, { fetchAuth })(withRouter(SignUpForm));
