import React from 'react';
import './style/App.css';
import NavBar from "./components/navbar";
import NewsFeed from './components/newsfeed'

function App() {
  return (
    <div>
      <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
      <NewsFeed/>
    </div>
  );
}

export default App;

