import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class AlertModal extends React.Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }



    render(){
        


        return(
        <div>
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Road Alert
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h4>Road Alert Form</h4>
                <p>
                    Please notify us of the location and information of your provided road alert. 
                    This will be helpful to all truck drivers around your area.
                </p>
                <div>
                    Location/Address: <input placeholder="Location" className="roadAlertInput" value="" name="location"/> <br/>
                    City: <input placeholder="City" className="roadAlertInput" value="" name="city"/> <br/>
                    Description: <textarea placeholder="Description" className="roadAlertTextArea" value="" name="description" style={{...{width: "100%"}}}></textarea>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success">Send</Button>
                <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>)
    }
}

export default AlertModal;