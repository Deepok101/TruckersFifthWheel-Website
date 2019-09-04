import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import EditEducation from './editEducation'

export default class Education extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            
        }

    }




    render(){
        let education = this.props.education.map(educ => 
            <ul>
                <li style={{fontSize: '1.2em'}}>
                    {educ.institutionName}
                </li>
                <li style={{fontSize: '0.9em'}}>
                    {educ.institutionType}
                </li>
                <li style={{fontSize: '0.9em'}}>
                    {educ.years}
                </li>
            </ul>
            )

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
            <div className='card p-4 mt-3'>
            <div className='bottomImage ml-2 mr-2'>
            {editbtn}
              <div className='education'>
                <h2>Education</h2>
                <ul>
                    {education}
                </ul>
              </div>
            </div>
            <EditEducation education={this.props.education} show={this.state.editMode} onHide={() => this.setState({editMode: false})}/>
          </div>
        )
    }
}