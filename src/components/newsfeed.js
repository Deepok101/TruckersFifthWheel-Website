import React from 'react';
import "./assets/feed.css"
import Posts from "./assets/posts";
import FormPost from './assets/form'
import RightSideBar from './rightsidebar'

class NewsFeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ''}
    this.handleNewPost = this.handleNewPost.bind(this);
    this.changeText = this.changeText.bind(this);
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
      <div id='wrapper'>
        <div class="container-fluid">
          <div class='row'>
            <div class='col-2' id=''>
              <RightSideBar/>
            </div>
            <div className="col-8">
              <FormPost changeText={this.changeText} value={this.state.value}/>
              <Posts accountName="Deepak Singh" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus maximus iaculis. Phasellus iaculis augue nulla, eu fringilla nisi scelerisque eu. Ut nec nunc rhoncus, auctor sem malesuada, condimentum mi. Sed id urna vestibulum, varius enim eget, congue nisl. Nulla facilisi. Praesent iaculis justo sed commodo venenatis. Duis mauris ante, accumsan et sapien a, mattis aliquam urna. Donec ornare nisl ex, ut vulputate sapien vehicula non. Pellentesque cursus pharetra condimentum."/>
              <Posts accountName="Deepak Singh" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus maximus iaculis. Phasellus iaculis augue nulla, eu fringilla nisi scelerisque eu. Ut nec nunc rhoncus, auctor sem malesuada, condimentum mi. Sed id urna vestibulum, varius enim eget, congue nisl. Nulla facilisi. Praesent iaculis justo sed commodo venenatis. Duis mauris ante, accumsan et sapien a, mattis aliquam urna. Donec ornare nisl ex, ut vulputate sapien vehicula non. Pellentesque cursus pharetra condimentum."/>
              <Posts accountName="Deepak Singh" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus maximus iaculis. Phasellus iaculis augue nulla, eu fringilla nisi scelerisque eu. Ut nec nunc rhoncus, auctor sem malesuada, condimentum mi. Sed id urna vestibulum, varius enim eget, congue nisl. Nulla facilisi. Praesent iaculis justo sed commodo venenatis. Duis mauris ante, accumsan et sapien a, mattis aliquam urna. Donec ornare nisl ex, ut vulputate sapien vehicula non. Pellentesque cursus pharetra condimentum."/>
            </div>
          </div>
        </div>
      </div> 
    );
  };
}

export default NewsFeed;