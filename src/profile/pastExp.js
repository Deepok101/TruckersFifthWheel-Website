import React from 'react';
import './style.css'

import BusinessSharpIcon from '@material-ui/icons/BusinessSharp';

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
        <div className='row' style={{padding: 0}}>
          <div className='col-1 ' style={{paddingRight: 0}}>
            <BusinessSharpIcon color='disabled' style={{...{width: 60},...{height: 60}}} fontSize="large"/>
          </div>
          <div className='col-11' style={{paddingLeft: 7}}>
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
        </div>
      )
    
  }
   
}

export default (CurrentPos);