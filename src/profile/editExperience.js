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
import LocationCityIcon from '@material-ui/icons/LocationCity';

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
        this.handleExperienceRemove = this.handleExperienceRemove.bind(this)
        this.handleExperienceChange = this.handleExperienceChange.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.handleExperienceAdd = this.handleExperienceAdd.bind(this)
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


    handleExperienceChange(e){
        this.setState({[e.target.name]: e.target.value});
        let a = this.state.experience;
        var replace = {
            "title": (e.target.name == "title") ? e.target.value: this.state.experience[e.target.id].title,
            "year": (e.target.name == "year") ? e.target.value: this.state.experience[e.target.id].year,
            "position": (e.target.name == "position") ? e.target.value: this.state.experience[e.target.id].position,
            "description": (e.target.name == "description") ? e.target.value: this.state.experience[e.target.id].description

        }
        a.splice(e.target.id, 1, replace)
        this.setState({experience: a})
    }
    handleExperienceRemove(index){
        var a = this.state.experience
       
        a.splice(index, 1)
        this.setState({education: a})
    }
    handleExperienceAdd(){
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
        if(this.state.experience.length > 0){
        var experience = this.state.experience.map((experience, index) => 
            <form>
                <IconButton className={classes.root} size="small" onClick={() => this.handleExperienceRemove(index)}>
                    <CloseIcon  />
                </IconButton>
                <div class="form-group">
                    <div class='editLabel'>
                        Title
                    </div>
                    <input  name='title' class="form-control" id={index} value={experience.title} onChange={this.handleExperienceChange}/>
                </div>
                <div class="form-group">
                    <div class='editLabel'>
                        Year
                    </div>
                    <input  name='year' class="form-control" id={index} value={experience.year} onChange={this.handleExperienceChange}/>
                </div>
                <div class="form-group">
                    <div class='editLabel'>
                        Position 
                    </div>
                    <input  name='position' id={index} onChange={this.handleExperienceChange} class="form-control" value={experience.position}/>
                </div>   
                <div class="form-group">
                    <div class='editLabel'>
                        Description
                    </div>
                    <input  name='description' id={index} onChange={this.handleExperienceChange} class="form-control" value={experience.description}/>
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
                    <Button onClick={this.handleExperienceAdd}>Add</Button>
                    <Button onClick={this.updateProfile}>Submit</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
          </Modal>
        )
    }
}

export default withStyles(styles)(EditEducation)