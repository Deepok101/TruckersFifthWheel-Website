import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./home";
import App from "./App"

function AppRouter() {
    return (
      <Router>
          <Route path="/" exact component={Home} />
          <Route path="/newsfeed/" component={App} />
      </Router>
    );
  }
  
export default AppRouter;