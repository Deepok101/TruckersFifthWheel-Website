import React from 'react';
import NavBar from "./components/navbar";
import PastExperience from './profile/pastExp'
import Bio from './profile/bio'
import Highlights from './profile/highlights'
import EditHighlights from './profile/editHighlights'
import Nav from './profile/nav'
import Posts from './components/assets/posts'
import Paper from '@material-ui/core/Paper';
import Education from './profile/education'
import EditEducation from './profile/editEducation'
import Experience from './profile/experience'
import EditExperience from './profile/editExperience'
import {
  withRouter
} from 'react-router-dom'
import './profile/style.css'
import ContentLoader, { Facebook } from 'react-content-loader'
import ProfileSection from './profile/section'
import SchoolSharpIcon from '@material-ui/icons/SchoolSharp';

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
      editMode: false,
      editSection: ""
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

    this.changeEditSection = this.changeEditSection.bind(this);
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

  changeEditSection(section){
    this.setState({editSection: section});
  }
  
  render(){
    if(this.props.editable === false){
      var submitBtn = null
     
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
      //Get highlights
      var highlights;
      if(this.state.highlights == null){
          highlights = null;
      }
      else {
          highlights = this.state.highlights.map(value => 
              <li className='highlightChip'>
                {value}
              </li>
            )
      } 

      //Get education
      let education = this.state.education.map(educ => 
        <div className='row'>
          <div className='col-1'  style={{paddingRight: 0}}>
            <SchoolSharpIcon color='disabled' style={{...{width: 60},...{height: 60}}} fontSize="large"/>
          </div>
          <ul className='col-11' style={{paddingLeft: 7}}>
            <li style={{...{fontSize: '1.2em'},...{fontWeight: 'bold'}}}>
                {educ.institutionName}
            </li>
            <li style={{fontSize: '0.9em'}}>
                {educ.institutionType}
            </li>
            <li style={{fontSize: '0.9em'}}>
                {educ.years}
            </li>
          </ul>
        </div>
        
      )

      //Get Experience
      if(this.state.experience !== null){
        var experience = this.state.experience.map(experience => 
            <PastExperience title={experience.title} year={experience.year} position={experience.position} description={experience.description}/>
        )
      } else {
          var experience = null;
      }

    return (
        <div>
          <NavBar fifth='active' company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
          <div class='div-fadeIn container mt-4'>
          
          <Nav clicked={this.handleNavClick}/>

            <div className=''>

              <Paper>
                <Bio userID={this.state.userID} editable={this.props.editable} currentPosCompany={this.state.currentPos.company} currentPosJob={this.state.currentPos.job} description={this.state.bio}/>
              </Paper>
              {/* <Paper>
                <Highlights userID={this.state.userID} editable={this.props.editable} highlights={this.state.highlights} />
              </Paper>
              <Paper>
                <Education userID={this.state.userID} editable={this.props.editable} education={this.state.education}/>
              </Paper>
              <Paper>
                <Experience experience={this.state.experience} editable={this.props.editable} userID={this.state.userID}/>
              </Paper> */}

              <ProfileSection title="Skills and Highlights" editable={this.props.editable}
                sectionName="highlights"
                content={
                  <ul className='experience' style={{...{columns: 5},...{fontSize: '1.08em'},...{lineHeight: '1.6'}}}>
                    {highlights}
                  </ul>
                }
                editSection={this.changeEditSection} //Changes the editSection state to "highlight" which opens the modal

                editModal={<EditHighlights userID={this.state.userID} highlights={this.state.highlights} 
                                            show={(this.state.editSection == "highlights") ? true: false} 
                                            onHide={() => this.setState({editSection: ""})}/>
              }

              />

              <ProfileSection title="Education" editable={this.props.editable}
                sectionName="education"
                content={
                  <ul className='ml-2'>
                    {education}
                  </ul>
                }
                editSection={this.changeEditSection} //Changes the editSection state to "highlight" which opens the modal

                editModal={<EditEducation education={this.state.education}
                                            userID={this.state.userID}
                                            show={(this.state.editSection == "education") ? true: false} 
                                            onHide={() => this.setState({editSection: ""})}/>
              }

              />

              <ProfileSection title="Experience" editable={this.props.editable}
                sectionName="experience"
                content={experience}
                
                editSection={this.changeEditSection} //Changes the editSection state to "highlight" which opens the modal

                editModal={<EditExperience  experience={this.state.experience}
                                            userID={this.state.userID}
                                            show={(this.state.editSection == "experience") ? true: false} 
                                            onHide={() => this.setState({editSection: ""})}/>
              }

              />

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