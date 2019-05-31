import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Img from './truck_background.jpg'
import './style.css'

function AboutUs(){
    const background_color = {backgroundColor: "#f7f7f7"};
    const margin_top = {marginTop: "-2em"};
    const font_size = {fontSize: "1.5em"}
    const color = {color: 'white'}
    return(
        <Jumbotron style={{...background_color,...margin_top, ...{color}}}>
            <div>
                <h1 style={{textAlign: "center"}}> 
                    Who are we?
                </h1>
            </div>
            <div className='row'>
                <div className='col-sm'>
                    <img className='img-icons' src={require('./icons/truck.png')}/>
                    <p className='p-logo' style={{textAlign: "center"}}>
                        With almost 20 years of trucking experience, DeepEmploi is now offering a service
                        to facilitate the every day chores of truckers around the world.
                    </p>
                </div>
                <div className='col-sm'>
                    <img className='img-icons' src={require('./icons/truck2.png')}/>
                    <p className='p-logo' style={{textAlign: "center"}}>
                        Back in 1999, DeepEmploi began in a small appartment in Montreal,
                        With time and effort, he grew his fleet to 20 
                        truck drivers serving the province of Quebec.
                    </p>
                </div>
                <div className='col-sm'>
                    <img className='img-icons' src={require('./icons/forklift.png')}/>
                    <p className='p-logo' style={{textAlign: "center"}}>
                        Now DeepEmploi is expanding towards other transportation-related fields with the goal of providing 
                        the correct job for the correct person.
                    </p>
                </div>
            </div>
        </Jumbotron>
    )
}

export default AboutUs