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
                  }
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
                imgUrl={data.urlImg} 
                urlDesc={data.urlDescription} 
                comments={data.comments} 
                likedByAcc={data.likedByAcc} 
                likes={data.likes} 
                id={data._id} 
                accountName={data.author} 
                text={data.text} 
                date={data.date}
                image={data.image}/>
    );
    

    
    return(
      <div id='wrapper'>
        <div class="container">
          
          <div class='row'>
            <div className='col-3' style={{...{marginTop: "2em"},...{marginLeft: ''}}}>
              <WeatherComponent/>
              <ForecastComponent/>
            </div>
          <CSSTransition
            in={this.state.appeared}
            timeout={600}
            classNames="fade"
          >
            <div className="col-centered" style={{marginTop: '17px'}}>
              <FormPost changeText={this.changeText} value={this.state.value}/>
              {posts}
            </div>
            
          </CSSTransition>
          <div className='col-3'  style={{marginTop: "2em"}}>
            <RoadAlert/>
            <JobsBar/>
            </div>
          </div>
        </div>
      </div> 
    );
  };
}

export default NewsFeed;