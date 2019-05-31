import React from 'react';
import './style/App.css';
import NavBar from "./components/navbar";
import NewsFeed from './components/newsfeed'

class App extends React.Component {
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
    if (this.state.loaded === true){
      return (
        <div style={{backgroundColor: "#eff6ff"}}>
          <NavBar second='active' company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
          <NewsFeed/>
        </div>
      );
    } else {
      return <NavBar second='active' company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>

    }
    
  }
  
}

export default App;

