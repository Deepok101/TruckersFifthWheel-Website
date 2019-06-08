import React from 'react';
import NavBar from "./components/navbar";
import Jobpost from './jobs/jobposts'
import JobForm from './jobs/searchForm'
import Job from './jobs/jobbar'
import JobFilter from './jobs/filter'

import './style/home.css'


class Jobpage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      laoded: false,
      clicked: false,
      jobs: [],
      jobName: "",
      jobDesc: "",
      id: 0

    }

    this.fetchJobs = this.fetchJobs.bind(this);
    this.onClick = this.onClick.bind(this);
    this.isActive = this.isActive.bind(this);

  }
  
  fetchJobs(){
    fetch('/api/jobs').then(res => res.json()).then(data => this.setState({jobs: data}))
  }

  componentWillMount(){
    this.setState({loaded: true})
    this.fetchJobs()
  }
  
  onClick(e){
    this.setState({clicked: e.show, jobName: e.name, jobDesc: e.jobDesc, id: e.id});
    
  }
  isActive(id){
    return this.state.id === id
  }

  render(){
    let jobposts = this.state.jobs.map(job => 
      <Jobpost active={this.isActive(job._id)} id={job._id} clicked={this.onClick} jobName={job.jobName} companyName={job.company} jobDesc={job.jobDescription} />
      )
    console.log(this.state.jobDesc)


    if(this.state.loaded === true){
    return (
        <div>
          <NavBar first='active' company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
          <JobForm/>
          
          <div className='container-fluid'>
            <div className='row' >
              <JobFilter/>
              <div className='row' style={{...{marginLeft: "20px"},...{marginRight: 'auto'}}}> 
                <div className=''>
                  <div className='jobContainer div-fadeIn' style={{marginTop: '20px'}}>
                    {jobposts}
                  </div>
                </div>
                <div className='' style={{marginTop: '20px'}}>
                  <Job jobDesc={this.state.jobDesc} show={this.state.clicked} jobName={this.state.jobName}/>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
        
    

    )
    } else {
        return <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>

    }
  }
   
}

export default (Jobpage);