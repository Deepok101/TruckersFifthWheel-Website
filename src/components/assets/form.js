import React from 'react';
import './feed.css';
import Posts from './posts'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import { connect } from 'react-redux';
import axios from 'axios'


class FormPost extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: '',
                      urlImg: '',
                      urlDescription: '',
                      urlTitle: '',
                      selectedFile: null,
                      image: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
    }

    handleChange(e){
        this.props.changeText(e.target.value);
      }

   

    handleSubmit(e){
        e.preventDefault();
        const auth_firstName = window.sessionStorage.getItem('auth_firstName')
        const auth_lastName = window.sessionStorage.getItem('auth_lastName')
        var text = this.props.value;



        //Check if attached picture
        if(this.state.selectedFile){
          this.checkUser(()=> {
            this.handleImageUpload(auth_firstName, auth_lastName, text)
          })
        }


        //Checks if the text is a URL link
        //If is LINK == true
        if(this.props.value.match(/(?:((?:https?|ftp):\/\/)|ww)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/i) && !this.state.selectedFile){
          fetch(`http://api.linkpreview.net/?key=5cfe73bd77bbaabbb1bd2e7a845085e964f4b386c7157&q=${this.props.value}`)
            .then(res => res.json()).then(data => this.setState({urlTitle: data.title,
                                                                urlDescription: data.description,
                                                                urlImg: data.image,
                                                                url: data.url}))
            .then(() => this.checkUser())
            .then(()=> {
              

              if (!this.state.urlImg){
                let url = {
                  "url": this.props.value
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
                      "author": `${auth_firstName} ${auth_lastName}`,
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
                  "author": `${auth_firstName} ${auth_lastName}`,
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
        } else if(!this.props.value.match(/(?:((?:https?|ftp):\/\/)|ww)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/i) && !this.state.selectedFile){
              this.checkUser(()=>{
                this.handleTextSubmit(auth_firstName, auth_lastName, text);
              })
     
        }

        
    }


    fileSelectedHandler(event){ 
      this.setState({selectedFile: event.target.files[0]})
      
    }

    checkUser(callback){
      const auth_firstName = window.sessionStorage.getItem('auth_firstName')
      const auth_lastName = window.sessionStorage.getItem('auth_lastName')

      fetch('/api/accounts/verify', {
        method: 'POST',
        body: JSON.stringify({"fname": auth_firstName, "lname": auth_lastName}),
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



    render(){
        let text = this.props.value;
        return(
          
            <div className='posts p-2'>
              <header>
                <div className="p-2">
                  <p id="woym">What's on your mind?</p>
                </div>
              </header>
              <div className="pt-2 p-2">
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <div className='pl-3 pr-3'>
                      <div className=''>
                        <div className=''>
                          <form id='post_form' method='POST' action='/api/posts'>
                            <textarea style={{width: '100%'}} id="posting_input" name="postText" type='text' className="form-control" id="formGroupExampleInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" onChange={this.handleChange}/>
                          </form>
                        </div>
                        <div className='pt-3 pb-3'>
                          <div  style={{display: 'inline-block'}}>
                            <input name="file" type="file"
                              class="file-upload" data-cloudinary-field="image_id" onChange={this.fileSelectedHandler}
                              data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"/>                        
                          </div>
                          <div className='' style={{...{display: 'inline-block'},...{float: 'right'}}}>
                            <button id='posting-btn' class='btn btn-primary' style={{width: "100px"}} onClick={this.handleSubmit}>Post</button>
                          </div>
                        </div>
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

export default connect(mapStateToProps)(FormPost);