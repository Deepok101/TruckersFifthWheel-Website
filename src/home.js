import React from 'react';
import NavBar from "./components/navbar";
import Jumbotron_elem from './homepage/jumbotron'
import Carousel_elem from './homepage/carousel'
function Home() {
  
  return (
    <div>
      <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="About Us" fourthSection="Contact Us"/>
      <Carousel_elem/>
      <Jumbotron_elem/>
    </div>
  );
}

export default Home;