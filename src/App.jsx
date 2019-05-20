import React from 'react';
import './App.css';
import Main from './main';
import NavBar from "./components/navbar";
import Posts from "./components/assets/posts";
import NewsFeed from './components/newsfeed'

function App() {
  return (
    <div>
      <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="About Us" fourthSection="Contact Us"/>
      <NewsFeed/>
    </div>
  );
}

export default App;

