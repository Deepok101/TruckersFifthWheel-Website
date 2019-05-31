import React from 'react';
import NavBar from "./components/navbar";
import Jumbotronelem from './homepage/jumbotron'
import Carouselelem from './homepage/carousel'
import './style/home.css'
import About from './homepage/about'
import Offer from './homepage/offer'
import Bar from './homepage/bar'

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
          <NavBar first='active' company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
          <div class='div-fadeIn'>
            <Carouselelem/>
            <Jumbotronelem/>
            <About/>
            <Bar/>
            <Offer/>
          </div>
        </div>
        
    

    )
    } else {
        return <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>

    }
  }
   
}

export default (Home);