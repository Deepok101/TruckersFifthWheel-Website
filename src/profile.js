import React from 'react';
import NavBar from "./components/navbar";
import PastExperience from './profile/pastExp'
import Bio from './profile/bio'
import Nav from './profile/nav'
import Posts from './components/assets/posts'
import UserPosts from './profile/posts'
import Button from 'react-bootstrap/Button'
import './profile/style.css'


class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      bio: null,
      currentPos: "",
      firstName: "",
      lastName: "",
      userID: null,
      posts: [],
      highlights: [],
      experience: [],
      editMode: false
    }
    this.getUserDataFromJWT = this.getUserDataFromJWT.bind(this)
    this.getUserData = this.getUserData.bind(this)

    this.fetchUserPosts = this.fetchUserPosts.bind(this)
    this.handleNavClick = this.handleNavClick.bind(this)
    this.handleHighlightChange = this.handleHighlightChange.bind(this)
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

  componentWillMount(){
    this.setState({loaded: true})
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
                                                          firstName: data.firstName,
                                                          lastName: data.lastName,
                                                          userID: data._id})).then(()=> callback())
  }
  fetchUserPosts(){
    fetch(`/api/posts/${this.state.userID}`)
      .then(res => res.json())
      .then(data => this.setState({posts: data}))
  }

  submitUpdate(){
    let body = {
      "id": this.state.userID,
      "bio": this.state.bio,
      "currentPosition": this.state.currentPos,
      "experience": this.state.experience,
      "highlights": this.state.highlights
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
    console.log(a)
  }
  handleHighlightAdd(){
    let a = this.state.highlights;
    a.push("");
    this.setState({highlights: a})
  }

  //Handle experience changes
  handleExperienceChange(e){
    let a = this.state.experience;
    let att = e.target.name
    a[e.target.className][att] = e.target.value
    this.setState({experience: a})
    console.log(this.state.experience[e.target.className])
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
      width: "100%",
      padding: "5px",
      borderRadius: "5px",
      border: "1px solid #8f8f8f",
      boxSizing: "border-box",
      marginBottom: "5px"
    }

    if(this.state.editMode === false){
      var bool = true
      var submitBtn = null
      var highlight = this.state.highlights.map(value => 
        <li>
          {value}
        </li>
      )
      var editTextArea = (value) => {
        return value
      }
      var editInput = (value) => {
        return value
      }
      var button = (func) => {
        return null
      }
      var experience = this.state.experience.map(experience => 
        <PastExperience title={experience.title} year={experience.year} position={experience.position} description={experience.description}/>
      )
    }
    if(this.state.editMode === true){
      var bool = false;
      var submitBtn = <Button variant="success" onClick={this.submitUpdate}>Submit</Button>
      var highlight = this.state.highlights.map((value, index) => 
        <li>
          <input onChange={this.handleHighlightChange} id={index} style={inputEditStyle} value={value}/>
        </li>
      )
      var editTextArea = (value) => {
        return <textarea onChange={this.handleBioChange} ref={this.BioRef} style={inputEditStyle} rows='5' value={value}></textarea>
      }

      var editInput = (value, name, func, index) => {
        return <div><input onChange={func} value={value} style={inputEditStyle} className={index} name={name}/></div>
      }
    
      var button = (func) => {
        return <Button variant="primary" onClick={func}>Add</Button>
      }
      var experience = this.state.experience.map((experience, index) => {
        let func = this.handleExperienceChange
        return <PastExperience title={editInput(experience.title, "title", func,  index)} year={editInput(experience.year, "year", func, index)} position={editInput(experience.position, "position", func, index)} description={editInput(experience.description, "description", func, index)}/>
        }
      )
    }
    
    console.log(this.state)
    //Edit Profile 
    
    
    if(this.state.loaded === true){
    return (
        <div>
          <NavBar fifth='active' company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
          <div class='div-fadeIn container mt-4'>
          <Nav clicked={this.handleNavClick}/>

            <div className=''>
              <div className='card p-4'>
              <Button onClick={()=> this.setState({editMode: bool})}variant="primary" style={{...{position: "absolute"},...{left: '90%'}}}>Edit</Button>

                <div className='profileImage ml-2 mt-2'>
                  <img className='profileImg' width="200px" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
                </div>
                <div className='bottomimage m-2'>
                  <Bio currentPosCompany={editInput(this.state.currentPos.company, "company", this.handleCurrentPosChange)} currentPosJob={editInput(this.state.currentPos.job, "job", this.handleCurrentPosChange)} description={editTextArea(this.state.bio)}/>
                </div>
              </div>
              
              <div className='card p-4 mt-3'>
                <div className='bottomImage ml-2 mr-2'>
                  <div className='highlights'>
                    <h2>Skills and Highlights</h2>
                      <ul className='experience' style={{...{columns: 5},...{fontSize: '1.08em'},...{lineHeight: '1.6'}}}>
                        {highlight}
                      </ul>
                      <div className='p-2'>
                        {button(this.handleHighlightAdd)}

                      </div>
                  </div>
                </div>
              </div>

              <div className='card p-4 mt-3'>
                <div className='bottomImage ml-2 mr-2'>
                  <div className='education'>
                    <h2>Education</h2>
                    <p style={{fontSize: '1.05em'}}>
                      Centre de Formation du Transport Routier (CFTR)
                    </p>
                  </div>
                </div>
              </div>

              <div className='card p-4 mt-3'>
                <div className='bottomImage ml-2 mr-2'>
                  <div className='pastExperience'>
                    <h2>Experience</h2>
                    {experience}
                    <div className='p-2'> 
                      {button(this.handleExperienceAdd)}

                    </div>

                  </div>
                </div>
              </div>
              
            {submitBtn}
            </div>
            <div ref={this.DivtoFocus} className='allposts pt-5'>
              <div className='card ml-auto mr-auto' style={{...{backgroundColor: 'white'},...{textAlign: 'center'},...{padding: "25px 0"},...{width: '570px'}}}>
                <h1>Your Feed</h1>
              </div>
              {posts}
            </div>
          </div>
      
        </div>
        
    

    )
    } else {
        return <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>

    }
  }
   
}

export default (Profile);