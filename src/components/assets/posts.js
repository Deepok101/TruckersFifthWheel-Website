import React from 'react';
import "./feed.css"

class Posts extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    
    return(
      <div className="">
        <div className="border border-secondary mt-5 posts">
        <header>
            <div class="p-2 post_acc_name">
              {this.props.accountName}
            </div>
          </header>
          <div class="pt-3 p-2">
            <p class="p-posts">{this.props.text}</p>
          </div>
          <div class="reaction">
            <button class="btn btn-primary button">Love</button>
            <button class="btn btn-primary button">Comment</button>
            <button class="btn btn-primary button">Share</button>
          </div>
        </div>
     </div> 
    
    );
  };
}

export default Posts;