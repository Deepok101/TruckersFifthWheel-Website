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
            experience: this.props.experience || [],
            title: "",
            year: "",
            position: "",
            description: ""
            
           
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleExperienceChange = this.handleExperienceChange.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.handleEducationAdd = this.handleEducationAdd.bind(this)
    }
    updateProfile(){

        let body = {
            "id": this.props.userID,
            "experience": this.state.experience
            }
            
          
          fetch('api/accounts/update/experience', {
            method:"POST",
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json'
          }
          }).then(res => res.json()).then((res)=> console.log(res)).then(()=> window.location.reload())
    }

    handleInputChange(e){
      
    }

    handleExperienceChange(e){
        this.setState({[e.target.name]: e.target.value});
        let a = this.state.experience;
        var replace = {
            "title": this.state.title,
            "year": this.state.year,
            "position": this.state.position,
            "description": this.state.description
        }
        a.splice(e.target.id, 1, replace)
        this.setState({education: a})
        console.log(this.state)
    }
    handleEducationRemove(index){
        var a = this.state.education
       
        a.splice(index, 1)
        this.setState({education: a})
    }
    handleEducationAdd(){
        let a = this.state.experience;
        let add = {
            "title": "",
            "years": "",
            "position": "",
            "description": ""
        }
        a.push(add);
        this.setState({education: a})

    }


    render(){
        const { classes } = this.props;
        console.log(this.state.experience)
        if(this.state.experience.length > 0){
        var experience = this.state.experience.map((index, education) => 
            <form>
                <IconButton className={classes.root} size="small" onClick={() => this.handleEducationRemove(index)}>
                    <CloseIcon  />
                </IconButton>
                <div class="form-group">
                    <div class='editLabel'>
                        Title
                    </div>
                    <input type="email" name='title' class="form-control" id={index} value={education.title} onChange={this.handleExperienceChange}/>
                </div>
                <div class="form-group">
                    <div class='editLabel'>
                        Year
                    </div>
                    <input type="email" name='year' class="form-control" id={index} value={education.years} onChange={this.handleExperienceChange}/>
                </div>
                <div class="form-group">
                    <div class='editLabel'>
                        Position 
                    </div>
                    <input type="email" name='position' id={index} onChange={this.handleExperienceChange} class="form-control" value={education.position}/>
                </div>   
                <div class="form-group">
                    <div class='editLabel'>
                        Description
                    </div>
                    <input type="email" name='description' id={index} onChange={this.handleExperienceChange} class="form-control" value={education.description}/>
                </div>
                <hr/>     
            </form>
            
            )
        } else {
            var experience = null;
        }
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Experience
                </Modal.Title>
                </Modal.Header>
                <Modal.Body >  
                    {experience}
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