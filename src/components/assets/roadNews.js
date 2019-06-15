import React from 'react';
import Button from 'react-bootstrap/Button';


class RoadAlert extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      
    }
  
  }
    componentDidMount(){
    
    }
    

    render(){
      
      return(
        <div className='card p-3' style={{height: ''}}>
          <div style={{textAlign: 'left'}}>
            <h5>
              Road Alerts 
            </h5>
            <div>
                <p>
                    Construction
                </p>
                <p>
                    Accidents
                </p>
                <p>
                    Traffic Jams
                </p>
                <p>
                    Construction
                </p>
            </div>
            <div style={{textAlign: 'center'}}>
                <hr></hr>
                <p>
                    Found any road alerts?
                </p>
                <Button variant='primary'>Notify Us!</Button>
            </div>
          </div>  
        </div>

      );
    }

}

export default RoadAlert;