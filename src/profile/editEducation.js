import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { withStyles } from '@material-ui/styles';

export default class EditEducation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            education: this.props.education
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.updateProfile = this.updateProfile.bind(this)

    }
    updateProfile(){
        let body = {
            "id": this.props.userID,
            "bio": this.state.bio,
            "currentPosition": {
                "job": this.state.currentPosition,
                "company": this.state.company
                
            }
            
          }
          fetch('api/accounts/update/education', {
            method:"POST",
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json'
          }
          }).then(res => res.json()).then((res)=> console.log(res)).then(()=> window.location.reload())
    }

    handleInputChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleEducationChange(e){
        let a = this.state.education;
        a.splice(e.target.id, 1, e.target.value)
        this.setState({highlights: a})
    }
    handleEducationRemove(index){
        var a = this.state.education
        a.splice(index, 1, "")
        this.setState({highlights: a})
    }
    handleEducationAdd(){
        let a = this.state.education;
        a.push(this.state.input);
        this.setState({highlights: a, input: ""})

    }


    render(){

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
                <form>
                    <div class="form-group">
                        <div class='editLabel'>
                            Institution Name
                        </div>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={this.props.fname}/>
                    </div>
                    <div class="form-group">
                        <div class='editLabel'>
                            Institution Type
                        </div>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={this.props.lname}/>
                    </div>
                    <div class="form-group">
                        <div class='editLabel'>
                            Years
                        </div>
                        <input type="email" name='currentPosition' value={this.state.currentPosition} onChange={this.handleInputChange} class="form-control" id="exampleFormControlInput1" placeholder={this.props.currentPosition}/>
                    </div>        
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.updateProfile}>Submit</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
          </Modal>
        )
    }
}