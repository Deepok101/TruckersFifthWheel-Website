import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    button: {
        "&:hover": {
          backgroundColor: "transparent"
        },
      }
  });

class EditHighlights extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            highlights: this.props.highlights,
            input: ""
        }
        this.handleHighlightChange = this.handleHighlightChange.bind(this)
        this.handleHighlightRemove = this.handleHighlightRemove.bind(this)
        this.handleHighlightAdd = this.handleHighlightAdd.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
    }

    handleHighlightChange(e){
        let a = this.state.highlights;
        a.splice(e.target.id, 1, e.target.value)
        this.setState({highlights: a})
    }
    handleHighlightRemove(index){
        var a = this.state.highlights
        a.splice(index, 1, "")
        this.setState({highlights: a})
    }
    handleHighlightAdd(){
        let a = this.state.highlights;
        a.push(this.state.input);
        this.setState({highlights: a, input: ""})

    }
    handleInputChange(e){
        this.setState({input: e.target.value})
    }

    updateProfile(){
        let body = {
            "id": this.props.userID,
            "highlights": this.state.highlights.filter(el => el !== ""),
          }

          fetch('api/accounts/update/highlights', {
            method:"POST",
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json'
          }
          }).then(res => res.json()).then((res)=> console.log(res)).then(()=> window.location.reload())
    }

    render(){
        const { classes } = this.props;
        if(this.state.highlights !== null){

                var highlights = this.state.highlights.map((value, index) => 
                    {
                    return(
                    <li>
                        
                        {/* <input onChange={this.handleHighlightChange} id={index} style={inputEditStyle} value={value}/> */}
                        <TextField
                            id={index}   
                            onChange={this.handleHighlightChange}                          
                            value={value}      
                            style={{marginTop: '10px'}}        
                            InputProps={{
                            endAdornment: (
                                <InputAdornment id={value} onClick={() => this.handleHighlightRemove(index)}
                                position="end">
                                <IconButton
                                    edge="end"
                                    aria-label="toggle password visibility"
                                    size='small'
                                    className={classes.button}
                                    
                                >
                                    <BackspaceIcon fontSize="small"/>
                                </IconButton>
                                </InputAdornment>
                            ),
                            }}
                        />
                        
                    </li>
                    )}
                
                )
            } else {
                var highlights = null;
                this.setState({highlights: []})
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
                    Edit Bio
                </Modal.Title>
                </Modal.Header>
                <Modal.Body >  
                    <input className='form-control' value={this.state.input} onChange={this.handleInputChange}/>
                    <ul className='experience' style={{...{columns: 5},...{fontSize: '1.08em'},...{lineHeight: '1.6'},...{paddingTop: '3em'}}}>
                        {highlights}
                    </ul>
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleHighlightAdd}>Add</Button>
                    <Button onClick={this.updateProfile}>Save</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
          </Modal>
        )
    }
}

export default withStyles(styles)(EditHighlights)