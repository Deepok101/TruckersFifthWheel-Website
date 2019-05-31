import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Img from './truck_background.jpg'
import './style.css'

function Offer(){
    const background_color = {backgroundImage: "linear-gradient(to right, #141E30, #243B55)"};
    const margin_top = {marginTop: "-2em"};
    const font_size = {fontSize: "1.5em"}
    const color = {color: '#fff'}
    const border_radius = {borderRadius: 0}
    return(
        <Jumbotron style={{...background_color,...margin_top, ...color,...border_radius}}>
            <div>
                <h1 className='h1-dark h1-bigger' style={{textAlign: "center"}}> 
                    What do we offer?
                </h1>
            </div>
            <div className='row'>
                <div className='col-sm-6 col-centered'>
                    <img className='img-icons-2' src={require('./icons/magnifying-glass.png')}/>
                    <p className='p-logo-2' style={{textAlign: "center"}}>
                        We offer a free platform to allow truckers around the world to learn, communicate and easily find
                        the correct job for their specific needs. With a dedicated social media made just for truckers, a direct
                        messaging system for all and an amazing job searching feature, this is the place to be.
                    </p>
                </div>
            </div>
            <div style={{...{marginTop: "10em"}}} className='row'>
                <div className='col-sm'>
                    <h1 className='h1-btn' style={{textAlign: "center"}}>
                        Find a Job
                    </h1>
                </div>
                <div className='col-sm'>
                    <h1 className='h1-btn'  style={{textAlign: "center"}}>
                        Post on our NewsFeed
                    </h1>
                </div>
                <div className='col-sm'>
                    <h1 className='h1-btn'  style={{textAlign: "center"}}>
                        Chat with fellow truckers
                    </h1>
                </div>
            </div>
        </Jumbotron>
    )
}

export default Offer;