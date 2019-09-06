import React from 'react';
import NavBar from "./components/navbar";
import PastExperience from './profile/pastExp'
import Bio from './profile/bio'
import Highlights from './profile/highlights'
import Nav from './profile/nav'
import Posts from './components/assets/posts'
import UserPosts from './profile/posts'
import Button from 'react-bootstrap/Button'
import ButtonMUI from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Education from './profile/education'
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Experience from './profile/experience'
import {
  withRouter
} from 'react-router-dom'

import './profile/style.css'
import ContentLoader, { Facebook } from 'react-content-loader'

class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      bio: null,
      currentPos: {
        company: "",
        job: ""
      },
      firstName: "",
      lastName: "",
      userID: null,
      posts: [],
      highlights: [],
      experience: [],
      education: [],
      editMode: false
    }
    this.getUserDataFromJWT = this.getUserDataFromJWT.bind(this)
    this.getUserData = this.getUserData.bind(this)

    this.fetchUserPosts = this.fetchUserPosts.bind(this)
    this.handleNavClick = this.handleNavClick.bind(this)
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleHighlightChange = this.handleHighlightChange.bind(this)
    this.handleHighlightRemove = this.handleHighlightRemove.bind(this)
    this.handleHighlightAdd = this.handleHighlightAdd.bind(this)
    this.handleExperienceChange = this.handleExperienceChange.bind(this)
    this.handleExperienceAdd = this.handleExperienceAdd.bind(this)
    this.handleBioChange = this.handleBioChange.bind(this)
    this.handleCurrentPosChange = this.handleCurrentPosChange.bind(this)
    this.submitUpdate = this.submitUpdate.bind(this)

    this.DivtoFocus = React.createRef();
    this.BioRef = React.createRef();
    this.HighlightRef = React.createRef();


  }

  componentDidMount(){
    this.getUserDataFromJWT(()=> {
      this.getUserData(()=>{
        this.fetchUserPosts()
      })
    });
  }

  getUserDataFromJWT(callback){
    fetch('/api/accounts/getUserData', {
      method: 'POST',
      headers: {
          'Authorization': `bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then(res => res.json()).then(data => this.setState({firstName: data.user.firstName, 
                                                          lastName: data.user.lastName,
                                                          userID: data.user._id, })).then(()=>callback())
  }
  getUserData(callback){
    if(this.state.userID){
      if(this.props.editable === false){
        this.setState({userID: this.props.match.params.id})
      }
      var body = {
        "id": this.state.userID
      }
      fetch('/api/accounts/profile', {
        method:"POST",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => this.setState({bio: data.profile.bio, 
                                                            currentPos: data.profile.currentPosition, 
                                                            highlights: data.profile.highlights, 
                                                            experience: data.profile.experience,
                                                            education: data.profile.education,
                                                            firstName: data.firstName,
                                                            lastName: data.lastName,
                                                            
                                                            loaded: true})).then(()=> callback())
    }
    
  }
  fetchUserPosts(){
    fetch(`/api/posts/${this.state.userID}`)
      .then(res => res.json())
      .then(data => this.setState({posts: data}))
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  submitUpdate(){

    let body = {
      "id": this.state.userID,
      "bio": this.state.bio,
      "currentPosition": this.state.currentPos,
      "experience": this.state.experience,
      "highlights": this.state.highlights.filter(el => el !== ""),
      "education": this.state.education
    }
    fetch('api/accounts/update', {
      method:"POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
    }
    }).then(res => res.json()).then((res)=> console.log(res)).then(()=> window.location.reload())
  }

  //Handle Highlight changes
  handleHighlightChange(e){
    let a = this.state.highlights;
    a.splice(e.target.id, 1, e.target.value)
    this.setState({highlights: a})
  }
  handleHighlightRemove(index){
    var a = this.state.highlights
    a.splice(index, 1, "")
    this.setState({highlights: a})
  }

  handleHighlightAdd(){
    let a = this.state.highlights;
    a.push("");
    this.setState({highlights: a})
  }
 
  handleAdd(section, state){
    let a = section;
    let obj = {};
    obj[state] = a
    a.push("");
    this.setState(obj)
  }

  handleChange(e, section, state){
    let a = section;
    let obj = {};
    a.splice(e.target.id, 1, e.target.value)
    obj[state] = a
    this.setState(obj)
  }

  //Handle experience changes
  handleExperienceChange(e){
    let a = this.state.experience;
    let att = e.target.name
    a[e.target.id][att] = e.target.value
    this.setState({experience: a})
  }

  handleExperienceAdd(){
    let a = this.state.experience;
    let obj = {
      "title": "",
      "year": "",
      "position": "",
      "description":""
    }
    a.push(obj)
    this.setState({experience: a})
  }

  //Handle Bio Changes
  handleBioChange(e){
    this.setState({bio: e.target.value})
  }

  //Handle Current Position Changes 
  handleCurrentPosChange(e){
    let a = this.state.currentPos;
    a[e.target.name] = e.target.value
    this.setState({currentPos: a})
  }


  handleNavClick(){
    if(this.DivtoFocus.current){
      this.DivtoFocus.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }
  }
  
  render(){

    let posts = this.state.posts.map((data)=>
        <Posts  urlTitle={data.urlTitle} 
                url={data.url} 
                imgUrl={data.urlImg} 
                urlDesc={data.urlDescription} 
                comments={data.comments} 
                likedByAcc={data.likedByAcc} 
                likes={data.likes} 
                id={data._id} 
                accountName={data.author} 
                text={data.text} 
                date={data.date}
                image={data.image}/>
    );

    
    var inputEditStyle = {
      width: '100%',
      borderRadius: "5px",
      border: "1px solid #8f8f8f",
      boxSizing: "border-box",
    }
    if(this.props.editable === false){
      var submitBtn = null
     
    }
  
    if(this.state.editMode === true && this.props.editable === true){
     
    }
    
    if(this.state.loaded === false){
      return(
        <div>
          <NavBar fifth='active' company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
          <div class='div-fadeIn container mt-4'>
          <Nav clicked={this.handleNavClick}/>
            <div>
              <div className='card p-4'>
                <ContentLoader>
                  <rect x="0" y="0" rx="3" ry="3" width="70" height="70" />
                  <rect x="0" y="80" rx="3" ry="3" width="50" height="5" />
                  <rect x="0" y="90" rx="3" ry="3" width="50" height="5" />
                  <rect x="0" y="100" rx="3" ry="3" width="60" height="5" />
                  <rect x="0" y="110" rx="3" ry="3" width="30" height="5" />
                </ContentLoader>
              </div>
              <div className='card p-4 mt-3'>
                <div className='bottomImage ml-2 mr-2'>
                  <div className='highlights'>
                    <h2>Skills and Highlights</h2>
                      <ContentLoader height="40" style={{marginTop: '10px'}}>
                        <rect x="0" y="0" rx="3" ry="3" width="60" height="5" />
                        <rect x="70" y="0" rx="3" ry="3" width="60" height="5" />
                        <rect x="140" y="0" rx="3" ry="3" width="60" height="5" />
                        <rect x="210" y="0" rx="3" ry="3" width="60" height="5" />
                        <rect x="280" y="0" rx="3" ry="3" width="60" height="5" />

                        <rect x="0" y="15" rx="3" ry="3" width="60" height="5" />
                        <rect x="70" y="15" rx="3" ry="3" width="60" height="5" />
                        <rect x="140" y="15" rx="3" ry="3" width="60" height="5" />
                        <rect x="210" y="15" rx="3" ry="3" width="60" height="5" />
                        <rect x="280" y="15" rx="3" ry="3" width="60" height="5" />

                        <rect x="0" y="30" rx="3" ry="3" width="60" height="5" />
                        <rect x="70" y="30" rx="3" ry="3" width="60" height="5" />
                        <rect x="140" y="30" rx="3" ry="3" width="60" height="5" />
                        <rect x="210" y="30" rx="3" ry="3" width="60" height="5" />
                        <rect x="280" y="30" rx="3" ry="3" width="60" height="5" />
                      </ContentLoader>
                  </div>
                </div>
              </div>

              <div className='card p-4 mt-3'>
                <div className='bottomImage ml-2 mr-2'>
                  <div className='education'>
                    <h2>Education</h2>
                    <ContentLoader height="15">
                      <rect x="0" y="5" rx="3" ry="3" width="150" height="5" />
                    </ContentLoader>
                  </div>
                </div>
              </div>

              <div className='card p-4 mt-3'>
                <div className='bottomImage ml-2 mr-2'>
                  <div className='pastExperience'>
                    <h2>Experience</h2>
                    <ContentLoader height="150">
                      <rect x="0" y="5" rx="3" ry="3" width="70" height="5" />
                      <rect x="0" y="15" rx="3" ry="3" width="50" height="5" />
                      <rect x="0" y="25" rx="3" ry="3" width="400" height="5" />
                      <rect x="0" y="35" rx="3" ry="3" width="400" height="5" />

                      <rect x="0" y="55" rx="3" ry="3" width="70" height="5" />
                      <rect x="0" y="65" rx="3" ry="3" width="50" height="5" />
                      <rect x="0" y="75" rx="3" ry="3" width="400" height="5" />
                      <rect x="0" y="85" rx="3" ry="3" width="400" height="5" />

                      <rect x="0" y="105" rx="3" ry="3" width="70" height="5" />
                      <rect x="0" y="115" rx="3" ry="3" width="50" height="5" />
                      <rect x="0" y="125" rx="3" ry="3" width="400" height="5" />
                      <rect x="0" y="135" rx="3" ry="3" width="400" height="5" />
                    </ContentLoader>

                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      )
    }
    
    if(this.state.loaded === true){
    return (
        <div>
          <NavBar fifth='active' company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
          <div class='div-fadeIn container mt-4'>
          
          <Nav clicked={this.handleNavClick}/>

            <div className=''>

              <Paper>
                <Bio userID={this.state.userID} editable={this.props.editable} currentPosCompany={this.state.currentPos.company} currentPosJob={this.state.currentPos.job} description={this.state.bio}/>
              </Paper>
              <Paper>
                <Highlights userID={this.state.userID} editable={this.props.editable} highlights={this.state.highlights} />
              </Paper>
              <Paper>
                <Education userID={this.state.userID} editable={this.props.editable} education={this.state.education}/>
              </Paper>
              <Paper>
                <Experience experience={this.state.experience} editable={this.props.editable} userID={this.state.userID}/>
              </Paper>

            {submitBtn}
            </div>
            {/* <div ref={this.DivtoFocus} className='allposts pt-5'>
              <div className='card ml-auto mr-auto' style={{...{backgroundColor: 'white'},...{textAlign: 'center'},...{padding: "25px 0"},...{width: '570px'}}}>
                <h1>Your Feed</h1>
              </div>
              {posts}
            </div> */}
          </div>
        </div>
        
    

    )
    } else {
        return <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>

    }
  }
   
}

export default withRouter(Profile);