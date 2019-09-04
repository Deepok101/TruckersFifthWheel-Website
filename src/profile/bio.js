import React from 'react';
import CurrentPos from './currentPos'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import EditModal from './editProfile'
import './style.css'

class Bio extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      editMode: false
    }

   
  }

  componentWillMount(){
    this.setState({loaded: true})

  }

  fetchBio(){
    
  }
  
  render(){
    const firstName = window.sessionStorage.getItem('auth_firstName');
    const lastName = window.sessionStorage.getItem('auth_lastName');
    var editbtn;
    if(this.props.editable === true){
      editbtn = 
      <Fab style={{...{position: "absolute"},...{left: '90%'}}} size="small" onClick={() => this.setState({editMode: true})}  aria-label="edit">
        <EditIcon />
      </Fab>

    } else {
      editbtn = null;
    }
      return(
        <div className='card p-4'>
          {editbtn}
          <div className='profileImage ml-2 mt-2'>
            <img className='profileImg' width="200px" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
          </div>
          <div className='bottomimage m-2'>
            <div className=''>
              <div className='profileName'>
                  <h1 className='profileName'>{firstName} {lastName}</h1>
              </div>
              <div className='currentPosition'>
                  <CurrentPos currentPosCompany={this.props.currentPosCompany} currentPosJob={this.props.currentPosJob}/>
              </div>
              <div className='profileBio'>
                  {this.props.description}
              </div>

            </div>
          </div>
          <EditModal userID={this.props.userID} show={this.state.editMode} bio={this.props.description} fname={firstName} lname={lastName} currentPosition={this.props.currentPosJob} company={this.props.currentPosCompany} onHide={() => this.setState({editMode: false})}/>
        </div>
      )
    
  }
   
}

export default (Bio);