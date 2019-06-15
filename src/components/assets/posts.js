import React from 'react';
import "./feed.css"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

class Posts extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      likes: this.props.likes,
      clicked: false,
      likedBy: [],
      comment: "",
      arrayComments: [],//list of comments
      nbComments: 0,    //number of comments
      updated: false,   //check if the page has been updated 
      increment: 0,     //goes up by 5 to show more comments
      didLike: false,   //check if like button has been clicked. Made to avoid overclicking the like button
      didDislike: true, //check if dislike button has been clicked. Made to avoid overclicking the dislike button
      endpoint: 'ws://still-taiga-69176.herokuapp.com'
    }
    this.onClickLikeBtn = this.onClickLikeBtn.bind(this);
    this.onClickCommentBtn = this.onClickCommentBtn.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onTyped = this.onTyped.bind(this);
    this.UnhideComments = this.UnhideComments.bind(this);
    this.onClickDeleteBtn = this.onClickDeleteBtn.bind(this);

  }
  
  componentDidMount(){
    this.setState({arrayComments: this.props.comments.reverse()});
    this.setState({nbComments: this.props.comments.length})
    this.setState({likedBy: this.props.likedByAcc});

    const socket = socketIOClient.connect(this.state.endpoint, {transports:['websocket']})
    socket.on('comment', (data)=>{
      if(data.id === this.props.id){
        const username = window.sessionStorage.getItem('auth_firstName')
      var node = document.createElement("div");
      node.style.marginTop = '1.5em';
      var user = document.createElement('b');
      user.textContent = username + ' : ';
      user.style.display = 'inline';
  
      var comment = document.createElement('p');
      comment.textContent = data.msg;
      comment.style.display = 'inline';
      comment.classList = 'commentBubble'
  
      node.appendChild(user);
      node.appendChild(comment);
  
      var commentSection = document.getElementById(this.props.id + 'comments')
      if(data.msg.comment !== ""){
        commentSection.insertBefore(node, commentSection.firstChild);
        this.setState({nbComments: this.state.nbComments + 1})
      }
    }
      
    
    });

    socket.on('like', (id)=>{
      if(id === this.props.id){
        this.setState({likes: this.state.likes + 1})
      }
    })
    socket.on('unlike', (id)=>{
      if(id === this.props.id){
        this.setState({likes: this.state.likes - 1})
      }
    })

  }
  

  onClickLikeBtn(){
    const socket = socketIOClient.connect(this.state.endpoint, {transports:['websocket']})
    var body =  {
      id: this.props.id,
      user: window.sessionStorage.getItem('auth_firstName')
    }
    if(this.state.didLike === false){
      if (!this.state.likedBy.includes(body.user)){
        this.setState(prevState=>({likedBy: [...prevState.likedBy, body.user]}));
        socket.emit('send like', body.id, body.user);
      }
      if (this.state.likedBy.includes(body.user)){
        var array = [...this.state.likedBy];
        var result = [...array.slice(0, array.length-2)]
        this.setState({likedBy: result});
        socket.emit('remove like', body.id, body.user);
      }
    }
    

    

    
  //  if(this.state.didLike === false){
  //    this.setState({didLike: true});
  //   if (!this.props.likedByAcc.includes(body.user )){
      
  //     fetch('/api/posts/like', {
  //       method: 'POST',
  //       body: JSON.stringify(body),
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //     }).then(res => res.json)
  //     this.setState({likes: this.state.likes + 1})

  //   }

  //  }
   
  }

  onClickUnlikeBtn(){
    const socket = socketIOClient.connect(this.state.endpoint, {transports:['websocket']})
    var body =  {
      id: this.props.id,
      user: window.sessionStorage.getItem('auth_firstName')
    }
    socket.emit('send like', (body.id, body.user));
    

    // if(this.state.didDislike === false){
    //   this.setState({didDislike: true})
    //  if (this.props.likedByAcc.includes(body.user)){
    //    fetch('/api/posts/like/cancel', {
    //      method: 'POST',
    //      body: JSON.stringify(body),
    //      headers: {
    //          'Content-Type': 'application/json'
    //      },
    //    }).then(res => res.json)
   
       
    //    }
    //    this.setState({likes: this.state.likes - 1})
 
    // }
    
    
  }

  onClickCommentBtn(){
    var node = document.createElement('DIV');
    var col1 = document.createElement('DIV');
    var col2 = document.createElement('DIV');

    if (this.state.clicked === false){
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

    if(this.state.clicked === true){
      var commentSection = document.getElementById(this.props.id)
      commentSection.removeChild(commentSection.childNodes[0])
      this.setState({clicked: false})
    }

  }

  onCommentSubmit(){
    const socket = socketIOClient.connect(this.state.endpoint, {transports:['websocket']})
    const username = window.sessionStorage.getItem('auth_firstName')

    socket.emit('send comment', this.state.comment, username, this.props.id);


    // var body = {
    //   id: this.props.id,
    //   user: username,
    //   comment: this.state.comment
    // }

    // if(body.comment != ""){
    //   fetch('/api/posts/comment', {
    //     method: 'POST',
    //     body: JSON.stringify(body),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //   }).then(res => res.json);
    // }
    

    // var node = document.createElement("div");
    // node.style.marginTop = '1.5em';
    // var user = document.createElement('b');
    // user.textContent = body.user + ' : ';
    // user.style.display = 'inline';

    // var comment = document.createElement('p');
    // comment.textContent = body.comment;
    // comment.style.display = 'inline';
    // comment.classList = 'commentBubble'

    // node.appendChild(user);
    // node.appendChild(comment);

    // var commentSection = document.getElementById(this.props.id + 'comments')
    // if(body.comment !== ""){
    //   commentSection.insertBefore(node, commentSection.firstChild);
    //   this.setState({nbComments: this.state.arrayComments.length + 1})
    // }

  }

  onTyped(e){
    this.setState({comment: e.target.value})
  }

  UnhideComments(){
    var comments = document.getElementById(this.props.id + 'comments');
    if (comments.childNodes.length > 5){
      var i;
      for(i=5; i < 10 + this.state.increment; i++){
        if(i > this.state.arrayComments.length - 1){
          break;
        }
        comments.childNodes[i].style.display = "block";

        
      }
      this.setState({increment: this.state.increment + 5});

      
    }
  }

  onClickDeleteBtn(){
    var body = {
      "id": this.props.id
    }
    fetch('/api/posts/delete', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(() => console.log("deleted!"))
      document.getElementById(`post#${this.props.id}`).remove()

  }


  componentDidUpdate(){
    if(this.state.updated == false){
      var comments = document.getElementById(this.props.id + 'comments');
      if (comments.childNodes.length > 5){
        var i;
        for(i=5; i < comments.childNodes.length; i++){
          comments.childNodes[i].style.display = "none";
        }
      }
      this.setState({updated: true});
    }
  }

  render(){
    let date = this.props.date.slice(0, 10);
    let time = this.props.date.slice(11, 16);

    let comments = this.state.arrayComments.map(comment => 
      <div class='comments' style={{marginTop: '1.5em'}}>
        <b style={{display: 'inline'}}>
          {comment.user} : &nbsp;
        </b>
        <p class='commentBubble' style={{display: 'inline'}}>
          {comment.text}
        </p>
      </div>
    )
    
    //Show more comments button
    let UnhideBtn;

    if (this.state.arrayComments.length > 5){
      UnhideBtn = <button class='showMoreComments' onClick={this.UnhideComments}>Show more comments...</button>
    } else {
      UnhideBtn = null;
    }

    let visible_comments = document.getElementById(this.props.id + 'comments')



    
    //Like/Unlike Buttons
    let reactionButton;

    if (!this.state.likedBy.includes(window.sessionStorage.getItem('auth_firstName'))){
      reactionButton = <button onClick={this.onClickLikeBtn} class="post_btn reaction-btn">Like</button>

    } else {
      reactionButton = <button onClick={this.onClickLikeBtn} class="post_btn reaction-btn">Unlike</button>

    }
    //Styles 
      const urlDescStyle = {
        float: 'left',
        textAlign: 'left',
        fontSize: '1em'
      }
      const linkBox = {
        backgroundColor: '#f2f2f2',
        padding: "10px",
        cursor: 'pointer'
      }
    //Content depending on if it is a URL, text or image
    let content;
    if(this.props.url && !this.props.image){
      content =   <div class="p-4" >
                    <div className='row' style={linkBox}>
                      <a style={{...{color: 'black'}}} href={this.props.url}>
                        <img style={{...{float: 'left'}}} src={this.props.imgUrl} width="100%"/>
                        <div style={urlDescStyle} class="p-posts">
                          <h5>{this.props.urlTitle}</h5>
                          {this.props.urlDesc}
                        </div>
                      </a>
                    </div>
                  </div>
    }
    if(!this.props.url && !this.props.image){
      content = <div class="pt-3 pl-4">
                  <p class="p-posts">{this.props.text}</p>
                </div>
    }
    if(!this.props.url && this.props.image){
      content = <div class="pt-3 pb-2">
                  <p class="p-posts pl-4 pr-4">{this.props.text}</p>
                  <img src={this.props.image} class='centerImg' width="100%"/>
                </div>
    }
      return(
        <div id={"post#" + this.props.id}>
          <div className="posts">
            <div className="pl-4 pr-4 pt-3">
              <header>
                <span className="post_acc_name">
                  {this.props.accountName}
                </span>
                <span className="post_date">
                  <span>
                  </span>
                  <span>
                    <b>{date} </b>
                  </span>
                  <span>
                    <b>{time} </b>
                  </span>
                  <span>
                    <DropdownButton 
                      size="sm"
                      variant=""
                      style={{...{position: 'relative'},...{display: 'inline-block'}}} 
                      id="dropdown-item-button" 
                      title="">
                      
                   
                      <Dropdown.Item onClick={this.onClickDeleteBtn} as="button">Delete Post</Dropdown.Item>
                      <Dropdown.Item as="button">Another action</Dropdown.Item>
                      <Dropdown.Item as="button">Something else</Dropdown.Item>
                    </DropdownButton>
                  </span>
                </span>
              </header>
            </div>
            {content}
            <div className="pl-4 pr-4 pt-2">
              <p>
                {this.state.likes} Likes &nbsp;&nbsp;
                {this.state.nbComments} Comments
              </p>
            </div>
            <div className="row">
              <div className='reaction'>
                {reactionButton}
                <button onClick={this.onClickCommentBtn}  className="post_btn button reaction-btn">Comment</button>
                <button className="post_btn button reaction-btn">Share</button>
              </div>
              
            </div>
  
            <div id={this.props.id} className='pl-4 pr-4'>
  
            </div>
            <div className='commentSection pl-4 pb-4' id={this.props.id + 'comments'}>
              {comments}
            </div>
              {UnhideBtn}
          </div>
       </div> 
      )
    };
  }
Posts.propTypes = {
  username: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
  username: state.auth.name
})


export default connect(mapStateToProps)(Posts);