import React from 'react';
import './feed.css';
import Posts from './posts'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import { connect } from 'react-redux';
import axios from 'axios'
import { IoMdPhotos } from "react-icons/io";

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import PhotoIcon from '@material-ui/icons/Photo';
import Fab from '@material-ui/core/Fab';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button2 from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';



class FormPost extends React.Component{
  
    constructor(props) {
        super(props);
        this.state = {value: '',
                      urlBool: false,
                      urlInput: '',
                      urlSearching: false,
                      urlImg: '',
                      urlDescription: '',
                      urlTitle: '',
                      selectedFile: null,
                      image: "",
                      fname: null,
                      lname: null,
                      userID: null,
                      clicked: false,
                      rows: 1};

        this.textRef = React.createRef()
        this.formRef = React.createRef()

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
        this.getUserDataFromJWT = this.getUserDataFromJWT.bind(this);
        this.openOverlay = this.openOverlay.bind(this);
        this.handleURLInput = this.handleURLInput.bind(this);
        this.urlInputChange = this.urlInputChange.bind(this);
    }

    handleChange(e){
        this.props.changeText(e.target.value);
      }

    urlInputChange(e){
      this.setState({urlInput: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        var text = this.props.value;



        //Check if attached picture
        if(this.state.selectedFile){
          this.checkUser(()=> {
            this.handleImageUpload(this.state.fname, this.state.lname, text)
          })
        }


        //Checks if the text is a URL link
        //If is LINK == true
        if(this.state.urlInput.match(/(?:((?:https?|ftp):\/\/)|ww)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/i) && !this.state.selectedFile){
          fetch(`http://api.linkpreview.net/?key=5cfe73bd77bbaabbb1bd2e7a845085e964f4b386c7157&q=${this.state.urlInput}`)
            .then(res => res.json()).then(data => this.setState({urlTitle: data.title,
                                                                urlDescription: data.description,
                                                                urlImg: data.image,
                                                                url: data.url}))
            .then(() => this.checkUser())
            .then(()=> {
              

              if (!this.state.urlImg){
                let url = {
                  "url": this.state.urlInput
                }
                fetch(`/api/url`, {
                  method: 'POST',
                  body: JSON.stringify(url),
                  headers: {
                    'Content-Type': 'application/json'
                }
                }).then(res => res.json()).then(data => this.setState({urlTitle: data.data.ogTitle,
                                                                      urlDescription: data.data.ogDescription,
                                                                      urlImg: data.data.ogImage.url,
                                                                      url: data.data.ogUrl}, console.log(data)))
                  .then(()=>{

                    var post = {
                      "id": 3,
                      "author": `${this.state.fname} ${this.state.lname}`,
                      "authorID": this.state.userID,
                      "text": text,
                      "url": this.state.url,
                      "urlTitle": this.state.urlTitle,
                      "urlDescription": this.state.urlDescription,
                      "urlImg": this.state.urlImg
                    };
                    
                    console.log(post)

                    fetch('/api/posts', {
                        method: 'POST',
                        body: JSON.stringify(post),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then(res => res.json)
                      .then(data => console.log(data))
                      .then(() => window.location.reload());
                  })


                  
              } else {
                var post = {
                  "id": 3,
                  "author": `${this.state.fname} ${this.state.lname}`,
                  "authorID": this.state.userID,
                  "text": text,
                  "url": this.state.url,
                  "urlTitle": this.state.urlTitle,
                  "urlDescription": this.state.urlDescription,
                  "urlImg": this.state.urlImg
                };
                console.log(post)
                fetch('/api/posts', {
                    method: 'POST',
                    body: JSON.stringify(post),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(res => res.json())
                  .then(data => console.log(data))
                  .then(() => window.location.reload());
    
               
              }

          })

          //If NOT LINK, proceed with this...
        } else if(!this.state.urlInput.match(/(?:((?:https?|ftp):\/\/)|ww)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/i) && !this.state.selectedFile){
              this.checkUser(()=>{
                this.handleTextSubmit(this.state.fname, this.state.lname, text);
              })
     
        }

        
    }

    handleURLInput(){
      console.log(this.state.urlInput)
      if(this.state.urlInput.match(/(?:((?:https?|ftp):\/\/)|ww)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/i) && !this.state.selectedFile){
        this.setState({urlSearching: true})
        fetch(`http://api.linkpreview.net/?key=5cfe73bd77bbaabbb1bd2e7a845085e964f4b386c7157&q=${this.state.urlInput}`)
          .then(res => res.json()).then(data => this.setState({urlTitle: data.title,
                                                              urlDescription: data.description,
                                                              urlImg: data.image,
                                                              url: data.url,
                                                              urlSearching: false}))
        
          .then(()=> {
            

            if (!this.state.urlImg){
              let url = {
                "url": this.state.urlInput
              }
              fetch(`/api/url`, {
                method: 'POST',
                body: JSON.stringify(url),
                headers: {
                  'Content-Type': 'application/json'
              }
              }).then(res => res.json()).then(data => this.setState({urlTitle: data.data.ogTitle,
                                                                    urlDescription: data.data.ogDescription,
                                                                    urlImg: data.data.ogImage.url,
                                                                    url: data.data.ogUrl,
                                                                    urlSearching: false}, console.log(data)))    
            } 

        })

        //If NOT LINK, proceed with this...
      }
    }


    fileSelectedHandler(event){ 
      this.setState({selectedFile: event.target.files[0]})
      
    }

    getUserDataFromJWT(){
      fetch('/api/accounts/getUserData', {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${window.sessionStorage.getItem('token')}`
        }
      }).then(res => res.json()).then(data => this.setState({fname: data.user.firstName, 
                                                            lname: data.user.lastName,
                                                            userID: data.user._id}))
    }

    checkUser(callback){
      fetch('/api/accounts/verify', {
        method: 'POST',
        body: JSON.stringify({"fname": this.state.fname, "lname": this.state.lname}),
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then((user) => {
          if (user){
            callback()
          }
        })

    }

    handleTextSubmit(auth_firstName, auth_lastName, text){
      var post = {
        "id": 3,
        "author": `${auth_firstName} ${auth_lastName}`,
        "authorID": this.state.userID,
        "text": text
      };

      fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        },
      }).then(res => res.json()).then(data => console.log(data));

      window.location.reload()
    }

    handleImageUpload(firstName, lastName, text) {

      const cloudName = 'dktmhlt1r';

      var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      var fd = new FormData();
      fd.append('upload_preset', "p78z3ukx");
      fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
      fd.append('file', this.state.selectedFile);

      axios.post(url, fd)
        .then(res => this.setState({image: res.data.public_id}))
        .then(() => {
          var post = {
            "id": 3,
            "author": `${firstName} ${lastName}`,
            "authorID": this.state.userID,
            "text": text,
            "image": `https://res.cloudinary.com/dktmhlt1r/image/upload/v1560284584/${this.state.image}`
          };
          fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .then(data => console.log(data))
            .then(() => window.location.reload());;
        })
    }


    componentDidMount(){
      this.getUserDataFromJWT();
    }

  

    openOverlay() {
      this.setState({clicked: true})
      if(this.state.clicked === false){
        this.setState({rows: 2})
        var elem = document.getElementById('postForm')
        elem.style.position = 'relative';
        elem.style.zIndex = 1;
        var canvas = document.createElement("canvas");
        canvas.className = "highlight";
        canvas.width = document.documentElement.clientWidth;
      
        var ctx = canvas.getContext("2d");
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        document.body.appendChild(canvas);
        
        canvas.onclick = () => {
          this.setState({clicked: false, rows: 1, urlBool: false});
          canvas.style.opacity = 0;
          setTimeout(() => canvas.remove(), 200)
          
          

        }
      }
      

    }

    


    render(){
        let text = this.props.value;

        console.log(this.state)
        var urlInput = null
        var urlDisplay;
        var mediaBtns;
        var postBtnDiv;
        if(this.state.urlBool === true){
          urlInput = 
          <div style={{marginTop: '5px'}}>
            <textarea placeholder="Paste your URL" 
              onFocus={this.openOverlay} 
              rows={this.state.rows} 
              style={{width: '100%'}} 
              id="posting_input" 
              name="postText" 
              type='text' className="form-control" 
              id="formGroupExampleInput" aria-label="Default" 
              aria-describedby="inputGroup-sizing-default"
              onChange={this.urlInputChange}/>
            <Button onClick={this.handleURLInput} style={{...{marginTop: '10px'},...{width: '100%'}}} variant="contained" color="primary">
              Verify URL
            </Button>
            {this.state.urlSearching && <LinearProgress />}
          </div>
            

        } else if(this.state.urlBool === false){
          urlInput = false
          urlDisplay = null
        }

        if(this.state.urlBool && this.state.url){
          urlDisplay = 
            <div class="p-4">
              <div className='row card' style={{padding: '10px'}}>
                <a style={{...{color: 'black'}}} href={this.state.url}>
                  <img style={{...{float: 'left'},...{paddingBottom: '10px'}}} src={this.state.urlImg} width="100%"/>
                  <div>
                    <h5>{this.state.urlTitle}</h5>
                  </div>
                </a>
              </div>
            </div>
        } else if(!this.state.urlBool && !this.state.url){
          urlDisplay = null
        }

        if(this.state.clicked === true){
          postBtnDiv = 
            <div className='pt-3 pb-3 row justify-content-md-center'>
              <div className='' style={{...{display: 'inline-block'}}}>
                <PostBtn type='submit' variant="contained" color="secondary">
                  Post
                </PostBtn>
              </div>
            </div>

          mediaBtns = 
          <ButtonGroup      
            size="large"
            aria-label="large outlined secondary button group"
            className="btnGroup"
          >
            <StyledFab color="primary" variant="round" aria-label="delete" size="small" className="btnForm">
              <label for="file-input">
                <PhotoIcon className="iconForm"/>
                Photos
              </label>
              <input id="file-input" type="file"
              class="file-upload" data-cloudinary-field="image_id" onChange={this.fileSelectedHandler}
              data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"/>          
            </StyledFab>
            <StyledFab color="primary" variant="round" aria-label="delete" size="small" className="btnForm"> 
              <PhotoIcon className="iconForm"/>
              Videos
            </StyledFab>
            <StyledFab onClick={()=> this.setState({urlBool: true})} color="primary" variant="round" aria-label="delete" size="small" className="btnForm">
              <PhotoIcon className="iconForm"/>
              URL
            </StyledFab>
          </ButtonGroup>

        } else if(this.state.clicked === false){
          postBtnDiv = null;
          mediaBtns = null;
        }

        
        return(
          
            <div className='posts p-2' id='postForm' ref={this.formRef}>
              <header>
                <div className="p-2">
                  <p id="woym">What's on your mind?</p>
                </div>
              </header>
              <div className="pt-2 p-2">
                <div>
                  <form onSubmit={this.handleSubmit} id='fullPostForm'>
                    <div className='pl-3 pr-3'>
                      <div className=''>
                        <div className=''>
                          <form id='post_form' method='POST' action='/api/posts'>
                            <textarea placeholder="What's up?" 
                                      ref={this.textRef} 
                                      onFocus={this.openOverlay} 
                                      rows={this.state.rows} 
                                      style={{width: '100%'}} 
                                      id="posting_input" 
                                      name="postText" 
                                      type='text' className="form-control" id="formGroupExampleInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={this.handleChange}/>
                            {urlInput}
                          </form>
                          {urlDisplay}
                        </div>
                        <hr/>
                        <div className="postBtns row justify-content-md-center">
                          {mediaBtns}
                        </div>
                    
                        {/* <button id='posting-btn' class='btn btn-primary' style={{width: "100px"}} onClick={this.handleSubmit}>Post</button> */}
                        {postBtnDiv}
                      </div>
                    </div>
                  </form>
                  {/* <button onClick={this.handleImageUpload}>Upload</button> */}

                </div>
              </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth.items,
  username: state.auth.name
})

const StyledFab = withStyles({
  root: {
    borderRadius: 3,
    border: 0,
    width: '168px !important',
    color: 'white',
    padding: '0 30px',
    boxShadow: 'none !important'
  },
  label: {
    textTransform: 'capitalize',
  },
})(Fab);

const PostBtn = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    width: '504px',
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button2);



export default connect(mapStateToProps)(FormPost);