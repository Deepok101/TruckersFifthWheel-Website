import React from 'react';
import NavBar from "./components/navbar";
import Jobpost from './jobs/jobposts'
import JobForm from './jobs/searchForm'
import Job from './jobs/jobbar'
import JobFilter from './jobs/filter'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import './style/home.css'


class Jobpage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      laoded: false,
      clicked: false,
      jobs: [],
      company: "",
      jobName: "",
      jobDesc: "",
      city: "",
      id: 0
    }

    this.fetchJobs = this.fetchJobs.bind(this);
    this.onClick = this.onClick.bind(this);
    this.isActive = this.isActive.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLocationFilterClick = this.onLocationFilterClick.bind(this);

  }
  
  fetchJobs(){
    fetch('/api/jobs').then(res => res.json()).then(data => this.setState({jobs: data}))
  }

  onLoad(data){
    this.setState({jobName: data.jobName, jobDesc: data.jobDesc, city: data.city});
    console.log(data.jobName);
  }

  onFilterClick(value){
    fetch(`/api/jobs/salary/${value}`).then(res => res.json()).then(data => this.setState({jobs: data}))
  }

  onLocationFilterClick(value){
    fetch(`/api/jobs/search/location/${value}`).then(res => res.json()).then(data => this.setState({jobs: data}));
  }
  
  onClick(e){
    this.setState({clicked: e.show, jobName: e.name, jobDesc: e.jobDesc, id: e.id, city: e.city, company: e.company});
  }

  onSubmit(value){
    fetch(`/api/jobs/search/location/${value}`).then(res => res.json()).then(data => this.setState({jobs: data}));
  }

  isActive(id){
    return this.state.id === id
  }


  userApplied(){

  }

  componentWillMount(){
    this.setState({loaded: true})
    this.fetchJobs()

  }

  render(){
    if(this.state.jobs !== undefined){
      var jobposts = this.state.jobs.map(job => { 
        return <Jobpost city={job.city} active={this.isActive(job._id)} id={job._id} clicked={this.onClick} jobName={job.jobName} companyName={job.company} jobDesc={job.jobDescription} />
      })
    }
    if(this.state.jobs.length == 0){
      var jobposts =  <div className='jobposts p-2'>
                        <div className="pl-2 job">
                          No jobs found sorry!
                        </div>
                      </div>
    }
    

    console.log(this.state.jobs)

    if(this.state.loaded === true){
    return (
        <div>
          <NavBar first='active' company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>
          <JobForm handleSubmit={this.onSubmit}/>
          
          <div>
            <table>
              <tbody>
                <tr valign="top">
                  <td className=''>
                    <JobFilter locationFilter={this.onLocationFilterClick} salaryFilter={this.onFilterClick}/>
                  </td>
                  <td className='jobColumn'>
                      <div className='jobContainer div-fadeIn' style={{marginTop: '0px'}}>
                        {jobposts}
                      </div>
                  </td>
                  <td className='jobColumn'>
                      {/* <Job jobDesc={this.state.jobDesc} show={this.state.clicked} jobName={this.state.jobName}/> */}
                      <Route path='/job/:id' render={(props) => <Job {...props} city={this.state.city} load={this.onLoad} jobCompany={this.state.company} jobDesc={this.state.jobDesc} show={this.state.clicked} jobName={this.state.jobName}/>}/>

                  </td>
                </tr>

              </tbody>
            </table>

          </div>
          
        </div>
        
    

    )
    } else {
        return <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="Chat" fourthSection="Contact Us"/>

    }
  }
   
}

export default (Jobpage);