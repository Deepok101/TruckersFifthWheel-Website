import React from 'react';
import NavBar from "../components/navbar";
import Nav from './nav'
import Posts from '../components/assets/posts'

class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      bio: "",
      currentPos: "",
      firstName: "",
      lastName: "",
      userID: null,
      posts: []
    }
    this.getUserDataFromJWT = this.getUserDataFromJWT.bind(this)
    this.fetchUserPosts = this.fetchUserPosts.bind(this)
    this.handleNavClick = this.handleNavClick.bind(this)

  }

  componentWillMount(){
    this.setState({loaded: true})
  }
  componentDidMount(){
    this.getUserDataFromJWT(()=> {
      this.fetchUserPosts()
    })
    

    console.log(this.state.bio)

  }

  getUserDataFromJWT(callback){
    fetch('/api/accounts/getUserData', {
      method: 'POST',
      headers: {
          'Authorization': `bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then(res => res.json()).then(data => this.setState({firstName: data.user.firstName, 
                                                          lastName: data.user.lastName,
                                                          userID: data.user._id,
                                                          bio: data.user.profile.bio,
                                                          currentPos: data.user.profile.currentPosition})).then(()=>callback())
  }

  fetchUserPosts(){
    fetch(`/api/posts/${this.state.userID}`)
      .then(res => res.json())
      .then(data => this.setState({posts: data}))
  }
  

  render(){
    console.log(this.state.posts)

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

    if(this.state.loaded === true){
    return (
        <div>
          <NavBar first='active' company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
         
          <div class='div-fadeIn container mt-5'>
            <Nav/>
            <div ref={this.DivtoFocus} className='allposts'>
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