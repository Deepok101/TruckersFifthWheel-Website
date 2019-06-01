import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Img from './truck_background.jpg'
import './style.css'

function Jumbotron_elem(){
    const background_color = {backgroundColor: "#f7f7f7"};
    const margin_top = {marginTop: "0em"};
    const font_size = {fontSize: "1.5em"}
    const borderBottom = {borderBottom: "1px solid #c9c9c9"}
    return(
        <Jumbotron style={{...background_color,...margin_top,...borderBottom}}>
            <h1 className='h1-bigger' style={{textAlign: "center"}}> 
                Sign Up now!
            </h1>
            <p style={{...{textAlign: "center"},...font_size,... {fontFamily: "Roboto"}}}>
                Fellow truck drivers are awaiting to share their knowledge with you! <br/>
                Oh, did we not mention it? It's totally FREE
            </p>
            <div id='learnMore'>
                <Button variant="primary">Sign Up</Button>
            </div>
        </Jumbotron>
    )
}

export default Jumbotron_elem