import React from 'react';
import JobModal from './jobmodal'
import './style.css'
import Button from 'react-bootstrap/Button'

class Jobpage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      modalShow: false,
      show: false,
      jobName: "",
      jobDesc: "",
      jobCompany: ""
    }

    this.fetchByID = this.fetchByID.bind(this)
  }

  fetchByID(){

    const { match: { params } } = this.props;
    fetch(`/api/jobs/id/${params.id}`).then(res => res.json()).then(data => this.props.load({jobName: data.jobName, 
                                                                                                   jobCompany:data.company,
                                                                                                   jobDesc: data.jobDescription
                                                                                                  }))
    console.log(this.props.match.params.id)
  }

  componentDidMount(){
    this.fetchByID()
  }



  render(){

    let modalClose = () => this.setState({modalShow: false})
    // if (!this.props.show){
    //   return(null);
    // } else {
      return(
        <div className="" style={{marginLeft: "5%"}}>
          <div className="jobposts p-2" id='jobpage'>
          <header className='pl-2'>
              <span className="job-page ">
                {this.props.jobName}
              </span>
              <div className="companyName-page">
                {this.props.jobCompany}
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
    // }
   
  };
}

export default Jobpage