import React from 'react'
import { Modal, Button, ModalHeader, ModalTitle, ModalBody } from 'react-bootstrap'

class JobModal extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        email: null,
        number: null,
        firstName: null,
        lastName: null
      }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)

    }




    onChange(e){
      this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(){
      this.props.apply(this.state)
    }

    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.jobName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.applied}
            <h4>{this.props.companyName}</h4>
            <p>
              {this.props.message}
            </p>
            <form style={{textAlign: 'center'}}>
              <input required value={this.props.email} onChange={this.onChange} class='applyInput' name='email' placeholder='Your email address...'/> <br/>
              <input required value={this.props.phone} onChange={this.onChange} class='applyInput' name='number' placeholder='Your phone number...'/> <br/>
              <input required ={this.props.fname} onChange={this.onChange} class='applyInput' name='firstName' placeholder='Your first name...'/> <br/>
              <input required value={this.props.lname} onChange={this.onChange} class='applyInput'name='lastName' placeholder='Your last name...'/> <br/>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={this.props.status} onClick={this.onSubmit}>Apply</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

export default JobModal;