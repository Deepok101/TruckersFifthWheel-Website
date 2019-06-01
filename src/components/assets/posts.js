import React from 'react';
import "./feed.css"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Posts extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      likes: this.props.likes,
      clicked: false,
      comment: "",
      arrayComments: []
    }
    this.onClickLikeBtn = this.onClickLikeBtn.bind(this);
    this.onClickCommentBtn = this.onClickCommentBtn.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onTyped = this.onTyped.bind(this);

  }
  

  

  onClickLikeBtn(){
    var body =  {
      id: this.props.id
    }

    fetch('/api/posts/like', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
          'Content-Type': 'application/json'
      },
    }).then(res => res.json)

    this.setState({likes: this.state.likes + 1})
  }

  onClickCommentBtn(){
    var node = document.createElement('DIV');
    var col1 = document.createElement('DIV');
    var col2 = document.createElement('DIV');

    if (this.state.clicked == false){
      this.setState({clicked: true})
     
      node.className = 'row commentSection';

      col1.className = 'col-10';
      col2.className = 'col-2';

      var input = document.createElement('input');
      var btn = document.createElement('button');

      input.className = 'form-control comment_input';
      input.placeholder = "Write a comment...";
      input.name = 'comment';
      input.onchange = this.onTyped;
      btn.className = 'btn btn-primary';
      btn.textContent = 'Comment'
      btn.onclick = this.onCommentSubmit;

      col1.appendChild(input);
      col2.appendChild(btn);

      node.appendChild(col1)
      node.appendChild(col2)

   
      document.getElementById(this.props.id).appendChild(node);
    }

    if(this.state.clicked == true){
      var commentSection = document.getElementById(this.props.id)
      commentSection.removeChild(commentSection.childNodes[0])
      this.setState({clicked: false})
    }

  }

  onCommentSubmit(){
    const username = window.sessionStorage.getItem('auth_firstName')

    var body = {
      id: this.props.id,
      user: username,
      comment: this.state.comment
    }
    fetch('/api/posts/comment', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
          'Content-Type': 'application/json'
      },
    }).then(res => res.json);

    var node = document.createElement("div");
    node.style.marginTop = '1.5em';
    var user = document.createElement('b');
    user.textContent = body.user + ' : ';
    user.style.display = 'inline';

    var comment = document.createElement('p');
    comment.textContent = body.comment;
    comment.style.display = 'inline';
    comment.classList = 'commentBubble'

    node.appendChild(user);
    node.appendChild(comment);

    document.getElementById(this.props.id + 'comments').appendChild(node);

  }

  onTyped(e){
    this.setState({comment: e.target.value})
  }

  componentDidMount(){
    this.setState({arrayComments: this.props.comments})
  }

  render(){
    let date = this.props.date.slice(0, 10);
    let time = this.props.date.slice(11, 16);

    let comments = this.state.arrayComments.map(comment => 
      <div style={{marginTop: '1.5em'}}>
        <b style={{display: 'inline'}}>
          {comment.user} : &nbsp;
        </b>
        <p class='commentBubble' style={{display: 'inline'}}>
          {comment.text}
        </p>
      </div>
    )
    return(
      <div className="">
        <div className="posts">
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
          <div class="pl-2">
            <p>
              {this.state.likes} Likes &nbsp;&nbsp;
              {this.state.arrayComments.length} Comments
            </p>
          </div>
          <div class="reaction">
            <button onClick={this.onClickLikeBtn} class="post_btn reaction-btn">Love</button>
            <button onClick={this.onClickCommentBtn}  class="post_btn button reaction-btn">Comment</button>
            <button class="post_btn button reaction-btn">Share</button>
          </div>
          <div id={this.props.id}>

          </div>
          <div class='commentSection' id={this.props.id + 'comments'}>
            {comments}
          </div>
        </div>
     </div> 
    
    );
  };
}
Posts.propTypes = {
  username: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
  username: state.auth.name
})


export default connect(mapStateToProps)(Posts);