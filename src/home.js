import React from 'react';
import NavBar from "./components/navbar";
import Jumbotronelem from './homepage/jumbotron'
import Carouselelem from './homepage/carousel'
import './style/home.css'

class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: false
    }
   
  }

  componentWillMount(){
    this.setState({loaded: true})
  }
  
  render(){
    if(this.state.loaded === true){
    return (
        <div>
          <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
          <div class='div-fadeIn'>
            <Carouselelem/>
            <Jumbotronelem/>
          </div>
        </div>
        
    

    )
    } else {
        return <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>

    }
  }
   
}

export default (Home);