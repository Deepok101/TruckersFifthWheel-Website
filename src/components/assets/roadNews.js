import React from 'react';
import Button from 'react-bootstrap/Button';
import AlertModal from './alertModal'


class RoadAlert extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show: false
    }
    
    this.onClick = this.onClick.bind(this)
  }
    componentDidMount(){
    
    }
    
    onClick(){
      this.setState({show: true})
    }


    render(){
      let modalClose = () => this.setState({show: false})
      return(
        <div className='sidecards card p-3' style={{height: ''}}>
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
                <Button variant='primary' onClick={this.onClick}>Notify Us!</Button>
                <AlertModal onHide={modalClose} show={this.state.show}/>
            </div>
          </div>  
        </div>

      );
    }

}

export default RoadAlert;