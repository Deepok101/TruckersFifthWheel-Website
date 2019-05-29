import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import Home from "./home";
import App from "./App"
import Login from './homepage/login'
import SignUpForm from './homepage/signup'
import PrivateRouter from './PrivateRoute'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {changeCache} from './actions/cacheActions'

class AppRouter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }

  }
  
  componentDidMount(){
    this.props.changeCache()
    
    
  }
  
  render(){
    console.log(this.props.cache)
    const a = window.sessionStorage.getItem('loggedIn');

    return (
     
        <Router>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={SignUpForm} />
          <PrivateRouter authed={this.props.auth} authed2={a} path='/home' component={Home}/>
          <PrivateRouter authed={this.props.auth} authed2={a} path='/newsfeed' component={App}/>
        </Router>
    
    );
  }
    
}
AppRouter.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth.items,
  cache: state.auth.bool
})
  
export default connect(mapStateToProps, {changeCache})(AppRouter);