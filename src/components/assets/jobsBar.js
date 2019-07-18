import React from 'react';
import Button from 'react-bootstrap/Button';
import {
  Link
} from 'react-router-dom'

class JobsBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      jobs:  []
    }
    this.fetchJobs = this.fetchJobs.bind(this)
  }
    componentDidMount(){
        this.fetchJobs()
    }
    
    fetchJobs(){
        fetch('/api/jobs').then(res => res.json()).then(data => this.setState({jobs: data}))
    }

    render(){
    let jobs = this.state.jobs.map(data => 
            <Link style={{...{display: 'block'},...{color: 'black'}}} to={`/job/${data._id}`}>{data.jobName}</Link>
        )


      return(
        <div className='card p-3 sidecards' style={{marginTop: '0px'}}>
          <div style={{textAlign: 'left'}}>
            <h5>
            View Jobs
            </h5>
            <div style={{marginTop: '15px'}}>
                {jobs}
               
            </div>
            <div style={{textAlign: 'center'}}>
                <hr></hr>
                <p>
                    Are you an employer?
                </p>
                <Button variant='primary'>Post a Job</Button>
            </div>
          </div>  
        </div>

      );
    }

}

export default JobsBar;