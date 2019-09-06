import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import EditEducation from './editEducation'
import PastExperience from './pastExp'
import EditExperience from './editExperience'
export default class Experience extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            
        }

    }




    render(){
        if(this.props.experience !== null){
            var experience = this.props.experience.map(experience => 
                <PastExperience title={experience.title} year={experience.year} position={experience.position} description={experience.description}/>
            )
        } else {
            var experience = null;
        }

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
            <div style={{position: 'relative'}}  className='p-4 mt-3'>
                {editbtn}
                <div className='bottomImage ml-2 mr-2'>
                  <div className='pastExperience'>
                    <h4 style={{fontWeight: 'normal'}}>Experience</h4>
                    {experience}
                    <div className='p-2'> 
                    </div>
                    <EditExperience show={this.state.editMode} hide={() => this.setState({editMode: false})}/>
                  </div>
                </div>
              </div>
        )
    }
}