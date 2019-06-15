import React from 'react';
import './style.css'

class CurrentPos extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: false
    }
   
  }

  componentWillMount(){
    this.setState({loaded: true})
  }
  
  render(){
      return(
        <div className='experience'>
          <div style={{display: 'block'}} >
            <b>
              &nbsp; Title:
            </b>
            &nbsp; Truck Driver 
          </div>             
          <div style={{display: 'block'}} >
            <b>
              &nbsp; Year:
            </b>
            &nbsp; 1999
          </div>            
          <div style={{display: 'inline-block'}} >
            <b>
              &nbsp; Position:
            </b>
            &nbsp; DeepEmploi Class 1 Trucker
          </div>
        </div>
      )
    
  }
   
}

export default (CurrentPos);