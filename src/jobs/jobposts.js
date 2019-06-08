import React from 'react';
import JobModal from './jobmodal'
import './style.css'
import Button from 'react-bootstrap/Button'
import Job from './jobbar'

class Jobposts extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      modalShow: false,
      show: false,
      active: false
    }

    this.onClick = this.onClick.bind(this)
  }


  onClick(){
    this.props.clicked({show: true, name: this.props.jobName, jobDesc: this.props.jobDesc, id: this.props.id});
    this.setState({active: true})
  }
  render(){

    let modalClose = () => this.setState({modalShow: false})
    let wordcount = 20;
    let text = this.props.jobDesc.split(" ");
    for(var i=0; i<text.length - 1; i++){
      text[i] += " "
      if(i==wordcount){
        break
      }
    }
  
    text[wordcount+1] += "...";
    
    return(
      <div>
        <div>
          <div>
            <div className="jobposts p-2" id={this.props.active ? 'activeJob': ''} onClick={this.onClick}>
              <header>
                <span className="pl-2 job">
                  {this.props.jobName}
                </span>
                <div className="pl-2 companyName">
                  {this.props.companyName}
                </div>
                <div className="pl-2 companyName">
                  Montreal (West Island)
                </div>
                
              </header>
              <p className="pt-1 pl-2">
                Type: Class 1 Trucking, experience, good job, flatbed <br/>
                {text.slice(0,wordcount+2)}

              </p> 
            </div>
          </div>
          <div className='col align-self-end'>
            <Job show={this.state.show} />
          </div>
        </div>
        
        <JobModal {...this.props} onHide={modalClose} show={this.state.modalShow}/>
     </div> 
    
    );
  };
}

export default Jobposts;