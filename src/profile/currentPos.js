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
        <div className='bioPos'>
          {/* <img style={{display: 'inline-block'}} height="50px" src={require('../homepage/icons/truck.png')} /> */}
          <p className='bioPos' style={{float: ''}} >
            Montreal, Quebec
          </p>
          <p className='bioPos' style={{display: 'inline-block'}} >
            {this.props.currentPosJob} at  {this.props.currentPosCompany}
          </p>
          <p className='bioEducation' style={{float: 'right'}} >
            Centre de Formation du Transport Routier (CFTR)
          </p>
          
        </div>
      )
    
  }
   
}

export default (CurrentPos);