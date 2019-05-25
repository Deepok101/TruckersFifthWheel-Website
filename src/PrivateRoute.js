import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


const PrivateRoute  = ({component: Component, authed, ...rest}) =>{    
    return (
      <Route
        {...rest}
        render={(props) => authed == 1
          ? <Component {...props} />
          : <Redirect to='/' />}
      />
    )
  }

export default PrivateRoute;