import React from 'react';
import CurrentPos from './currentPos'

import './style.css'

class Bio extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: false
    }

   
  }

  componentWillMount(){
    this.setState({loaded: true})

  }

  fetchBio(){
    
  }
  
  render(){
    const firstName = window.sessionStorage.getItem('auth_firstName');
    const lastName = window.sessionStorage.getItem('auth_lastName');

      return(
        <div className=''>
          <div className='profileName'>
              <h1 className='profileName'>{firstName} {lastName}</h1>
          </div>
          <div className='currentPosition'>
              <CurrentPos currentPosCompany={this.props.currentPosCompany} currentPosJob={this.props.currentPosJob}/>
          </div>
          <div className='profileBio'>
              {this.props.description}
          </div> 

        </div>
      )
    
  }
   
}

export default (Bio);