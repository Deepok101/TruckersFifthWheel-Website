import React from 'react';
import "./feed.css"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'


import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

class Posts extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      likes: this.props.likes,
      clicked: false,
      likedBy: [],
      comment: "",
      comments: [],//list of comments
      nbComments: 0,    //number of comments
      updated: false,   //check if the page has been updated 
      increment: 0,     //goes up by 5 to show more comments
      didLike: false,   //check if like button has been clicked. Made to avoid overclicking the like button
      didDislike: true, //check if dislike button has been clicked. Made to avoid overclicking the dislike button
      endpoint: 'http://localhost:5000'
    }
    this.onClickLikeBtn = this.onClickLikeBtn.bind(this);
    this.onClickCommentBtn = this.onClickCommentBtn.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onTyped = this.onTyped.bind(this);
    this.UnhideComments = this.UnhideComments.bind(this);
    this.onClickDeleteBtn = this.onClickDeleteBtn.bind(this);

    this.userID = window.sessionStorage.getItem('id')
  }
  
  componentDidMount(){
    this.setState({comments: this.props.comments.reverse()});
    this.setState({nbComments: this.props.comments.length})
    this.setState({likedBy: this.props.likedByAcc});

    const socket = socketIOClient.connect(this.state.endpoint, {transports:['websocket']})

    socket.on('comment', (data) => {
      var body = {
        user: data.user,
        text: data.msg
      }
      this.setState(prevState=>({comments: [body,...prevState.comments]}));
      

    })

    socket.on('like', (data)=>{
      if(data.id === this.props.id){
        // this.setState({likes: this.state.likes + 1});
        this.setState(prevState=>({likedBy: [...prevState.likedBy, data.user]}));
        console.log(this.state.likedBy)
      }
    })
    socket.on('unlike', (data)=>{
      if(data.id === this.props.id){
        // this.setState({likes: this.state.likes - 1});
        var array = [...this.state.likedBy];
        var result = [...array.slice(0, array.length-1)]
        this.setState({likedBy: result});
      }
    })

  }
  

  onClickLikeBtn(){
    const socket = socketIOClient.connect(this.state.endpoint, {transports:['websocket']})
    var body =  {
      id: this.props.id,
      user: window.sessionStorage.getItem('id')
    }
    if(this.state.didLike === false){
      if (!this.state.likedBy.includes(body.user)){
       
        socket.emit('send like', body.id, body.user);
      }
      if (this.state.likedBy.includes(body.user)){

        socket.emit('remove like', body.id, body.user);
      }
    }
    
   
  }

  onClickUnlikeBtn(){
    const socket = socketIOClient.connect(this.state.endpoint, {transports:['websocket']})
    var body =  {
      id: this.props.id,
      user: window.sessionStorage.getItem('auth_firstName')
    }
    socket.emit('send like', (body.id, body.user));
    
    
  }

  onClickCommentBtn(){
    var node = document.createElement('DIV');
    var col1 = document.createElement('DIV');
    var col2 = document.createElement('DIV');

    if (this.state.clicked === false){
      this.setState({clicked: true})
     
    }

    

    if(this.state.clicked === true){
      // var commentSection = document.getElementById(this.props.id)
      // commentSection.removeChild(commentSection.childNodes[0])
      this.setState({clicked: false})
    }

  }

  onCommentSubmit(){
    const socket = socketIOClient.connect(this.state.endpoint, {transports:['websocket']})
    const username = window.sessionStorage.getItem('auth_firstName')

    var body = {
      "id": this.props.id,
      "user": username,
      "userID": this.userID,
      "comment": this.state.comment
  }

  socket.emit('send comment', body.comment, body.user, body.userID, body.id);

  }

  onTyped(e){
    this.setState({comment: e.target.value})
  }

  UnhideComments(){
    var comments = document.getElementById(this.props.id + 'comments');
    if (comments.childNodes.length > 5){
      var i;
      for(i=5; i < 10 + this.state.increment; i++){
        if(i > this.state.comments.length - 1){
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

    let comments = this.state.comments.map(comment => 
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

    if (this.state.comments.length > 5){
      UnhideBtn = <Button variant='contained' style={{marginTop: '2em'}} onClick={this.UnhideComments}>Show more comments...</Button>
    } else {
      UnhideBtn = null;
    }

    let visible_comments = document.getElementById(this.props.id + 'comments')

    let commentInput;
    if (this.state.clicked === true){
      commentInput = 
        <div style={{...{padding: '2px 4px'},
                ...{display: 'flex'},
                ...{border: '1px solid #E3E3E3'},
                ...{borderRadius: '445px'},
                ...{marginTop: '2em'}}}>
          <InputBase
            style={{...{flex: 1},...{marginLeft: '5px'},...{fontSize: '1em'}}}
            placeholder="Write a comment!"
            inputProps={{ 'aria-label': 'search google maps'}}
            onChange={this.onTyped}
          />
          <IconButton onClick={this.onCommentSubmit} aria-label="search">
            <SendIcon fontSize="small"/>
          </IconButton>
        </div>
    } else if(this.state.clicked === false){
      commentInput = null
    }

    
    //Like/Unlike Buttons
    let reactionButton;

    if (!this.state.likedBy.includes(this.userID)){
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
      backgroundColor: '',
      padding: "10px",
      cursor: 'pointer'
    }
    //Content depending on if it is a URL, text or image
    let content;
    if(this.props.url && !this.props.image){
      content =   <div class="p-4" >
                    <p class="p-posts">{this.props.text}</p>
                    <div className='row card' style={linkBox}>
                      <a style={{...{color: 'black'}}} href={this.props.url}>
                        <img style={{...{float: 'left'}}} src={this.props.imgUrl} width="100%"/>
                        <div style={urlDescStyle} class="p-posts">
                          <h5 class='pt-3'>{this.props.urlTitle}</h5>
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
                  <a style={{...{color: 'black'}}} href={`/userProfile/${this.props.authorID}`}>{this.props.accountName}</a>
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
                {this.state.likedBy.length} Likes &nbsp;&nbsp;
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
              {commentInput}
            </div>
            <div className='commentSection pl-4' id={this.props.id + 'comments'}>
              {comments}
            </div>
            <div className='pl-4 pb-4'>
              {UnhideBtn}
            </div>
            
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