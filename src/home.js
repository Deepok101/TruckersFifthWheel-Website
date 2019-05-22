import React from 'react';
import NavBar from "./components/navbar";

function Home() {
  return (
    <div>
      <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="About Us" fourthSection="Contact Us"/>
    </div>
  );
}

export default Home;