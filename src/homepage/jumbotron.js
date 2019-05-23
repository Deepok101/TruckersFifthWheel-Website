import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Img from './truck_background.jpg'
import './style.css'

function Jumbotron_elem(){
    const background_color = {backgroundColor: "#f8f8ff"};
    const margin_top = {marginTop: "2em"};
    const font_size = {fontSize: "1.5em"}

    return(
        <Jumbotron style={{...background_color,...margin_top}}>
            <h1 style={{textAlign: "center"}}> 
                Welcome to DeepEmploi
            </h1>
            <p style={{...{textAlign: "center"},...font_size}}>
                A website where truckers can share information and help each other. <br/>
                Sign up now!
            </p>
            <p>
                <Button variant="primary">Learn more</Button>
            </p>
        </Jumbotron>
    )
}

export default Jumbotron_elem