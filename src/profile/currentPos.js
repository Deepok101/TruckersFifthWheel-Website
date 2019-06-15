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
          <img style={{display: 'inline-block'}} height="50px" src={require('../homepage/icons/truck.png')} />
          <p style={{display: 'inline-block'}} >
            <b>
              &nbsp; Current Position:
            </b>
            &nbsp; {this.props.currentPos}
          </p>
        </div>
      )
    
  }
   
}

export default (CurrentPos);