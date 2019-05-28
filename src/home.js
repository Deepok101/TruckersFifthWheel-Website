import React from 'react';
import NavBar from "./components/navbar";
import Jumbotronelem from './homepage/jumbotron'
import Carouselelem from './homepage/carousel'

class Home extends React.Component {
  constructor(props){
    super(props);
   
  }

  componentDidMount(){
    
    
    
    
  }
  
  render(){

    return (
   
        <div>
          <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="About Us" fourthSection="Contact Us"/>
          <Carouselelem/>
          <Jumbotronelem/>
        </div>
    

    );
  }
   
}

export default (Home);