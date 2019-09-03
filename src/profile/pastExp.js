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
            <b className="experienceTitle">
            {this.props.title}
            </b>
          </div>   
          <div style={{display: 'block'}} >
        
            {this.props.position}
          </div>          
          <div style={{display: 'block'}} >
      
            <div className="experienceDesc">
              {this.props.year}
            </div>
          </div>            
          <div style={{display: 'block'}} >
            <b>
              
            </b>
            <div className="experienceDesc">
              {this.props.description}
            </div>
          </div>
          <hr/>
        </div>
      )
    
  }
   
}

export default (CurrentPos);