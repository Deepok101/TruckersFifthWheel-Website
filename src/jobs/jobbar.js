import React from 'react';
import JobModal from './jobmodal'
import Alert from 'react-bootstrap/Alert'
import './style.css'
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

class Jobpage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      modalShow: false,
      show: false,
      jobName: "",
      jobDesc: "",
      jobCompany: "",
      user: {
        firstName: null,
        lastName: null,
        email: null,
        userPhoneNumber: null
      },
      fname: "",
      lname: "",
      userID: null,
      applied: false,
      warnFill: false,
      loading: false
    }

    this.success = null;

    this.fetchByID = this.fetchByID.bind(this)
    this.onApplyClick = this.onApplyClick.bind(this)
    this.fetchUserDataFromJWT = this.fetchUserDataFromJWT.bind(this)

  }

  fetchByID(){

    const { match: { params } } = this.props;
    fetch(`/api/jobs/id/${params.id}`).then(res => res.json()).then(data => this.props.load({jobName: data.jobName, 
                                                                                            jobCompany:data.company,
                                                                                            jobDesc: data.jobDescription,
                                                                                            city: data.city
                                                                                            }))
    console.log(this.props.match.params.id)
  }

  componentDidMount(){
    this.fetchByID()

    this.props.history.listen(()=> {
      this.setState({applied: false, warnFill: false})
    })
  }

  onApplyClick(value){
    this.fetchUserDataFromJWT(()=>{
      this.setState(prevState => {
        let user = Object.assign({}, prevState.user)
        user.firstName = value.firstName;
        user.lastName = value.lastName;
        user.email = value.email
        user.userPhoneNumber = value.number;
        return {user}
      })
    }, ()=>{
      var body = {
        "id": this.props.match.params.id,
        "userid": this.state.userID,
        "lname": this.state.user.lastName,
        "fname": this.state.user.firstName,
        "email": this.state.user.email,
        "phone": this.state.user.userPhoneNumber
      }

      if(!this.state.user.lastName || !this.state.user.firstName || !this.state.user.email || !this.state.user.userPhoneNumber)
      {
        this.setState({warnFill: true})
      } 
      else {
        fetch('/api/jobs/apply', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
        },
        }).then(res => res.json()).then(()=> console.log('Applied!'))
          .then(this.setState({applied: true}))
      }
    })
    
  }

  fetchUserDataFromJWT(callback, callback2){
    fetch('/api/accounts/getUserData', {
      method: 'POST',
      headers: {
          'Authorization': `bearer ${window.sessionStorage.getItem('token')}`
      }
    }).then(res => res.json()).then(data => this.setState({fname: data.user.firstName, 
                                                          lname: data.user.lastName,
                                                          userID: data.user._id})).then(() => callback()).then(() => callback2())
  }


  render(){
    console.log(this.state)
    let modalClose = () => this.setState({modalShow: false})
    // if (!this.props.show){
    //   return(null);
    // } else {
    ;
    let input;
    let success;
    let activity;
    let message;
    if(this.state.applied === true){
      success = <Alert variant='success'>Successfully applied!</Alert>;
      activity = true;
      message = "You have successfully applied!";
    } 

    if(this.state.applied === false){
      success = null;
      activity = false;
      message = "Interested in the job? Apply now!";
    }

    if(this.state.warnFill === true){
      success = <Alert variant='danger'>Please fill in all fields!</Alert>;
    }
    
      return(
        <div className="" style={{marginLeft: "15px"}}>
          <div className="jobbar p-2" id='jobpage'>
          <header className='pl-2'>
              <span className="job-page ">
                {this.props.jobName}
              </span>
              <div className="companyName-page">
                {this.props.jobCompany}
              </div>
              <div className="companyName-page">
                {this.props.city}
              </div>
          </header>
            <div className="pt-3 p-2">
              <p className="jobDesc">
                {this.props.jobDesc}
              </p>
              <Button variant='primary' onClick={()=>this.setState({modalShow: true})}>Apply</Button>

            </div>
          </div>
          <JobModal {...this.props} 
          applied={success}
          apply={this.onApplyClick}
          status={activity}
          message={message}
          onHide={modalClose} show={this.state.modalShow}/>
       </div> 
      
      );
    // }
   
  };
}

export default withRouter(Jobpage)