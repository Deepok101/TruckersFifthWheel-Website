import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentPosition: this.props.currentPosition,
            company: this.props.company,
            bio: this.props.bio
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
          fetch('api/accounts/update/bio', {
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

    render(){
        console.log(this.props.userID)
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
                                First Name
                            </div>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={this.props.fname}/>
                        </div>
                        <div class="form-group">
                            <div class='editLabel'>
                                Last Name
                            </div>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={this.props.lname}/>
                        </div>
                        <div class="form-group">
                            <div class='editLabel'>
                                Current Position
                            </div>
                            <input type="email" name='currentPosition' value={this.state.currentPosition} onChange={this.handleInputChange} class="form-control" id="exampleFormControlInput1" placeholder={this.props.currentPosition}/>
                        </div>
                        <div class="form-group">
                            <div class='editLabel'>
                                Company
                            </div>
                            <input type="email" name='company' value={this.state.company} onChange={this.handleInputChange} class="form-control" id="exampleFormControlInput1" placeholder={this.props.company}/>
                        </div>
                        <div class="form-group">
                            <div class='editLabel'>
                                Bio
                            </div>
                            <textarea type="email" name='bio' value={this.state.bio} onChange={this.handleInputChange} class="form-control" id="exampleFormControlInput1" placeholder={this.props.company}/>
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