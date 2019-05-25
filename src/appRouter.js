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
import NewsFeed from "./components/newsfeed";
import PrivateRouter from './PrivateRoute'

class AppRouter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }

  }

  
  render(){
    return (
      <Router>
          <Route path="/"  component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/newsfeed/" component={App} />
      </Router>
    );
  }
    
}
  
export default AppRouter;