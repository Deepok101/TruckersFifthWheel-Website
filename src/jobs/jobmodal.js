import React from 'react'
import { Modal, Button, ModalHeader, ModalTitle, ModalBody } from 'react-bootstrap'

class JobModal extends React.Component {
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
            <h4>{this.props.companyName}</h4>
            <p>
             {this.props.jobDesc}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button >Apply</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

export default JobModal;