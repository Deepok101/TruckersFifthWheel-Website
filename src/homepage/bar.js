import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Img from './truck_background.jpg'
import './style.css'

function Bar(){
    const background_color = {backgroundColor: "#0082c8"};
    const margin_top = {marginTop: "-2em"};
    const font_size = {fontSize: "1.5em"}
    const color = {color: '#fff'}
    return(
        <Jumbotron className="bar" style={{...background_color,...margin_top, ...{color}}}>
            <div className='row'>
                <div className='col-sm'>
                    <h2 style={{...{textAlign: "center"},...{color: "white"}}}>
                        Visit our blog for trucking career advice! 
                        <Button style={{marginLeft: 20}} variant='light'>Click Here</Button>
                    </h2>
                </div>
            </div>
        </Jumbotron>
    )
}

export default Bar;