import React from 'react';
import JobModal from './jobmodal'
import './style.css'
import Button from 'react-bootstrap/Button'

class Jobpage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      modalShow: false,
      show: false
    }
  }
  render(){

    let modalClose = () => this.setState({modalShow: false})
    if (!this.props.show){
      return(null);
    } else {
      return(
        <div className="" style={{marginLeft: "5%"}}>
          <div className="jobposts p-2" id='jobpage'>
          <header className='pl-2'>
              <span className="job-page ">
                {this.props.jobName}
              </span>
              <div className="companyName-page">
                {this.props.companyName}
              </div>
              <div className="companyName-page">
                Montreal (West Island)
              </div>
          </header>
            <div className="pt-3 p-2">
              <p className="jobDesc">
                {this.props.jobDesc}
              </p>
              <Button variant='primary' onClick={()=>this.setState({modalShow: true})}>More Info</Button>

            </div>
          </div>
          <JobModal {...this.props} onHide={modalClose} show={this.state.modalShow}/>
       </div> 
      
      );
    }
   
  };
}

export default Jobpage