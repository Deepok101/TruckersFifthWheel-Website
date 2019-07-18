import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


const PrivateRoute  = ({component: Component, authed, authed2, ...rest}) =>{    
    return (
      <Route
        {...rest}
        render={(props) => authed || authed2 === 'true' 
          ? <Component {...props} />
          : <Redirect to='/' />}
      />
    )
  }

export default PrivateRoute;