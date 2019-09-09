import React from 'react'

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import EditHighlights from './editHighlights'
import Paper from '@material-ui/core/Paper';

export default class ProfileSection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
        }
        this.test = false;
        this.openEdit = this.openEdit.bind(this);
    }

    openEdit(){
        this.props.editSection(this.props.sectionName);
    }


    render(){
     

        var editbtn;
        if(this.props.editable === true){
          editbtn = 
          <Fab style={{...{position: "absolute"},...{left: '90%'}}} size="small" onClick={this.openEdit}  aria-label="edit">
            <EditIcon />
          </Fab>
    
        } else {
          editbtn = null;
        }
        
        return(
            <Paper>
                <div style={{position: 'relative'}}  className='p-4 mt-3'>
                <div className='bottomImage mr-2'>
                    {editbtn}
                    <div className='highlights'>
                        <h4 className="mb-3" style={{fontWeight: 'normal'}}>{this.props.title}</h4>
                        {this.props.content}
                    </div>
                </div>
                {this.props.editModal}
                </div>
            </Paper>
        )
    }
}