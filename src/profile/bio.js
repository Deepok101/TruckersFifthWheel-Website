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
          <div className='profileName pb-1'>
              <h1>{firstName} {lastName}</h1>
          </div>
          <div className='currentPosition pb-1'>
              <CurrentPos currentPos={this.props.currentPos}/>
          </div>
          <div className='profileBio'>
              {this.props.description}
          </div> 

        </div>
      )
    
  }
   
}

export default (Bio);