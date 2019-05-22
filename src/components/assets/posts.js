import React from 'react';
import "./feed.css"

class Posts extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    let date = this.props.date.slice(0, 10);
    let time = this.props.date.slice(11, 16)
    return(
      <div className="">
        <div className="border border-secondary mt-5 posts">
        <header>
            <span class="p-2 post_acc_name">
              {this.props.accountName}
            </span>
            <span className="post_date">
              <span>
                <b>{date} </b>
              </span>
              <span>
                <b>{time}</b>
              </span>
            </span>
          </header>
          <div class="pt-3 p-2">
            <p class="p-posts">{this.props.text}</p>
          </div>
          <div class="reaction">
            <button class="post_btn reaction-btn">Love</button>
            <button class="post_btn button reaction-btn">Comment</button>
            <button class="post_btn button reaction-btn">Share</button>
          </div>
        </div>
     </div> 
    
    );
  };
}

export default Posts;