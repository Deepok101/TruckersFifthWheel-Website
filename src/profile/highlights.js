import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import EditHighlights from './editHighlights'
import Chip from '@material-ui/core/Chip';

export default class Highlights extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
           
        }

    }




    render(){
        var highlights;
        if(this.props.highlights == null){
            highlights = null;
        }
        else {
            highlights = this.props.highlights.map(value => 
                <li className='highlightChip'>
                  {value}
                </li>
              )
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
            <div className='card p-4 mt-3'>
                <div className='bottomImage mr-2'>
                    {editbtn}
                  <div className='highlights'>
                    <h4 style={{fontWeight: 'normal'}}>Skills and Highlights</h4>
                      <ul className='experience' style={{...{columns: 5},...{fontSize: '1.08em'},...{lineHeight: '1.6'}}}>
                        {highlights}
                      </ul>
                  </div>
                  <div className='p-2'>
                    {this.props.button}
                  </div>
                </div>
                <EditHighlights userID={this.props.userID} highlights={this.props.highlights} show={this.state.editMode} onHide={() => this.setState({editMode: false})}/>
              </div>
        )
    }
}