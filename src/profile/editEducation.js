import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { withStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
        float: 'right',
        
    }
})

class EditEducation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            education: this.props.education,
            institutionName: "",
            institutionType: "",
            years: ""
        }

        this.handleEducationChange = this.handleEducationChange.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.handleEducationAdd = this.handleEducationAdd.bind(this)
    }
    updateProfile(){

        let body = {
            "id": this.props.userID,
            "education": this.state.education
            }
            
          
          fetch('api/accounts/update/education', {
            method:"POST",
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json'
          }
          }).then(res => res.json()).then((res)=> console.log(res)).then(()=> window.location.reload())
    }


    handleEducationChange(e){
        this.setState({[e.target.name]: e.target.value});
        let a = this.state.education;
        var replace = {
            "institutionName": (e.target.name == "institutionName") ? e.target.value: this.state.education[e.target.id].institutionName,
            "institutionType": (e.target.name == "institutionType") ? e.target.value: this.state.education[e.target.id].institutionType,
            "years": (e.target.name == "years") ? e.target.value: this.state.education[e.target.id].years
        }
        a.splice(e.target.id, 1, replace)
        this.setState({education: a})
    }
    handleEducationRemove(index){
        var a = this.state.education
       
        a.splice(index, 1)
        this.setState({education: a})
    }
    handleEducationAdd(){
        let a = this.state.education;
        let add = {
            "institutionName": "",
            "institutionType": "",
            "years": ""
        }
        a.push(add);
        this.setState({education: a})

    }


    render(){
        const { classes } = this.props;
        var education = this.state.education.map((education, index) => 
            <form>
                <IconButton className={classes.root} size="small" onClick={() => this.handleEducationRemove(index)}>
                    <CloseIcon  />
                </IconButton>
                <div class="form-group">
                    <div class='editLabel'>
                        Institution Name
                    </div>
                    <input name='institutionName' class="form-control" id={index} value={education.institutionName} onChange={this.handleEducationChange}/>
                </div>
                <div class="form-group">
                    <div class='editLabel'>
                        Institution Type
                    </div>
                    <input name='institutionType' class="form-control" id={index} value={education.institutionType} onChange={this.handleEducationChange}/>
                </div>
                <div class="form-group">
                    <div class='editLabel'>
                        Years
                    </div>
                    <input name='years' id={index} onChange={this.handleEducationChange} class="form-control" value={education.years}/>
                </div>   
                <hr/>     
            </form>
            
            )
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Bio
                </Modal.Title>
                </Modal.Header>
                <Modal.Body >  
                    {education}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleEducationAdd}>Add</Button>
                    <Button onClick={this.updateProfile}>Submit</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
          </Modal>
        )
    }
}

export default withStyles(styles)(EditEducation)