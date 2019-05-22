import React from 'react';
import Clock from './assets/clock'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function NavBar(props){
  return(
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <Link class="navbar-brand" to="/">{props.company}</Link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <Link class="nav-link" to="/">{props.firstSection} <span class="sr-only">(current)</span></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/newsfeed">{props.secondSection}</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">{props.thirdSection}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">{props.fourthSection}</a>
        </li>
      </ul>
      <Clock/>
    </div>
  </nav>
  );
}

export default NavBar;