import React from 'react';
import "./assets/feed.css"
import Posts from "./assets/posts";
import FormPost from './assets/form'
import RightSideBar from './rightsidebar'
import { CSSTransition } from 'react-transition-group';


class NewsFeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: '', 
                  dbposts: [],
                  loaded: false
    }
    this.changeText = this.changeText.bind(this);
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

  
  render(){
    let posts = this.state.dbposts.map((data)=>
        <Posts accountName={data.author} text={data.text} date={data.date}/>
    );
    

    
    return(
      <div id='wrapper'>
        <div class="container-fluid">
          <div class='col-2' id=''>
          </div>
          <div class='row'>
          <CSSTransition
            in={this.state.appeared}
            timeout={600}
            classNames="fade"
          >
            <div className="col-12 col-xl-6 col-centered">
              <FormPost changeText={this.changeText} value={this.state.value}/>
              {posts}
            </div>
          </CSSTransition>
          </div>
        </div>
      </div> 
    );
  };
}

export default NewsFeed;