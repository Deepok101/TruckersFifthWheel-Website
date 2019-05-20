import React from 'react';
import "./assets/feed.css"
import Posts from "./assets/posts";
import FormPost from './assets/form'

class NewsFeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ''}
    this.handleNewPost = this.handleNewPost.bind(this);
  }

  changeText(newValue){
    this.setState({value: newValue})
  }


  handleNewPost(){
    return (<h1>{this.state.value}</h1>)
  }

  clickResponse(){
    return(<Posts accountName="###" text={this.state.value}/>)
  }

  render(){
    return(
      <div className="container">
        <div className="border border-secondary mt-5 posts">
          <header>
            <div class="p-2">
              <p id="woym">What's on your mind?</p>
            </div>
          </header>
          <div class="pt-3 p-2">
            <FormPost changeText={this.changeText.bind(this)}
                        value={this.state.value}/>
          </div>
        </div>
     </div> 
    );
  };
}

export default NewsFeed;