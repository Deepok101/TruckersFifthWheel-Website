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
import Chat from './components/chat'
import Jobpage from './jobpage'
import Jobbar from './jobs/jobbar'
import Profile from './profile';
import Posts from './profile/posts'

class AppRouter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }

  }
  
  componentDidMount(){
    this.props.changeCache()
    document.body.style.background = '#eff6ff'
    
  }
  
  render(){
    console.log(this.props.cache)
    const a = window.sessionStorage.getItem('loggedIn');

    return (
     
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUpForm} />
          <Route path='/chat' component={Chat}/>
          <Route path='/job' component={Jobpage}/>
          <Route path='/profile'exact component={Profile}/>
          <Route path='/profile/posts' component={Posts}/>


          {/* <PrivateRouter authed={this.props.auth} authed2={a} path='/home' component={Home}/> */}
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