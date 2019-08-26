import React from 'react';
import "./assets/feed.css"
import Posts from "./assets/posts";
import FormPost from './assets/form'
import RightSideBar from './rightsidebar'
import WeatherComponent from './assets/weather'
import RoadAlert from './assets/roadNews'
import JobsBar from './assets/jobsBar'
import ForecastComponent from './assets/forecast'
import { CSSTransition } from 'react-transition-group';
import NotificationBar from './assets/notificationBar'

class NewsFeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: '', 
                  dbposts: [],
                  loaded: false,
                  url: {
                    urlTitle: "",
                    urlDescription: "",
                    urlImg: "",
                    url: ""
                  },
                  alertModal: false
    }
    this.changeText = this.changeText.bind(this);
    this.onURLSubmit = this.onURLSubmit.bind(this);

  }

  componentDidMount(){
    this.setState({appeared: true});
    console.log(this.state.appeared)
    fetch('/api/posts', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => this.setState({dbposts: data}, () => console.log('Text fetched ', data)));
  }

  changeText(newValue){
    this.setState({value: newValue})
  }

  onURLSubmit(values){
    this.setState({url: values})
  }

  
  render(){
    let posts = this.state.dbposts.map((data)=>
        <Posts  urlTitle={data.urlTitle} 
                url={data.url} 
                accountName={data.author} 
                authorID={data.authorID}
                imgUrl={data.urlImg} 
                urlDesc={data.urlDescription} 
                comments={data.comments} 
                likedByAcc={data.likedByAcc} 
                likes={data.likes} 
                id={data._id} 
                text={data.text} 
                date={data.date}
                image={data.image}/>
    );
    

    
    return(
      <div id='wrapper'>
        <div class="container">
          
          <div class='row'>
            <div className='col-lg-3' style={{...{marginTop: "2em"}}}>
              <WeatherComponent/>
              <ForecastComponent/>
            </div>
            <CSSTransition
              in={this.state.appeared}
              timeout={600}
              classNames="fade"
            >
              <div className="col-centered col-lg-6 col-sm-12 col-12" style={{...{marginTop: '17px'},...{padding: 0}}}>
                <FormPost changeText={this.changeText} value={this.state.value}/>
                {posts}
              </div>
              
            </CSSTransition>
            <div className='col-lg-3'  style={{...{marginTop: "2em"}}}>
              {/* <RoadAlert/> */}
              <JobsBar/>
            </div>
            <NotificationBar invisible={true}/>
          
          </div>
        </div>
      </div> 
    );
  };
}

export default NewsFeed;